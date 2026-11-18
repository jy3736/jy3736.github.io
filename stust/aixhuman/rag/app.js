// RAG 檢索增強生成 — two pages: the 5 W guide and the interactive R → A → G simulation.
// Plain script, no build step, so the folder also works when index.html is opened straight from disk.
(() => {
'use strict';
const copy = {
  zh: {
    title:'檢索增強生成', language:'English', intro:'先找與問題相關的資料片段，再把片段放進提示，最後根據資料回答。',
    datasets:['台灣長照', 'AI 使用範圍與揭露責任', '電子系課程時序 Q&A'], datasetLabel:'資料庫', speedLabel:'動畫速度', speeds:['慢速','一般','快速'],
    queryLabel:'展示問題', play:'播放', pause:'暫停', step:'下一步', reset:'重設',
    stages:['R · 檢索', 'A · 加入提示', 'G · 生成回答'],
    passageLimit:'選取片段數', allPassages:'全部', rankLimit:'依命中數排序，最多取 {limit} 個片段', rankAll:'依命中數排序，選取所有命中的片段',
    stageStatus:['掃描資料庫的所有片段', '用 BM25 為每個片段計算相關分數', '依分數排序，取前 {limit} 個片段', '將指示、問題和片段組成提示'],
    picked:'已選入提示', skipped:'未選入提示', zero:'沒有命中詞',
    placeholders:['用 BM25 計分並排序。','將檢索片段加到模型的輸入。','根據找到的資料回答並標示來源。'],
    runHeading:'目前進度', checkpoints:['R 掃描','R 計分','R 選取','A 組成提示','G 回答'],
    runDetails:[
      '選擇一個資料庫與展示問題，按播放觀看，或按下一步自己控制節奏。',
      '先掃描目前資料庫的 {count} 個片段。後續的提示與回答會在檢索完成後出現。',
      'BM25 依問題用字在片段中出現的次數與稀有程度計分；亮色標記是問題和片段共同出現的詞。',
      '把分數從高到低排序。綠框標示送進提示的 {count} 個片段，其餘不會被模型看到。',
      '把回答指示、原始問題和 {count} 個片段依序放進提示，保留來源編號。',
      '回答已生成。點選答案中的來源編號，可以跳到參考資料核對原文。'
    ],
    runNoEvidence:['所有片段都沒有命中，這次沒有選到可用的資料。','提示只有問題和回答指示，沒有可引用的片段。','回答會說明資料不足。試著換個問法，或切換資料庫。'],
    ready:'準備好了', complete:'完成', paused:'已暫停', noMatch:'找不到相符片段。', noContext:'提示中只有問題，缺少可引用的資料。',
    noAnswer:'目前的資料庫沒有足夠依據回答。可試著改寫問題，或切換到另一個資料庫。',
    question:'問題', instruction:'根據下列片段回答，並標明來源。資料不足時，說明缺少依據。',
    library:'查看資料庫全部片段', source:'原始來源', keywords:'共同詞', score:'BM25 分數',
    sourceNote:'本頁收錄官方資料的摘要。實際申請或投稿時，請核對原始來源及適用的規定。',
    method:'這是預先跑好的 RAG 展示：在 Claude Code 中把衛福部長照網頁與電子系課程資料切成片段建立資料庫，用 BM25 檢索前 3 個片段組成提示，再由語言模型（Claude）只根據這些片段生成回答。網頁重播當時的完整過程，不接受新的問題。',
    examples:[
      ['怎麼申請長照？可以打 1966 嗎？','日間照顧中心有哪些服務？','長照交通接送可以去哪裡？','長照補助可以補貼電費嗎？','長照2.0和長照3.0有什麼差別？','長照2.0的社區 ABC 裡，什麼是巷弄長照站？','長照3.0 如何協助出院銜接？兩天是什麼意思？'],
      ['研究使用生成式 AI，什麼情況需要揭露？','研究人員要怎麼查核 AI 引用？','行政院所屬機關用 AI 提供服務，要對誰揭露？','能把機密文書交給生成式 AI 撰寫嗎？', "課堂報告用 AI 擬大綱或潤稿，怎麼說明？", "116 年度教學實踐研究計畫用 AI 找候選文獻，怎麼揭露？", "國科會補助案的成果報告可以放 AI 編造的資料嗎？", "臺大學位論文要在哪裡說明 AI 使用？有揭露範例嗎？", "可把含個資的訪談逐字稿交給 AI 嗎？", "投稿期刊時，用 AI 做資料分析要怎麼揭露？", "老師禁止使用 AI，我用完再揭露可以嗎？", "可以請 AI 代寫整份作業，再自己改幾句嗎？", "用 AI 幫忙看程式碼和解釋錯誤訊息，要怎麼揭露？", "用 AI 潤稿課堂報告，哪些段落要說明？", "AI 推薦了一篇文獻，怎麼查核引用和數據？", "小組報告可以把含個資的訪談逐字稿上傳嗎？", "寫畢業論文時，可以把 AI 列為共同作者嗎？"]
    ]
  },
  en: {
    title:'Retrieval-Augmented Generation', language:'繁體中文', intro:'Find relevant passages, add them to the prompt, and answer using the evidence.',
    datasets:['Long-term care in Taiwan', 'AI use and disclosure responsibilities', 'Electronic Engineering curriculum Q&A'], datasetLabel:'Dataset', speedLabel:'Animation speed', speeds:['Slow','Normal','Fast'],
    queryLabel:'Enter a question or choose an example', play:'Play', pause:'Pause', step:'Next step', reset:'Reset',
    stages:['R · Retrieve', 'A · Augment the prompt', 'G · Generate an answer'],
    passageLimit:'Passages to select', allPassages:'All', rankLimit:'Rank by matches and select up to {limit} passages', rankAll:'Rank and select all matching passages',
    stageStatus:['Scan the dataset passages', 'Count keyword matches for each passage', 'Rank by keyword matches', 'Combine the question and passages'],
    picked:'Selected for the prompt', skipped:'Omitted from the prompt', zero:'No matched terms',
    placeholders:['Rank passages by matching keywords.','Add retrieved passages to the model input.','Use the evidence to answer and cite sources.'],
    runHeading:'Simulation progress', checkpoints:['R Scan','R Score','R Select','A Build prompt','G Answer'],
    runDetails:[
      'Choose a dataset and question. Press Play to watch, or Next step to go at your own pace.',
      'The retriever scans {count} passages in this dataset. The prompt and answer panels are waiting for evidence.',
      'Look for the highlighted terms in the retrieval panel. Each matched keyword adds one point to the passage score.',
      'Passages are ranked by score. Green outlines mark the {count} selected for the next step.',
      'The prompt combines the instructions, the original question, and {count} passages with their source IDs.',
      'The sample answer is ready. Follow the citation IDs to check the sources.'
    ],
    runNoEvidence:['Every passage scored zero, so none were selected.','The prompt contains the question and instructions. There are no passages to cite.','The answer reports insufficient evidence. Try rephrasing the question or switching datasets.'],
    ready:'Ready', complete:'Complete', paused:'Paused', noMatch:'No matching passages.', noContext:'The prompt contains the question alone, with no passages to cite.',
    noAnswer:'This dataset has insufficient evidence to answer. Try rephrasing the question or switching datasets.',
    question:'Question', instruction:'Answer using the passages below and cite the sources. If the evidence is insufficient, say so.',
    library:'View all passages in this dataset', source:'Original source', keywords:'Matched terms', score:'Matches',
    sourceNote:'The passages are summaries of official sources. Check the originals and the rules that apply to your application or submission.',
    method:'This offline demo ranks keyword matches, selects passages up to the chosen limit, and assembles a sample answer from their summaries. A RAG system can retrieve by semantic similarity and pass the evidence to a language model to generate an answer.',
    examples:[
      ['How do I apply for long-term care? Can I call 1966?','What does a day care center provide?','Where can long-term care transportation take me?','Does long-term care subsidize electricity bills?','How do Long-Term Care 2.0 and Long-Term Care 3.0 differ?','What is the community ABC network?','How does hospital discharge connect to long-term care?'],
      ['When should researchers disclose generative AI use?','How should researchers verify AI citations?','Who should an Executive Yuan agency notify when it uses AI to provide a service?','Can an agency use generative AI to draft classified documents?', "How do I disclose AI use for an outline or editing in a course report?", "How do I disclose AI-assisted candidate literature searches in the AY 116 Teaching Practice Research Program?", "Can an NSTC grant report include AI-fabricated data?", "Where do I disclose AI in an NTU thesis? Is there a disclosure example?", "Can I upload interview transcripts containing personal data to AI?", "What should I disclose about AI data analysis in a journal submission?", "Can I use AI despite an assignment ban if I disclose it?", "Can AI write my entire assignment if I change a few sentences?", "How do I disclose using AI for code and debugging an error message?", "Which sections should I disclose if AI helped with editing my course report?", "How do I verify citations and check data accuracy when AI suggests a paper?", "Can I upload interview transcripts with personal data for a group report?", "Can I list AI as a co-author on my dissertation?"]
    ]
  }
};
const guide = {
  zh: {
    tabs:['RAG 的 5 個 W', '互動模擬'], navigation:'RAG 頁籤',
    title:'RAG 怎麼把資料變成有依據的回答？',
    summary:'檢索增強生成（RAG）在回答問題時，先從指定的資料庫找片段，再把片段放進語言模型的提示。資料庫可以更新，查詢時會重新檢索。',
    slideDescriptions:[
      '兩種自訂助理都能設定指示與參考資料。下方以檢索文件、組成提示、附來源回答說明 RAG。',
      'GPTs 與 Gems 欄呈現助理設定與參考資料。RAG 欄呈現檢索、加入提示與生成回答。',
      'GPTs 移轉至可結合指示、檔案與工具的外掛。Gems 移轉至可在對話中組合使用的技能。'
    ],
    productHeading:'從 ChatGPT 的 GPTs 和 Gemini 的 Gems 看 RAG',
    products:[
      ['ChatGPT · GPTs','GPT 的「指示」可以要求回答時附上文件名稱；「知識」檔案則提供回答所需的資料，例如衛福部的長照申請說明。','OpenAI 官方說明'],
      ['Gemini · Gems','Gem 也可以設定指示，並在「知識」加入檔案，例如從 Google 雲端硬碟加入長照申請說明，讓回答有可參考的資料。','Google 官方說明']
    ],
    productExample:'在兩個工具中都可以用同一個問題來理解這個流程：「怎麼申請長照？可以打 1966 嗎？」先找申請方式的段落（R），把段落和問題一起提供給模型（A），再根據資料回答並附上出處（G）。',
    productNote:'這三步是本頁的教學模型。實際回答仍要核對引用的文件是否支持答案。',
    flow:['問題','R 檢索','A 加入提示','G 生成回答','附來源的答案'],
    fiveHeading:'用 5 個 W 認識 RAG', stagesHeading:'跟著一個問題走完三個階段',
    example:'範例問題：「怎麼申請長照？可以打 1966 嗎？」',
    labels:['輸入','怎麼做','輸出','例子'], tryLabel:'在模擬中試跑 1966 範例',
    imageDescriptions:[
      '問題與資料片段一起送入模型，產生回答。',
      '從回答的引用回到原始文件核對。',
      '使用者提問、檢索器找資料、模型回答、讀者核對。',
      '問題可查找照顧服務或政策文件，並確認資料時效。',
      '從長照或 AI 規範資料庫檢索並取出相關段落。'
    ],
    five:[
      ['What｜它是什麼？','一種讓語言模型在回答時使用外部資料的方法。模型收到的提示包含問題、相關片段和回答要求。'],
      ['Why｜為什麼用？','讓回答可以附上來源，讀者能回頭查證。若檢索到過期、不相關或不完整的片段，回答仍可能有誤。'],
      ['Who｜誰負責什麼？','使用者提出問題；檢索器選片段；語言模型組織回答。資料維護者更新來源，讀者可以用引用核對內容。'],
      ['When｜什麼時候適合？','當答案需要依據特定文件、機構指引或最新版本時，例如查長照申請方式，或確認某個單位的 AI 揭露要求。'],
      ['Where｜去哪裡找？','從系統指定的知識庫找，例如官方網站的資料摘要、手冊或機構文件。本頁可切換台灣長照與南臺電子系課程兩個資料庫。']
    ],
    stages:[
      ['問題與已建立索引的資料片段。','比對關鍵字或語意相似度，排序後挑出最相關的片段。本模擬依命中詞數排序，按設定選取片段。','相關片段及來源；沒有命中時，片段清單為空。','「申請」和「1966」命中衛福部的申請長照片段 [L1]。'],
      ['原始問題、回答要求、已選片段。','把問題、引用要求和片段組成同一份提示，保留每段的來源編號。','語言模型接下來會收到的提示。','提示包含原始問題、[L1] 的摘要，以及「根據片段回答並附來源」的要求。'],
      ['包含資料片段的提示。','語言模型根據片段組織答案並標示出處；資料不足時，指出缺少依據。本模擬用片段摘要示範這一步。','一份可回頭查證的回答，或資料不足的說明。','「可以撥打 1966 長照專線。」並附上 [L1] 的官方連結。']
    ]
  },
  en: {
    tabs:['5 W of RAG', 'Simulation'], navigation:'RAG views',
    title:'How does RAG turn evidence into an answer?',
    summary:'Retrieval-augmented generation (RAG) looks up passages in a selected collection at question time and adds them to a language model’s prompt. The collection can be updated and searched again for each question.',
    slideDescriptions:[
      'Two custom assistants use instructions and reference files. Below them, the RAG flow finds a passage, assembles the prompt, and produces a cited answer.',
      'The GPTs and Gems columns show assistant settings and reference material. The RAG column shows retrieval, prompt assembly, and answer generation.',
      'GPTs move to plugins that combine instructions, files, and tools. Gems move to skills that can be combined in a chat.'
    ],
    productHeading:'See RAG through ChatGPT’s GPTs and Gemini’s Gems',
    products:[
      ['ChatGPT · GPTs','A GPT’s instructions can ask for the source document by name. Its Knowledge files supply the reference material, such as Taiwan’s Ministry of Health and Welfare guide to applying for long-term care.','OpenAI Help Center'],
      ['Gemini · Gems','A Gem can also follow custom instructions and use files added under Knowledge. For example, it can use a long-term care guide added from Google Drive as reference material.','Gemini Apps Help']
    ],
    productExample:'Use the same question to picture the workflow in either tool: “How do I apply for long-term care? Can I call 1966?” Find the relevant application passage (R), give the passage and question to the model (A), then write an answer grounded in the passage and cite it (G).',
    productNote:'The three steps are this page’s teaching model. Check whether the cited document supports the answer you receive.',
    flow:['Question','R · Retrieve','A · Augment','G · Generate','Cited answer'],
    fiveHeading:'The five W questions', stagesHeading:'Follow one question through all three stages',
    example:'Example question “How do I apply for long-term care? Can I call 1966?”',
    labels:['Input','What happens','Output','Example'], tryLabel:'Try the 1966 example in the simulation',
    imageDescriptions:[
      'The question and a retrieved passage feed into the model, which produces an answer.',
      'A citation connects the answer to a source document for verification.',
      'A user asks, a retriever searches, a model answers, and a reader checks the citation.',
      'A question can require current care information or policy guidance.',
      'The retriever finds a relevant passage in the care or AI policy collection.'
    ],
    five:[
      ['What is RAG?','A way for a language model to use external evidence when answering. Its prompt includes the question, relevant passages, and instructions for the answer.'],
      ['Why use it?','Source citations give readers something to verify. Outdated, irrelevant, or incomplete retrieval can still lead to an incorrect answer.'],
      ['Who does what?','The user asks the question, the retriever selects passages, and the language model writes the answer. Maintainers update the sources, and readers can check the citations.'],
      ['When does it help?','Use it when an answer depends on particular documents, institutional guidance, or the latest version, such as applying for care or checking an organization’s AI disclosure rules.'],
      ['Where does it look?','It searches a configured collection, such as official summaries, manuals, or institutional documents. This demo lets you switch between Taiwan long-term care and the STUST Electronic Engineering curriculum.']
    ],
    stages:[
      ['The question and a collection of indexed passages.','Match keywords or compare meaning, rank the results, and select the most relevant passages. This demo selects passages by keyword hits up to the chosen limit.','Selected passages and source IDs, or an empty list when nothing matches.','“Apply” and “1966” match the Ministry of Health and Welfare application passage [L1].'],
      ['The original question, answer instructions, and selected passages.','Combine these in one prompt and preserve the source ID for each passage.','The prompt that the language model will receive.','The prompt includes the question, the [L1] summary, and instructions to answer from the evidence and cite it.'],
      ['The prompt with the evidence attached.','The language model writes from the evidence and cites its sources. If the evidence is insufficient, the response says so. This demo uses passage summaries to illustrate the step.','A cited answer that can be checked, or a response explaining that evidence is missing.','“Call the 1966 long-term care hotline,” with a link to the official source [L1].']
    ]
  }
};
const comparison = {
  zh: {
    heading:'GPTs、Gems 和 RAG 有什麼差別？',
    intro:'GPTs 和 Gems 是平台上的自訂助理。RAG 是助理回答時可以採用的方法：先找資料，把找到的片段放進提示，再根據片段回答。',
    labels:['用途','資料來源','能控制什麼','換平台時'],
    cards:[
      ['ChatGPT · GPTs','為某項任務保存一套助理設定。','上傳知識檔案，並視設定使用工具。','可寫指示、指定參考檔案及要求引用格式。平台負責挑選資料片段。','OpenAI 提供外掛移轉途徑，原本的公開分享設定和自訂動作不會自動沿用。'],
      ['Gemini · Gems','為常做的工作保存指示，例如審閱教案。','可加入本機檔案或 Google 雲端硬碟檔案。','可設定回答方式與參考資料。平台負責挑選資料片段。','Google 規劃自動轉成技能，支援的知識檔案會一起移轉。'],
      ['RAG · 檢索增強生成','讓回答有可回頭查證的資料依據。','可搜尋文件索引、資料庫或其他已授權的來源。','自行實作時，可設定怎麼切分、搜尋、排序與引用，並測試有沒有找到正確片段。','可在不同工具實作同一流程，仍需維護索引、權限和來源版本。']
    ],
    transitionHeading:'為什麼兩家公司要更換產品形式？',
    date:'官方公告查核日期：2026 年 11 月 14 日',
    transitions:[
      ['OpenAI · GPTs 轉向外掛','OpenAI 把可重複使用的指示、參考檔案和連結的應用程式整合到外掛，讓同一套工作流程可以搭配需要的工具。這是官方說明的移轉方向。','一般退場日訂在 2026 年 12 月 11 日。FedRAMP 與符合資格並獲准延期的工作區為 2027 年 2 月 11 日。個人帳號目前無法建立或發布新的 GPT。','OpenAI 移轉公告'],
      ['Google · Gems 轉向技能','Google 說明，技能可以在目前的對話裡直接使用，也能視任務自動套用，或組合多個技能一起使用。','年滿 18 歲的個人帳號預定在 2026 年 11 月 17 日轉換，12 月 17 日移除 Gems。商業、企業與非營利帳號預定在 2027 年 3 月轉換，教育帳號在 6 月。未滿 18 歲的個人帳號另行安排。','Google 移轉公告']
    ],
    example:'以長照問答為例，自訂助理保存「引用衛福部資料」的指示。RAG 負責找到支持答案的段落，例如一九六六長照專線的申請說明。換成外掛或技能後，仍可用同一題檢查是否找得到正確來源。'
  },
  en: {
    heading:'How GPTs, Gems, and RAG compare',
    intro:'GPTs and Gems are custom assistants inside their respective apps. RAG is a method an assistant can use to answer a question: retrieve relevant material, add it to the prompt, and use it to generate an answer.',
    labels:['Purpose','Sources','What you control','Moving the setup'],
    cards:[
      ['ChatGPT · GPTs','Save an assistant configured for a task.','Upload knowledge files and use tools where configured.','Set instructions, reference files, and citation expectations. The platform selects passages.','OpenAI provides a path to plugins. Custom actions and public sharing settings require separate handling.'],
      ['Gemini · Gems','Save instructions for recurring work, such as reviewing a lesson plan.','Add files from your device or Google Drive.','Set response instructions and reference files. The platform selects passages.','Google plans to convert Gems to skills automatically, with supported knowledge files.'],
      ['RAG · Retrieval-augmented generation','Ground answers in evidence that readers can check.','Search indexed documents, databases, or other authorized sources.','In your own implementation, control chunking, search, ranking, and citations. Test whether it retrieves the right passage.','Use the same method across tools. Maintain the index, permissions, and source versions.']
    ],
    transitionHeading:'Why are the companies changing these products?',
    date:'Official announcements checked November 14, 2026',
    transitions:[
      ['OpenAI · GPTs to plugins','OpenAI describes plugins as a way to package reusable instructions, reference files, and connected apps so a workflow can use the tools it needs.','Standard retirement is scheduled for December 11, 2026. FedRAMP and qualifying workspaces with approved deferrals have a February 11, 2027 date. Personal accounts can no longer create or publish new GPTs.','OpenAI migration FAQ'],
      ['Google · Gems to skills','Google says skills can be used directly in the current chat, applied automatically when relevant, and combined with other skills for more complex work.','For personal accounts age 18 and over, transition is scheduled for November 17, 2026, with Gems removed December 17. Business, enterprise, and nonprofit accounts are scheduled for March 2027 and education accounts for June. Personal accounts under 18 follow a later schedule.','Google transition FAQ']
    ],
    example:'For long-term care questions, the custom assistant saves the instruction to cite the health ministry. RAG finds the passage that supports the answer, such as the application guidance for the 1966 hotline. After a move to a plugin or skill, the same question can test whether the assistant still finds the right source.'
  }
};
const apply = 'https://1966.gov.tw/ltc/cp-6533-70777-207.html';
const care = 'https://1966.gov.tw/LTC/cp-6451-69935-207.html';
const transport = 'https://1966.gov.tw/LTC/cp-6452-69937-207.html';
const sinica = 'https://sub.daais.sinica.edu.tw/grants/download/%E4%B8%AD%E7%A0%94%E9%99%A2%E4%BD%BF%E7%94%A8%E7%94%9F%E6%88%90%E5%BC%8FAI%E4%B9%8B%E5%8F%83%E8%80%83%E6%8C%87%E5%BC%95.pdf';
const nstc = 'https://www.nstc.gov.tw/folksonomy/detail/d62a6734-eaca-4813-b455-3228af0c8efb?l=en';
const government = 'https://www.sme.gov.tw/files/11626/062E1849-CA14-4F44-9F91-FCEC3166BB76';
const datasets = [
  [
    {id:'L1', url:apply,
      zh:['衛福部｜申請長照服務','可以撥打 1966 長照專線，或向所在地的長期照顧管理中心提出申請。後續會安排評估，以確認照顧需要。',['申請','1966','長照專線','評估']],
      en:['MOHW | Applying for long-term care','Call the 1966 long-term care hotline or apply through your local long-term care management center. An assessment will help determine care needs.',['apply','1966','hotline','assessment']]},
    {id:'L2', url:care,
      zh:['衛福部｜照顧服務','日間照顧中心在白天提供生活照顧、餐飲及活動，也可提供家屬指導與諮詢。',['日間照顧','日照中心','白天','餐飲']],
      en:['MOHW | Care services','Day care centers offer daytime personal care, meals, and activities. They may also provide guidance and consultation to families.',['day care','daytime','meals','activities']]},
    {id:'L3', url:transport,
      zh:['衛福部｜交通接送服務','長照交通接送依服務類型，可涵蓋就醫、復健，或往返日照中心等社區服務據點。',['交通接送','就醫','復健','接駁']],
      en:['MOHW | Transportation services','Depending on the service category, transportation may cover medical visits, rehabilitation, or travel to community services such as day care centers.',['transportation','medical visits','rehabilitation','shuttle']]},
    {id:'L4', url:'https://1966.gov.tw/ltc/cp-6572-69919-207.html',
      zh:['衛福部｜長照十年計畫 2.0','長照 2.0 自 2017 年起實施，以社區為基礎，擴充居家、社區與住宿式照顧，並提供家庭支持。它也把預防及延緩失能、出院準備與居家醫療納入照顧體系的銜接。',['長照2.0','2017','延緩失能']],
      en:['MOHW | Long-Term Care Plan 2.0','Launched in 2017, Plan 2.0 expanded community-based care across home, community, and residential settings, along with support for families. It linked services to disability prevention, discharge planning, and home medical care.',['long-term care 2.0','2017','disability prevention']]},
    {id:'L5', url:'https://1966.gov.tw/LTC/cp-6572-85008-207.html',
      zh:['衛福部｜長照十年計畫 3.0','長照 3.0 的計畫期程為 2026 至 2035 年，延續社區照顧並加強醫療與長照銜接。八項重點涵蓋健康促進、醫照整合、復能與出院準備、提升機構服務量能、家庭照顧支持、智慧照顧、安寧善終，以及長照人力的專業發展。',['長照3.0','2035','八項重點','智慧照顧','安寧善終']],
      en:['MOHW | Long-Term Care Plan 3.0','The 2026–2035 plan builds on community care and strengthens coordination with medical services. Its eight priorities cover health promotion, medical and long-term care integration, reablement and discharge planning, facility capacity, support for family caregivers, care technology, end-of-life care, and workforce development.',['long-term care 3.0','2035','eight priorities','care technology','end-of-life care']]},
    {id:'L6', url:'https://1966.gov.tw/Ltc/cp-6459-70023-207.html',
      zh:['衛福部｜社區整體照顧服務體系 ABC','長照 2.0 推動社區整體照顧服務體系。A 是社區整合型服務中心，B 是複合型服務中心，C 是巷弄長照站。三類據點讓照顧資源更接近民眾生活的地方。',['abc','巷弄長照站','社區整體照顧']],
      en:['MOHW | Community care network (ABC)','Plan 2.0 developed a community network of integrated service centers (A), multi-service centers (B), and neighborhood care stations (C) to make services easier to reach.',['abc','neighborhood care station','community care network']]},
    {id:'L7', url:'https://mohw.gov.tw/cp-2704-85726-1.html',
      zh:['衛福部｜出院準備銜接長照','參與計畫的醫院可在住院期間協助評估長照需求、擬定簡易照顧計畫，並媒合服務。衛福部把 2026 年出院後平均兩天內銜接列為目標。個別安排可在住院期間洽出院準備團隊。',['出院銜接','出院準備','出院返家','兩天']],
      en:['MOHW | Connecting patients to long-term care after discharge','Participating hospitals can assess care needs, help set up an initial care plan, and match patients with services during the hospital stay. The ministry set a 2026 target of connecting patients to care within two days on average. Patients can ask the hospital discharge team about their own arrangements.',['hospital discharge','discharge planning','after discharge','two days']]}
  ],
  [
    {id:'A1', url:sinica,
      zh:['中研院指引｜研究揭露與責任','研究中實質使用生成式 AI，或成果含有 AI 產出時，應依學術慣例揭露。研究人員仍對研究行為與成果負責，也應查閱機構、補助單位及投稿對象的規範。',['研究使用','需要揭露','研究揭露','投稿','實質使用']],
      en:['Academia Sinica | Research disclosure and accountability','Disclose substantive generative AI assistance or AI-generated material in research outputs according to academic conventions. Researchers remain responsible for their work and should check institutional, funder, and submission rules.',['researchers disclose','research disclosure','substantive','ai-generated material']]},
    {id:'A2', url:sinica,
      zh:['中研院指引｜人工查核','研究人員應人工核對 AI 生成內容中的資訊、數據與引用來源。',['人工查核','查核','核對','引用','數據']],
      en:['Academia Sinica | Human verification','Researchers should verify facts, data, and citations in AI-generated content.',['verify','verification','citations','fact-check','data accuracy']]},
    {id:'A3', url:nstc,
      zh:['國科會問答｜機關揭露對象','行政院及所屬機關（構）使用生成式 AI 執行業務或提供服務時，應向該業務或服務的相關對象揭露。',['行政院','所屬機關','提供服務','對誰揭露','揭露對象']],
      en:['NSTC FAQ | Agency disclosure audience','When the Executive Yuan or its agencies use generative AI for their work or services, they should disclose that use to the relevant people involved in the work or service.',['executive yuan','notify','agency disclosure','provide a service']]},
    {id:'A4', url:government,
      zh:['行政院指引｜機密文書','行政院及所屬機關（構）的機密文書，由業務承辦人親自撰寫，禁止使用生成式 AI 製作。',['機密文書','撰寫','保密']],
      en:['Executive Yuan | Classified documents','Executive Yuan staff and staff of its agencies must write classified documents themselves. The guidelines prohibit using generative AI to draft those documents.',['classified documents','draft','confidential']]},
    {id:'A5', url:'https://ethics.moe.edu.tw/resource/epaper/html/66/',
      zh:["教育部學倫資源中心｜課堂報告的揭露與查證", "教育部臺灣學術倫理教育資源中心的教學文章建議，先依課程規定確認可用範圍。以課堂報告為例，若課程允許 AI 協助整理大綱或潤稿，可說明用在哪個階段、哪些段落受影響，以及自己如何修訂。逐筆查證 AI 提供的文獻和數據，並對繳交的內容負責。", ["課堂報告", "課程規定", "大綱", "潤稿"]],
      en:["MOE academic ethics resource center | Coursework disclosure", "Check course rules first. If AI assistance with an outline or editing is allowed, describe the stage, affected sections, and your own revisions. Verify suggested sources and data individually and take responsibility for the submitted work. This is teaching guidance from the resource center.", ["course report", "course rules", "outline", "editing"]]},
    {id:'A6', url:'https://www.ouk.edu.tw/FileDownload/Activities/20261109111634235274338.pdf#page=8',
      zh:["教育部｜116 年度教學實踐研究計畫徵件聲明書", "116 年度教學實踐研究計畫徵件聲明書第 7 點要求：若撰寫計畫書時使用 AI 或類似技術輔助，主持人應在計畫書內交代使用目的、方式與範圍，適當引用工具來源，並對內容正確、真實和完整負責。若只用 AI 找候選文獻，也應據實說明用途，逐筆查核原始文獻，再引用實際查閱的來源。", ["教學實踐研究計畫", "徵件聲明書", "候選文獻", "116"]],
      en:["MOE | AY 116 Teaching Practice Research Program application declaration", "Item 7 requires applicants who use AI or similar technology to help write the proposal to state its purpose, manner, and scope in the proposal, appropriately cite the tool, and take responsibility for accuracy, truthfulness, and completeness. For example, describe AI-assisted candidate discovery and cite the original works you actually verify and use.", ["teaching practice research program", "application declaration", "candidate literature", "116"]]},
    {id:'A7', url:'https://law.nstc.gov.tw/LawContent.aspx?id=FL044283',
      zh:["國科會｜學術倫理案件處理及審議要點", "本要點適用於申請或取得國科會獎勵、專題研究計畫或其他補助的研究人員，涵蓋申請資料、研究資料與成果的造假、變造、抄襲等。AI 建議的虛構文獻或數據不可放入計畫書或成果報告。AI 揭露的欄位與格式應再核對當次徵件文件及申請機構規定。", ["國科會", "補助", "造假", "成果報告"]],
      en:["NSTC | Research integrity review rules", "The rules apply to applicants and recipients of NSTC awards and grants. They cover fabrication, falsification, and plagiarism involving applications, research data, and outputs. Verify AI-suggested references and data before including them in proposals or reports. Check the specific call and institution for AI disclosure instructions.", ["nstc", "grant", "fabrication", "grant report"]]},
    {id:'A8', url:'https://ori.ntu.edu.tw/news/download/fileSn/59',
      zh:["臺大｜學位論文與研究報告的 AI 揭露", "臺大研究誠信指引建議在論文、報告、方法、附錄、致謝或期刊指定位置說明 AI 工具名稱、版本、日期、用途、操作方式、介入程度與成果如何納入。實作範例：「我於［日期］使用［工具及版本］協助第三章的文字潤飾。我逐段比對原稿並核對引文，最終內容由我負責。」請依實際用法修改，並核對系所或投稿單位的要求。", ["臺大", "學位論文", "揭露範例", "揭露位置", "版本"]],
      en:["NTU | Disclosure in theses and research reports", "NTU guidance lists the tool, version, date, purpose, method, extent, and how the output was incorporated. Use the location required by the department or publisher, such as methods, an appendix, or acknowledgments. Example: On [date] I used [tool and version] to edit Chapter 3 for clarity. I reviewed all edits, checked the citations, and take responsibility for the final text. Adapt the statement to what you actually did.", ["ntu", "thesis", "disclosure example", "where to disclose", "version"]]},
    {id:'A9', url:'https://ori.ntu.edu.tw/news/download/fileSn/59',
      zh:["臺大｜作者責任、資料保護與審查保密", "臺大指引指出，生成式 AI 不應列為作者或共同作者。使用工具前應評估資料流向，避免將可識別的訪談逐字稿、未公開研究資料或審查稿件任意輸入開放式工具。涉及受保護資料時，依研究倫理審查程序說明必要性、處理流程及保護措施。", ["共同作者", "訪談逐字稿", "個資", "審查稿件"]],
      en:["NTU | Authorship, data protection, and confidential review", "NTU guidance excludes AI from authorship. Assess where data goes before using a tool. Avoid uploading identifiable interviews, unpublished research, or confidential review materials to open tools. Explain necessity, handling, and protections in research ethics submissions when protected data is involved.", ["co-author", "interview transcripts", "personal data", "confidential manuscript"]]},
    {id:'A10', url:'https://oaeri.nycu.edu.tw/userfiles/oaerich/files/20231006111309801.pdf',
      zh:["陽明交大｜學術研究使用生成式 AI 參考指引", "陽明交大指引提醒研究者，在申請研究補助及發表成果前確認所屬機構、補助機關、期刊與研討會的 AI 政策。研究成果納入生成式 AI 內容時應聲明與揭露，研究者對成果負責。投稿前可檢查該刊是否區分文字編修、圖像製作與資料分析。", ["陽明交大", "投稿期刊", "研討會", "研究補助"]],
      en:["NYCU | Generative AI in academic research", "NYCU guidance advises researchers to check the policies of their institution, funder, journal, and conference before applying or publishing. Disclose AI-generated content incorporated in research outputs and retain responsibility for the work. Before submission, check whether the venue treats copyediting, images, and data analysis differently.", ["nycu", "journal submission", "conference", "research funding"]]},
    {id:'A11', url:'https://ntusw.ntu.edu.tw/zh_tw/publicatoions_0/NTUSWR',
      zh:["臺大社工系期刊｜投稿的 AI 揭露示例", "臺大社工系的期刊出版倫理聲明要求，若用 AI 撰寫論文、製作圖像或蒐集分析資料，應在稿件相關章節交代工具名稱與使用方式。以 AI 協助分析為例，說明它做了哪一步、人工如何覆核，以及保留哪些原始資料或分析紀錄。這項要求適用於該刊，其他期刊應查各自規則。", ["投稿期刊", "資料分析", "圖像", "出版倫理"]],
      en:["NTU social work journal | An example of a submission policy", "The journal requires authors who use AI for writing, images, or data collection and analysis to disclose the tool and how it was used in the relevant section. For AI-assisted analysis, explain the step, how you checked it, and what records you retained. Check the policy of your own publication venue.", ["journal submission", "data analysis", "images", "publication ethics"]]},
    {id:'A12', url:'https://www.forex.ntu.edu.tw/wp-content/uploads/2023/10/DFLL-%E4%BD%BF%E7%94%A8%E7%94%9F%E6%88%90%E5%BC%8FAI%E5%8F%83%E8%80%83%E6%8C%87%E5%BC%95-Oct.-13.pdf',
      zh:["臺大外文系｜先確認教師同意，自己完成作業", "臺大外文系的指引由教師決定是否准用生成式 AI。准用時，學生應標明用途、範圍、工具及受影響的段落，並依指定格式引註。作業、報告和論文應由學生親自完成。若這次作業禁止使用 AI，請遵守該次規定；事後揭露無法取得許可。", ["禁止使用", "教師同意", "整份作業", "外文系"]],
      en:["NTU Foreign Languages and Literatures | Permission and student authorship", "The department lets instructors decide whether to permit AI. When permitted, students identify the tool, purpose, scope, and affected passages, and follow the required citation style. Students must complete their own assignments, reports, and theses. Follow an assignment ban even if you would disclose the use.", ["assignment ban", "instructor permission", "entire assignment", "foreign languages department"]]},
    {id:'A13', url:'https://nol.ntu.edu.tw/nol/coursesearch/print_table.php?class=&course_id=310+12100&dpt_code=3100&semester=114-2&ser_no=43034',
      zh:["臺大課程大綱案例｜程式碼與作業中的 AI 使用", "這門課的課綱把概念釐清列為可用情境，並要求學生如實揭露在作業、程式碼或報告中如何使用 AI。實作時，若用 AI 解釋錯誤訊息或提供程式建議，可以記錄它協助的部分，自己理解、執行與測試後，再依課程指定方式揭露。其他課程應查閱各自課綱。", ["程式碼", "除錯", "錯誤訊息", "概念釐清"]],
      en:["NTU course syllabus | AI use in code and assignments", "This course lists concept clarification as an acceptable use and asks students to disclose how they used AI in assignments, code, or reports. For example, record how AI helped interpret an error, then understand and test the code yourself and disclose its use as required by the course. Check your own syllabus.", ["code", "debugging", "error message", "concept clarification"]]}
  ]
];
const SCHOOL = 2;
const SHOWN_DATASETS = [0, SCHOOL];
function schoolPlan() {
  return stustPlans.find(plan => plan.year === Number($('school-year').value) && plan.track === $('school-track').value);
}
function schoolDocuments(plan = schoolPlan(), language = lang) {
  const zh = language === 'zh';
  const title = zh ? plan.year + ' 學年度入學・' + plan.zh : 'Cohort ' + plan.year + ' · ' + plan.en;
  const id = 'S' + plan.year + '-' + plan.track;
  const [total, general, major, elective] = plan.credits;
  const requirements = zh
    ? `畢業共 ${total} 學分，通識必修 ${general}、專業必修合計 ${major}、最低專業選修 ${elective}。` +
      (plan.cross ? '另須完成至少一個跨領域學分學程，或修讀至少兩門外系課程。' : '') +
      (plan.outside === null ? '' : `外系選修最多採計 ${plan.outside} 學分。`) +
      (plan.tocfl ? '華語先修後須達 TOCFL A2 才能進入系所就讀。' : '')
    : `${total} credits to graduate: ${general} required general education, ${major} required professional credits in total, and at least ${elective} professional electives.` +
      (plan.cross ? ' Complete an interdisciplinary credit program or at least two courses outside the department.' : '') +
      (plan.outside === null ? '' : ` Up to ${plan.outside} outside-department elective credits can count.`) +
      (plan.tocfl ? ' TOCFL A2 is required after the preparatory year to enter the department.' : '');
  const docs = [{id, [language]: [title + (zh ? '｜畢業與學分要求' : ' | Graduation credits'), requirements, []], type:'credits', audio: id + '-credits'}];
  for (const semester of plan.semesters) {
    const {grade, term, courses} = semester;
    for (const type of ['required','elective','prep']) {
      const rows = courses.filter(([, category]) => type === 'required' ? category.includes('必修') : type === 'elective' ? category.includes('選修') : category === '華語先修');
      if (!rows.length) continue;
      const period = zh ? `第 ${grade} 學年${term === 1 ? '上' : '下'}學期` : `Year ${grade}, semester ${term}`;
      const label = (zh ? {required:'必修',elective:'選修',prep:'華語先修'} : {required:'Required',elective:'Electives',prep:'Mandarin preparation'})[type];
      const list = rows.map(([name, category, credits]) => credits === null ? name : zh
        ? `${name}（${category}，${credits} 學分）` : `${name} (${credits} credits)`);
      docs.push({id, grade, term, type, audio: id + '-' + grade + term + '-' + type, courseNames:rows.map(row => row[0]),
        [language]: [title + '｜' + period + ' · ' + label, period + ' · ' + label + '：' + list.join(zh ? '、' : '; '), []]});
    }
  }
  docs.push({id:'S-registrar-faq', type:'actual', audio:'S-registrar-faq', [language]: [zh ? '教務處｜開課查詢' : 'Registrar | Course offerings',
    zh ? '課程時序表列的是該入學年度的規劃學期。當期是否開課、開課班級、上課時間與選課名額，請查選課系統公告。個人已修與未修學分，可用選課系統的學習地圖對照自己入學年度的時序表。'
       : 'The curriculum table gives the planned semester. Check the course selection system for actual offerings, sections, times, and seats. Compare your personal Learning Map with the curriculum for your entering cohort.', []]});
  docs.push({id:'S-learning-map', type:'personal', audio:'S-learning-map', [language]: [zh ? '教務處｜個人畢業學分' : 'Registrar | Personal graduation credits',
    zh ? '請登入選課系統，使用學習地圖對照入學年度的課程時序表，確認已修與尚缺學分。'
       : 'Sign in to the course selection system and compare your Learning Map against your entering cohort’s curriculum to check completed and remaining credits.', []]});
  if (!zh) {
    const mandarin = schoolDocuments(plan, 'zh');
    docs.forEach((doc, index) => { doc.spoken = mandarin[index].zh[1]; });
  }
  return docs;
}
// The simulation replays fixed runs from demo-data.js (built by rag/demo/build.py).
const DEMO = window.RAG_DEMO;
const demoCollection = () => DEMO.collections[dataset === SCHOOL ? 'ee' : 'ltc'];
let demoIndex = 0;
function currentDocuments() {
  return demoCollection().passages;
}
function schoolExamples(language = lang) {
  return language === 'zh'
    ? ['畢業需要多少學分？必修與選修各多少？','大一上有哪些必修？','大二下有哪些選修？','實務專題在哪個學期？','怎麼查當期實際開課？']
    : ['How many credits do I need to graduate?', 'What are the required courses in year 1 semester 1?', 'What electives are planned for year 2 semester 2?', 'When is 實務專題 planned?', 'How do I check actual offerings?'];
}
function currentExamples() {
  return demoCollection().runs.map(run => run.question);
}
function updateSchoolTracks() {
  const control = $('school-track');
  const previous = control.value;
  const plans = stustPlans.filter(plan => plan.year === Number($('school-year').value));
  control.replaceChildren(...plans.map(plan => new Option(plan[lang], plan.track)));
  control.value = plans.some(plan => plan.track === previous) ? previous : 'regular';
}
function schoolMatches(query, doc) {
  const gradeMatch = query.match(/(?:大|第)\s*([一二三四0-4])|year\s*([0-4])/i);
  const grade = gradeMatch ? ({一:1,二:2,三:3,四:4}[gradeMatch[1]] ?? Number(gradeMatch[1] ?? gradeMatch[2])) : null;
  const termMatch = query.match(/[上下](?=學期|有哪些|的|必修|選修|課|[？?]|$)|semester\s*([12])/i);
  const term = termMatch ? (termMatch[0] === '上' ? 1 : termMatch[0] === '下' ? 2 : Number(termMatch[1])) : null;
  if (doc.type === 'personal') return /已修|尚缺|還差|學習地圖|learning map|remaining credits/i.test(query)
    ? [lang === 'zh' ? '學習地圖' : 'Learning Map'] : [];
  if (doc.type === 'credits') return query.match(/畢業|學分(?:要求|數)|graduate|graduation/i) && grade === null ? [lang === 'zh' ? '畢業學分' : 'Graduation credits'] : [];
  if (doc.type === 'actual') return query.match(/實際開課|當期開課|選課系統|actual offerings/i) ? [lang === 'zh' ? '實際開課' : 'Actual offerings'] : [];
  if ((grade !== null && doc.grade !== grade) || (term !== null && doc.term !== term)) return [];
  const normalized = query.normalize('NFKC');
  const names = [...new Set(doc.courseNames.map(name => name.replace(/^[◎※＊*]+/, '').normalize('NFKC')))].filter(name => name.length >= 2 && normalized.includes(name));
  if (names.length) return names;
  const topic = query.match(/實務專題|專題實務|電子學|電路學|微積分|實習/);
  if (topic && doc.courseNames.some(name => name.includes(topic[0]))) return [topic[0]];
  if (grade === null) return [];
  if (/選修|electives?/i.test(query) && doc.type !== 'elective') return [];
  if (/必修|required/i.test(query) && doc.type !== 'required') return [];
  return [lang === 'zh' ? '年級與學期' : 'Year and semester'];
}

const $ = id => document.getElementById(id);
const stages = [...document.querySelectorAll('.stage')];
let lang = 'zh', dataset = 0, phase = 0, timer = null, candidates = [], matches = [], question = '';
const RANK = 3, AUGMENT = 4, ANSWER = 5;
const t = () => copy[lang];

const narration = new Audio();
const checkpointVoice = new Audio();

let checkpointTracks = [];
const checkpointCaptions = {
  scan: '先掃描資料庫，找出可以比對的片段。',
  score: '現在比對關鍵字。每命中一個詞，就加一分。',
  select: '分數排好了。綠框是選進提示的片段。',
  prompt: '現在把問題、指示和選到的資料放進提示。',
  'empty-select': '沒有片段命中，這次沒有選到資料。',
  'empty-prompt': '提示只有問題和指示，沒有可引用的片段。'
};

let captionFrame = 0;

function setVoiceCaption(next) {
  cancelAnimationFrame(captionFrame);
  const box = $('voice-caption');
  const text = $('caption-text');
  box.toggleAttribute('data-speaking', Boolean(next));
  const labels = lang === 'zh'
    ? {checkpoint:'正在朗讀｜目前步驟', question:'正在朗讀｜問題', reply:'正在朗讀｜AI 回答', idle:'語音字幕'}
    : {checkpoint:'Now reading · Progress', question:'Now reading · Question', reply:'Now reading · Reply', idle:'Spoken captions'};
  $('caption-label').textContent = labels[next?.kind ?? 'idle'];
  text.replaceChildren();
  text.scrollTop = 0;
  if (!next) return;

  const timings = captionTimings[audioTrack(next.track)] ?? [];
  let position = 0;
  const words = timings.map(([, , start, end]) => {
    const word = element('span', next.text.slice(start, end), 'caption-word');
    text.append(next.text.slice(position, start), word);
    position = end;
    return word;
  });
  text.append(next.text.slice(position));
  let current = -1;

  function highlight() {
    const time = checkpointVoice.currentTime * 1000;
    const index = timings.findIndex(([start, end]) => time >= start && time < end);
    if (index !== current) {
      words[current]?.removeAttribute('data-current');
      current = index;
      const word = words[current];
      if (word) {
        word.dataset.current = '';
        const area = text.getBoundingClientRect();
        const active = word.getBoundingClientRect();
        if (active.bottom > area.bottom) text.scrollTop += active.bottom - area.bottom;
        if (active.top < area.top) text.scrollTop -= area.top - active.top;
      }
    }
    if (!checkpointVoice.paused) captionFrame = requestAnimationFrame(highlight);
  }
  highlight();
}

function stopCheckpointVoice() {
  checkpointTracks = [];
  checkpointVoice.pause();
  setVoiceCaption();
}
function audioTrack(track) {
  return schoolTracks[track] ?? track;
}
function playCheckpointTrack() {
  setVoiceCaption();
  const next = checkpointTracks.shift();
  if (!next) {
    if (phase === ANSWER) finishPlayback();
    return;
  }
  checkpointVoice.src = 'audio/' + audioTrack(next.track) + '.mp3';
  const source = checkpointVoice.src;
  checkpointVoice.play().then(() => {
    if (checkpointVoice.paused || checkpointVoice.src !== source) return;
    setVoiceCaption(next);
    clearAudioError();   // audio works again; drop any notice left by an earlier clip
  }).catch(error => {
    if (error.name === 'AbortError' || checkpointVoice.src !== source) return;
    // Keep the run going: report the clip and move on to the next one.
    console.warn('RAG demo audio unavailable:', next.track, error.name, checkpointVoice.error?.message ?? '');
    showAudioError(error);
    checkpointVoice.pause();   // a failed load can leave the element "playing"; mark it stopped
    playCheckpointTrack();
  });
}
checkpointVoice.addEventListener('ended', playCheckpointTrack);

// Spoken updates name the stage that is running; only the final reply is read in full.
// Clips and captions come from rag/demo/voice.py (audio/demo/, audio/demo/captions.js).
const DEMO_STAGE_TRACKS = ['scan', 'score', 'select', 'prompt'];
function announceCheckpoint() {
  if (!$('checkpoint-voice').checked) {
    if (phase === ANSWER) finishPlayback();
    return;
  }
  const clip = (name, kind) => ({track: 'demo/' + name, text: window.RAG_DEMO_VOICE?.['demo/' + name] ?? '', kind});
  checkpointTracks = phase === ANSWER
    ? [clip('generate', 'checkpoint'), clip('reply-' + (dataset === SCHOOL ? 'ee' : 'ltc') + '-' + demoIndex, 'reply')]
    : [clip(DEMO_STAGE_TRACKS[phase - 1], 'checkpoint')];
  playCheckpointTrack();
}
$('checkpoint-voice').addEventListener('change', event => {
  if (!event.target.checked) stopCheckpointVoice();
});
const speech = {
  zh: {listen:'收聽', stop:'停止朗讀', coverage:'播放時只朗讀目前正在執行的步驟，以及最後 AI 生成的回答；分數、片段和提示只顯示在畫面上。', error:'有一段語音無法載入，展示會繼續進行。請重新整理頁面；若直接開啟檔案，請確認 audio 資料夾與網頁放在一起。', blocked:'瀏覽器擋下了語音自動播放，展示會繼續進行。請在頁面上點一下，再按播放；或在網址列的網站設定裡允許「聲音」。'},
  en: {listen:'Listen', stop:'Stop narration', coverage:'Spoken updates read preset questions before retrieval and the reply at the end. Custom questions stay on screen.', error:'Audio is unavailable. Check that the audio folder is next to the page.', blocked:'The browser blocked audio playback. Click the page, then press play again.'}
};
// NotAllowedError = autoplay policy; anything else (NotSupportedError, network) = the file could not load.
function showAudioError(error) {
  const status = $('narration-status');
  status.textContent = error?.name === 'NotAllowedError' ? speech[lang].blocked : speech[lang].error;
  status.dataset.audioError = '';
}
function clearAudioError() {
  const status = $('narration-status');
  if (!('audioError' in status.dataset)) return;
  status.textContent = '';
  delete status.dataset.audioError;
}
let speaking = null;
let remainingTracks = [];

function stopNarration() {
  narration.pause();
  narration.removeAttribute('src');
  narration.load();
  remainingTracks = [];
  if (speaking) {
    speaking.textContent = speech[lang].listen;
    speaking.setAttribute('aria-pressed', 'false');
  }
  speaking = null;
}
function nextTrack() {
  if (!speaking) return;
  const track = remainingTracks.shift();
  if (!track) {
    stopNarration();
    return;
  }
  const control = speaking;
  narration.src = 'audio/' + track + '.mp3';
  narration.play().then(clearAudioError).catch(error => {
    if (speaking === control && error.name !== 'AbortError') {
      console.warn('RAG narration unavailable:', track, error.name);
      stopNarration();
      showAudioError(error);
    }
  });
}
narration.addEventListener('ended', nextTrack);
function listenButton(button, tracks) {
  button.textContent = speech[lang].listen;
  button.setAttribute('aria-pressed', 'false');
  button.onclick = () => {
    stopCheckpointVoice();
    const wasSpeaking = speaking === button;
    stopNarration();
    $('narration-status').textContent = '';
    if (wasSpeaking) return;
    if (timer !== null) {
      stop();
      $('status').textContent = t().paused;
      renderControls();
    }
    speaking = button;
    button.textContent = speech[lang].stop;
    button.setAttribute('aria-pressed', 'true');
    remainingTracks = [...tracks];
    nextTrack();
  };
}
function appendNarration(container, tracks) {
  const button = element('button', '', 'btn ghost listen');
  button.type = 'button';
  listenButton(button, tracks);
  container.append(button);
}
function stageTracks(index) {
  const threshold = [1, AUGMENT, ANSWER][index];
  const tracks = ['stage' + index];
  if (phase < threshold) return [...tracks, 'waiting' + index];

  const example = currentExamples().indexOf(question);
  if (dataset !== SCHOOL && index < 2 && example >= 0) tracks.push('example' + dataset + example);
  if (index === 0) {
    tracks.push('status' + (Math.min(phase, RANK) - 1));
    const rows = phase >= RANK ? [...candidates].sort((a, b) => b.terms.length - a.terms.length) : candidates;
    for (const row of rows) {
      tracks.push(row.doc.id + '-title');
      if (phase >= 2) {
        tracks.push('score' + row.terms.length);
        if (row.terms.length && lang === 'zh') {
          tracks.push('matchedTerms', ...row.terms.map(term => row.doc.id + '-term' + row.doc.zh[2].indexOf(term)));
        }
      }
      if (phase >= RANK) tracks.push(matches.includes(row) ? 'picked' : 'skipped');
    }
    if (phase >= RANK && !matches.length) tracks.push('noMatch');
  } else {
    if (index === 1) tracks.push('instruction');
    for (const {doc} of matches) tracks.push(doc.id + '-title', doc.id + '-body');
    if (!matches.length) tracks.push(index === 1 ? 'noContext' : 'noAnswer');
  }
  return tracks;
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}
function sourceLink(doc, label) {
  const link = element('a', label);
  link.href = doc.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}
const guideReferences = [
  {id:'P1', url:'https://help.openai.com/en/articles/8554397-creating-and-editing-gpts', zh:'OpenAI｜建立與編輯 GPTs', en:'OpenAI | Creating and editing GPTs'},
  {id:'P2', url:'https://support.google.com/gemini/answer/15146780?hl=en', zh:'Google｜在 Gemini 中使用 Gems', en:'Google | Using Gems in Gemini'},
  {id:'P3', url:'https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq', zh:'OpenAI｜自訂 GPT 退場與移轉問答', en:'OpenAI | Custom GPT retirement and migration FAQ'},
  {id:'P4', url:'https://support.google.com/gemini/answer/18560919?hl=en', zh:'Google｜Gems 轉換為技能', en:'Google | Transition from Gems to skills'}
];
function referenceLink(id, label) {
  const link = element('a', label);
  link.href = '#reference-' + id;
  return link;
}
function renderReferences() {
  const chinese = lang === 'zh';
  $('references-heading').textContent = chinese ? '參考資料' : 'References';
  const license = sourceLink({
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' + (chinese ? 'deed.zh-hant' : '')
  }, 'CC BY-NC-SA 4.0');
  $('copyright').replaceChildren(
    chinese
      ? '© 2026 楊榮林（南臺科技大學電子工程系）。本網站內容採用 '
      : '© 2026 楊榮林 (Department of Electronic Engineering, Southern Taiwan University of Science and Technology). This site is licensed under ',
    license,
    chinese
      ? ' 授權：註明出處即可分享與改作，改作須以相同方式授權，不得用於商業或營利目的；文中提及的第三方商標、軟體畫面與連結內容屬各權利人所有，不在此授權範圍內。'
      : '. You may share and adapt the material for noncommercial purposes with attribution. Adaptations must use the same license. Third-party trademarks, software screenshots, and linked content remain the property of their respective rights holders and are excluded from this license.'
  );
  const schoolReferences = stustPlans.map(plan => ({
    id:'S' + plan.year + '-' + plan.track, url:plan.url,
    zh:plan.year + ' 學年度電子工程系・' + plan.zh + '課程時序表',
    en:'STUST Electronic Engineering · Cohort ' + plan.year + ' · ' + plan.en,
    files:[plan.file, ...(plan.english ? [plan.file.replace('.xlsx','英.xlsx')] : [])]
  }));
  schoolReferences.push(
    {id:'S-registrar-faq', url:'https://academic.stust.edu.tw/tc/node/faq4', zh:'南臺教務處｜修課相關業務', en:'STUST Registrar | Course selection FAQ'},
    {id:'S-learning-map', url:'https://academic.stust.edu.tw/tc/node/faq5', zh:'南臺教務處｜學習地圖與畢業學分', en:'STUST Registrar | Learning Map and graduation credits'},
    ...stustSupportingSources.map((source,index) => ({id:'S-new-' + index, url:source.url, zh:source.title, en:['AY 115 freshman registration','AY 115 course selection guidance','AY 115 first-round course selection'][index], files:[source.file]}))
  );
  const groups = new Map();
  for (const ref of [...guideReferences, ...SHOWN_DATASETS.filter(index => index !== SCHOOL).flatMap(index => datasets[index]), ...schoolReferences]) {
    if (!groups.has(ref.url)) groups.set(ref.url, []);
    groups.get(ref.url).push(ref);
  }
  $('references-list').replaceChildren(...[...groups.values()].map(group => {
    const row = document.createElement('li');
    group.forEach(ref => {
      const target = document.createElement('span');
      target.id = 'reference-' + ref.id;
      row.append(target);
    });
    const label = group.map(ref => {
      const title = Array.isArray(ref[lang]) ? ref[lang][0] : ref[lang];
      return '[' + ref.id + '] ' + title;
    }).join(' · ');
    row.append(sourceLink(group[0], label));
    if (group[0].id === 'S113-intense') {
      row.append(element('span', chinese
        ? '（原表標題為 113 入學，表內日期有出入，查詢依年級與上下學期標示。）'
        : ' (The workbook title says cohort 113, but the internal dates differ. The lookup uses the year-of-study and semester labels.)', 'note'));
    }
    for (const [index, name] of (group[0].files ?? []).entries()) {
      const link = element('a', lang === 'zh' ? (index ? '英文檔' : '本機檔') : (index ? 'English file' : 'Local file'));
      link.href = 'stust-eecs/sources/' + encodeURIComponent(name);
      link.download = name;
      row.append(' · ', link);
    }
    return row;
  }));
}
const passageRef = id => id.replace(/-\d+$/, '');
const refOf = id => currentDocuments().find(p => p.id === id)?.ref ?? passageRef(id);
// Citation IDs in a generated answer link to the source document in the references tab.
function citedText(text) {
  const fragment = document.createDocumentFragment();
  let last = 0;
  for (const match of text.matchAll(/\[([A-Z]+\d+(?:-\d+)?)\]/g)) {
    fragment.append(text.slice(last, match.index), referenceLink(refOf(match[1]), match[0]));
    last = match.index + match[0].length;
  }
  fragment.append(text.slice(last));
  return fragment;
}
function stageStatus(step) {
  return t().stageStatus[step - 1].replace('{limit}', DEMO.topK);
}
function renderRetrieval(output) {
  const strings = t();
  const ranked = phase >= RANK;
  const scored = phase >= 2;
  // Before scoring, show the candidates in collection order; afterwards, by BM25 score.
  const order = new Map(currentDocuments().map((p, i) => [p.id, i]));
  const rows = scored ? candidates : [...candidates].sort((a, b) => order.get(a.doc.id) - order.get(b.doc.id));
  const maxScore = Math.max(...candidates.map(row => row.score), 1);
  output.append(element('p', stageStatus(Math.min(phase, RANK)), 'note'));
  output.append(element('p', strings.question + ' · ' + question));
  if (!scored) output.append(element('p', (lang === 'zh' ? '資料庫共 {n} 個片段，下方列出分數最高的 {k} 個候選。' : '{n} passages in the collection; the top {k} candidates are listed.').replace('{n}', run().scanned).replace('{k}', candidates.length), 'note'));
  const list = document.createElement(scored ? 'ol' : 'ul');
  list.className = 'scan-list';
  rows.forEach(({doc, terms, score}, index) => {
    const selected = ranked && matches.some(match => match.doc === doc);
    const row = element('li', '', selected ? 'scan-row selected' : 'scan-row');
    row.style.setProperty('--scan-delay', index * 115 + 'ms');
    row.append(referenceLink(doc.ref, (scored ? (index + 1) + '. ' : '') + '[' + doc.id + '] ' + doc.title));
    row.append(element('small', doc.locator));
    if (scored) {
      const track = element('div', '', 'score-track');
      track.setAttribute('aria-hidden', 'true');
      const bar = element('span', '', 'score-bar');
      bar.style.width = 100 * score / maxScore + '%';
      track.append(bar);
      const keywords = element('div', terms.length ? strings.keywords + ' ' : strings.zero);
      keywords.append(...terms.map(term => element('mark', term)));
      row.append(element('small', strings.score + ' · ' + score.toFixed(2)), track, keywords);
    }
    if (ranked) row.append(element(selected ? 'strong' : 'small', selected ? strings.picked : strings.skipped));
    list.append(row);
  });
  output.append(list);
}
function stagger(output) {
  // Fit each sequence inside the selected playback interval.
  const interval = Number($('speed').value);
  const spacing = Math.min(420, interval / (output.children.length + 2));
  const duration = Math.min(550, spacing * 2);
  output.style.setProperty('--reveal-duration', duration + 'ms');
  [...output.children].forEach((node, index) => {
    node.style.setProperty('--reveal-delay', index * spacing + 'ms');
    node.style.setProperty('--citation-delay', (index + 1) * spacing + 'ms');
  });
}
function renderProgress() {
  const strings = t();
  $('run-heading').textContent = strings.runHeading;
  const count = phase === 1 ? candidates.length : matches.length;
  const detail = phase >= RANK && !matches.length
    ? strings.runNoEvidence[phase - RANK]
    : strings.runDetails[phase].replace('{count}', String(count));
  $('run-detail').textContent = detail;
  $('run-progress').replaceChildren(...strings.checkpoints.map((label, index) => {
    const checkpoint = index + 1;
    const item = element('li', (checkpoint < phase ? '✓ ' : '') + label);
    if (checkpoint < phase) item.dataset.done = '';
    if (checkpoint === phase) {
      item.setAttribute('aria-current', 'step');
      if (timer !== null) item.dataset.playing = '';
    }
    return item;
  }));
}
function renderControls() {
  $('play').textContent = timer === null ? t().play : t().pause;
  $('step').disabled = phase === ANSWER;
  renderProgress();
  syncRunToggle();
}
// Pause / resume / stop-reading outside the control panel, which folds away while a run plays.
function runToggleState() {
  if (timer !== null) return 'pause';
  if (phase === ANSWER && !checkpointVoice.paused) return 'stop';
  if (phase > 0 && phase < ANSWER) return 'resume';
  return null;
}
function syncRunToggle() {
  const state = runToggleState();
  $('run-toggle').hidden = !state;
  if (state) $('run-toggle').textContent = {pause:'⏸ 暫停', stop:'⏹ 停止朗讀', resume:'▶ 繼續'}[state] + '（空白鍵）';
}
function render() {
  if (speaking && $('pipeline').contains(speaking)) stopNarration();
  const strings = t();
  const outputs = ['retrieval','context','answer'].map($);
  const visibleStage = phase >= ANSWER ? 3 : phase >= AUGMENT ? 2 : phase > 0 ? 1 : 0;
  outputs.forEach((output, index) => {
    output.replaceChildren();
    const stage = index + 1;
    stages[index].dataset.state = visibleStage === stage ? 'active' : visibleStage > stage ? 'done' : 'waiting';
    if (visibleStage < stage) output.append(element('p', strings.placeholders[index], 'note'));
  });
  if (phase >= 1) renderRetrieval(outputs[0]);
  if (phase >= AUGMENT) {
    outputs[1].append(element('p', (lang === 'zh' ? '指示 · ' : 'Instructions · ') + DEMO.instruction, 'note prompt-part'), element('p', strings.question + ' · ' + question, 'prompt-part'));
    for (const {doc} of matches) {
      const packet = element('div', '', 'packet prompt-part');
      packet.append(element('strong', '[' + doc.id + '] ' + doc.title + '（' + doc.locator + '）'), element('p', doc.text));
      outputs[1].append(packet);
    }
    stagger(outputs[1]);
  }
  if (phase >= ANSWER) {
    for (const line of run().answer.split('\n')) {
      const paragraph = element('p', '', 'packet answer-part');
      paragraph.append(citedText(line));
      outputs[2].append(paragraph);
    }
    stagger(outputs[2]);
  }
  renderControls();
}
function stop() {
  stopCheckpointVoice();
  clearTimeout(timer);
  timer = null;
}
function reset() {
  stop();
  setControlsHidden(false);
  phase = 0;
  candidates = [];
  matches = [];
  question = '';
  $('status').textContent = t().ready;
  render();
}
function advance() {
  if (phase === ANSWER) return false;
  if (phase === 0) {
    question = run().question;
    const byId = new Map(currentDocuments().map(p => [p.id, p]));
    candidates = run().candidates.map(c => ({doc: byId.get(c.id), terms: c.terms, score: c.score}));
  }
  phase++;
  if (phase === RANK) matches = candidates.filter(c => run().selected.includes(c.doc.id));
  $('status').textContent = phase === ANSWER ? t().complete : stageStatus(phase);
  return true;
}
const run = () => demoCollection().runs[demoIndex];
// The fixed demo questions have no recorded audio; only the step announcements are spoken.
function presetQuestionAudio() {
  return null;
}
// The control panel folds away while a run plays and opens again when it pauses, resets or ends.
function setControlsHidden(hidden) {
  $('sim-controls').open = !hidden;
}
function finishPlayback() {
  setControlsHidden(false);
  syncRunToggle();
}
function startPlayback() {
  setControlsHidden(true);
  $('narration-status').textContent = '';
  const opening = null;
  if (opening) {
    $('status').textContent = lang === 'zh' ? '正在朗讀問題' : 'Reading the question';
    checkpointTracks = [opening];
    playCheckpointTrack();
    timer = setTimeout(waitForCheckpointVoice, 100);
    renderControls();
  } else {
    playNext();
  }
}
function playNext() {
  stop();
  if (advance()) {
    announceCheckpoint();
    if (phase < ANSWER) timer = setTimeout(waitForCheckpointVoice, Number($('speed').value));
  }
  render();
}
function waitForCheckpointVoice() {
  if (checkpointVoice.paused || checkpointVoice.ended || checkpointVoice.error) playNext();
  else timer = setTimeout(waitForCheckpointVoice, 100);
}
function showDataset() {
  const buttons = currentExamples().map((example, index) => {
    const button = element('button', example, 'btn ghost');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(index === demoIndex));
    button.addEventListener('click', () => {
      demoIndex = index;
      $('query').value = example;
      showDataset();
      reset();
    });
    return button;
  });
  const heading = dataset === SCHOOL ? (lang === 'zh' ? '電子系展示問題（115 學年度入學・一般生）' : 'Electronic Engineering demo questions') : (lang === 'zh' ? '長照展示問題' : 'Long-term care demo questions');
  const section = document.createElement('section');
  const choices = element('div', '', 'examples');
  choices.append(...buttons);
  section.append(element('p', heading, 'label'), choices);
  $('examples').replaceChildren(section);
  $('query').value = run().question;
  $('library').replaceChildren(...currentDocuments().map(doc => {
    const row = document.createElement('li');
    row.append(element('strong', '[' + doc.id + '] ' + doc.title + '（' + doc.locator + '）'), element('p', doc.text), referenceLink(doc.ref, '[' + doc.ref + ']'));
    return row;
  }));
}
// ====================================================================================
// Pages / 頁面（hash routes, same as arkanoid-ml）
// ====================================================================================
const ROUTES = ['slides', 'handout', 'simulation', 'references'];
const ROUTE_ALIASES = {guide: 'handout'};
let route = null;
function pauseSimulation() {
  if (timer === null) return;
  stop();
  setControlsHidden(false);
  $('status').textContent = t().paused;
  renderControls();
}
// Citation links such as #reference-L1 open the references tab and highlight that source.
function showReference(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const row = target.closest('li');
  document.querySelectorAll('#references-list li[data-target]').forEach(item => item.removeAttribute('data-target'));
  row.dataset.target = '';
  row.scrollIntoView({block: 'center'});
}
function applyRoute() {
  let hash = location.hash.slice(1);
  // Previous handout pages 4 and 5 now continue at the worked-example page.
  if (/^handout\/[45]$/.test(hash)) {
    hash = 'handout/3';
    history.replaceState(null, '', '#' + hash);
  }
  const reference = hash.startsWith('reference-') ? hash : null;
  // #handout is the handout hub; #handout/2 is its second page.
  const [base, sub] = hash.split('/');
  const next = reference ? 'references' : ROUTES.includes(base) ? base : ROUTE_ALIASES[base] ?? route ?? 'slides';
  const changed = next !== route;
  let pageChanged = false;
  if (next === 'handout' && !reference) {
    const page = /^\d+$/.test(sub ?? '') && Number(sub) >= 1 && Number(sub) <= handoutPages().length ? Number(sub) : 0;
    pageChanged = page !== handoutPage;
    if (pageChanged) {
      handoutPage = page;
      renderHandout();
    }
  }
  if (changed) {
    stopCheckpointVoice();
    stopNarration();
    if (next !== 'simulation') pauseSimulation();
    if (next !== 'slides' && slidePlayer.open) closeSlides();
    route = next;
    document.body.dataset.route = route;
    document.querySelectorAll('.tab').forEach(tab => tab.dataset.route === route ? tab.setAttribute('aria-current', 'page') : tab.removeAttribute('aria-current'));
    for (const name of ROUTES) $('page-' + name).hidden = route !== name;
    $('slides-tools').hidden = route !== 'slides';
    $('handout-tools').hidden = route !== 'handout';
    document.querySelectorAll('#page-slides audio, #page-handout audio').forEach(audio => { if (!audio.closest('#page-' + route)) audio.pause(); });
  }
  if (reference) showReference(reference);
  else if (changed || pageChanged) window.scrollTo(0, 0);
}
addEventListener('hashchange', applyRoute);
// Clicking the citation that is already in the address bar fires no hashchange.
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#reference-"]');
  if (link && link.getAttribute('href') === location.hash) applyRoute();
});

// ====================================================================================
// Slide deck / 投影片 — same layout and player as arkanoid-ml's 機器學習入門
// ====================================================================================
const deckCopy = {
  zh: {
    nav:['RAG 簡介', '自學講義', '模擬展示', '參考資料'], navigation:'RAG 頁面', toc:'目錄',
    open:'播放投影片', title:'RAG 投影片', prev:'← 上一張', next:'下一張 →', close:'關閉', fullscreen:'全螢幕',
    keys:'← → 換頁 · Esc 離開', count:'第 {n} 張，共 {total} 張', light:'淺色模式', dark:'深色模式',
    audioPlay:'🔊 語音導讀', audioStop:'⏸ 停止語音', audioLabel:'本頁語音導讀', podcastLabel:'Podcast 導讀（沒來上課也聽得懂）',
    coverLead:'先找資料，再把資料放進提示，最後根據資料回答並附上來源。',
    pipe:{question:'問題', questionText:'使用者提出問題', library:'資料庫', retrieve:'R · 檢索', retrieveText:'比對並挑出相關片段',
      augment:'A · 加入提示', augmentText:'問題、指示和片段組成一份提示', generate:'G · 生成回答', generateText:'根據片段回答並標示來源',
      instruction:'指示', passages:'片段', answer:'回答'},
    product:{lead:'兩種自訂助理都保存「指示」和「知識檔案」；回答時，平台用 RAG 從檔案中找段落。',
      settings:[['指示','要求附上文件名稱'],['知識檔案','例如衛福部長照申請說明']], gems:[['指示','設定回答方式'],['知識檔案','本機或 Google 雲端硬碟檔案']],
      shared:'回答「怎麼申請長照？」時的共同流程', steps:['找申請方式的段落','段落＋問題放進提示','回答並附上出處']},
    compareLead:'GPTs 和 Gems 是平台上的自訂助理；RAG 是助理回答時可以採用的方法。',
    timeline:{lead:'官方公告查核日期：2026 年 11 月 14 日。日期以各公司公告為準。', today:'今天',
      months:['2026/11','12','2027/1','2','3','4','5','6'],
      lanes:[['OpenAI · GPTs → 外掛', [[1,'12/11','一般退場'],[3,'2/11','FedRAMP 與獲准延期的工作區']]],
             ['Google · Gems → 技能', [[0,'11/17','18 歲以上個人帳號轉換'],[1,'12/17','移除 Gems'],[4,'3 月','商業、企業、非營利'],[7,'6 月','教育帳號']]]],
      takeaway:'產品形式會換，「找資料 → 放進提示 → 附來源回答」的流程不變。換平台後，用同一題檢查是否仍找得到正確來源。'},
    fiveLead:'用五個問題認識 RAG：它是什麼、為什麼用、誰負責、何時適合、去哪裡找。',
    fiveFigures:[
      ['問題','＋','片段','＋','指示','→','回答'],
      ['回答 [L1]','→','原始文件','→','核對'],
      ['使用者','→','檢索器','→','模型','→','讀者'],
      ['特定文件','機構規範','最新版本'],
      ['官方網站','手冊','機構文件']],
    stagesLead:'範例問題：「怎麼申請長照？可以打 1966 嗎？」',
    worked:{scores:'BM25 分數', picked:'選入', hits:'共同詞', none:'—', instruction:'根據下列片段回答，並標明來源編號。', takeaway:'BM25 依問題用字在片段中出現的次數與稀有程度計分，取前 3 段放進提示。第 1 名 [L1-6] 其實是補助說明，真正的申請流程在第 2 名 [L1-2]：排序高不等於最相關，回答時要判斷片段是否支持說法。'},
    endTitle:'換你看：逐步重播 RAG', endLead:'選一個資料庫與展示問題，逐步觀察檢索、加入提示和生成回答的完整過程。',
    endSteps:[['選資料庫','台灣長照，或電子系課程時序表。'],['選展示問題','每個資料庫有 4 題，按「下一步」看 BM25 計分、選取、提示與回答。'],['回頭核對','點回答中的來源編號，到參考資料核對原文。']],
    endQuestion:'問「日間照顧中心提供哪些服務？」時，為什麼交通接送的片段也排進前三名？', endLink:'開啟模擬展示'
  },
  en: {
    nav:['Intro to RAG', 'Study guide', 'Simulation demo', 'References'], navigation:'RAG pages', toc:'Contents',
    open:'Present slides', title:'RAG slides', prev:'← Previous', next:'Next →', close:'Close', fullscreen:'Full screen',
    keys:'← → navigate · Esc exit', count:'Slide {n} of {total}', light:'Light theme', dark:'Dark theme',
    audioPlay:'🔊 Narration', audioStop:'⏸ Stop narration', audioLabel:'Narration for this slide (Mandarin)', podcastLabel:'Podcast explainer (Mandarin)',
    coverLead:'Retrieve evidence, add it to the prompt, then answer from the evidence and cite it.',
    pipe:{question:'Question', questionText:'A user asks', library:'Collection', retrieve:'R · Retrieve', retrieveText:'Match and select relevant passages',
      augment:'A · Augment', augmentText:'Combine question, instructions, and passages', generate:'G · Generate', generateText:'Answer from the passages and cite them',
      instruction:'Instructions', passages:'Passages', answer:'Answer'},
    product:{lead:'Both custom assistants save instructions and knowledge files. When answering, the platform uses RAG to find passages in those files.',
      settings:[['Instructions','Ask for the document name'],['Knowledge','e.g. the ministry’s care application guide']], gems:[['Instructions','Set the response style'],['Knowledge','Files from your device or Google Drive']],
      shared:'The shared workflow for “How do I apply for long-term care?”', steps:['Find the application passage','Add passage + question to the prompt','Answer and cite the source']},
    compareLead:'GPTs and Gems are custom assistants inside their apps. RAG is a method an assistant can use to answer.',
    timeline:{lead:'Official announcements checked November 14, 2026. The companies’ announcements govern the dates.', today:'Today',
      months:['Nov 2026','Dec','Jan 2027','Feb','Mar','Apr','May','Jun'],
      lanes:[['OpenAI · GPTs → plugins', [[1,'Dec 11','Standard retirement'],[3,'Feb 11','FedRAMP and approved deferrals']]],
             ['Google · Gems → skills', [[0,'Nov 17','Personal accounts 18+'],[1,'Dec 17','Gems removed'],[4,'Mar','Business, enterprise, nonprofit'],[7,'Jun','Education']]]],
      takeaway:'The product form changes; retrieve → augment → cite stays the same. After a move, test the same question to check that the right source is still found.'},
    fiveLead:'Five questions about RAG: what it is, why use it, who does what, when it helps, and where it looks.',
    fiveFigures:[
      ['Question','+','Passages','+','Instructions','→','Answer'],
      ['Answer [L1]','→','Source','→','Check'],
      ['User','→','Retriever','→','Model','→','Reader'],
      ['Specific documents','Institutional rules','Latest version'],
      ['Official sites','Manuals','Institutional files']],
    stagesLead:'Example question “How do I apply for long-term care? Can I call 1966?”',
    worked:{scores:'Matches', picked:'Selected', hits:'Matched', none:'No match', instruction:'Answer using the passages below and cite the sources.'},
    endTitle:'Try it yourself', endLead:'Choose a dataset and a question, then step through retrieval, prompt assembly, and generation.',
    endSteps:[['Pick a dataset','Long-term care or the Electronic Engineering Q&A.'],['Step through','Press “Next step” to see how each passage is scored and selected.'],['Check the source','Follow the citation IDs to the references and read the original.']],
    endQuestion:'If you rephrase the same question, does retrieval return the same passages?', endLink:'Open the simulation'
  }
};
const dt = key => deckCopy[lang][key];
const PANEL_COLORS = ['mint', 'sky', 'butter', 'rose', 'lavender'];
const slidePodcast = index => lang === 'zh' ? window.RAG_SLIDE_PODCASTS?.[index + 1] : null;
const deckAudioSrc = index => slidePodcast(index)?.src ?? 'audio/deck/' + String((window.RAG_VISUAL_SLIDES[index]?.sourceIndex ?? index) + 1).padStart(2, '0') + '.mp3';
// Slide audio is optional: probe each file once (metadata only) and drop its player when the file is missing.
const missingDeckAudio = new Set(), deckAudioProbes = new Map();
function probeDeckAudio(src) {
  if (!deckAudioProbes.has(src)) deckAudioProbes.set(src, new Promise(resolve => {
    const probe = new Audio();
    probe.preload = 'metadata';
    probe.addEventListener('loadedmetadata', () => resolve(true), {once: true});
    probe.addEventListener('error', () => resolve(false), {once: true});
    probe.src = src;
  }).then(ok => {
    if (!ok) {
      missingDeckAudio.add(src);
      document.querySelectorAll('.slide-audio[data-audio-src]').forEach(el => { if (el.dataset.audioSrc === src) el.remove(); });
      syncDeckAudioAvailability();
    }
    return ok;
  }));
  return deckAudioProbes.get(src);
}
// Every slide uses the same framed sheet, so the deck has one consistent size.
const sheet = (name, title, lead, body) => `<section class="info-slide illustrated-slide ${name}" aria-label="${title}"><div class="sheet-face"><div class="info-heading"><h2>${title}</h2><p>${lead}</p></div>${body}</div></section>`;
const esc = text => String(text).replace(/[&<>"]/g, ch => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'})[ch]);
const arrow = '<span class="rag-arrow" aria-hidden="true">→</span>';
// The first long-term care demo run (BM25 scores, selected passages, generated answer) from demo-data.js.
function workedExample() {
  const collection = window.RAG_DEMO.collections.ltc, run = collection.runs[0];
  const byId = new Map(collection.passages.map(p => [p.id, p]));
  return {run, rows: run.candidates.map(c => ({doc: byId.get(c.id), terms: c.terms, score: c.score, picked: run.selected.includes(c.id)}))};
}
function buildTextSlides() {
  const g = guide[lang], c = comparison[lang], p = dt('pipe');
  const cover = `<div class="rag-pipe">
      <article class="rag-node"><h3>${p.question}</h3><p class="rag-bubble">${esc(copy[lang].examples[0][0])}</p><p>${p.questionText}</p></article>${arrow}
      <article class="rag-node mint"><h3>${p.retrieve}</h3><ul class="rag-docs" aria-label="${p.library}">${datasets[0].slice(0, 5).map((doc, i) => `<li${i === 0 ? ' class="hit"' : ''}>[${doc.id}]</li>`).join('')}</ul><p>${p.retrieveText}</p></article>${arrow}
      <article class="rag-node sky"><h3>${p.augment}</h3><div class="rag-prompt"><span>${p.instruction}</span><span>${p.question}</span><span class="hit">${p.passages} [L1]</span></div><p>${p.augmentText}</p></article>${arrow}
      <article class="rag-node butter"><h3>${p.generate}</h3><div class="rag-answer"><i></i><i></i><i class="short"></i><b>[L1]</b></div><p>${p.generateText}</p></article>
    </div><p class="info-takeaway">${g.summary}</p>`;
  const pr = dt('product');
  const assistant = (name, rows, color) => `<article class="info-panel ${color} rag-assistant"><h3>${name}</h3><dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></article>`;
  const product = `<div class="info-two">${assistant('ChatGPT · GPTs', pr.settings, 'mint')}${assistant('Gemini · Gems', pr.gems, 'sky')}</div>
    <div class="rag-merge" aria-hidden="true"><span></span></div>
    <div class="rag-shared"><p class="rag-shared-title">${pr.shared}</p><ol>${pr.steps.map((step, i) => `<li><b>${'RAG'[i]}</b>${step}</li>`).join('')}</ol></div>`;
  const table = `<div class="rag-table-wrap"><table class="rag-table"><thead><tr><th scope="col"></th>${c.cards.map(([name], i) => `<th scope="col" class="${PANEL_COLORS[i]}">${name}</th>`).join('')}</tr></thead>
    <tbody>${c.labels.map((label, row) => `<tr><th scope="row">${label}</th>${c.cards.map(card => `<td>${card[row + 1]}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const tl = dt('timeline');
  const timeline = `<div class="rag-timeline" style="--months:${tl.months.length}">
      <div class="rag-months" aria-hidden="true">${tl.months.map(m => `<span>${m}</span>`).join('')}</div>
      ${tl.lanes.map(([name, events], lane) => `<div class="rag-lane ${PANEL_COLORS[lane]}"><p class="rag-lane-name">${name}</p><ol>${events.map(([month, date, text]) =>
        `<li style="--col:${month + 1}"><b>${date}</b><span>${text}</span></li>`).join('')}</ol></div>`).join('')}
      <span class="rag-today"><b>${tl.today}</b></span>
    </div><p class="info-takeaway">${tl.takeaway}</p>`;
  const figures = dt('fiveFigures');
  const five = `<div class="rag-five">${g.five.map(([heading, body], i) => `<article class="info-panel ${PANEL_COLORS[i]}"><h3>${heading}</h3>
      <p class="rag-chips${i >= 3 ? ' list' : ''}" aria-hidden="true">${figures[i].map(part => ['→', '＋', '+'].includes(part) ? `<b>${part}</b>` : `<span>${part}</span>`).join('')}</p><p>${body}</p></article>`).join('')}</div>`;
  const w = dt('worked'), {run: demoRun, rows: ranked} = workedExample();
  const short = text => esc(text.replace(/\s+/g, ' ').slice(0, 46)) + '…';
  const worked = `<div class="rag-pipe rag-worked">
      <article class="rag-node mint"><h3>${t().stages[0]}</h3><ol class="rag-scores">${ranked.slice(0, 5).map(({doc, terms, score, picked}) =>
        `<li class="${picked ? 'hit' : ''}"><span>[${doc.id}] ${doc.title.split(/[｜|]/).pop().trim()}</span><b>${score.toFixed(2)}</b><small>${w.hits}：${terms.join('、') || w.none}</small></li>`).join('')}</ol></article>${arrow}
      <article class="rag-node sky"><h3>${t().stages[1]}</h3><div class="rag-prompt text"><span>${esc(window.RAG_DEMO.instruction)}</span><span>${t().question}：${esc(demoRun.question)}</span>${ranked.filter(row => row.picked).map(({doc}) => `<span class="hit">[${doc.id}] ${short(doc.text)}</span>`).join('')}</div></article>${arrow}
      <article class="rag-node butter"><h3>${t().stages[2]}</h3><p class="rag-reply">${esc(demoRun.answer.split('\n')[0]).replace(/\[([A-Z]+\d+(?:-\d+)?)\]/g, '<b>[$1]</b>')}</p></article>
    </div><p class="info-takeaway">${w.takeaway}</p>`;
  return [
    sheet('rag-cover', g.title, dt('coverLead'), cover),
    sheet('rag-product', g.productHeading, pr.lead, product),
    sheet('rag-compare', c.heading, dt('compareLead'), table),
    sheet('rag-transition', c.transitionHeading, tl.lead, timeline),
    sheet('rag-five-w', g.fiveHeading, dt('fiveLead'), five),
    sheet('rag-stages', g.stagesHeading, dt('stagesLead'), worked),
    sheet('rag-try', dt('endTitle'), dt('endLead'), `<ol class="info-three info-exercises">${dt('endSteps').map(([title, text], i) =>
      `<li class="info-panel ${PANEL_COLORS[i]}"><h3>${title}</h3><p>${text}</p>${i === 1 ? `<a class="info-link" href="#simulation">${dt('endLink')}<span aria-hidden="true"> →</span></a>` : ''}</li>`).join('')}</ol><p class="info-question">${dt('endQuestion')}</p>`)
  ];
}
// The text supplement under a slide (window.RAG_SLIDE_NOTES in slide-deck.js): key point, a walk through
// the slide's regions in reading order, an analogy, a common misconception and one self-check question.
function slideNotes(n) {
  const note = window.RAG_SLIDE_NOTES?.[n];
  if (!note) return '';
  return `<details class="visual-slide-notes"><summary>自學重點與檢查</summary>
    <p class="slide-note-key"><b>一句話記住</b>${cite(note.key)}</p>
    <h3>照著圖看</h3>
    <ol class="slide-note-walk">${note.walk.map(([where, text]) => `<li><b>${where}</b><p>${cite(text)}</p></li>`).join('')}</ol>
    <div class="slide-note-pair"><p><b>生活比喻</b>${note.analogy}</p><p><b>常見誤解</b>${cite(note.pitfall)}</p></div>
    <details class="slide-note-check"><summary><b>自我檢查</b>${cite(note.check[0])}</summary><p>${cite(note.check[1])}</p></details>
  </details>`;
}
function buildSlides() {
  const originals = buildTextSlides();
  if (lang !== 'zh') return window.RAG_VISUAL_SLIDES.map(item => originals[item.sourceIndex]);
  // Diagram-led slides use concise captions; versioned assets preserve earlier designs.
  return window.RAG_VISUAL_SLIDES.map((item, index) => `<section class="info-slide illustrated-slide visual-slide" aria-label="${esc(item.title)}">
    <h2 class="sr-only">${esc(item.title)}</h2>
    <img class="slide-illustration" src="slide-images/${item.imageDirectory || 'concise'}/${item.image || String(index + 1).padStart(2, '0') + '-zh.png'}" alt="${esc(item.title)}。${esc(item.description)}" width="1672" height="941" decoding="async">
    ${item.sourceIndex === 6 ? `<a class="visual-slide-action" href="#simulation">${dt('endLink')} →</a>` : ''}
    ${slideNotes(index + 1) || `<details class="visual-slide-notes"><summary>文字解說與補充</summary><p>${esc(item.description)}</p>${originals[item.sourceIndex]}</details>`}
  </section>`);
}
function renderDeck() {
  // Each slide is followed by its narration, like the ML Intro page in arkanoid-ml.
  const template = document.createElement('template');
  template.innerHTML = buildSlides().join('');
  [...template.content.children].forEach((slide, index) => {
    if (index === 0) slide.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    else slide.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; });
    const title = slide.getAttribute('aria-label');
    const number = document.createElement('div');
    number.className = window.RAG_VISUAL_SLIDES[index]?.imageHasNumber ? 'slide-page-number sr-only' : 'slide-page-number';
    number.textContent = `${index + 1} / ${template.content.children.length}`;
    number.setAttribute('aria-label', `第 ${index + 1} 張，共 ${template.content.children.length} 張`);
    const image = slide.querySelector(':scope > .slide-illustration');
    if (image) image.after(number);
    else slide.append(number);
    const narration = document.createElement('div');
    narration.className = 'slide-audio';
    narration.dataset.audioSrc = deckAudioSrc(index);
    probeDeckAudio(narration.dataset.audioSrc);
    const ep = slidePodcast(index);
    if (ep) {
      // Two-host podcast explainer (demo/slide_podcast.py): audio player only.
      narration.classList.add('slide-podcast');
      narration.innerHTML = `<div class="slide-podcast-head"><span aria-hidden="true">🎙️</span><div><p>${dt('podcastLabel')} · ${Object.values(ep.hosts).join('、')} · ${ep.duration}</p><b>${esc(ep.title)}</b></div></div>
        <audio controls preload="none" src="${ep.src}" aria-label="${dt('podcastLabel')}：${esc(ep.title)}（${ep.duration}）"></audio>`;
    } else narration.innerHTML = `<span aria-hidden="true">🎧</span><span class="slide-audio-label">${dt('audioLabel')}</span><audio controls preload="none" src="${deckAudioSrc(index)}" aria-label="${dt('audioLabel')}：${title}"></audio>`;
    slide.append(narration);
    // Each slide links to the handout page that explains it (pages[n].slides in handout-notes.js).
    const notes = window.RAG_HANDOUT?.[lang], page = notes?.pages?.findIndex(p => p.slides.includes(index + 1)) ?? -1;
    if (page >= 0) {
      const link = document.createElement('a');
      link.className = 'slide-handout-link';
      link.href = `#handout/${page + 1}`;
      link.innerHTML = `<span aria-hidden="true">📖</span>${notes.ui.deckLink.replace('{n}', page + 1)}：${esc(notes.pages[page].title)}<span aria-hidden="true"> →</span>`;
      slide.append(link);
    }
  });
  $('page-slides').replaceChildren(template.content);
  $('slides-open').textContent = dt('open');
  $('player-title').textContent = dt('title');
  $('slides-prev').textContent = dt('prev');
  $('slides-next').textContent = dt('next');
  $('slides-close').textContent = dt('close');
  $('slides-fullscreen').textContent = dt('fullscreen');
  $('slides-keys').textContent = dt('keys');
  ['nav-slides', 'nav-handout', 'nav-simulation', 'nav-references'].forEach((id, index) => $(id).textContent = dt('nav')[index]);
  $('tabs').setAttribute('aria-label', dt('navigation'));
  applySlideTheme();
  syncDeckAudioButton();
  if (slidePlayer.open) renderSlide();
}
// Only one narration plays at a time: page audio, deck audio, or the listen buttons.
document.addEventListener('play', event => {
  if (!(event.target instanceof HTMLAudioElement)) return;
  [...document.querySelectorAll('#page-slides audio, #page-handout audio'), deckAudio].forEach(audio => { if (audio !== event.target) audio.pause(); });
  if (event.target !== narration && event.target !== checkpointVoice) { stopNarration(); stopCheckpointVoice(); }
}, true);

// Light / dark slide theme (shared by the deck page and the player).
let slideTheme = 'light';
try {
  const saved = localStorage.getItem('rag-slides-theme');
  if (saved === 'light' || saved === 'dark') slideTheme = saved;
} catch (e) {}
function applySlideTheme() {
  document.documentElement.dataset.slideTheme = slideTheme;
  const label = dt(slideTheme === 'light' ? 'dark' : 'light');
  $('slides-theme').textContent = label;
  $('player-theme').textContent = label;
}
function toggleSlideTheme() {
  slideTheme = slideTheme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('rag-slides-theme', slideTheme); } catch (e) {}
  applySlideTheme();
}
$('slides-theme').addEventListener('click', toggleSlideTheme);
$('player-theme').addEventListener('click', toggleSlideTheme);

// Present the slides on a 1280px canvas scaled to fit the screen.
const slidePlayer = $('slide-player');
let slideIndex = 0;
let slideReturnFocus = null;
let playerHadFullscreen = false;
const stackedSlides = matchMedia('(max-width: 760px), (max-width: 1000px) and (max-height: 500px)');
const deckSlides = () => $('page-slides').querySelectorAll(':scope > .info-slide');
function fitSlide() {
  if (!slidePlayer.open) return;
  const canvas = $('slide-canvas');
  const stage = $('slide-stage');
  if (stackedSlides.matches) {
    canvas.style.transform = 'none';
    return;
  }
  const scale = 0.9 * Math.min(stage.clientWidth / canvas.offsetWidth, stage.clientHeight / canvas.offsetHeight);
  canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
// Player narration: one audio element follows the current slide. While narration is on,
// a slide that finishes speaking advances to the next one, so the whole deck can play hands-free.
const deckAudio = new Audio();
deckAudio.preload = 'none';
document.body.append(deckAudio);
let deckNarrating = false;
function syncDeckAudio() {
  const src = deckAudioSrc(slideIndex);
  if (deckAudio.getAttribute('src') !== src) {
    deckAudio.pause();
    deckAudio.setAttribute('src', src);
  }
  if (deckNarrating && deckAudio.paused) deckAudio.play().catch(() => { deckNarrating = false; syncDeckAudioButton(); });
  syncDeckAudioButton();
}
// Hide the player's narration button on slides whose audio file is missing (runs only after slideIndex exists).
function syncDeckAudioAvailability() {
  const missing = missingDeckAudio.has(deckAudioSrc(slideIndex));
  if (missing && deckNarrating) { deckNarrating = false; deckAudio.pause(); syncDeckAudioButton(); }
  $('slides-audio').hidden = missing;
}
function syncDeckAudioButton() {
  $('slides-audio').textContent = dt(deckNarrating ? 'audioStop' : 'audioPlay');
  $('slides-audio').setAttribute('aria-pressed', String(deckNarrating));
}
function stopDeckAudio() { deckNarrating = false; deckAudio.pause(); syncDeckAudioButton(); }
$('slides-audio').addEventListener('click', () => {
  deckNarrating = !deckNarrating;
  if (deckNarrating) syncDeckAudio(); else deckAudio.pause();
  syncDeckAudioButton();
});
deckAudio.addEventListener('ended', () => {
  if (deckNarrating && slideIndex < deckSlides().length - 1) moveSlide(1);
  else { deckNarrating = false; deckAudio.currentTime = 0; syncDeckAudioButton(); }
});
deckAudio.addEventListener('pause', () => { if (!deckAudio.ended && deckNarrating && slidePlayer.open && !document.hidden && deckAudio.getAttribute('src') === deckAudioSrc(slideIndex)) { deckNarrating = false; syncDeckAudioButton(); } });
function renderSlide() {
  const all = deckSlides();
  slideIndex = Math.max(0, Math.min(slideIndex, all.length - 1));
  const slide = all[slideIndex].cloneNode(true);
  slide.querySelectorAll('.slide-audio[data-audio-src]').forEach(el => { if (missingDeckAudio.has(el.dataset.audioSrc)) el.remove(); });
  syncDeckAudioAvailability();
  slide.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
  $('slide-canvas').replaceChildren(slide);
  $('slide-stage').scrollTop = 0;
  $('slides-prev').disabled = slideIndex === 0;
  $('slides-next').disabled = slideIndex === all.length - 1;
  $('slides-count').textContent = dt('count').replace('{n}', slideIndex + 1).replace('{total}', all.length);
  fitSlide();
  syncDeckAudio();
}
function moveSlide(direction) {
  slideIndex += direction;
  renderSlide();
}
async function enterSlideFullscreen() {
  if (!document.documentElement.requestFullscreen || document.fullscreenElement) return;
  try {
    await document.documentElement.requestFullscreen();
    if (!slidePlayer.open && document.fullscreenElement === document.documentElement) await document.exitFullscreen();
  } catch (e) {
    // The viewport player remains usable when fullscreen is unavailable or denied.
  }
}
function closeSlides() {
  if (!slidePlayer.open) return;
  slidePlayer.close();
  stopDeckAudio();
  document.body.classList.remove('has-slide-player');
  if (playerHadFullscreen && document.fullscreenElement === document.documentElement) document.exitFullscreen().catch(() => {});
  slideReturnFocus?.focus({ preventScroll: true });
}
// Opens the player at a slide: from the deck page (slide 1) or a handout page's slide thumbnail.
function openSlides(index = 0) {
  slideReturnFocus = document.activeElement;
  stopNarration();
  document.querySelectorAll('#page-slides audio, #page-handout audio').forEach(audio => audio.pause());
  slideIndex = index;
  slidePlayer.showModal();
  document.body.classList.add('has-slide-player');
  renderSlide();
  $('slides-next').focus();
  enterSlideFullscreen();
}
$('slides-open').addEventListener('click', () => openSlides(0));
$('slides-prev').addEventListener('click', () => moveSlide(-1));
$('slides-next').addEventListener('click', () => moveSlide(1));
$('slides-close').addEventListener('click', closeSlides);
$('slides-fullscreen').addEventListener('click', enterSlideFullscreen);
slidePlayer.addEventListener('cancel', event => { event.preventDefault(); closeSlides(); });
slidePlayer.addEventListener('click', event => {
  if (event.target.closest('a[href^="#"]')) closeSlides();
});
document.addEventListener('keydown', event => {
  if (!slidePlayer.open) return;
  let index;
  switch (event.key) {
    case 'ArrowLeft': case 'PageUp': index = slideIndex - 1; break;
    case 'ArrowRight': case 'PageDown': index = slideIndex + 1; break;
    case 'Home': index = 0; break;
    case 'End': index = deckSlides().length - 1; break;
    case 'Escape': event.preventDefault(); closeSlides(); return;
    case ' ':
      if (event.target.closest('button, a')) return;
      index = slideIndex + (event.shiftKey ? -1 : 1);
      break;
    default: return;
  }
  event.preventDefault();
  slideIndex = index;
  renderSlide();
});
document.addEventListener('fullscreenchange', () => {
  const active = document.fullscreenElement === document.documentElement && slidePlayer.open;
  $('slides-fullscreen').hidden = active || !document.documentElement.requestFullscreen;
  if (playerHadFullscreen && !active) closeSlides();
  playerHadFullscreen = active;
  fitSlide();
});
$('slides-fullscreen').hidden = !document.documentElement.requestFullscreen;
new ResizeObserver(fitSlide).observe($('slide-stage'));
$('slide-canvas').addEventListener('load', fitSlide, true);


function renderGuide() {
  // Simulation helpers that used to live with the guide page.
  listenButton($('listen-simulation'), ['simulation']);
  $('narration-coverage').textContent = speech[lang].coverage;
  $('checkpoint-voice-label').textContent = lang === 'zh' ? '語音提示' : 'Spoken updates';
  setVoiceCaption();
  renderHandout();
}

// ====================================================================================
// Self-study handout / 自學講義 — rich text with flow figures (content: handout-notes.js)
// ====================================================================================
// [L1], [P3] … in the notes become links to the references tab.
// Passage IDs ([L1-2], [C20]) link to their source document; document IDs ([L5], [P3]) link directly.
const demoRefs = new Map(Object.values(window.RAG_DEMO.collections).flatMap(c => c.passages.map(p => [p.id, p.ref])));
const cite = html => html.replace(/\[([A-Z]+\d+(?:-\d+)?)\]/g, (match, id) => `<a href="#reference-${demoRefs.get(id) ?? id}">${match}</a>`);
const stepBox = (step, tone) => {
  const [title, note] = Array.isArray(step) ? step : [step, ''];
  return `<li class="flow-step ${tone}"><b>${cite(title)}</b>${note ? `<span>${cite(note)}</span>` : ''}</li>`;
};
function figureScores(ui) {
  const {run, rows} = workedExample();
  return `<div class="flow-scores"><p><b>${ui.scoreQuestion}</b>${esc(run.question)}</p><table><thead><tr><th scope="col">ID</th><th scope="col">${lang === 'zh' ? '片段' : 'Passage'}</th><th scope="col">${ui.scoreHits}</th><th scope="col">${ui.scoreTotal}</th><th scope="col"></th></tr></thead><tbody>${rows.map(({doc, terms, score, picked}) =>
    `<tr class="${picked ? 'picked' : ''}"><td>${cite('[' + doc.id + ']')}</td><td>${doc.title.split(/[｜|]/).pop().trim()}・${doc.locator}</td><td>${terms.length ? terms.map(term => `<mark>${term}</mark>`).join(' ') : ui.none}</td><td>${score.toFixed(2)}</td><td>${picked ? '✓ ' + ui.scorePicked : ui.scoreSkipped}</td></tr>`).join('')}</tbody></table>${ui.scoreNote ? `<p class="flow-note">${cite(ui.scoreNote)}</p>` : ''}</div>`;
}
function figureFive() {
  const g = guide[lang], figures = dt('fiveFigures');
  return `<div class="rag-five flow-five">${g.five.map(([heading, body], i) => `<article class="info-panel ${PANEL_COLORS[i]}"><h3>${heading}</h3>
    <p class="rag-chips${i >= 3 ? ' list' : ''}" aria-hidden="true">${figures[i].map(part => ['→', '＋', '+'].includes(part) ? `<b>${part}</b>` : `<span>${part}</span>`).join('')}</p><p>${body}</p></article>`).join('')}</div>`;
}
function buildFigure(fig, ui) {
  let body = '';
  if (fig.type === 'rows') {
    body = fig.rows.map(row => `<div class="flow-row ${row.tone}"><p class="flow-label">${row.label}</p><ol class="flow-steps${row.list ? ' flow-list' : ''}">${row.steps.map(step => stepBox(step, row.tone)).join('')}</ol></div>`).join('');
    if (fig.scores === 0) body += figureScores(ui);
    if (fig.five) body += figureFive();
  } else if (fig.type === 'stack') {
    body = `<div class="flow-stack"><ol class="flow-steps"><li class="flow-step sky"><b>${fig.input[0]}</b><span>${fig.input[1]}</span></li></ol>
      <div class="flow-prompt"><p class="flow-label">${lang === 'zh' ? '提示' : 'Prompt'}</p><ol>${fig.parts.map(([title, text], i) => `<li class="${['butter', 'sky', 'mint'][i]}"><b>${title}</b><span>${cite(text)}</span></li>`).join('')}</ol></div>
      <ol class="flow-steps"><li class="flow-step lavender"><b>${fig.output[0]}</b><span>${fig.output[1]}</span></li></ol></div>`;
  } else if (fig.type === 'branch') {
    const lane = (label, steps, tone) => `<div class="flow-row ${tone}"><p class="flow-label">${label}</p><ol class="flow-steps">${steps.map(step => stepBox(step, tone)).join('')}</ol></div>`;
    body = `<div class="flow-branch"><ol class="flow-steps flow-start"><li class="flow-step sky"><b>${fig.start[0]}</b><span>${fig.start[1]}</span></li><li class="flow-decision"><b>${fig.question}</b></li></ol>
      <div class="flow-lanes">${lane(lang === 'zh' ? '是' : 'Yes', fig.yes, 'mint')}${lane(lang === 'zh' ? '否' : 'No', fig.no, 'rose')}</div></div>`;
  } else if (fig.type === 'check') {
    body = `<div class="flow-check"><ol class="flow-steps flow-vertical">${fig.steps.map(step => stepBox(step, 'sky')).join('')}<li class="flow-step mint flow-pass"><b>✓ ${fig.pass[0]}</b><span>${fig.pass[1]}</span></li></ol>
      <p class="flow-fail"><b aria-hidden="true">↩</b>${fig.fail}</p></div>`;
  }
  return `<figure class="flow-figure"><figcaption>${fig.caption}</figcaption>${body}</figure>`;
}
// The handout is a hub (#handout) plus one page per part of the deck (#handout/1 … #handout/N).
// Sections are numbered from 01 on each page; progress keys are "<page>-<nn>", e.g. "4-02".
let handoutPage = 0;
function handoutPages(notes = window.RAG_HANDOUT?.[lang]) {
  return notes?.pages ?? [{slides: [], title: notes?.ui.title ?? '', lead: notes?.ui.intro ?? ''}];
}
function handoutSections(page, notes = window.RAG_HANDOUT?.[lang]) {
  return (notes?.sections ?? []).filter(section => (section.page ?? 1) === page);
}
const handoutKeys = (page, notes) => handoutSections(page, notes).map((_, i) => `${page}-${String(i + 1).padStart(2, '0')}`);
const slideRange = slides => slides.length > 1 ? `${slides[0]}–${slides.at(-1)}` : String(slides[0] ?? '');
// The hub and every page carry their own podcast (audio/handout/page-N.mp3, from demo/handout_voice.py).
function handoutPodcast(page, title) {
  const clip = window.RAG_HANDOUT_PODCASTS?.['page-' + page];
  if (!clip) return '';
  return `<section class="handout-podcast" aria-label="${esc(title)}"><div class="handout-podcast-head"><span class="handout-podcast-icon" aria-hidden="true">🎧</span><div><p>${esc(title)}</p><b>${clip.duration}</b></div></div>
    <audio controls preload="none" src="${clip.src}" aria-label="${esc(title)}（${clip.duration}）"></audio></section>`;
}
// Two-host discussion episode for a page (audio/discussion/page-N.mp3, from demo/handout_discussion.py).
function handoutDiscussion(page, ui) {
  const ep = window.RAG_HANDOUT_DISCUSSIONS?.[page];
  if (!ep) return '';
  const hosts = Object.values(ep.hosts).join('、');
  return `<section class="handout-podcast handout-discussion" aria-label="${esc(ui.discussion)}：${esc(ep.title)}">
    <div class="handout-podcast-head"><span class="handout-podcast-icon" aria-hidden="true">🎙️</span><div><p>${ui.discussion} · ${hosts} · ${ep.duration}</p><b>${esc(ep.title)}</b></div></div>
    <p class="handout-discussion-lead">${ui.discussionLead}</p>
    <audio controls preload="none" src="${ep.src}" aria-label="${esc(ui.discussion)}：${esc(ep.title)}（${ep.duration}）"></audio>
  </section>`;
}
const progressMeter =(keys, ui) => `<p class="handout-progress" aria-live="polite" data-keys="${keys.join(' ')}"><span class="handout-progress-text" data-template="${ui.progress}"></span><span class="handout-meter" aria-hidden="true"><i></i></span><button class="handout-reset" type="button">${ui.reset}</button></p>`;
function renderHandout() {
  const notes = window.RAG_HANDOUT?.[lang];
  if (!notes) return;
  const ui = notes.ui, pages = handoutPages(notes);
  const num = i => String(i + 1).padStart(2, '0');
  const sub = (icon, text) => `<h3 class="handout-sub"><span aria-hidden="true">${icon}</span>${text}</h3>`;
  const qa = list => `<ol class="handout-qa">${list.map(([q, a]) => `<li><p class="handout-q">${cite(q)}</p><details><summary>${ui.reveal}</summary><p>${cite(a)}</p></details></li>`).join('')}</ol>`;
  const pageName = n => (ui.page ?? '{n}').replace('{n}', n);
  const slideImage = n => window.RAG_VISUAL_SLIDES?.[n - 1];
  let html;
  if (!handoutPage) {
    const allKeys = pages.flatMap((_, p) => handoutKeys(p + 1, notes));
    const cards = pages.map((page, p) => {
      const n = p + 1, sections = handoutSections(n, notes), keys = handoutKeys(n, notes), clip = window.RAG_HANDOUT_PODCASTS?.['page-' + n], talk = window.RAG_HANDOUT_DISCUSSIONS?.[n];
      const thumb = slideImage(page.slides[0]);
      return `<li class="handout-card ${page.tone ?? ''}"><a class="handout-card-link" href="#handout/${n}">
        ${thumb ? `<img src="slide-images/concise/${thumb.image}" alt="" width="1672" height="941" loading="lazy" decoding="async">` : ''}
        <span class="handout-card-meta"><b>${pageName(n)}</b>${page.slides.length ? `<span>${ui.slides.replace('{s}', slideRange(page.slides))}</span>` : ''}</span>
        <span class="handout-card-title">${page.title}</span>
        <span class="handout-card-lead">${page.lead}</span>
        <span class="handout-card-sections">${sections.map((section, i) => `<span><i>${num(i)}</i>${section.title}</span>`).join('')}</span>
        <span class="handout-card-foot">${clip ? `<span title="${ui.listen}">🎧 ${clip.duration}</span>` : ''}${talk ? `<span title="${ui.discussion}">🎙️ ${talk.duration}</span>` : ''}<span>${ui.sectionCount.replace('{n}', sections.length)}</span><span class="handout-card-done" data-keys="${keys.join(' ')}"></span></span>
      </a></li>`;
    }).join('');
    html = `<header class="handout-cover">
      <p class="handout-kicker">${ui.kicker}</p>
      <h2>${ui.title}</h2>
      <p class="handout-intro">${ui.intro}</p>
      ${handoutPodcast(0, ui.hubListen ?? ui.listen)}
    </header>
    <section class="handout-pages" aria-labelledby="handout-pages-title">
      <div class="handout-toc-head"><div><h3 id="handout-pages-title">${ui.pagesTitle}</h3><p>${ui.pagesLead}</p></div>${progressMeter(allKeys, ui)}</div>
      <ol class="handout-cards">${cards}</ol>
    </section>
    ${notes.glossary ? `<section class="handout-glossary" aria-labelledby="handout-glossary-title"><h3 id="handout-glossary-title">${ui.glossaryTitle}</h3><p>${ui.glossaryLead}</p><dl>${notes.glossary.map(([term, text]) => `<div><dt>${term}</dt><dd>${cite(text)}</dd></div>`).join('')}</dl></section>` : ''}`;
  } else {
    const n = handoutPage, page = pages[n - 1], sections = handoutSections(n, notes), keys = handoutKeys(n, notes), last = n === pages.length;
    const strip = page.slides.map(s => {
      const slide = slideImage(s);
      return slide ? `<li><button type="button" class="handout-slide" data-open-slide="${s - 1}" aria-label="${ui.playSlide.replace('{n}', s)}：${esc(slide.title)}">
        <img src="slide-images/${slide.imageDirectory || 'concise'}/${slide.image}" alt="" width="1672" height="941" loading="lazy" decoding="async"><span><b>${s}</b>${esc(slide.title)}</span></button></li>` : '';
    }).join('');
    const toc = sections.map((section, i) => `<li><a href="#handout/${n}" data-jump="handout-${keys[i]}"><span class="handout-toc-num">${num(i)}</span><span class="handout-toc-title">${section.title}</span><span class="handout-toc-done" aria-hidden="true">✓</span></a></li>`).join('');
    const body = sections.map((s, i) => `<article class="handout-section" id="handout-${keys[i]}" aria-labelledby="handout-${keys[i]}-title">
      <header class="handout-head">
        <span class="handout-num" aria-hidden="true">${num(i)}</span>
        <div class="handout-titles"><p class="handout-eyebrow">${pageName(n)} · ${ui.section.replace('{n}', i + 1)}</p><h2 id="handout-${keys[i]}-title" tabindex="-1">${s.title}</h2><p class="handout-lead">${s.lead}</p>
          <div class="handout-goals"><p>${ui.goals}</p><ul>${s.goals.map(goal => `<li>${goal}</li>`).join('')}</ul></div></div>
      </header>
      ${s.key ? `<p class="handout-key"><b>${ui.key}</b><span>${cite(s.key)}</span></p>` : ''}
      ${s.analogy ? `<aside class="handout-callout analogy">${sub('☕', ui.analogy)}<p>${cite(s.analogy)}</p></aside>` : ''}
      <section class="handout-explain">${sub('✎', ui.explain)}<div class="handout-prose">${s.explain.map(text => `<p>${cite(text)}</p>`).join('')}</div></section>
      <section class="handout-explain">${sub('◧', ui.figure)}${buildFigure(s.fig, ui)}</section>
      <div class="handout-callouts">
        <aside class="handout-callout example">${sub('✐', ui.example)}<p>${cite(s.example)}</p></aside>
        <aside class="handout-callout pitfall">${sub('!', ui.pitfall)}<p>${cite(s.pitfall)}</p></aside>
      </div>
      ${s.try ? `<p class="handout-try"><b>${ui.tryIt}</b><span>${s.try[0]}</span><a href="${s.try[1]}" aria-label="${ui.tryIt}">→</a></p>` : ''}
      <section class="handout-check">${sub('?', ui.check)}${qa(s.check)}
        <label class="handout-done"><input type="checkbox" data-done="${keys[i]}"> ${ui.done}</label>
      </section>
    </article>`).join('');
    const review = last ? `<section class="handout-section handout-review" aria-labelledby="handout-review-title">
      <header class="handout-head"><span class="handout-num" aria-hidden="true">✓</span><div class="handout-titles"><h2 id="handout-review-title" tabindex="-1">${ui.reviewTitle}</h2><p class="handout-lead">${ui.reviewLead}</p></div></header>
      <div class="info-two">
        <article class="info-panel mint"><h3>${ui.keyTitle}</h3><ul class="handout-list">${notes.keys.map(item => `<li>${item}</li>`).join('')}</ul></article>
        <article class="info-panel butter"><h3>${ui.askTitle}</h3>${qa(notes.review)}</article>
      </div>
      <p class="info-question">${ui.nextQuestion} <button class="handout-start" type="button" data-try-simulation>${ui.nextLink}<span aria-hidden="true"> →</span></button></p>
    </section>` : '';
    const prev = n === 1 ? ['#handout', ui.hub] : [`#handout/${n - 1}`, `${pageName(n - 1)}：${pages[n - 2].title}`];
    const next = last ? ['#handout', ui.hub] : [`#handout/${n + 1}`, `${pageName(n + 1)}：${pages[n].title}`];
    html = `<header class="handout-cover handout-page-hero">
      <p class="handout-back"><a href="#handout">${ui.back}</a></p>
      <p class="handout-kicker">${(ui.pageOf ?? '').replace('{n}', n).replace('{total}', pages.length)}${page.slides.length ? ' · ' + ui.slides.replace('{s}', slideRange(page.slides)) : ''}</p>
      <h2>${page.title}</h2>
      <p class="handout-intro">${page.lead}</p>
      ${strip ? `<div class="handout-slide-strip"><p>${ui.slideStrip}</p><ol>${strip}</ol></div>` : ''}
      ${handoutPodcast(n, ui.listen)}
      ${handoutDiscussion(n, ui)}
      <nav class="handout-toc" aria-label="${ui.contents}">
        <div class="handout-toc-head"><h3>${ui.contents}</h3>${progressMeter(keys, ui)}</div>
        <ol class="handout-toc-list">${toc}</ol>
      </nav>
    </header>
    ${body}
    ${review}
    <nav class="handout-pager" aria-label="${ui.prev} / ${ui.next}">
      <a href="${prev[0]}" rel="prev"><small>← ${n === 1 ? ui.hub : ui.prev}</small><span>${prev[1]}</span></a>
      <a href="${next[0]}" rel="next"><small>${last ? ui.hub : ui.next} →</small><span>${next[1]}</span></a>
    </nav>`;
  }
  $('page-handout').innerHTML = `<div class="handout-doc">${html}</div>`;
  syncHandoutProgress();
  applyHandoutSize();
}
// Contents links scroll within the page so the #handout/N route stays put.
$('page-handout').addEventListener('click', event => {
  const link = event.target.closest('[data-jump]');
  if (!link) return;
  event.preventDefault();
  const target = $(link.dataset.jump);
  target.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
  target.querySelector('h2').focus({preventScroll: true});
});
// Slide thumbnails on a handout page open the player at that slide.
$('page-handout').addEventListener('click', event => {
  const button = event.target.closest('[data-open-slide]');
  if (button) openSlides(Number(button.dataset.openSlide));
});
// Self-study progress: one checkbox per section, remembered in this browser only.
let handoutDone = new Set();
try {
  const current = localStorage.getItem('rag-handout-done-four-slides');
  const previous = JSON.parse(localStorage.getItem('rag-handout-done') || '[]');
  const migrated = previous.flatMap(key => /^1-/.test(key) || /^2-0[12]$/.test(key) ? [key] : /^4-/.test(key) ? [key.replace(/^4-/, '3-')] : []);
  handoutDone = new Set(JSON.parse(current ?? JSON.stringify(migrated)).filter(key => String(key).includes('-')));
} catch (e) {}
function syncHandoutProgress() {
  const page = $('page-handout');
  page.querySelectorAll('[data-done]').forEach(box => {
    box.checked = handoutDone.has(box.dataset.done);
    page.querySelector(`[data-jump="handout-${box.dataset.done}"]`)?.classList.toggle('is-done', box.checked);
  });
  page.querySelectorAll('.handout-progress').forEach(meter => {
    const keys = meter.dataset.keys.split(' ').filter(Boolean), done = keys.filter(key => handoutDone.has(key)).length;
    const text = meter.querySelector('.handout-progress-text');
    text.textContent = text.dataset.template.replace('{n}', done).replace('{total}', keys.length);
    meter.querySelector('.handout-meter i').style.width = `${keys.length ? done / keys.length * 100 : 0}%`;
  });
  page.querySelectorAll('.handout-card-done').forEach(mark => {
    const keys = mark.dataset.keys.split(' ').filter(Boolean), done = keys.filter(key => handoutDone.has(key)).length;
    mark.textContent = done === keys.length && keys.length ? '✓ 已讀完' : done ? `已讀 ${done} / ${keys.length}` : '';
    mark.closest('.handout-card')?.classList.toggle('is-done', done === keys.length && keys.length > 0);
  });
}
function saveHandoutProgress() {
  try { localStorage.setItem('rag-handout-done-four-slides', JSON.stringify([...handoutDone])); } catch (e) {}
  syncHandoutProgress();
}
$('page-handout').addEventListener('change', event => {
  const box = event.target.closest('[data-done]');
  if (!box) return;
  box.checked ? handoutDone.add(box.dataset.done) : handoutDone.delete(box.dataset.done);
  saveHandoutProgress();
});
// "Clear progress" clears only the sections its meter counts (this page, or every page on the hub).
$('page-handout').addEventListener('click', event => {
  const button = event.target.closest('.handout-reset');
  if (!button) return;
  button.closest('.handout-progress').dataset.keys.split(' ').forEach(key => handoutDone.delete(key));
  saveHandoutProgress();
});
// Text size for reading or projecting the handout (A− / 100% / A+), as in arkanoid-ml.
const HANDOUT_SIZES = [0.85, 1, 1.15, 1.3, 1.5, 1.75, 2];
let handoutSize = 1;
try {
  const saved = Number(localStorage.getItem('rag-handout-size'));
  if (HANDOUT_SIZES.includes(saved)) handoutSize = saved;
} catch (e) {}
function applyHandoutSize() {
  const percent = `${Math.round(handoutSize * 100)}%`;
  $('page-handout').style.setProperty('--handout-zoom', handoutSize);
  $('handout-size').textContent = percent;
  $('handout-size-label').textContent = lang === 'zh' ? '字級' : 'Text size';
  $('handout-size').setAttribute('aria-label', (lang === 'zh' ? '目前字級 {p}，按一下恢復 100%' : 'Text size {p}. Click to reset to 100%').replace('{p}', percent));
  $('handout-smaller').setAttribute('aria-label', lang === 'zh' ? '縮小文字' : 'Smaller text');
  $('handout-larger').setAttribute('aria-label', lang === 'zh' ? '放大文字' : 'Larger text');
  $('handout-smaller').disabled = handoutSize === HANDOUT_SIZES[0];
  $('handout-larger').disabled = handoutSize === HANDOUT_SIZES.at(-1);
}
function setHandoutSize(size) {
  const anchor = [...$('page-handout').querySelectorAll('.handout-section, .handout-cover')].find(el => el.getBoundingClientRect().bottom > 80);
  const offset = anchor?.getBoundingClientRect().top;
  handoutSize = size;
  try { localStorage.setItem('rag-handout-size', String(size)); } catch (e) {}
  applyHandoutSize();
  if (anchor && offset !== undefined) window.scrollBy(0, anchor.getBoundingClientRect().top - offset);
}
function stepHandoutSize(direction) {
  const index = HANDOUT_SIZES.indexOf(handoutSize) + direction;
  if (index >= 0 && index < HANDOUT_SIZES.length) setHandoutSize(HANDOUT_SIZES[index]);
}
$('handout-smaller').addEventListener('click', () => stepHandoutSize(-1));
$('handout-larger').addEventListener('click', () => stepHandoutSize(1));
$('handout-size').addEventListener('click', () => setHandoutSize(1));
// "Open the simulation" at the end of the handout: load the 1966 example and play it.
document.addEventListener('click', event => {
  if (!event.target.closest('[data-try-simulation]')) return;
  dataset = 0;
  $('dataset').value = dataset;
  $('query').value = t().examples[dataset][0];
  $('query').setCustomValidity('');
  showDataset();
  reset();
  location.hash = 'simulation';
  applyRoute();
  startPlayback();
});
function localize() {
  stopNarration();
  $('narration-status').textContent = '';
  const strings = t();
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en';
  document.title = 'RAG · ' + strings.title;
  const labels = {title:'title', intro:'intro', 'dataset-label':'datasetLabel', 'speed-label':'speedLabel',
    'query-label':'queryLabel', step:'step', reset:'reset', 'library-label':'library', 'source-note':'sourceNote', method:'method'};
  for (const [id,key] of Object.entries(labels)) $(id).textContent = strings[key];
  ['retrieve','augment','generate'].forEach((id,index) => $(id).textContent = strings.stages[index]);
  // The simulation offers long-term care and the Electronic Engineering curriculum; the AI-disclosure
  // collection (index 1) stays in the data so dataset numbers and recorded audio tracks keep matching.
  $('dataset').replaceChildren(...SHOWN_DATASETS.map(index => new Option(strings.datasets[index], index)));
  $('dataset').value = dataset;
  [...$('speed').options].forEach((option,index) => option.textContent = strings.speeds[index]);
  $('controls-label').textContent = lang === 'zh' ? '操作面板' : 'Controls';
  showDataset();
  renderGuide();
  renderReferences();
  renderDeck();
  reset();
}
$('query-form').addEventListener('submit', event => {
  event.preventDefault();
  if (timer !== null) {
    stop();
    setControlsHidden(false);
    $('status').textContent = t().paused;
    renderControls();
    return;
  }
  stopNarration();
  if (phase === ANSWER) reset();
  startPlayback();
});
$('step').addEventListener('click', () => {
  stop();
  stopNarration();
  if (advance()) announceCheckpoint();
  render();
});
$('reset').addEventListener('click', reset);
$('dataset').addEventListener('change', event => {
  dataset = Number(event.target.value);
  demoIndex = 0;
  showDataset();
  reset();
});
$('run-toggle').addEventListener('click', () => {
  if (runToggleState() === 'stop') {
    stopCheckpointVoice();
    finishPlayback();
  } else {
    $('query-form').requestSubmit();
  }
});
['play', 'pause', 'ended'].forEach(type => checkpointVoice.addEventListener(type, syncRunToggle));
// Space plays, pauses or stops the reading on the simulation page (not while typing or on a control).
addEventListener('keydown', event => {
  if (event.key !== ' ' || route !== 'simulation' || slidePlayer.open || event.repeat) return;
  if (event.target.closest?.('input, select, textarea, button, summary, a, [contenteditable]')) return;
  event.preventDefault();
  if (runToggleState()) $('run-toggle').click();
  else $('query-form').requestSubmit();
});
localize();
applyRoute();
})();
