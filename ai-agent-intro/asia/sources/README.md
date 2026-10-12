# 模組 05 參考來源：三款常駐型 AI Agent（Muse、Dots、Grok Bot）

起點文章：遠見雜誌〈三大AI Agent可免費用？OpenAI Dots、Meta Muse、Grok Bot全攻略〉（曾子軒，2026-10-08）。本資料夾依該文追查各家官方頁面與說明中心，並保留幾篇媒體報導作對照。擷取日期：2026-10-11。尚未寫入 `unit05.src.html`。

`raw/` 內每個來源都有 `.html`（擷取時的完整頁面）與 `.txt`（純文字，首行為 URL 與擷取日期）。OpenAI、xAI、Meta 的頁面擋一般下載，改用本機 Chrome 開啟後存檔；說明中心頁為機器翻譯的繁中版。

## 來源清單

### 官方（優先引用）

| 檔名 | 來源 | 重點 |
| --- | --- | --- |
| `openai-introducing-dots-zh-hant` | [OpenAI：dot 正式登場](https://openai.com/zh-Hant/index/introducing-dots/)（2026-09-29） | GPT-6 Astra、雲端電腦、4,000+ 應用程式、ChatGPT／Slack／Teams、主動研究（唯讀）、自訂規則、方案 |
| `openai-dots-safety-zh-hant` | [OpenAI：我們如何將安全性、資安與隱私融入 dots](https://openai.com/zh-Hant/index/how-we-build-safety-security-and-privacy-into-dots/) | 雲端工作區隔離、安全登入、獨立動作檢查、限制 |
| `openai-help-getting-started-dot` | [說明中心：dot 入門指南](https://help.openai.com/zh-hant/articles/20001530-getting-started-with-your-dot) | 適用方案與地區、設定步驟、本機電腦存取預設關閉、中斷連線不刪除已取得資訊 |
| `openai-help-dots-privacy-faq` | [說明中心：dot 隱私、資安與安全常見問題](https://help.openai.com/zh-hant/articles/20001529-dots-privacy-security-and-safety-faqs) | 需接手／每次核准／可事先核准三層、未滿 18 歲不可用、記憶無法逐筆刪除 |
| `meta-muse` | [Meta：Muse 產品頁](https://ai.meta.com/muse/) | App（行動、Mac）、WhatsApp；憑證儲存代理讀不到；一次性卡號；重要動作需核准；FAQ「免費但有用量上限」 |
| `meta-introducing-muse` | [Introducing Muse（產品團隊設計說明）](https://introducing.muse.ai/) | 設計取捨與界線 |
| `meta-help-muse-user-controls` | [Meta 說明：Muse 如何處理隱私、網路安全和帳號安全](https://www.meta.com/help/1047255454427887) | 每位使用者獨立 VM、提示注入防護、訓練資料設定預設開啟 |
| `meta-help-muse-permissions` | [Meta 說明：Muse 如何在你的指引和核可下運作](https://www.meta.com/help/1385290430137537) | 讀取／寫入權限、從低風險任務開始、使用者須負責修正錯誤 |
| `meta-help-muse-connectors` | [Meta 說明：連接器](https://www.meta.com/help/1687253048996149) | 取消連結後先前資訊可能保留；自訂連接器 Meta 不審查 |
| `xai-bot` | [xAI：Grok Bot 產品頁](https://x.ai/bot) | 適用方案、所有 Bot 共用一台雲端電腦（隔離以使用者為單位）、Auto Review、桌面 macOS／Windows 與 iOS |
| `xai-introducing-grok-bot` | [xAI：Introducing Grok Bot](https://x.ai/news/introducing-grok-bot) | Beta、適用方案、用量與 Grok／Cursor 方案分開計算 |

### 媒體報導（對照用）

| 檔名 | 來源 |
| --- | --- |
| `gvm-133614` | [遠見：三大AI Agent可免費用？](https://www.gvm.com.tw/article/133614)（起點文章，含比較表與「先讀取、再準備、後自動」三步驟） |
| `inside-42519` | [INSIDE：OpenAI DevDay 2026 發表 dots 與 GPT-6.1 Sol](https://www.inside.com.tw/article/42519-openai-devday-2026-dots-chatgpt-space-gpt-6-1-sol) |
| `aimultiple-always-on-agents` | [AIMultiple：Always-On Agents: Dots vs Grok Bot vs Muse](https://aimultiple.com/always-on-agents) |
| `vktr-meta-muse` | [VKTR：Meta launches Muse](https://www.vktr.com/ai-platforms/meta-launches-muse-a-personal-ai-agent-that-browses-the-web-makes-purchases/) |
| `thetechoutlook-grok-bot` | [The Tech Outlook：xAI introduces Grok Bot](https://www.thetechoutlook.com/new-release/software-apps/xai-introduces-grok-bot-available-in-early-beta-on-desktop-and-ios/) |
| `axios-devday-2026` | [Axios：DevDay 2026 五大發表](https://www.axios.com/2026/09/29/openai-dev-day-2026-dots-space-sol)（只取得導言，正文被擋） |

## 遠見原文與官方說法的差異

引用時以官方為準；下列項目寫進講義前要再核對一次。

| 項目 | 遠見（10-08） | 官方（10-11 擷取） |
| --- | --- | --- |
| Dots 方案 | ChatGPT Pro，US$100／月起 | Pro 與 Business Premium 含第一個 dot；Enterprise（含 Edu、Healthcare）需管理員啟用 Beta。官方頁未寫價格；[BGR](https://www.bgr.com/2272332/openai-devday-2026-announcements/) 報導稱僅 Pro 200 方案可用（未下載），與遠見不一致 |
| Dots 地區 | 台灣非排除地區 | Pro 排除歐洲經濟區、瑞士、英國；Business Premium 所有支援地區。未滿 18 歲不可使用 |
| Muse 地區 | 美國、加拿大 | 官方產品頁與說明頁未見地區說明；媒體多寫「僅美國」。未能以官方來源確認 |
| Muse 價格 | 免費；US$20／US$100 | 官方 FAQ 只寫「免費但有用量上限，可升級付費」，未列金額 |
| Muse 入口 | App、Web、WhatsApp | 行動 App、Mac App、WhatsApp |
| Grok Bot 平台 | macOS、Windows、Linux | FAQ：桌面 macOS 或 Windows，加上 iOS；未提 Linux |
| Grok Bot 方案 | Cursor Pro US$20 | Cursor Pro／Pro+／Ultra、SuperGrok／Plus／Heavy、Cursor Teams、Enterprise；另有每週用量，超出依 token 計費 |

## 與模組 05 的關聯

模組 05 目前講 Notion 上傳與分享，以下是三家官方共同的做法，可對應現有段落：

- **連線不等於授權到底**：三家都把「讀取」和「寫入／傳送／付款」分開核准。對應 05 節「上傳、分享、公開發布是不同動作」。
- **先低權限、再擴大**：遠見的三步驟與 Meta 說明頁「從低風險任務開始」一致，可作為 Skill 授權的延伸說明。
- **斷開連線不會刪除已取得的資訊**：OpenAI 與 Meta 說明頁都明寫。對應 04 節確認 Notion 連接器身分時的提醒。
- **代理看不到密碼、敏感動作要本人接手**：OpenAI 列出變更密碼、轉帳必須由使用者完成；可呼應講義「不把 AI 的已完成當驗收」。
- **醫療照護情境**：OpenAI 將 Healthcare 版列為 Enterprise Beta。講義中仍應維持不用病人、住民、學員個資作示範。

這三款產品發表不到兩個月，方案與地區變動快。寫進講義時註明查閱日期，並連到官方頁面而非媒體轉述。
