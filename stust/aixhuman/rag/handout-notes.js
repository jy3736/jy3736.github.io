// Current handout: hub + three pages, aligned with four slides.
// Earlier five-page source is preserved in demo/archive/handout-five-pages/.
window.RAG_HANDOUT = {
  "zh": {
    "ui": {
      "kicker": "自學講義・檢索增強生成（RAG）",
      "title": "讓 AI 先查資料，再回答",
      "intro": "不需要寫程式，也不需要資訊背景。這份講義用開書考、圖書館找書這些熟悉的情境，帶你弄懂 AI 為什麼要先查資料、怎麼查、怎麼回答，以及拿到答案後怎麼自己核對。",
      "glossaryTitle": "先認識幾個詞",
      "glossaryLead": "讀到不熟的詞時，可以回來這裡查。",
      "contents": "本頁目錄",
      "section": "第 {n} 節",
      "goals": "學完這一節，你能夠",
      "key": "一句話記住",
      "analogy": "生活比喻",
      "figure": "圖解",
      "explain": "說明",
      "example": "看例子",
      "pitfall": "常見誤解",
      "check": "自我檢查",
      "reveal": "看參考答案",
      "tryIt": "動手試試",
      "done": "我已讀完這一節",
      "progress": "已完成 {n} / {total} 節",
      "reset": "清除進度",
      "listen": "本頁語音導讀",
      "hubListen": "講義導讀：三頁講了什麼",
      "pagesTitle": "三頁講義",
      "pagesLead": "三頁對應目前的 4 張投影片。建議依序閱讀；想看完整實例，可直接讀第 3 頁。",
      "page": "第 {n} 頁",
      "pageOf": "第 {n} 頁，共 {total} 頁",
      "slides": "投影片 {s}",
      "openPage": "開始閱讀",
      "back": "← 回講義導覽",
      "hub": "講義導覽",
      "prev": "上一頁",
      "next": "下一頁",
      "slideStrip": "這一頁對應的投影片",
      "playSlide": "播放投影片 {n}",
      "sectionCount": "{n} 節",
      "deckLink": "延伸閱讀：自學講義第 {n} 頁",
      "discussion": "Podcast 深入討論",
      "discussionLead": "兩位主持人把這一頁的觀念聊得更深：講義沒細談的原因、例子和常見誤解。可以讀完再聽，也可以邊做家事邊聽。",
      "scoreQuestion": "問題",
      "scoreHits": "和問題相同的詞",
      "scoreTotal": "相關分數",
      "scorePicked": "選中",
      "scoreSkipped": "沒選中",
      "none": "—",
      "scoreNote": "黃底的 3 段被選中，交給下一步。分數只看字面上相同的詞，所以第 1 名不一定最切題。",
      "reviewTitle": "總複習",
      "reviewLead": "三頁讀完了，先確認自己能說明流程，並核對片段是否支持答案。",
      "keyTitle": "七句話帶走",
      "askTitle": "綜合問答",
      "nextQuestion": "準備好看一次完整的 RAG 了嗎？",
      "nextLink": "開啟模擬展示"
    },
    "pages": [
      {
        "slides": [
          1
        ],
        "tone": "mint",
        "title": "為什麼要先查資料",
        "lead": "直接問 AI 會遇到三個問題；RAG 用「開書考」的方式解決它們。"
      },
      {
        "slides": [
          2,
          3
        ],
        "tone": "sky",
        "title": "GPTs、Gems 與 RAG",
        "lead": "分辨 OpenAI・ChatGPT 的 GPTs 與 Google・Gemini 的 Gems，理解自訂助理的設定，以及工具和 RAG 方法的差別。"
      },
      {
        "slides": [
          4
        ],
        "tone": "rose",
        "title": "一題走完 R → A → G",
        "lead": "跟著「怎麼申請長照服務？可以打 1966 嗎？」，看檢索、加入提示和生成回答每一步實際發生了什麼。"
      }
    ],
    "glossary": [
      [
        "語言模型",
        "ChatGPT、Gemini 這類聊天機器人背後的程式。它讀過大量文字，學會寫出通順的句子。"
      ],
      [
        "資料庫",
        "你指定給 AI 查的一疊文件，例如衛福部網頁、系上的課程時序表。"
      ],
      [
        "片段",
        "把文件剪成的小段文字。每段都有編號，例如 [L1-2] 是第 1 份長照文件的第 2 段。"
      ],
      [
        "檢索",
        "從資料庫裡找出和問題相關的片段，也就是「查資料」。"
      ],
      [
        "提示（prompt）",
        "交給 AI 的完整內容：作答規則、問題和找到的片段。"
      ],
      [
        "引用（出處）",
        "答案句尾的編號。點開就能看到原文，自己核對。"
      ]
    ],
    "sections": [
      {
        "page": 1,
        "title": "AI 也會「說得很順，卻沒有根據」",
        "lead": "聊天機器人回答得很流暢，但它不一定知道最新的規定，也看不到學校或機關的內部文件。",
        "key": "直接問 AI，它是憑「記憶」回答：記憶有截止日，也說不出出處。",
        "analogy": "想像一位讀過很多書、但從某一天起就不再看新聞的朋友。你問他今年的新規定，他還是會很有自信地回答，只是內容可能是舊的，他也說不出是從哪裡看來的。",
        "goals": [
          "說出直接問 AI 時常見的三個問題。",
          "分辨「說得流暢」和「有根據」的不同。"
        ],
        "explain": [
          "ChatGPT、Gemini 這類聊天機器人，背後是<b>語言模型</b>。它讀過大量文字，學會怎麼寫出通順的句子。讀完之後，它「記得」的內容就固定下來了。",
          "所以直接問它，常會遇到三個問題：<b>① 資料可能過時</b>：它讀完之後才公布的規定，它不知道。<b>② 看不到內部文件</b>：學校的課程表、公司的手冊，它從來沒讀過。<b>③ 說不出出處</b>：它給你一段流暢的答案，你卻不知道該去哪裡核對。",
          "第三點最容易被忽略。語言模型擅長的是「把句子接得通順」，不是「確認句子正確」。所以它不知道答案時，常常不會說「我不知道」，而是寫出一段<b>聽起來很合理</b>的內容。"
        ],
        "fig": {
          "type": "rows",
          "caption": "直接問 AI 時發生了什麼事",
          "rows": [
            {
              "label": "直接問 AI",
              "tone": "rose",
              "steps": [
                [
                  "你的問題",
                  "長照 3.0 從哪一年開始？"
                ],
                [
                  "語言模型",
                  "只靠讀過的內容"
                ],
                [
                  "流暢的回答",
                  "可能過時、沒有出處"
                ]
              ]
            },
            {
              "label": "三個問題",
              "tone": "butter",
              "list": true,
              "steps": [
                [
                  "① 資料可能過時",
                  "不知道新規定"
                ],
                [
                  "② 看不到內部文件",
                  "課程表、手冊"
                ],
                [
                  "③ 說不出出處",
                  "無從核對"
                ]
              ]
            }
          ]
        },
        "example": "<b>情境：</b>你問聊天機器人「長照 3.0 從哪一年開始實施？」<br><b>可能的結果：</b>長照 3.0 是行政院在 2025 年 12 月 31 日才核定、2026 年起實施的計畫 [L5]。如果語言模型在這之前就讀完資料，它可能拿舊的長照 2.0 來回答，或自己猜一個年份，而且不會附上出處。",
        "pitfall": "「回答得越流暢、越詳細，就越可信」：流暢只代表句子通順，不代表內容正確。判斷能不能相信，要看<b>有沒有出處</b>，以及<b>出處能不能點開核對</b>。",
        "check": [
          [
            "直接問 AI 時，常見的三個問題是什麼？",
            "資料可能過時、看不到內部文件、說不出出處。"
          ],
          [
            "為什麼 AI 不知道答案時，還是會寫出一段話？",
            "語言模型擅長把句子接得通順，不是確認內容正確，所以常會寫出聽起來合理、其實沒有根據的內容。"
          ]
        ]
      },
      {
        "page": 1,
        "title": "RAG 就像開書考：先翻書，再作答",
        "lead": "RAG 的做法很簡單：回答之前，先到指定的資料裡找相關段落，再根據這些段落寫答案，並附上出處。",
        "key": "RAG＝先查資料（R）、再攤開資料（A）、最後照著寫答案（G），答案要附出處。",
        "analogy": "閉書考只能靠記憶；開書考可以先翻課本，找到相關的那幾頁，攤在桌上，照著寫答案，還能註明「見第 35 頁」。RAG 就是讓 AI 從閉書考改成開書考。",
        "goals": [
          "用「開書考」說明 RAG 在做什麼。",
          "說出 R、A、G 三個步驟各做什麼。",
          "說明為什麼資料更新後，不必重新訓練 AI。"
        ],
        "explain": [
          "RAG 是英文 <b>Retrieval-Augmented Generation</b> 的縮寫，中文叫「檢索增強生成」。名字很長，但三個字母剛好就是三個步驟：",
          "<b>R・檢索（Retrieve）</b>：到指定的資料庫，找出和問題最相關的幾段文字。就像翻課本，找到相關的那幾頁。<br><b>A・加入提示（Augment）</b>：把找到的段落和問題一起交給 AI，並附上作答規則。就像把那幾頁攤在桌上。<br><b>G・生成回答（Generate）</b>：AI 根據這些段落寫答案，標出每句話來自哪一段。就像寫答案時註明頁碼。",
          "這裡的「資料庫」不是什麼神祕的東西，就是<b>一疊你指定的文件</b>：衛福部網頁、系上的課程表、公司手冊都可以。文件更新了，下一次提問就會查到新版本，不需要重新訓練 AI。"
        ],
        "fig": {
          "type": "rows",
          "caption": "閉書考和開書考：同一個問題，兩種答法",
          "rows": [
            {
              "label": "閉書考（直接問 AI）",
              "tone": "rose",
              "steps": [
                "問題",
                [
                  "語言模型",
                  "只靠記憶"
                ],
                [
                  "回答",
                  "沒有出處"
                ]
              ]
            },
            {
              "label": "開書考（RAG）",
              "tone": "mint",
              "steps": [
                "問題",
                [
                  "R・找資料",
                  "翻到相關段落"
                ],
                [
                  "A・攤開資料",
                  "規則＋問題＋段落"
                ],
                [
                  "G・寫答案",
                  "照著段落寫"
                ],
                [
                  "附出處的回答",
                  "例如 [L5]"
                ]
              ]
            }
          ]
        },
        "example": "<b>情境：</b>同樣問「長照 3.0 從哪一年開始實施？」<br><b>RAG 的做法：</b>先在長照資料庫找到衛福部介紹長照 3.0 的段落 [L5]，把這段交給 AI。AI 根據它回答「2026 年起實施」，並在句尾標上出處 [L5]。你點一下這個編號，就能打開衛福部原文核對。",
        "pitfall": "「用了 RAG，答案就一定正確」：如果找到的資料是舊的、不相關或不完整，AI 還是會照著錯的資料回答。RAG 讓答案<b>可以核對</b>，不代表<b>不必核對</b>。",
        "check": [
          [
            "用開書考來比喻，R、A、G 各是哪個動作？",
            "R 是翻書找到相關的頁面，A 是把那幾頁攤在桌上，G 是照著那幾頁寫答案並註明頁碼。"
          ],
          [
            "資料庫裡的文件更新後，需要重新訓練 AI 嗎？",
            "不需要。下一次提問時會重新查資料，自然就會找到新版本。"
          ],
          [
            "RAG 解決了第 1 節的哪個問題最多？",
            "「說不出出處」：RAG 的答案附有出處，讀者可以點開核對。它也能減少過時和看不到內部文件的問題，前提是資料庫本身完整、最新。"
          ]
        ]
      },
      {
        "page": 2,
        "title": "不同平台的自訂助理：GPTs 與 Gems",
        "lead": "GPTs 屬於 OpenAI 的 ChatGPT；Gems 屬於 Google 的 Gemini。兩者都有指示與知識設定，但不是同一個工具。",
        "key": "自訂助理＝指示（怎麼答）＋知識檔案（根據什麼答）；從檔案找段落的那一步，就是 RAG。",
        "analogy": "像請一位新來的助教：你先交代工作規則（「回答學生時要註明出自哪份講義」），再把講義、課程表交給他。學生來問問題，他先翻你給的資料，再照規則回答。",
        "goals": [
          "辨識 GPTs 與 Gems 各自的平台，以及共同的指示與知識設定。",
          "指出自訂助理裡哪一部分在做 RAG。",
          "寫出三句能減少錯誤的指示。"
        ],
        "explain": [
          "<b>GPTs</b> 是 OpenAI・ChatGPT 的自訂助理；<b>Gems</b> 是 Google・Gemini 的自訂助理。投影片用不同配色與介面示意來區分兩者。GPTs 的設定例包括指示、知識檔案與可用工具；Gems 的設定例包括指示，以及本機或 Google Drive 的知識來源。這些是設定例，不是完整或互斥的功能清單；實際功能依帳號、權限與平台設定 [P1] [P2]。",
          "兩者共同的概念是：用<b>指示</b>規定回答方式，用<b>知識檔案</b>提供資料。回答時若檢索檔案，會先找相關片段，再把片段與問題放入提示。這對應 R 和 A，但不能只因為上傳檔案，就認定每個答案都找對證據。",
          "平台的切段、排序與片段選取方式不一定可直接檢查或調整。你可以準備清楚的文件、寫明來源要求，並用實際問題測試。最後仍要點開原文，確認引用真的支持答案。"
        ],
        "fig": {
          "type": "rows",
          "caption": "不同平台的設定例，以及共同的證據流程",
          "rows": [
            {
              "label": "OpenAI・ChatGPT・GPTs",
              "tone": "mint",
              "list": true,
              "steps": [
                [
                  "指示",
                  "角色、範圍與來源要求"
                ],
                [
                  "知識檔案",
                  "上傳參考文件"
                ],
                [
                  "工具設定",
                  "可用功能依帳號與權限"
                ]
              ]
            },
            {
              "label": "Google・Gemini・Gems",
              "tone": "sky",
              "list": true,
              "steps": [
                [
                  "指示",
                  "設定回答方式"
                ],
                [
                  "知識來源",
                  "本機或 Google Drive 檔案"
                ]
              ]
            },
            {
              "label": "共同的證據流程（依平台實作）",
              "tone": "butter",
              "steps": [
                [
                  "R・找段落",
                  "從知識檔案找申請方式"
                ],
                [
                  "A・放進提示",
                  "段落＋問題"
                ],
                [
                  "G・回答",
                  "附上出處"
                ]
              ]
            }
          ]
        },
        "example": "<b>情境：</b>你建一個「長照小幫手」，知識檔案放衛福部的長照申請說明，指示寫三句：<br>① 只根據知識檔案回答，不要用你自己記得的內容。（防止混入過時的印象）<br>② 每一句重要的說法後面，註明出自哪一份文件。（讓你能回頭核對）<br>③ 檔案裡找不到答案時，直接說資料不足，並建議撥打 1966 詢問。（防止硬編答案）<br><b>提問：</b>「怎麼申請長照？可以打 1966 嗎？」助理會先在檔案裡找到申請方式那一段，再照規則回答並附上文件名稱。這和模擬展示查到的是同一份衛福部資料 [L1]。",
        "pitfall": "「上傳了檔案，助理就只會用檔案回答」：助理仍可能混入自己記得的內容，或沒找到正確段落。指示要寫清楚「只根據檔案、附出處、資料不足就說」，回答後也要核對。",
        "check": [
          [
            "GPTs 和 Gems 各屬於哪個平台？共同可設定什麼？",
            "GPTs 屬於 OpenAI 的 ChatGPT；Gems 屬於 Google 的 Gemini。共同概念是設定指示及提供知識檔案，實際功能依平台與權限。"
          ],
          [
            "自訂助理裡，哪一部分在做 RAG 的 R 和 A？",
            "回答時從知識檔案找出相關段落（R），再把段落和問題一起交給語言模型（A）。"
          ],
          [
            "上傳檔案後，為什麼仍要核對來源？",
            "平台可能選到不相關片段，模型也可能誤解或錯引；要回到原文確認內容支持答案。"
          ]
        ]
      },
      {
        "page": 2,
        "title": "助理是工具，RAG 是方法",
        "lead": "GPTs、Gems 是平台上的產品；RAG 是一種做法。產品可能改名、換形式，方法不會跟著消失。",
        "key": "工具會換，方法不變：選工具的同時，也要檢查它有沒有照 RAG 的方法找到證據。",
        "analogy": "計算機是工具，「先列式再計算」是方法。換一台計算機，按鍵位置不同，但列式、計算、驗算的步驟還是一樣。",
        "goals": [
          "分辨「自訂助理」和「RAG」是不同層次的東西。",
          "從用途、資料來源、能控制什麼三方面比較 GPTs、Gems 和 RAG。",
          "說出自己實作 RAG 的好處和代價。"
        ],
        "explain": [
          "常有人問：「GPTs 和 RAG 哪個比較好？」這其實把兩種不同層次的東西放在一起比。<b>GPTs、Gems 是工具</b>：平台上的自訂助理，為某項任務保存一套設定。<b>RAG 是方法</b>：回答前先找資料、把資料放進提示、再根據資料回答。自訂助理可以採用 RAG；是否檢索、怎麼檢索，依實際設定與執行而定。",
          "比較三者可以看三件事。<b>用途</b>：GPTs、Gems 為常做的工作保存設定；RAG 的目的是讓回答有可回頭查證的依據。<b>資料來源</b>：GPTs 用上傳的知識檔案，Gems 可用電腦或雲端硬碟的檔案；RAG 可以搜尋任何已授權的文件或資料庫。<b>能控制什麼</b>：在自訂助理裡，你控制指示和檔案，找段落的方式由平台決定；自己實作 RAG 時，切分、搜尋、挑幾段、怎麼引用都可以自己設定，也能直接檢查有沒有找到正確的片段。",
          "自己實作也有代價：資料的索引、誰能看哪些文件的權限、文件的新舊版本，都要自己維護。沒有哪一種一定比較好，要看你需要多少控制權，又願意花多少力氣維護。"
        ],
        "fig": {
          "type": "rows",
          "caption": "工具和方法：兩個不同的層次",
          "rows": [
            {
              "label": "工具（產品）",
              "tone": "sky",
              "list": true,
              "steps": [
                [
                  "ChatGPT・GPTs",
                  "OpenAI：指示＋上傳的知識檔案＋可加的工具"
                ],
                [
                  "Gemini・Gems",
                  "Google：指示＋本機或 Google 雲端硬碟的檔案"
                ],
                [
                  "找段落的方式",
                  "兩者都由平台決定"
                ]
              ]
            },
            {
              "label": "方法（RAG）",
              "tone": "mint",
              "steps": [
                [
                  "R・檢索",
                  "找相關片段"
                ],
                [
                  "A・加入提示",
                  "規則＋問題＋片段"
                ],
                [
                  "G・生成回答",
                  "附出處"
                ]
              ]
            },
            {
              "label": "自己實作時可調整",
              "tone": "butter",
              "list": true,
              "steps": [
                [
                  "怎麼切分",
                  "片段長短"
                ],
                [
                  "怎麼搜尋",
                  "比字或比意思"
                ],
                [
                  "挑幾段",
                  "例如前 3 段"
                ],
                [
                  "怎麼引用",
                  "編號格式"
                ]
              ]
            }
          ]
        },
        "example": "<b>情境：</b>系上想做一個「選課小幫手」。<br><b>兩種做法：</b>用 GPTs 或 Gems，上傳課程時序表、寫好指示，很快就能用，但找段落的方式看不到。自己實作 RAG，像本頁的模擬展示，把時序表剪成 32 段、用 BM25 計分、取前 3 段，每一步都能檢查。例如問畢業學分時，可以親眼確認它真的找到「總畢業學分數為 128 學分」那一段 [C23]。兩種都是 RAG，差別在你看得到、改得到多少。",
        "pitfall": "「GPTs 和 RAG 是兩種互相競爭的技術」：GPTs、Gems 是產品，RAG 是可以採用的方法。比較時要分清楚平台功能與找資料的方法。",
        "check": [
          [
            "為什麼說「GPTs 和 RAG 哪個好」是把不同層次放在一起比？",
            "GPTs 是平台工具，RAG 是先檢索、加入提示、再生成的方法；工具可以採用這個方法，兩者是不同層次。"
          ],
          [
            "自己實作 RAG，比用自訂助理多了哪些控制權？",
            "可以自己設定怎麼切分、怎麼搜尋、挑幾段、怎麼引用，也能直接檢查每一步有沒有找到正確的片段。"
          ],
          [
            "自己實作 RAG 要多付出什麼？",
            "要自己維護資料的索引、文件的存取權限，以及文件的新舊版本。"
          ]
        ]
      },
      {
        "page": 3,
        "title": "第一步：找資料（R・檢索）",
        "lead": "系統先把文件剪成小段，再替每一段打分數，挑出分數最高的幾段。",
        "key": "剪成小段 → 每段打分數 → 挑前 3 名。分數最高，不一定最切題。",
        "analogy": "像圖書館的索引卡：館員事先把每本書的重點抄在一張張卡片上，註明出自哪本書第幾頁。你來問問題，館員把卡片上的字和你的問題對照，挑出最符合的三張給你。",
        "goals": [
          "說明為什麼文件要先剪成小段。",
          "看懂計分表：哪幾段被選中、為什麼。",
          "舉例說明「分數最高」不等於「最切題」。"
        ],
        "explain": [
          "<b>先剪成小段。</b>一份手冊可能有幾十頁，整份交給 AI 太長，重點也會被淹沒。所以系統事先把每份文件剪成幾百字的小段，稱為<b>片段</b>，每段貼上編號，例如 [L1-2] 代表「第 1 份長照文件的第 2 段」。",
          "<b>再替每段打分數。</b>有人提問時，系統拿問題和每一段比對，算出「相關分數」。本頁用的計分方法叫 BM25，原理可以用兩句話說完：問題裡的詞在這段<b>出現越多次</b>，分數越高；這個詞在整個資料庫<b>越少見</b>，加分越多。例如「1966」只出現在少數幾段，對到它，比對到「服務」這種到處都有的詞更有分量。",
          "<b>最後挑前幾名。</b>依分數排好名次後，本頁取前 3 段交給下一步。挑太少，可能漏掉需要的資料；挑太多，不相關的內容也會混進來。",
          "要特別注意：這種方法只比對<b>字面</b>，看不懂意思。所以分數最高的那段，不一定真的在回答你的問題。"
        ],
        "fig": {
          "type": "rows",
          "caption": "從文件到選中的片段（下表是模擬展示的真實計分）",
          "scores": 0,
          "rows": [
            {
              "label": "事先準備",
              "tone": "sky",
              "steps": [
                [
                  "文件",
                  "網頁、手冊、規定"
                ],
                [
                  "剪成小段",
                  "每段貼上編號"
                ],
                [
                  "整理成索引",
                  "方便快速查找"
                ]
              ]
            },
            {
              "label": "有人提問時",
              "tone": "mint",
              "steps": [
                [
                  "問題",
                  "使用者輸入"
                ],
                [
                  "打分數",
                  "比對相同的詞"
                ],
                [
                  "排名次",
                  "分數高的在前"
                ],
                [
                  "挑前 3 段",
                  "交給下一步"
                ]
              ]
            }
          ]
        },
        "example": "<b>情境：</b>在長照資料庫問「怎麼申請長照服務？可以打 1966 嗎？」<br><b>看上面的計分表：</b>第 1 名是 [L1-6]，但它講的是補助比例和外籍看護工，不是申請方式。真正寫著「撥打長照專線 1966」的申請流程 [L1-2] 排第 2。因為挑了前 3 段，兩段都被選中，最後的回答仍然正確。<b>如果只挑 1 段，申請流程就會被漏掉。</b>",
        "pitfall": "「只要比對相同的字就找得到」：大家的說法常常和文件不一樣。例如問「怎麼叫車帶阿嬤去看醫生？」，文件寫的卻是「交通接送」「就醫」[L3]，字面幾乎對不上。所以實際的系統常再加上<b>語意搜尋</b>：比較意思而不是比較字，用詞不同也找得到。",
        "check": [
          [
            "為什麼要先把文件剪成小段？",
            "整份文件太長，交給 AI 會淹沒重點。剪成小段後，可以只挑相關的幾段，而且每段都保留編號，方便回頭核對。"
          ],
          [
            "[L1-6] 講的是補助，為什麼分數還是第 1？",
            "計分只看字面上有沒有相同的詞、這些詞有多少見，不懂段落真正在講什麼。[L1-6] 的問答裡也提到申請長照服務，分數就被拉高了。"
          ],
          [
            "如果只挑分數最高的 1 段，這題會發生什麼事？",
            "只會選到講補助的 [L1-6]，真正的申請流程 [L1-2] 被漏掉，AI 就沒有資料回答「可以打 1966 嗎」。"
          ]
        ],
        "try": [
          "在模擬展示選「日間照顧中心提供哪些服務？」，看看講交通接送的 [L3-2] 為什麼也擠進前三名。",
          "#simulation"
        ]
      },
      {
        "page": 3,
        "title": "第二步：整理成「作答單」（A・加入提示）",
        "lead": "AI 只看得到你交給它的內容。這一步把作答規則、問題和選中的片段，整理成一份完整的「作答單」。",
        "key": "作答單＝規則＋問題＋附編號的片段。作答單以外的資料，AI 一概看不到。",
        "analogy": "像老師發的開書考考卷：最上面是作答規則（「只能根據附件作答，請註明出處」），中間是題目，後面附上三頁參考資料，每頁都印著頁碼。",
        "goals": [
          "說出作答單（提示）的三個部分。",
          "說明為什麼每段都要保留編號。",
          "判斷沒有找到任何片段時，AI 應該怎麼回答。"
        ],
        "explain": [
          "交給 AI 的完整內容，專業上叫做<b>提示（prompt）</b>。你在聊天框打的那句話，只是提示的一部分；RAG 系統會在你看不到的地方，幫你把提示補完整。",
          "一份 RAG 提示通常有三個部分：<b>① 作答規則</b>：本頁用的是「根據下列片段回答，並標明來源編號。資料不足時，說明缺少依據。」前半句要求 AI 只用附上的資料，後半句要求它找不到依據時要老實說。<b>② 原始問題</b>：使用者問的那句話。<b>③ 選中的片段</b>：上一步挑出的幾段文字，每段前面都保留編號。",
          "編號很重要。AI 回答時引用這些編號，你才能從答案一路追回原始文件。如果整理時把編號拿掉，答案就沒辦法標出處。"
        ],
        "fig": {
          "type": "stack",
          "caption": "一份作答單（提示）的樣子",
          "input": [
            "選中的片段",
            "來自第一步"
          ],
          "parts": [
            [
              "① 作答規則",
              "根據下列片段回答，並標明來源編號。資料不足時，說明缺少依據。"
            ],
            [
              "② 原始問題",
              "怎麼申請長照服務？可以打 1966 嗎？"
            ],
            [
              "③ 片段＋編號",
              "[L1-2] 申請流程：撥打長照專線 1966、聯絡當地長期照顧管理中心、住院期間聯絡出院準備小組，或線上申請……"
            ]
          ],
          "output": [
            "交給語言模型",
            "進入第三步"
          ]
        },
        "example": "<b>情境：</b>延續 1966 的問題，作答單上有什麼？<br><b>內容：</b>① 作答規則；② 問題「怎麼申請長照服務？可以打 1966 嗎？」；③ [L1-6]、[L1-2]、[L1-1] 三段原文，每段前面都有編號。長照資料庫一共有 24 段，AI 只看得到這 3 段，其餘 21 段它完全看不到。",
        "pitfall": "「附的資料越多，AI 答得越好」：不相關的片段會分散 AI 的注意力，甚至讓它引用錯的出處。資料寧可少而準。",
        "check": [
          [
            "作答單（提示）有哪三個部分？",
            "作答規則、原始問題、選中的片段（每段附編號）。"
          ],
          [
            "為什麼每段片段前面都要保留 [L1-2] 這類編號？",
            "AI 回答時才能引用編號，讀者也才能從答案追回原始文件核對。"
          ],
          [
            "如果第一步一段都沒找到，作答單上會剩下什麼？AI 該怎麼回答？",
            "只剩作答規則和問題。依照規則，AI 應該說明資料庫裡沒有足夠依據，而不是自己編答案。"
          ]
        ]
      },
      {
        "page": 3,
        "title": "第三步：照著資料寫答案（G・生成回答）",
        "lead": "AI 讀完作答單，用自己的話整理成答案並標出處；資料裡沒有的，就老實說「資料不足」。",
        "key": "好答案的每一句都找得到出處；找不到出處的部分，要直接說資料不足。",
        "analogy": "像寫報告時的引用：每個重要的說法後面都註明「見某某文件」。參考資料裡沒有的，就寫「目前資料沒有提到」，而不是自己編。",
        "goals": [
          "分辨「有根據的回答」和「資料不足的說明」。",
          "說明為什麼「資料不足」也是好答案。",
          "說出 RAG 的答案仍可能出錯的原因。"
        ],
        "explain": [
          "AI 在這一步做的是<b>整理和改寫</b>：把片段裡的內容用通順的話說出來，並在句子後面標上編號，例如 [L1-2]。",
          "如果選中的片段裡沒有需要的資訊，好的回答會直接說「資料不足」。這不是失敗，而是<b>誠實</b>：它提醒你換個問法、換個資料庫，或直接去查原文。",
          "本頁模擬展示裡的回答，是事先由 AI（Claude）只根據選中的片段寫成、再保存下來的，所以你看到的是一次真實的過程。"
        ],
        "fig": {
          "type": "branch",
          "caption": "有沒有找到根據，決定答案的樣子",
          "start": [
            "作答單",
            "規則＋問題＋片段"
          ],
          "question": "片段裡有答案嗎？",
          "yes": [
            [
              "照著片段回答",
              "用自己的話整理"
            ],
            [
              "標上出處",
              "例如 [L1-2]"
            ],
            [
              "讀者核對",
              "點開原文"
            ]
          ],
          "no": [
            [
              "說明資料不足",
              "不憑印象補答案"
            ],
            [
              "換個問法",
              "再查一次"
            ],
            [
              "換個資料庫",
              "或去查原文"
            ]
          ]
        },
        "example": "<b>情境：</b>在長照資料庫問「長照 3.0 的計畫重點有哪些？」<br><b>結果：</b>原文列了八大面向，但前 3 名的片段只涵蓋第 1、2、7、8 項 [L5-2] [L5-4]，第 3 到第 6 項在沒被選中的 [L5-3]。所以答案只列出四項，並明白寫出「第 3 到第 6 項不在這次選入的片段中，資料不足，請查閱衛福部原文」。這就是有根據、也誠實說出缺口的答案。",
        "pitfall": "「有標出處，內容就一定正確」：AI 可能把片段的意思說錯，或標了一段其實沒有支持這句話的片段。看到出處，仍要點開確認。",
        "check": [
          [
            "片段裡找不到答案時，好的回答應該怎麼做？",
            "說明資料不足，並建議換個問法、換個資料庫或查原文，不要自己編答案。"
          ],
          [
            "長照 3.0 的例子中，為什麼答案只列出四項？",
            "因為只有那四項在選中的片段裡。其他四項所在的片段沒被選中，AI 看不到，所以照實說資料不足。"
          ],
          [
            "舉出兩個 RAG 答案仍可能出錯的原因。",
            "例如：找到的片段過時或不相關；需要的片段沒被選中；AI 誤解了片段；資料庫裡本來就沒有那份文件。"
          ]
        ],
        "try": [
          "在模擬展示選「長照 3.0 的計畫重點有哪些？」，看答案怎麼說明資料不足的部分。",
          "#simulation"
        ]
      }
    ],
    "keys": [
      "直接問 AI，它是憑記憶回答：可能過時、看不到內部文件、說不出出處。",
      "RAG 就像開書考：先查資料（R），再攤開資料（A），最後照著寫答案並附出處（G）。",
      "自訂助理（GPTs、Gems）＝指示＋知識檔案；工具會換，RAG 的方法不變。",
      "找資料時，文件先剪成有編號的小段，再打分數、挑前幾名；分數最高不一定最切題。",
      "交給 AI 的作答單包括規則、問題和片段；作答單以外的資料，AI 看不到。",
      "找不到根據時，說「資料不足」也是好答案。",
      "有出處不等於正確：點開原文、看日期、找例外。"
    ],
    "review": [
      [
        "RAG 和直接問 AI，最大的差別是什麼？",
        "RAG 先從指定的資料庫找出相關片段交給 AI，答案附有可以核對的出處；直接問 AI 則只靠它讀過的內容，通常沒有出處。"
      ],
      [
        "AI 已經拿到片段，答案還是錯了，可能是哪裡出了問題？",
        "片段過時或不相關（資料、找資料的方法）、需要的片段沒被選中、AI 誤解了片段，或讀者沒有核對出處。"
      ],
      [
        "為什麼找不到根據時，說「資料不足」比給出答案更好？",
        "這樣可以避免 AI 編造內容，也提醒讀者換個問法、換個資料庫，或直接查原文。"
      ]
    ]
  },
  "en": {
    "ui": {
      "kicker": "Self-study guide · Retrieval-augmented generation",
      "title": "Let AI look it up before it answers",
      "intro": "This guide takes RAG apart step by step: why it is needed, how retrieval finds passages, how the prompt is assembled, how answers cite sources, and how to use and check RAG in tools such as GPTs and Gems. Every section has a flow figure, a worked example, and self-check questions.",
      "contents": "Contents",
      "parts": [
        [
          "Part 1",
          "The three steps of RAG"
        ],
        [
          "Part 2",
          "Using and checking RAG in tools"
        ]
      ],
      "section": "Section {n}",
      "goals": "After this section you can",
      "figure": "Flow figure",
      "explain": "Explanation",
      "example": "Worked example",
      "pitfall": "Common misconception",
      "check": "Check yourself",
      "reveal": "Show answer",
      "tryIt": "Try it",
      "done": "I have finished this section",
      "progress": "{n} of {total} sections done",
      "reset": "Clear progress",
      "listen": "Narration (Mandarin)",
      "scoreQuestion": "Question",
      "scoreHits": "Matched terms",
      "scoreTotal": "Matches",
      "scorePicked": "Selected",
      "scoreSkipped": "Omitted",
      "none": "—",
      "reviewTitle": "Review",
      "reviewLead": "Check these ideas before moving on to the simulation.",
      "keyTitle": "Key ideas",
      "askTitle": "Final questions",
      "next": "Ready to try it?",
      "nextLink": "Open the simulation"
    },
    "sections": [
      {
        "part": 0,
        "title": "Why do we need RAG?",
        "lead": "What a language model knows is fixed when training ends. RAG lets it look up evidence in a chosen collection before it answers.",
        "goals": [
          "Explain the problems with answers that rely on the model alone.",
          "Describe RAG in one sentence.",
          "Name what each of the R, A, and G steps does."
        ],
        "explain": [
          "A language model is trained on large amounts of text. Once training ends, what it knows is fixed: it does not know rules published afterwards, and it cannot see a school’s or agency’s internal documents. Ask it anyway and it still answers fluently, but readers cannot tell what the answer is <b>based on</b>.",
          "<b>Retrieval-augmented generation (RAG)</b> works differently. Before answering, it finds passages related to the question in a chosen collection (<b>R</b>etrieve), adds them to the model’s prompt along with the question (<b>A</b>ugment), and asks the model to answer from those passages and cite them (<b>G</b>enerate).",
          "The collection can be updated at any time. The next question triggers a fresh retrieval and uses the new content, with no retraining. That makes RAG a good fit for questions whose answers must follow a document: rules, manuals, and institutional guidance."
        ],
        "fig": {
          "type": "rows",
          "caption": "One question, two ways to answer",
          "rows": [
            {
              "label": "Model alone",
              "tone": "rose",
              "steps": [
                "Question",
                "Language model",
                [
                  "Answer",
                  "Unknown basis, may be outdated"
                ]
              ]
            },
            {
              "label": "RAG",
              "tone": "mint",
              "steps": [
                "Question",
                [
                  "R · Retrieve",
                  "Search the collection"
                ],
                [
                  "A · Augment",
                  "Question + passages + instructions"
                ],
                [
                  "G · Generate",
                  "Answer from the passages"
                ],
                [
                  "Cited answer",
                  "Readers can check [L5]"
                ]
              ]
            }
          ]
        },
        "example": "<b>Question:</b> “What years does Long-Term Care Plan 3.0 cover?”<br><b>Walkthrough:</b> A model on its own may not know about a plan that starts in 2026. RAG first finds the ministry’s Plan 3.0 passage [L5] in the care collection, then answers “2026–2035” with the source attached for readers to check.",
        "pitfall": "“With RAG, the answer is always right.” If retrieval returns outdated, irrelevant, or incomplete passages, the model still answers from that faulty evidence. RAG makes answers <b>checkable</b>; it does not make checking unnecessary.",
        "check": [
          [
            "When a model answers on its own, what is hardest for readers to confirm?",
            "The basis of the answer. The model does not say where its information came from, and the content may be frozen at training time."
          ],
          [
            "What do R, A, and G stand for?",
            "R is retrieve (find relevant passages), A is augment (add them to the model’s input), and G is generate (answer from the passages and cite them)."
          ],
          [
            "After documents in the collection are updated, must the model be retrained?",
            "No. The next question retrieves again and finds the updated passages."
          ]
        ],
        "audio": [
          [
            "audio/overview.mp3",
            "RAG overview"
          ]
        ]
      },
      {
        "part": 0,
        "title": "R · Retrieve: find relevant passages",
        "lead": "The retriever splits documents into passages, scores each one, and passes the most relevant few to the next step.",
        "goals": [
          "Explain why documents are split into passages first.",
          "Compare keyword matching with semantic similarity.",
          "Explain what happens when too few or too many passages are selected."
        ],
        "explain": [
          "A manual can run to dozens of pages. Putting all of it in the prompt wastes space and makes it hard for the model to focus. So a RAG system first <b>splits documents into passages</b>, keeps a source ID on each, and builds an <b>index</b> for fast lookup.",
          "At question time, the retriever scores how relevant each passage is. Two approaches are common: <b>keyword matching</b> checks whether words in the question appear in the passage; <b>semantic similarity</b> compares meaning using vectors, so it can find passages that use different words. This page’s simulation uses keyword matching: one point per matched keyword.",
          "Passages are ranked by score and the top few (often called top-k) move on. Too few can miss information the answer needs; too many push irrelevant text into the prompt. If nothing matches, the selection is empty and the answer should say the evidence is insufficient."
        ],
        "fig": {
          "type": "rows",
          "caption": "From documents to selected passages",
          "scores": 0,
          "rows": [
            {
              "label": "Ahead of time",
              "tone": "sky",
              "steps": [
                [
                  "Documents",
                  "Manuals, rules, notices"
                ],
                [
                  "Split into passages",
                  "Each keeps a source ID"
                ],
                [
                  "Build an index",
                  "For fast lookup"
                ]
              ]
            },
            {
              "label": "At question time",
              "tone": "mint",
              "steps": [
                [
                  "Question",
                  "The user’s input"
                ],
                [
                  "Score",
                  "Keywords or meaning"
                ],
                [
                  "Rank",
                  "Highest first"
                ],
                [
                  "Take the top k",
                  "On to the prompt"
                ]
              ]
            }
          ]
        },
        "example": "<b>Question:</b> In the care collection, ask “How do I apply for long-term care? Can I call 1966?” with up to 2 passages.<br><b>Walkthrough:</b> The score table above is the simulation’s actual result. [L1] matches the question’s keywords, while every other passage scores 0. Up to two passages could be selected, but only [L1] scored, so only [L1] goes into the prompt.",
        "pitfall": "“Keyword matching is enough.” People often word things differently from the documents. Ask “How do I get a ride to the hospital?” and the transportation passage [L3], which says “transportation” and “medical visits”, matches nothing. Synonyms or semantic retrieval are needed to find it.",
        "check": [
          [
            "Why split documents into passages first?",
            "Whole documents are too long for the prompt and blur the point. Passages let the system pick only the relevant parts while keeping their source IDs."
          ],
          [
            "What is the main difference between keyword matching and semantic similarity?",
            "Keyword matching needs the same words; semantic similarity compares meaning, so different wording can still match."
          ],
          [
            "What can go wrong if too many passages are selected?",
            "Irrelevant passages enter the prompt, distract the model, and may lead it to cite the wrong source."
          ]
        ],
        "try": [
          "In the simulation, set “Passages to select” to 1 and then to All, and compare the retrieval panel.",
          "#simulation"
        ],
        "audio": [
          [
            "audio/guide0.mp3",
            "R · Retrieve"
          ]
        ]
      },
      {
        "part": 0,
        "title": "A · Augment: assemble the model’s input",
        "lead": "Put the answer instructions, the original question, and the selected passages into one prompt, keeping each passage’s source ID.",
        "goals": [
          "Name the three parts of a RAG prompt.",
          "Explain why source IDs must be kept.",
          "Say what is left in the prompt when nothing is retrieved."
        ],
        "explain": [
          "A language model sees only what is in its prompt. The augment step hands the retrieval results to the model. A RAG prompt usually contains, in order, the <b>answer instructions</b>, the <b>original question</b>, and the <b>selected passages</b>.",
          "The instructions decide how the model answers. This page uses: “Answer using the passages below and cite the sources. If the evidence is insufficient, say so.” The first part limits the model to the supplied evidence; the second asks it to be honest when evidence is missing.",
          "Each passage carries a source ID such as [L1]. When the model cites those IDs, readers can trace the answer back to the original document. Drop the IDs while assembling the prompt and the answer can no longer cite anything."
        ],
        "fig": {
          "type": "stack",
          "caption": "What goes into a RAG prompt",
          "input": [
            "Selected passages",
            "From R · Retrieve"
          ],
          "parts": [
            [
              "① Instructions",
              "Answer from the passages and cite them; say when evidence is missing."
            ],
            [
              "② Original question",
              "How do I apply for long-term care? Can I call 1966?"
            ],
            [
              "③ Passages + source IDs",
              "[L1] Call the 1966 long-term care hotline or apply through your local long-term care management center…"
            ]
          ],
          "output": [
            "Sent to the language model",
            "For G · Generate"
          ]
        },
        "example": "<b>Question:</b> For the 1966 question from the previous section, what does the prompt look like?<br><b>Walkthrough:</b> ① Instructions: “Answer using the passages below and cite the sources. If the evidence is insufficient, say so.” ② Question: “How do I apply for long-term care? Can I call 1966?” ③ Passage: the [L1] summary, prefixed with its ID. The model sees only these three parts, never the unselected passages in the collection.",
        "pitfall": "“More passages make better answers.” Irrelevant passages distract the model and can make it cite the wrong source. Fewer, more precise passages are better.",
        "check": [
          [
            "What three parts does a RAG prompt usually contain?",
            "Answer instructions, the original question, and the selected passages with their source IDs."
          ],
          [
            "Why keep IDs such as [L1] in the prompt?",
            "So the model can cite them and readers can trace the answer back to the original document."
          ],
          [
            "If retrieval finds nothing, what is left in the prompt, and how should the answer respond?",
            "Only the instructions and question. Following the instructions, the answer should say the collection lacks evidence instead of making something up."
          ]
        ],
        "audio": [
          [
            "audio/guide1.mp3",
            "A · Augment"
          ]
        ]
      },
      {
        "part": 0,
        "title": "G · Generate: cite sources, or say the evidence is missing",
        "lead": "The model builds an answer from the passages in its prompt and cites them. Without evidence, it should say so.",
        "goals": [
          "Tell a grounded answer apart from an insufficient-evidence reply.",
          "Use citation IDs to check an answer.",
          "List reasons a RAG answer can still be wrong."
        ],
        "explain": [
          "After reading the prompt, the model restates the passages in its own words and marks each sentence with source IDs. In a good RAG answer, every important claim maps to a passage.",
          "If retrieval found nothing relevant, the model should reply that the collection has insufficient evidence rather than filling the gap from memory. An <b>insufficient-evidence</b> reply is correct behaviour: it tells readers to rephrase, switch collections, or look elsewhere.",
          "Readers can follow a citation, open the original, and confirm that the passage supports the claim and is current. To demonstrate the flow, this page’s simulation uses the passage summaries as the answer; a real RAG system has a language model write the text."
        ],
        "fig": {
          "type": "branch",
          "caption": "Whether evidence was found shapes the answer",
          "start": [
            "Retrieval results",
            "Passages in the prompt"
          ],
          "question": "Any matching passages?",
          "yes": [
            [
              "Answer from them",
              "In the model’s own words"
            ],
            [
              "Cite the sources",
              "e.g. [L1]"
            ],
            [
              "Reader checks",
              "Opens the original"
            ]
          ],
          "no": [
            [
              "Say evidence is missing",
              "No answer from memory"
            ],
            [
              "Rephrase",
              "Try other wording"
            ],
            [
              "Switch collections",
              "Or find other sources"
            ]
          ]
        },
        "example": "<b>Question:</b> In the care collection, ask “Does long-term care subsidize electricity bills?”<br><b>Walkthrough:</b> None of the seven care passages mentions electricity, so every score is 0 and nothing is selected. The prompt holds only the question and instructions, so the answer reports that the collection has insufficient evidence and suggests rephrasing or switching collections. That is the correct answer, not a malfunction.",
        "pitfall": "“A citation means the content is correct.” The model can misstate a passage or cite one that does not support the sentence. Open the source even when a citation is present.",
        "check": [
          [
            "When retrieval is empty, what should a good answer do?",
            "Say the collection lacks evidence and suggest rephrasing or switching collections, without inventing an answer."
          ],
          [
            "How can readers confirm an answer is grounded?",
            "Follow the citation, open the original, and check that the passage supports the claim and is the current version."
          ],
          [
            "Give two reasons a RAG answer can still be wrong.",
            "For example: retrieval returned outdated or irrelevant passages; the model misread a passage; the collection lacks the needed document."
          ]
        ],
        "try": [
          "In the simulation, enter “Does long-term care subsidize electricity bills?” and watch the reply when nothing matches.",
          "#simulation"
        ],
        "audio": [
          [
            "audio/guide2.mp3",
            "G · Generate"
          ]
        ]
      },
      {
        "part": 1,
        "title": "GPTs, Gems, and RAG",
        "lead": "GPTs and Gems are custom assistants inside their apps. RAG is a method an assistant can use to answer.",
        "goals": [
          "Distinguish a custom assistant from the RAG method.",
          "Say which parts you control in a platform assistant and which the platform decides.",
          "Explain how to check results when a product changes form."
        ],
        "explain": [
          "ChatGPT’s <b>GPTs</b> and Gemini’s <b>Gems</b> are custom assistants: you write instructions and add knowledge files, and every chat reuses that setup [P1] [P2]. For example, the instructions can ask for the source document by name, and the knowledge files can hold the ministry’s long-term care application guide.",
          "When the assistant answers, the platform finds relevant passages in the knowledge files and adds them to the prompt; that is the RAG flow. But <b>chunking, search, and ranking are decided by the platform</b>. You control the instructions, the files, and the citation expectations. Only in your own RAG implementation can you tune chunking, search, and how many passages to select, and test whether the right passage is found.",
          "Products change, too. OpenAI is moving GPTs to plugins, with standard retirement scheduled for December 11, 2026 [P3]. Google is converting Gems to skills; for personal accounts age 18 and over, the transition is scheduled for November 17, 2026, with Gems removed December 17 [P4]. After the move, retrieve → augment → cite stays the same, so the same question can test whether the new assistant still finds the right source."
        ],
        "fig": {
          "type": "rows",
          "caption": "Platform assistants versus your own RAG: who controls each step",
          "rows": [
            {
              "label": "GPTs, Gems",
              "tone": "sky",
              "steps": [
                [
                  "You set",
                  "Instructions, knowledge files, citations"
                ],
                [
                  "Platform handles",
                  "Chunking, search, ranking (fixed)"
                ],
                [
                  "Answer",
                  "Cites what the platform found"
                ]
              ]
            },
            {
              "label": "Your own RAG",
              "tone": "mint",
              "steps": [
                [
                  "You set",
                  "Instructions, collection, citation format"
                ],
                [
                  "You also tune",
                  "Chunking, search, ranking, top-k"
                ],
                [
                  "Test",
                  "Is the right passage found?"
                ],
                [
                  "Answer",
                  "Traceable citations"
                ]
              ]
            }
          ]
        },
        "example": "<b>Question:</b> You built a long-term care assistant as a GPT and must move it to a plugin. How do you confirm quality did not drop?<br><b>Walkthrough:</b> Before the move, prepare a few questions with known answers; for example, “Can I call 1966?” should cite the application passage. After the move, ask the same questions and compare whether the right passages are still cited and the answers agree.",
        "pitfall": "“GPTs and RAG are competing tools.” GPTs and Gems are products; RAG is a method. A custom assistant may well be using RAG when it answers.",
        "check": [
          [
            "How are GPTs, Gems, and RAG related?",
            "GPTs and Gems are custom assistants (products); RAG is a retrieve-then-answer method that assistants can use."
          ],
          [
            "In a platform assistant, what does the platform decide?",
            "How passages are chunked, searched, and ranked. You control the instructions, knowledge files, and citation expectations."
          ],
          [
            "After an assistant moves to a plugin or skill, how can you check it?",
            "Run the same prepared questions with known answers and compare whether the right sources are still cited."
          ]
        ],
        "audio": [
          [
            "audio/deck/02.mp3",
            "RAG through GPTs and Gems"
          ],
          [
            "audio/deck/03.mp3",
            "How GPTs, Gems, and RAG compare"
          ],
          [
            "audio/deck/04.mp3",
            "Why the products are changing"
          ]
        ]
      },
      {
        "part": 1,
        "title": "The five W questions of RAG",
        "lead": "A different angle: sum up RAG as what, why, who, when, and where.",
        "goals": [
          "Explain RAG to someone else with the five Ws.",
          "Name each role’s responsibility in the RAG flow.",
          "Decide whether a situation suits RAG."
        ],
        "explain": [
          "The first four sections followed the flow. This one gathers the key points into five questions, answered by the cards below, which also makes RAG easier to explain to classmates or colleagues.",
          "Pay attention to <b>who</b>: RAG quality does not depend on the model alone. <b>Maintainers</b> keep the sources complete and current; the <b>retriever</b> decides which passages are found; the <b>language model</b> writes the answer; <b>readers</b> do the final check. A problem at any link can produce a wrong answer."
        ],
        "fig": {
          "type": "rows",
          "five": true,
          "caption": "Who does what, from question to check",
          "rows": [
            {
              "label": "Answering a question",
              "tone": "butter",
              "steps": [
                [
                  "User",
                  "Asks"
                ],
                [
                  "Retriever",
                  "Selects passages"
                ],
                [
                  "Language model",
                  "Writes the answer"
                ],
                [
                  "Reader",
                  "Checks citations"
                ]
              ]
            },
            {
              "label": "Behind the scenes",
              "tone": "lavender",
              "steps": [
                [
                  "Maintainer",
                  "Updates the sources"
                ],
                [
                  "Collection",
                  "Complete and current"
                ]
              ]
            }
          ]
        },
        "example": "<b>Question:</b> Which of these suit RAG? ① Graduation credits for the Electronic Engineering cohort entering in AY 115 ② A poem about autumn ③ A journal’s AI disclosure rules.<br><b>Walkthrough:</b> ① and ③ must follow a specific, current document, so RAG fits. ② is creative writing and needs no external evidence.",
        "pitfall": "“RAG is just about the model.” If the data is outdated or missing, even the best model cannot answer correctly. Maintaining the collection and checking citations matter as much as choosing a model.",
        "check": [
          [
            "In the RAG flow, who keeps the data current?",
            "The maintainers. They update the source documents so the retriever can find the new content."
          ],
          [
            "What kinds of questions suit RAG?",
            "Questions whose answers depend on specific documents, institutional rules, or the latest version, such as application steps, credit requirements, or disclosure rules."
          ],
          [
            "Why are readers part of RAG?",
            "RAG supplies citations, but readers must open the sources to catch retrieval or generation errors."
          ]
        ],
        "audio": [
          [
            "audio/deck/05.mp3",
            "The five Ws"
          ]
        ]
      },
      {
        "part": 1,
        "title": "Practice: check a RAG answer",
        "lead": "Use the simulation to watch R, A, and G step by step, and check any RAG answer with four questions.",
        "goals": [
          "Use the simulation and switch between its two datasets.",
          "Evaluate a RAG answer with the checklist.",
          "Design test questions that reveal retrieval limits."
        ],
        "explain": [
          "The simulation has two datasets: Taiwan long-term care and the STUST Electronic Engineering Q&A. For the Electronic Engineering dataset, first choose the entering cohort and track. Pick a dataset and question, then press Next step to see each passage’s matched terms and score, which passages enter the prompt, and the final answer.",
          "Try rewording a question: the same meaning in different words can retrieve completely different passages. That shows the limits of keyword matching first-hand and why semantic retrieval is common in practice.",
          "Whenever you receive a RAG answer, walk through the checklist below. Use the answer only if all four checks pass; if any answer is “no”, go back to the original document or rephrase and search again."
        ],
        "fig": {
          "type": "check",
          "caption": "Four checks before using a RAG answer",
          "steps": [
            [
              "① Does the source support it?",
              "Open the cited original"
            ],
            [
              "② Is it the current version?",
              "Look for dates or revisions"
            ],
            [
              "③ Any missing conditions?",
              "Exceptions, eligibility, deadlines"
            ],
            [
              "④ Is missing evidence admitted?",
              "No basis, no answer"
            ]
          ],
          "pass": [
            "Use it",
            "Keep the citations"
          ],
          "fail": "Any “no”: go back to the original, or rephrase and search again"
        },
        "example": "<b>Question:</b> In the Electronic Engineering dataset, choose the cohort entering in AY 115 and the regular track, then ask “What are the required courses in year 1 semester 1?”<br><b>Walkthrough:</b> Retrieval uses “year 1”, “semester 1”, and “required” to select the year 1, semester 1 required-course passage [S115-regular]. Run the checks: ① open the source curriculum table and confirm each course name and credit count; ③ watch the conditions: courses differ by cohort and track, so choose the right ones first, and the table gives the planned semester, so check the course selection system for actual offerings.",
        "pitfall": "“The simulation’s reply is an AI answer.” This page is an offline demo: it scores keywords and assembles the reply from passage summaries, with no language model. It shows the RAG flow, not any product’s real output.",
        "check": [
          [
            "Why can rewording a question change what is retrieved?",
            "The simulation matches keywords, so different wording can match different terms."
          ],
          [
            "What is the first check?",
            "Open the cited original and confirm that the source really supports the claim."
          ],
          [
            "Design a question the care dataset cannot answer. How will the simulation respond?",
            "For example, “Does long-term care subsidize electricity bills?”: nothing matches, so the reply says the collection lacks evidence."
          ]
        ],
        "try": [
          "Open the simulation and try the sample questions in both datasets.",
          "#simulation"
        ],
        "audio": [
          [
            "audio/simulation.mp3",
            "Simulation guide"
          ]
        ]
      }
    ],
    "keys": [
      "RAG retrieves before it answers: R finds passages, A adds them to the prompt, G answers from them with citations.",
      "Documents are split into passages with source IDs; retrieval ranks them by relevance and keeps the top few.",
      "Keyword matching needs the same words; semantic retrieval compares meaning. Either can miss.",
      "Saying the evidence is insufficient is a correct answer.",
      "GPTs and Gems are products; RAG is a method. Products change, the flow and the checks do not.",
      "A citation is not proof: open the source, confirm the version, and look for exceptions."
    ],
    "review": [
      [
        "What is the biggest difference between RAG and asking a model directly?",
        "RAG first retrieves relevant passages from a chosen collection and adds them to the prompt, so the answer has checkable sources; a direct question relies only on what the model learned in training."
      ],
      [
        "Retrieval selected passages, yet the answer is wrong. Which links might have failed?",
        "Outdated or irrelevant passages (collection, retrieval), a misread passage (generation), or a reader who did not check the source."
      ],
      [
        "Why is “insufficient evidence” better than an answer when evidence is missing?",
        "It stops the model from inventing content and prompts the reader to rephrase, switch collections, or look elsewhere."
      ]
    ]
  }
};
