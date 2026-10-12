# 智慧排班｜本機 Codex 版

這個 package 收錄可操作的智慧排班系統、教學講義與範例 CSV。全部都是純前端檔案，不需要資料庫、API 金鑰或雲端伺服器。

## 開始使用

1. 將整個資料夾解壓縮到電腦。
2. 用 Codex 開啟這個資料夾。
3. 雙擊 `啟動智慧排班.cmd`。
4. 瀏覽器開啟 `http://localhost:8765` 後，即可進入排班系統、講義或下載範例資料。

也可以把 `給Codex的第一句.txt` 內容貼給 Codex，請 Codex 協助開啟與說明。

## 內容

- `index.html`：package 首頁。
- `app/index.html`：智慧排班純前端系統。
- `guide/index.html`：智慧排班操作與實作講義。
- `samples/智慧排班_範例人員.csv`：可匯入的人員資料。
- `samples/智慧排班_範例班別.csv`：可匯入的班別資料。
- `AGENTS.md`：Codex 協作說明。
- `啟動智慧排班.cmd`：本機啟動檔。

## 注意事項

- 關閉啟動視窗後，本機網站會停止；再次雙擊啟動檔即可。
- 排班資料與計算只在目前瀏覽器分頁中運作；重要班表請下載 CSV 保存。
- 若電腦沒有 Python 3，仍可直接雙擊 `app/index.html` 與 `guide/index.html` 使用，但建議安裝 Python 3 以方便 Codex 從本機網址開啟。

