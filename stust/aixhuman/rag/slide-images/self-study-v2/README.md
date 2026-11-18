# RAG illustrated self-study revision

Created 2026-11-18 with the built-in image_gen tool.

Final images: 01-zh.png through 04-zh.png. Earlier designs remain in their original directory.
prompts.json records the full prompt set, corrections.json records the query-to-retrieval
arrow correction, and sources.md links the verified official product and example sources.
metadata.json is a generation-time snapshot; rag/slide-deck.js is the active teaching source.

The four current topics and their existing sourceIndex mappings are preserved:
RAG flow → assistant configuration → tool versus method → fixed BM25 worked example.
Each image includes a page number. The equivalent DOM number remains accessible without
creating a second visible number. Updated notes include the key idea, a diagram walkthrough,
an analogy, a misconception and a self-check answer.

The same revised assets feed handout thumbnails. Original full handout pages, references
and four slide podcasts remain available. Presentation hides the duplicate podcast card and
uses its existing narration control, leaving more room for the teaching image.

## Local verification

- node --check passed for rag/app.js and rag/slide-deck.js.
- Browser decoded all four self-study-v2 image paths.
- Every image fit the player at 1440 × 1000, including after the podcast-card layout fix.
- Self-check answers expanded.
- The fourth slide linked to handout page 3; its revised thumbnail opened slide 4.
- At 390 × 844, the slide page and mobile player had no horizontal overflow.
- Handout text at 200% had no horizontal overflow.
- Theme switching worked.
- The fixed long-term-care simulation completed all five steps. Retrieved IDs and scores
  matched the new slide, and the answer cited [L1-2] for 1966.
- References rendered; all four original podcast file references were retained and files exist.
- No browser page errors occurred during the main verification run.
- Screenshots: output/playwright/rag-self-study-v2-desktop.png,
  rag-self-study-v2-player.png and rag-self-study-v2-mobile.png.

This verification is local; the task did not publish the site.
