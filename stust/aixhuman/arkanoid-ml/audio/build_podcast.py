#!/usr/bin/env python3
"""Build the two-host study podcast for the #handout page.

Reads audio/podcast-scripts.json, synthesises every line with a cloud TTS service,
joins each episode with short pauses into audio/<lang>/<NN>.mp3, and writes
handout-podcast.js (titles, files, durations) for the page to load.

  python3 audio/build_podcast.py                        # default: edge-tts (free, no key; Azure neural voices)
  python3 audio/build_podcast.py --provider openai      # needs OPENAI_API_KEY
  python3 audio/build_podcast.py --provider google      # needs GOOGLE_TTS_API_KEY
  python3 audio/build_podcast.py --provider azure       # needs AZURE_SPEECH_KEY and AZURE_SPEECH_REGION
  python3 audio/build_podcast.py --provider say         # offline macOS voices, for drafts

Options: --lang zh|en (default both), --only 3 (one episode, 1-based), --dry-run,
--budget N (monthly billable-character cap, default 400000).

edge-tts is the same method as the 11/11 "AI Agent 賦能教與學" podcast (make_podcast.py):
zh-TW-HsiaoChenNeural at rate -5%, retried with growing waits when the service returns no audio.
It needs no account and has no character quota.

Staying on the Azure free tier (F0: 0.5 million neural characters per month, about 20 requests
per minute; CJK characters are billed as 2):
  * every synthesised line is cached in audio/.cache, so re-runs only pay for changed lines;
  * before any request the script estimates the billable characters still to synthesise and
    stops if this month's recorded usage plus the estimate would pass --budget;
  * requests are spaced 3.5 s apart and a 429 "too many requests" reply is retried after waiting;
  * usage is recorded per provider and month in audio/.cache/usage.json.
The full series (20 episodes) is about 21,000 billable characters. Requires ffmpeg.
"""
import argparse, datetime, hashlib, json, os, pathlib, subprocess, sys, tempfile, time, unicodedata, urllib.error, urllib.request, urllib.parse
from xml.sax.saxutils import escape

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = ROOT / 'audio'
CACHE = AUDIO / '.cache'
PAUSE = 0.45   # seconds of silence between lines
BITRATE = '64k'
DEFAULT_BUDGET = 400_000   # below the 500,000-character F0 allowance, leaving a margin
EDGE_RATE = '-5%'
MIN_INTERVAL = {'edge': 2.0, 'azure': 3.5, 'google': 0.5, 'openai': 0.5, 'say': 0}   # seconds between requests
USAGE = CACHE / 'usage.json'
REQUIRED_ENV = {'edge': [], 'azure': ['AZURE_SPEECH_KEY', 'AZURE_SPEECH_REGION'], 'google': ['GOOGLE_TTS_API_KEY'], 'openai': ['OPENAI_API_KEY'], 'say': []}

# Voice per provider, language and speaker (A = host, B = explainer).
VOICES = {
    'openai': {'zh': {'A': 'nova', 'B': 'onyx'}, 'en': {'A': 'nova', 'B': 'onyx'}},
    'google': {'zh': {'A': 'cmn-TW-Wavenet-A', 'B': 'cmn-TW-Wavenet-B'}, 'en': {'A': 'en-US-Neural2-F', 'B': 'en-US-Neural2-D'}},
    'azure':  {'zh': {'A': 'zh-TW-HsiaoChenNeural', 'B': 'zh-TW-YunJheNeural'}, 'en': {'A': 'en-US-JennyNeural', 'B': 'en-US-GuyNeural'}},
    'edge':   {'zh': {'A': 'zh-TW-HsiaoChenNeural', 'B': 'zh-TW-YunJheNeural'}, 'en': {'A': 'en-US-AvaNeural', 'B': 'en-US-AndrewNeural'}},
    'say':    {'zh': {'A': 'Meijia', 'B': 'Eddy (中文（台灣）)'}, 'en': {'A': 'Samantha', 'B': 'Reed (英文（美國）)'}},
}
OPENAI_MODEL = 'gpt-4o-mini-tts'
OPENAI_STYLE = {
    'zh': '用台灣華語、自然口語的方式說話，語氣溫暖、像教育類 Podcast 主持人在和聽眾聊天，速度適中，清楚咬字。',
    'en': 'Speak in a warm, friendly, conversational tone, like an educational podcast host chatting with a student. Moderate pace, clear diction.',
}


def need(name):
    value = os.environ.get(name)
    if not value:
        sys.exit(f'Missing environment variable {name}.')
    return value


def billable(text):
    """Characters as Azure bills them: CJK (wide) characters count as 2."""
    return sum(2 if unicodedata.east_asian_width(c) in 'WF' else 1 for c in text)


def month_key(provider):
    return f'{provider}:{datetime.date.today():%Y-%m}'


def load_usage():
    try:
        return json.loads(USAGE.read_text('utf-8'))
    except (OSError, ValueError):
        return {}


def record_usage(provider, chars):
    usage = load_usage()
    usage[month_key(provider)] = usage.get(month_key(provider), 0) + chars
    USAGE.parent.mkdir(parents=True, exist_ok=True)
    USAGE.write_text(json.dumps(usage, indent=1), 'utf-8')


_last_request = [0.0]


def post(url, body, headers, provider):
    """POST with spacing between requests and retries on rate limiting (429) or a busy service (503)."""
    for attempt in range(6):
        wait = MIN_INTERVAL[provider] - (time.monotonic() - _last_request[0])
        if wait > 0:
            time.sleep(wait)
        _last_request[0] = time.monotonic()
        request = urllib.request.Request(url, data=body, headers=headers, method='POST')
        try:
            with urllib.request.urlopen(request, timeout=120) as response:
                return response.read()
        except urllib.error.HTTPError as error:
            if error.code in (429, 503) and attempt < 5:
                delay = float(error.headers.get('Retry-After') or 0) or 10 * (attempt + 1)
                print(f'  rate limited ({error.code}); waiting {delay:.0f} s')
                time.sleep(delay)
                continue
            sys.exit(f'TTS request failed ({error.code}): {error.read()[:400].decode("utf-8", "replace")}')


def synth_openai(text, voice, lang, out):
    body = json.dumps({'model': OPENAI_MODEL, 'voice': voice, 'input': text, 'instructions': OPENAI_STYLE[lang], 'response_format': 'mp3'}).encode()
    out.write_bytes(post('https://api.openai.com/v1/audio/speech', body,
                         {'Authorization': f'Bearer {need("OPENAI_API_KEY")}', 'Content-Type': 'application/json'}, 'openai'))


def synth_google(text, voice, lang, out):
    import base64
    body = json.dumps({'input': {'text': text}, 'voice': {'languageCode': '-'.join(voice.split('-')[:2]), 'name': voice},
                       'audioConfig': {'audioEncoding': 'MP3', 'speakingRate': 1.0}}).encode()
    url = 'https://texttospeech.googleapis.com/v1/text:synthesize?' + urllib.parse.urlencode({'key': need('GOOGLE_TTS_API_KEY')})
    out.write_bytes(base64.b64decode(json.loads(post(url, body, {'Content-Type': 'application/json'}, 'google'))['audioContent']))


def synth_azure(text, voice, lang, out):
    locale = '-'.join(voice.split('-')[:2])
    ssml = (f'<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="{locale}">'
            f'<voice name="{voice}">{escape(text)}</voice></speak>').encode()
    region = need('AZURE_SPEECH_REGION')
    out.write_bytes(post(f'https://{region}.tts.speech.microsoft.com/cognitiveservices/v1', ssml, {
        'Ocp-Apim-Subscription-Key': need('AZURE_SPEECH_KEY'), 'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-96kbitrate-mono-mp3', 'User-Agent': 'handout-podcast-builder'}, 'azure'))


def synth_edge(text, voice, lang, out):
    """edge-tts, as in make_podcast.py: the service sometimes returns no audio, so retry with longer waits."""
    tmp = out.with_suffix('.part.mp3')
    for attempt in range(4):
        wait = MIN_INTERVAL['edge'] - (time.monotonic() - _last_request[0])
        if wait > 0:
            time.sleep(wait)
        _last_request[0] = time.monotonic()
        done = subprocess.run(['edge-tts', '--voice', voice, f'--rate={EDGE_RATE}', '--text', text, '--write-media', str(tmp)],
                              stderr=subprocess.DEVNULL).returncode == 0
        if done and tmp.exists() and tmp.stat().st_size > 1000:
            tmp.replace(out)   # only a finished clip enters the cache
            return
        time.sleep(10 * (attempt + 1))
    tmp.unlink(missing_ok=True)
    sys.exit(f'edge-tts failed for [{voice}] {text[:40]} (rerun; finished lines are cached)')


def synth_say(text, voice, lang, out):
    with tempfile.TemporaryDirectory() as tmp:
        aiff = pathlib.Path(tmp) / 'line.aiff'
        subprocess.run(['say', '-v', voice, '-o', str(aiff), text], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(aiff), '-ac', '1', '-ar', '24000', '-b:a', BITRATE, str(out)], check=True)


SYNTH = {'edge': synth_edge, 'openai': synth_openai, 'google': synth_google, 'azure': synth_azure, 'say': synth_say}


def duration(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())


def cache_path(provider, voice, lang, text):
    key = hashlib.sha256(json.dumps([provider, OPENAI_MODEL if provider == 'openai' else '', voice, lang, text]).encode()).hexdigest()[:20]
    return CACHE / provider / f'{key}.mp3'


def build_episode(provider, lang, index, episode, dry):
    voices = VOICES[provider][lang]
    parts = []
    for speaker, text in episode['lines']:
        voice = voices[speaker]
        part = cache_path(provider, voice, lang, text)
        if not part.exists():
            if dry:
                print(f'  would synthesise [{voice}] {text[:40]}')
                continue
            part.parent.mkdir(parents=True, exist_ok=True)
            SYNTH[provider](text, voice, lang, part)
            if provider not in ('say', 'edge'):
                record_usage(provider, billable(text))
        parts.append(part)
    if dry:
        return None
    out = AUDIO / lang / f'{index + 1:02d}.mp3'
    out.parent.mkdir(parents=True, exist_ok=True)
    # Normalise every line to the same format, put a pause after each, then join and level the loudness.
    inputs, filters = [], []
    for n, part in enumerate(parts):
        inputs += ['-i', str(part)]
        filters.append(f'[{n}:a]aresample=24000,aformat=channel_layouts=mono,apad=pad_dur={PAUSE}[a{n}]')
    filters.append(''.join(f'[a{n}]' for n in range(len(parts))) + f'concat=n={len(parts)}:v=0:a=1,loudnorm=I=-16:TP=-1.5[out]')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(filters), '-map', '[out]',
                    '-ac', '1', '-ar', '24000', '-b:a', BITRATE,
                    '-metadata', f'title={episode["title"]}', '-metadata', 'album=Arkanoid Learns study podcast', str(out)], check=True)
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--provider', choices=SYNTH, default='edge')
    parser.add_argument('--lang', choices=['zh', 'en'])
    parser.add_argument('--only', type=int, help='build only this episode number (1-based)')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--budget', type=int, default=DEFAULT_BUDGET, help='monthly billable-character cap (default %(default)s)')
    args = parser.parse_args()
    scripts = json.loads((AUDIO / 'podcast-scripts.json').read_text('utf-8'))
    langs = [args.lang] if args.lang else ['zh', 'en']
    selected = [(lang, index, episode) for lang in langs for index, episode in enumerate(scripts[lang])
                if not args.only or index + 1 == args.only]

    # Preflight: credentials, then this run's cost against the monthly budget, before any request.
    if not args.dry_run:
        for name in REQUIRED_ENV[args.provider]:
            need(name)
    todo = [(lang, text) for lang, _, episode in selected for speaker, text in episode['lines']
            if not cache_path(args.provider, VOICES[args.provider][lang][speaker], lang, text).exists()]
    cost = sum(billable(text) for _, text in todo)
    used = load_usage().get(month_key(args.provider), 0)
    if args.provider in ('say', 'edge'):
        print(f'{len(todo)} lines to synthesise (no quota for {args.provider})')
    else:
        print(f'{len(todo)} lines to synthesise ≈ {cost:,} billable characters; '
              f'recorded this month: {used:,}; budget: {args.budget:,}')
        if used + cost > args.budget:
            sys.exit('Stopping: this run would exceed the monthly budget. Use --only/--lang to build less, or raise --budget.')
    for lang, index, episode in selected:
        print(f'{lang} {index + 1:02d} {episode["title"]}')
        out = build_episode(args.provider, lang, index, episode, args.dry_run)
        if out:
            print(f'  → {out.relative_to(ROOT)} ({duration(out):.0f} s)')
    if not args.dry_run:
        write_manifest(scripts)


def write_manifest(scripts):
    """List each episode's title, audio file (None until built) and duration for the handout page (works from file:// too)."""
    manifest = {}
    for lang in ('zh', 'en'):
        episodes = []
        for index, episode in enumerate(scripts[lang]):
            path = AUDIO / lang / f'{index + 1:02d}.mp3'
            episodes.append({
                'title': episode['title'],
                'src': f'audio/{lang}/{index + 1:02d}.mp3' if path.exists() else None,
                'duration': round(duration(path)) if path.exists() else None,
            })
        manifest[lang] = episodes
    target = ROOT / 'handout-podcast.js'
    target.write_text('// Generated by audio/build_podcast.py from audio/podcast-scripts.json. Do not edit by hand.\n'
                      f'window.HANDOUT_PODCAST = {json.dumps(manifest, ensure_ascii=False, indent=1)};\n', 'utf-8')
    print(f'wrote {target.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
