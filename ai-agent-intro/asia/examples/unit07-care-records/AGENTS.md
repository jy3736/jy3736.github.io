# 照護紀錄模組協作說明

這是本機純前端 WebMCP 專案。主要頁面位於 `app/index.html`，不需要 npm 安裝或 API 金鑰。

協助使用者時：

- 以 `啟動照護紀錄.cmd` 啟動 `http://localhost:8765`。
- 使用 Codex 內建瀏覽器開啟該網址，讓頁面註冊 Site tools。
- 可使用 `read_care_narrative` 讀取目前敘述。
- 可使用 `fill_extracted_care_fields` 回填原文有依據的欄位。
- 可使用 `list_local_care_records` 查詢目前瀏覽器保存的紀錄。
- 缺少或不明確的資料保持空白，不推測量測單位。
- 不代替照護人員確認個案或按下正式儲存。
- 修改後以 `node --check` 檢查頁面中 `<script>` 的 JavaScript 語法。

