// Concise image slides; full text remains available in expandable notes.
window.RAG_VISUAL_SLIDES = [
  {sourceIndex:0, image:'01-zh-v4.png', title:'RAG：先找資料，再回答', description:'問題經過 R 檢索，從文件選出相關片段；A 把指示、問題和片段放進提示；G 根據資料回答，並附上可核對的來源 [L1]。'},
  {sourceIndex:1, image:'02-zh-v5.png', title:'自訂助理：同樣可用資料，設定各有不同', description:'平台與設定示意：GPTs 屬於 OpenAI 的 ChatGPT，圖示呈現指示、知識檔案、工具設定與回答預覽；Gems 屬於 Google 的 Gemini，圖示呈現指示編輯，以及本機檔案或 Google Drive 的知識來源。兩側僅列設定例，不是完整或互斥的功能清單。共同概念是找片段、組合問題與證據、回答並附來源。實際功能、權限與檢索方式依平台而異，仍要核對原文。'},
  {sourceIndex:2, image:'03-zh-v5.png', title:'助理是工具，RAG 是方法', description:'GPTs 是 OpenAI 的 ChatGPT 工具，圖中使用綠色設定介面；Gems 是 Google 的 Gemini 工具，圖中使用紫色編輯介面。兩者是不同平台的自訂助理；RAG 是根據資料回答的方法，包括檢索、加入提示與生成。選工具，也要檢查證據。'},
  {sourceIndex:5, image:'06-zh-v4.png', title:'一題走完 R → A → G', description:'問題「怎麼申請長照服務？可以打 1966 嗎？」在 24 個長照片段中用 BM25 計分，取前 3 段 [L1-6]、[L1-2]、[L1-1] 放進提示，再由語言模型根據片段回答並標示來源。'},
];
