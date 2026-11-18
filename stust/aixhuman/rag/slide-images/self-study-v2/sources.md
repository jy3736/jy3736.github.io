# Source checks for the slide revision

Checked 2026-11-18. Slides are conceptual diagrams rather than current product UI tutorials.

- [OpenAI: Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts): distinguishes behavioral instructions from uploaded reference material and recommends testing file use. The page also reports creation restrictions and migration, so the deck does not promise availability or teach current button locations.
- [Google: Use Gems in Gemini Apps](https://support.google.com/gemini/answer/15146780?hl=en): instructions, knowledge files, local/Drive sources and previews; also notes the personal-account transition to skills.
- [衛福部：申請長照服務](https://1966.gov.tw/ltc/cp-6533-70777-207.html): supports the 1966 application example.
- Local `rag/demo-data.js`: the fixed 24-passage run and scores 7.92, 7.66, 4.77 for [L1-6], [L1-2], [L1-1]. This fixed replay is not a current live retrieval measurement.

The method diagrams are teaching interpretations; they do not claim every platform response uses retrieval or that citations are always correct.
