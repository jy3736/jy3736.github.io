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
