# Arkanoid self-study slide deck v2

Created 2026-11-18 using the built-in image_gen tool. The ten final Traditional Chinese PNGs are 01-zh.png through 10-zh.png. Original concise assets are retained in their original directory.

- prompts.json records the complete generation prompt for each slide.
- corrections.json records the subsequent accuracy edits for slides 05, 07, 08, 09 and 10.
- app.js consumes these assets in both the introduction and the Chinese handout. Its SLIDE_GUIDE supplies concise explanations, self-check questions, answers and accessible image descriptions.
- Full handout explanations and existing audio remain available.

The teaching sequence moves from examples → feedback types → features/labels → training/inference → evaluation, then applies these ideas to the game's inputs → target sources → sampling/updates → validation/metrics → comparison exercise.

## Local verification

- node --check arkanoid-ml/app.js passed.
- Browser decoded all ten images. At a 1440 × 1000 viewport, each slide image fit within the player stage.
- At 390 × 844, the introduction had no horizontal overflow; the mobile player's End key reached slide 10.
- Self-check explanations expanded successfully; the full handout used the revised images.
- A chapter link from slide 7 navigated to #handout, focused handout-07-title and placed that section near the viewport top.
- Manual, AI Learn and AI Play tabs opened. Game training behavior was not retested because this change affects slide assets, study controls and navigation.
- Screenshots: output/playwright/arkanoid-self-study-v2-desktop.png, arkanoid-self-study-v2-player.png and arkanoid-self-study-v2-mobile.png.

Verification is local; this task did not publish the site.
