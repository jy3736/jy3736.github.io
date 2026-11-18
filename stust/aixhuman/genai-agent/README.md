# 生成式 AI 到 Agent

Open `index.html` in a browser, or serve the workshop root and visit `/genai-agent/`.
No build step, package installation, external fonts, or cloud AI connection is required.

## Teaching material

Five slides and five matching handout sections, in Traditional Chinese:

1. Next-token generation and factual verification.
2. Reasoning, worked steps, and independent checks.
3. The think / act / observe agent loop.
4. Choosing Chat, Work, or Codex by the intended deliverable.
5. Writing requirements and verifying a three-item checklist.

The handout includes exercises, expandable self-check answers, source links, a copyable
practice prompt, 100–200% text controls, light/dark themes, and browser printing.
Slide presentation supports arrow keys, PageUp/PageDown, Home/End, Escape, and horizontal swipes.
On phones, illustrated slides scale to the stage width. Expandable study summaries,
self-check answers and matching full handout links provide readable text below each image.

## Editing

- `content.js`: the shared source for slides and handout content. Edit this first.
- `slide-images/self-study-v2/`: five imagegen illustrations, with the complete prompt
  set in `prompts.json` and accuracy edits in `corrections.json`. Each image is used
  in both the slide deck and matching handout section.
- `lesson.js`: lesson rendering, hash navigation, presentation, themes, and reading controls.
- `layout.css`: lesson-specific styles and responsive/print adjustments.
- `../arkanoid-ml/styles.css`: directly shared shell, tabs, infographic, player, and handout styles.
  This sibling folder is required; retain it when copying or publishing the site.
- `demo.js` and `demo.css`: extracted from the original self-contained GenAI page.
- `index.html`: page shell and original interactive demo markup.
- `audio/slide-podcast-scripts.json`: two-host podcast explainer per slide (小佳 asks, 艾迪 explains),
  written for students who missed the session. Rebuild with `python3 genai-agent/audio/slide_podcast.py`
  (edge-tts in the builder’s Python environment + ffmpeg; lines cached in `audio/.cache`,
  which need not be published). It writes
  `audio/slides/NN.mp3` and `audio/slides/podcasts.js`; each deck slide shows its player.
- `audio/edge_synth.py`: one-request Edge TTS worker. The builder retries both Microsoft
  endpoints and prefers the endpoint that most recently succeeded, without changing
  voices, rate, text, or cache keys. The compatibility endpoint follows the
  [edge-tts 7.2.3 configuration](https://github.com/rany2/edge-tts/blob/7.2.3/src/edge_tts/constants.py).
  Failed requests are logged; a sustained outage stops the build with cached clips intact.
- `resources/`: portable text excerpts from the supplied Learn-Codex reference, with
  original-file SHA-256 values and source path recorded in `manifest.json`.

The original three demonstrations remain available at `#generate`, `#reason`, and `#agent`.
`#intro/1` and `#handout/1` link directly to matching content (numbers 1–5).
The demonstrations use a small statistical model and scripted simulations, not real model
comparisons or real filesystem/email tools.

## Verification (2026-11-18)

- JavaScript syntax checks passed for content, lesson, and demo scripts.
- Local HTML assets and source excerpt links resolve.
- Browser verification covered five presentation slides, Escape, mobile presentation,
  theme and font persistence, 200% handout text at 390 × 844, handout anchors and prompt copying.
- Original generation and reasoning controls operate; the agent loop reaches approval,
  and denying approval leaves the simulated email unsent.
- Screenshots are in the workshop's `output/playwright/genai-*.png`.
- **Podcast audio (2026-11-18): complete.** Built `audio/slides/01.mp3`–`05.mp3`
  and `podcasts.js`; durations are **04:31, 04:07, 04:02, 04:14, 04:18**.
  The existing scripts and both voices are unchanged. A Microsoft Edge TTS compatibility
  endpoint recovered the missing lines; bounded retries, explicit errors, and HTTP 429
  backoff replace silent failures and lengthy unexplained waits.
  All 113 scripted line occurrences are cached and decode cleanly. Episode durations
  match the sum of their line durations plus the intended 0.45-second pauses; no silent
  gaps over two seconds were detected. A PCM comparison confirms that every episode
  starts with the cached 小佳 greeting (correlation 0.9989); these are digital audio
  spot checks, not a full human listening review.
  Browser checks confirmed one playable player between each illustration and study
  notes, automatic pausing of other episodes, and no players inside presentation mode.
  Light/dark layouts at 1440 px and 390 px passed with no console errors or horizontal
  overflow. Screenshots: `output/playwright/genai-podcast-{1440,390}-{light,dark}.png`;
  audio audit: `output/playwright/genai-podcast-audio-audit.json`;
  browser results: `output/playwright/genai-podcast-browser-check.txt`.


This is a local update; no publication or deployment was performed.

## Illustrated revision (2026-11-18)

The five concept slides now use imagegen teaching illustrations, concise summaries,
expandable self-check answers and direct full-handout links. Matching illustrations
also appear in the handout. The generation loop, worked calculation, agent error recovery,
parallel deliverable comparison and four checklist states replace the text-card presentation.

Local verification confirmed all five images decode and fit the player; study answers,
matching section links, Escape, themes, mobile navigation and 200% handout text work.
The three demos were exercised, including the agent deny branch with zero simulated emails.
Screenshots use the prefix `output/playwright/genai-self-study-v2-`.
