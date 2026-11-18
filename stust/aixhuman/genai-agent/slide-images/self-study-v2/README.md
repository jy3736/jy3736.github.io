# Illustrated self-study deck

Created 2026-11-18 with the built-in image_gen tool.

The final five Traditional Chinese images are 01-zh.png through 05-zh.png.
prompts.json contains the complete generation prompt set; corrections.json records
targeted accuracy edits to the token/verification example and simulated output filename.
All five images were visually inspected and are used in both the introduction and handout.

The sequence is generation → reasoning and independent checks → agent tool loop →
choosing a deliverable → specifying and testing that deliverable.

content.js remains the shared teaching source. It supplies the image paths, accessible
descriptions, concise study summaries, questions and answers. Full source-backed
explanations, practice prompts, exercises and source links remain in the handout.

## Local verification

- Syntax checks passed for content.js, lesson.js and demo.js.
- All five images decoded and fit the presentation stage at 1440 × 1000.
- Escape closed presentation; mobile End navigation reached 5 / 5.
- At 390 × 844, the introduction and mobile presentation had no horizontal overflow.
- Handout text at 200% had no horizontal overflow.
- Self-check answers expanded; a slide 3 link focused the matching handout heading.
- Light/dark theme switching worked.
- Generation produced a token and candidate probabilities.
- The reasoning simulation completed after a learner guess.
- The agent simulation recovered from the missing filename, created recheck-list.md,
  reached approval and completed the deny branch with zero messages in the simulated outbox.
- No browser page errors occurred.
- Visual evidence: output/playwright/genai-self-study-v2-desktop.png,
  genai-self-study-v2-player.png and genai-self-study-v2-mobile.png.

Verification is local. No publication was performed.
