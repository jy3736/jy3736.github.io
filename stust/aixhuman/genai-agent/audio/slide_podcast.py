#!/usr/bin/env python3
"""Build the two-host podcast explainer for each slide (audio/slides/NN.mp3 + audio/slides/podcasts.js).

For students who missed the live session: one standalone episode per slide in window.LESSON (content.js),
with the same hosts and edge-tts voices as the rag and arkanoid-ml podcasts.
Scripts live in audio/slide-podcast-scripts.json. Every line is cached in audio/.cache (keyed by voice,
rate and text), so only changed lines are re-recorded. Requires edge-tts and ffmpeg.

    python3 genai-agent/audio/slide_podcast.py            # all slides
    python3 genai-agent/audio/slide_podcast.py --only 2   # one slide (1-based deck position)
"""
import argparse
import hashlib
import json
import subprocess
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPTS = HERE / "slide-podcast-scripts.json"
OUT = HERE / "slides"
CACHE = HERE / ".cache"
VOICES = {"A": "zh-TW-HsiaoChenNeural", "B": "zh-TW-YunJheNeural"}
RATE, PAUSE, BITRATE = "-5%", 0.45, "64k"
MIN_CHARS = 900   # about four minutes: enough to teach the slide to someone who was not there


def line_path(speaker, text):
    return CACHE / (hashlib.sha256(f"{VOICES[speaker]}|{RATE}|{text}".encode()).hexdigest()[:20] + ".mp3")


GAP = 2.0          # seconds between requests
_fails = [0]       # NoAudioReceived is intermittent; it does not establish throttling.
_endpoint = ["primary"]


def synth(text, voice, out):
    """Retry transient failures without changing the voice, rate, or source text.
    Only complete clips enter the original cache; report the underlying error."""
    tmp = out.with_suffix(".part.mp3")
    preferred = _endpoint[0]
    endpoints = [preferred, "edge-services" if preferred == "primary" else "primary", preferred]
    for attempt in range(3):
        endpoint = endpoints[attempt]
        time.sleep(GAP * (attempt + 1))
        try:
            result = subprocess.run(
                [sys.executable, str(HERE / "edge_synth.py"), endpoint, voice, RATE, text, str(tmp)],
                capture_output=True, text=True, timeout=45)
            ok = result.returncode == 0
            error = result.stderr.strip().splitlines()[-1:] or ["No complete audio returned"]
        except subprocess.TimeoutExpired:
            ok, error = False, ["Synthesis timed out after 45 seconds"]
        if ok and tmp.exists() and tmp.stat().st_size > 1000:
            tmp.replace(out)
            _fails[0] = 0
            _endpoint[0] = endpoint
            print(f"  endpoint: {endpoint}", flush=True)
            return True
        tmp.unlink(missing_ok=True)
        _fails[0] += 1
        print(f"  {voice}, {endpoint}, try {attempt + 1}/3: {error[0]}", flush=True)
        if "HTTP 429" in error[0]:
            print("  rate limit response; backing off for 30 seconds", flush=True)
            time.sleep(30)
        if _fails[0] >= 15:
            sys.exit("15 consecutive synthesis failures; stopping. Finished lines remain cached.")
    return False


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())


def build(n, episode):
    parts = [line_path(speaker, text) for speaker, text in episode["lines"]]
    out = OUT / f"{int(n):02d}.mp3"
    inputs, filters = [], []
    for i, part in enumerate(parts):
        inputs += ["-i", str(part)]
        filters.append(f"[{i}:a]aresample=24000,aformat=channel_layouts=mono,apad=pad_dur={PAUSE}[a{i}]")
    filters.append("".join(f"[a{i}]" for i in range(len(parts))) + f"concat=n={len(parts)}:v=0:a=1,loudnorm=I=-16:TP=-1.5[out]")
    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(filters), "-map", "[out]",
                    "-ac", "1", "-ar", "24000", "-b:a", BITRATE, "-metadata", f"title={episode['title']}",
                    "-metadata", "album=生成式 AI 到 Agent 投影片 Podcast 導讀", str(out)], check=True)
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", type=int, help="build one slide (1-based)")
    args = parser.parse_args()
    data = json.loads(SCRIPTS.read_text("utf-8"))
    episodes = data["episodes"]
    for n, episode in episodes.items():
        chars = sum(len(text) for _, text in episode["lines"])
        if chars < MIN_CHARS:
            sys.exit(f"slide {n}: script has {chars} characters, needs at least {MIN_CHARS}")
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    chosen = {k: e for k, e in episodes.items() if args.only is None or args.only == int(k)}
    for attempt in range(8):   # edge-tts is flaky: retry the lines it did not return
        missing = 0
        for n, episode in chosen.items():
            for index, (speaker, text) in enumerate(episode["lines"], 1):
                part = line_path(speaker, text)
                if not part.exists():
                    print(f"slide {n}, line {index}/{len(episode['lines'])}, host {speaker}", flush=True)
                    if not synth(text, VOICES[speaker], part):
                        missing += 1
                    else:
                        print("  cached", flush=True)
        print(f"pass {attempt + 1}: {missing} lines missing", flush=True)
        if not missing:
            break
        time.sleep(30)
    else:
        sys.exit("some lines are still missing; rerun later (finished lines are cached)")
    manifest = {}
    for n, episode in episodes.items():
        out = OUT / f"{int(n):02d}.mp3"
        if n in chosen:
            build(n, episode)
            print(f"wrote {out.name}")
        if out.exists():
            seconds = int(duration(out))
            manifest[n] = {"title": episode["title"], "src": f"audio/slides/{out.name}",
                           "duration": f"{seconds // 60:02d}:{seconds % 60:02d}", "hosts": data["speakers"]}
    (OUT / "podcasts.js").write_text(
        "// Generated by audio/slide_podcast.py from audio/slide-podcast-scripts.json. Do not edit by hand.\n"
        f"window.GENAI_SLIDE_PODCASTS = {json.dumps(manifest, ensure_ascii=False, indent=1)};\n", "utf-8")
    for n, info in manifest.items():
        print(f"slide {n}: {info['duration']}  {info['title']}")


if __name__ == "__main__":
    main()
