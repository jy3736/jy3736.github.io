
(() => {
// ---------- language / 語言 ----------
const I18N = {
  zh: {
    h1: '生成式 AI <span>到 AGENT</span>', langBtn: 'English',
    tag: '三關看懂：生成式 AI 怎麼一個詞一個詞寫出回答、推理模式為什麼先想再答，以及 AI Agent 怎麼用工具把事情做完。',
    lv1: '生成式 AI：一次接一個詞', lv1Sub: 'ChatGPT、Claude、Gemini 的基本功',
    lv2: '推理：先想，再回答', lv2Sub: '直接回答 vs. 思考模式比一比',
    lv3: 'AI Agent：想 → 做 → 看', lv3Sub: '用工具真的把事情做完',
    speedL: '動畫速度',
    // LV1
    modeH: '模式', manual: '手動', manualSub: '你來挑下一個詞', auto: '電腦（自動生成）', autoSub: '模型依機率抽詞',
    tempL: '溫度 Temperature', tempLo: '穩定、保守', tempHi: '多變（也容易出錯）',
    btnStep1: '讓模型接一個詞', btnClear: '清除對話',
    hint1Manual: '先在左下角選一個開頭，再從下方的候選詞挑一個接下去，直到出現句號。',
    hint1Auto: '模型會依機率自己抽下一個詞。把溫度調高，看看會不會冒出奇怪的句子。',
    probH: '下一個詞的機率（已套用溫度）', ctxL: '模型對上的前文：',
    probEmpty: '先在左下角選一個開頭。', probDone: '這句寫完了。再選一個開頭試試。', probMore: '還有 {n} 個機率更低的詞',
    legHi: '高機率', legMid: '中機率', legLo: '低機率（溫度高時較常出現）',
    s1Tok: '模型接上的詞', s1Avg: '選中詞的平均機率', s1Ans: '完成的回答', s1Novel: '訓練資料裡沒有的句子',
    seedsL: '選一個開頭', chatEmpty: '選一個開頭，看模型怎麼一個詞一個詞接下去。',
    userSay: '請接著說：{seed}…', stWriting: '生成中', stIdle: '待命',
    vCopy: '✓ 和訓練資料第 {n} 句一模一樣：這是「背」出來的。',
    vNovel: '⚠ 訓練資料裡沒有這一句。讀起來通順，內容卻可能是拼湊的（幻覺），要查證。',
    vCut: '⚠ 句子太長，先停在這裡。',
    corpusH: '訓練資料', datasetL: '資料版本', expanded: '擴充資料', original: '原始資料',
    corpusCount: '查看目前的訓練資料（{n} 句）',
    datasetScore: '下一個詞猜對幾題？原始資料 {original}/{total}，擴充資料 {expanded}/{total}。',
    checksH: '查看測試片段與預測結果',
    checkRow: '「{context} ___」 正解：{expected} ｜ 原始：{original} ｜ 擴充：{expanded}',
    noPrediction: '無候選詞',
    checksNote: '兩個版本都選機率最高的詞。這些片段未整段放進訓練資料，用來檢查新增主題的涵蓋度。',
    corpusNote: '擴充版加入量測紀錄、單位換算與表格整理的例句。試著用相同的開頭與溫度，比較兩個版本的候選詞。',
    // LV2
    qH: '選一道題目', guessH: '猜猜看：哪一邊會答對？', g0: '只有直接回答', g1: '只有先推理', g2: '兩邊都對',
    go: '開始比賽', again: '換一題 / 再比一次', needGuess: '先猜一個答案，再開始比賽。',
    score: '猜對 {a} / {b} 題',
    fastT: '直接回答', fastSub: '一般模式：看完題目馬上寫答案', slowT: '先推理再回答', slowSub: '推理模式：先在草稿上想清楚',
    thinking: '思考中…', thought: '思考了 {n} 字', units: '{n} 字',
    ok: '✓ 答對', no: '✗ 答錯', youRight: '你猜對了！', youWrong: '這次沒猜中。', truth: '正確答案：{a}',
    lv2Note: '劇本示意：真實模型的直接回答不一定會錯，推理模型也可能算錯；藥量、換算等結果，一定要由人核對。',
    // LV3
    taskH: '交給 AI 的任務', task: '「本週有哪些檢驗報告需要複驗？請整理成清單，並通知負責的醫檢師。」',
    chatMode: 'Chat（只會回答）', chatModeSub: '看不到你的檔案', agentMode: 'Agent（會動手做）', agentModeSub: '用工具讀檔、計算、寫檔',
    play: '執行', pause: '暫停', btnStep3: '下一步', btnReset: '重來', approveL: '寄信前要先問我',
    hint3Agent: '按「執行」看 Agent 反覆「想 → 做 → 看」；也可以按「下一步」一格一格看。',
    hint3Chat: '同一個任務交給只會聊天的 Chat，它沒有工具，只能用文字告訴你怎麼做。',
    s3Loops: '迴圈次數', s3Tools: '呼叫工具', s3Fix: '出錯後自己修正', s3Ctx: '工作記憶（字）',
    toolsH: '工具箱', wsH: '工作資料夾', logH: '執行紀錄', logEmpty: '還沒開始。',
    outbox: '寄件匣：{n} 封', ph0: '想', ph1: '做', ph2: '看', ph0s: 'Think', ph1s: 'Act', ph2s: 'Observe',
    tgThink: '想', tgAct: '做', tgObs: '看', tgDone: '完成', tgChat: 'Chat', tgErr: '錯誤',
    ringAgent: 'AGENT LOOP', ringChat: 'CHAT', stRun: '執行中', stWait: '等你決定', stDone: '完成', stReady: '準備好了',
    llm: '語言模型', chatNoLoop: '只回覆一段文字，不進入迴圈',
    capReady: '按「執行」開始。Agent 會先想下一步，再呼叫工具，然後看結果。',
    ask: 'Agent 想寄信給 {who}，要允許嗎？', allow: '允許寄出', deny: '不允許',
    chatReply: '我沒辦法打開你電腦裡的檔案，但可以告訴你怎麼做：① 打開本週的檢驗報告檔；② 依複驗規則（例如鉀離子過高或過低、檢體溶血）逐筆檢查；③ 把符合的報告整理成清單；④ 寄信通知負責的醫檢師。如果你把報告內容貼給我，我可以幫你檢查。',
    tools: { list_files: '列出檔案', read_file: '讀取檔案', run_code: '執行程式', write_file: '寫入檔案', send_email: '寄出 email' },
    steps: [
      { th: '先讀取本週的報告檔。', ob: '錯誤：找不到 reports.csv' },
      { th: '檔名可能不一樣。先列出資料夾裡有哪些檔案。', ob: '找到 3 個檔案：reports-week41.csv、review-rules.md、staff.csv' },
      { th: '先讀複驗規則，才知道要找什麼。', ob: '規則：鉀 K 高於 5.5 或低於 3.0 mmol/L 要複驗；檢體溶血要重新採檢。' },
      { th: '再讀本週的報告。', ob: '共 48 筆報告，欄位：編號、項目、數值、檢體狀態。' },
      { th: '48 筆用眼睛看容易漏，寫一段程式依規則篩選。', ob: '符合 3 筆：#1042 K=6.1、#1057 溶血、#1071 K=2.8' },
      { th: '把結果存成清單檔。', ob: '已建立 recheck-list.md（3 筆）' },
      { th: '查生化組的負責人。', ob: '生化組負責人：王醫檢師（chem-lead@lab.example）' },
      { th: '寄信是寄出就收不回的動作，先問使用者。', thNoAsk: '寄信通知生化組負責人。', ob: '已寄出通知給王醫檢師。', obDeny: '使用者不允許，沒有寄信。' }
    ],
    final: '完成！本週有 3 筆報告需要複驗（#1042、#1057、#1071），清單存在 recheck-list.md，也已寄信通知王醫檢師。',
    finalDeny: '清單完成：本週有 3 筆報告需要複驗，存在 recheck-list.md。依你的決定沒有寄信，請自行通知王醫檢師。',
    // how / compare
    how1H: 'LV1 · 生成式 AI 怎麼寫出回答',
    how1: '<li><strong>切成 token。</strong>模型把文字切成一小段一小段（token），一次只處理一個。</li>' +
      '<li><strong>看前文，算機率。</strong>依照前面的文字，替每個可能的下一個詞算出機率，就是右邊的長條。</li>' +
      '<li><strong>抽一個，接上去。</strong>依機率抽出一個詞接在後面，再重複，直到句號。溫度越高，越容易抽到機率低的詞。</li>' +
      '<li><strong>通順不等於正確。</strong>模型只管「接下去像不像」，不會自己查證。訓練資料裡沒有的組合，可能就是幻覺。</li>',
    how1Note: '和打磚塊比一比：打磚塊的模型每次只輸出一個數字（落點）；生成式 AI 每一步輸出「每個詞的機率」，再一個詞一個詞產生整段文字。Chat 就是把你的問題當成前文，讓模型接著寫下去。',
    how2H: 'LV2 · 推理模式在做什麼',
    how2: '<li><strong>直接回答：</strong>看完問題馬上寫答案。快、便宜，簡單問題通常就夠了。</li>' +
      '<li><strong>推理模式：</strong>先產生一段「思考」文字，像打草稿一樣把問題拆成步驟、計算、回頭檢查，最後才寫答案。</li>' +
      '<li><strong>代價：</strong>思考的文字也是 token，要多花時間和費用。簡單的問題，想了也只是比較慢。</li>' +
      '<li>ChatGPT、Claude、Gemini 都有推理（thinking）模式，有些會自己決定要想多久。</li>',
    how2Note: '推理能減少多步驟計算的錯誤，但不保證正確。和醫療有關的數字，仍要自己核對。',
    how3H: 'LV3 · AI Agent 怎麼把事情做完',
    how3: '<li><strong>想：</strong>語言模型讀任務和目前知道的資訊，決定下一步要做什麼。</li>' +
      '<li><strong>做：</strong>呼叫工具，例如列出檔案、讀檔、執行程式、寫檔、寄信。</li>' +
      '<li><strong>看：</strong>讀工具傳回的結果（包括錯誤訊息），放進工作記憶，再回到「想」。</li>' +
      '<li><strong>出錯會換方法：</strong>第 1 步找不到檔案，它就先列出資料夾，找到正確的檔名。</li>' +
      '<li><strong>人在迴圈中：</strong>寄信、刪檔這類做了就收不回的動作，應該先問人。</li>',
    how3Note: 'Claude Code、OpenAI Codex、Gemini CLI 都是這類 Agent：同一個語言模型，加上工具和「想 → 做 → 看」的迴圈，就從「回答問題」變成「完成工作」。',
    cmpH: '三關一次看',
    cmpTable: '<table class="cmp"><thead><tr><th></th><th>LV1 生成式 AI（Chat）</th><th>LV2 加上推理</th><th>LV3 AI Agent</th></tr></thead><tbody>' +
      '<tr><th scope="row">做什麼</th><td>看前文，一次接一個詞</td><td>先寫思考草稿，再寫答案</td><td>反覆「想 → 做 → 看」，用工具完成任務</td></tr>' +
      '<tr><th scope="row">交出什麼</th><td>一段文字回答</td><td>思考過程 + 回答</td><td>檔案、訊息等實際成果</td></tr>' +
      '<tr><th scope="row">適合</th><td>解釋、草稿、翻譯、腦力激盪</td><td>計算、單位換算、多步驟推論</td><td>讀資料、整理、跨好幾步的工作</td></tr>' +
      '<tr><th scope="row">要注意</th><td>可能一本正經地說錯（幻覺）</td><td>比較慢、比較耗 token</td><td>工具權限要設好，重要動作由人確認</td></tr>' +
      '</tbody></table>'
  },
  en: {
    h1: 'CHAT <span>TO AGENT</span>', langBtn: '中文',
    tag: 'Three levels: how generative AI writes one word at a time, why reasoning models think before they answer, and how an AI agent uses tools to get a job done.',
    lv1: 'Generative AI: one word at a time', lv1Sub: 'What ChatGPT, Claude and Gemini do at heart',
    lv2: 'Reasoning: think, then answer', lv2Sub: 'Direct answer vs. thinking mode',
    lv3: 'AI agent: think → act → observe', lv3Sub: 'Uses tools to actually do the work',
    speedL: 'Animation speed',
    modeH: 'Mode', manual: 'Manual', manualSub: 'You pick the next word', auto: 'Computer (auto)', autoSub: 'The model samples words',
    tempL: 'Temperature', tempLo: 'steady, safe', tempHi: 'varied (and riskier)',
    btnStep1: 'Let the model add a word', btnClear: 'Clear chat',
    hint1Manual: 'Pick a start at the lower left, then keep choosing a next word below until a full stop appears.',
    hint1Auto: 'The model samples each next word by probability. Raise the temperature and watch for odd sentences.',
    probH: 'Next-word probabilities (after temperature)', ctxL: 'Context the model matched:',
    probEmpty: 'Pick a start at the lower left first.', probDone: 'Sentence finished. Pick another start.', probMore: '{n} less likely words not shown',
    legHi: 'likely', legMid: 'less likely', legLo: 'unlikely (more common at high temperature)',
    s1Tok: 'words the model added', s1Avg: 'avg probability of chosen words', s1Ans: 'answers finished', s1Novel: 'sentences not in training data',
    seedsL: 'Pick a start', chatEmpty: 'Pick a start and watch the model continue it one word at a time.',
    userSay: 'Please continue: {seed}…', stWriting: 'writing', stIdle: 'idle',
    vCopy: '✓ Identical to training sentence {n}: it was memorised.',
    vNovel: '⚠ This sentence is not in the training data. It reads fine but may be stitched together (a hallucination). Check it.',
    vCut: '⚠ Too long, stopped here.',
    corpusH: 'Training data', datasetL: 'Dataset', expanded: 'Expanded', original: 'Original',
    corpusCount: 'View the selected training data ({n} sentences)',
    datasetScore: 'Top next-word prediction: original {original}/{total}, expanded {expanded}/{total}.',
    checksH: 'See the test phrases and predictions',
    checkRow: '“{context} ___” Expected: {expected} | Original: {original} | Expanded: {expanded}',
    noPrediction: 'No candidate',
    checksNote: 'Both versions pick the highest-probability word. The full test phrases are held out and check coverage of the added topics.',
    corpusNote: 'The expanded version adds examples about measurement records, unit conversions, and tables. Use the same starter and temperature to compare the candidates.',
    qH: 'Pick a question', guessH: 'Your guess: which side will be right?', g0: 'Only the direct answer', g1: 'Only the reasoning one', g2: 'Both',
    go: 'Start the race', again: 'Next question / race again', needGuess: 'Make a guess first, then start the race.',
    score: '{a} / {b} guesses right',
    fastT: 'Direct answer', fastSub: 'Standard mode: answers right away', slowT: 'Reason, then answer', slowSub: 'Thinking mode: works on a scratchpad first',
    thinking: 'Thinking…', thought: 'Thought for {n} words', units: '{n} words',
    ok: '✓ Correct', no: '✗ Wrong', youRight: 'You guessed right!', youWrong: 'Not this time.', truth: 'Correct answer: {a}',
    lv2Note: 'Scripted demo: real direct answers are not always wrong, and reasoning models can still make mistakes. A person should always check doses and conversions.',
    taskH: 'The task given to the AI', task: '“Which lab reports need a re-test this week? Make a list and notify the technologist in charge.”',
    chatMode: 'Chat (answers only)', chatModeSub: 'Can’t see your files', agentMode: 'Agent (does the work)', agentModeSub: 'Reads, computes, writes with tools',
    play: 'Run', pause: 'Pause', btnStep3: 'Next step', btnReset: 'Restart', approveL: 'Ask me before sending email',
    hint3Agent: 'Press Run to watch the agent loop through think → act → observe, or use Next step to go one move at a time.',
    hint3Chat: 'The same task given to a chat model. It has no tools, so it can only tell you what to do.',
    s3Loops: 'loops', s3Tools: 'tool calls', s3Fix: 'errors it recovered from', s3Ctx: 'working memory (chars)',
    toolsH: 'Toolbox', wsH: 'Working folder', logH: 'Run log', logEmpty: 'Not started yet.',
    outbox: 'Outbox: {n} sent', ph0: 'Think', ph1: 'Act', ph2: 'See', ph0s: 'plan', ph1s: 'use a tool', ph2s: 'observe',
    tgThink: 'THINK', tgAct: 'ACT', tgObs: 'SEE', tgDone: 'DONE', tgChat: 'CHAT', tgErr: 'ERROR',
    ringAgent: 'AGENT LOOP', ringChat: 'CHAT', stRun: 'running', stWait: 'your call', stDone: 'done', stReady: 'ready',
    llm: 'language model', chatNoLoop: 'Replies once with text; no loop',
    capReady: 'Press Run. The agent plans a step, calls a tool, then looks at the result.',
    ask: 'The agent wants to email {who}. Allow it?', allow: 'Allow', deny: 'Don’t send',
    chatReply: 'I can’t open files on your computer, but here is how to do it: ① open this week’s lab report file; ② check each row against the re-test rules (for example potassium too high or too low, or a hemolysed sample); ③ list the reports that match; ④ email the technologist in charge. If you paste the reports here, I can check them for you.',
    tools: { list_files: 'list a folder', read_file: 'read a file', run_code: 'run code', write_file: 'write a file', send_email: 'send email' },
    steps: [
      { th: 'First, read this week’s report file.', ob: 'Error: reports.csv not found' },
      { th: 'The file name may be different. List the folder first.', ob: 'Found 3 files: reports-week41.csv, review-rules.md, staff.csv' },
      { th: 'Read the re-test rules first, so I know what to look for.', ob: 'Rules: potassium K above 5.5 or below 3.0 mmol/L → re-test; hemolysed sample → collect again.' },
      { th: 'Now read this week’s reports.', ob: '48 reports. Columns: ID, test, value, sample status.' },
      { th: '48 rows are easy to miss by eye. Write a little code to filter them by the rules.', ob: '3 matches: #1042 K=6.1, #1057 hemolysed, #1071 K=2.8' },
      { th: 'Save the result as a list file.', ob: 'Created recheck-list.md (3 rows)' },
      { th: 'Look up who runs the chemistry section.', ob: 'Chemistry lead: Wang (chem-lead@lab.example)' },
      { th: 'An email can’t be unsent, so ask the user first.', thNoAsk: 'Email the chemistry lead.', ob: 'Notice sent to Wang.', obDeny: 'The user said no. No email sent.' }
    ],
    final: 'Done. 3 reports need a re-test this week (#1042, #1057, #1071). The list is in recheck-list.md and Wang has been emailed.',
    finalDeny: 'List done: 3 reports need a re-test, saved in recheck-list.md. As you decided, no email was sent, so please tell Wang yourself.',
    how1H: 'LV1 · How generative AI writes an answer',
    how1: '<li><strong>Split into tokens.</strong> Text is cut into small pieces (tokens), handled one at a time.</li>' +
      '<li><strong>Read the context, score the options.</strong> Given the text so far, the model gives every possible next word a probability: the bars on the right.</li>' +
      '<li><strong>Pick one, append, repeat.</strong> It samples a word by probability, adds it and repeats until a full stop. Higher temperature means unlikely words get picked more often.</li>' +
      '<li><strong>Fluent is not the same as true.</strong> The model only asks “does this continue well?” and never checks facts. Combinations that are not in its training data may be hallucinations.</li>',
    how1Note: 'Compare with Arkanoid: that model outputs one number (where the ball lands). A generative model outputs a probability for every word, at every step, and builds a whole text word by word. A chat is simply your question used as the context to continue.',
    how2H: 'LV2 · What reasoning mode does',
    how2: '<li><strong>Direct answer:</strong> writes the answer straight away. Fast and cheap, often enough for simple questions.</li>' +
      '<li><strong>Reasoning mode:</strong> first writes some “thinking” text, like a scratchpad: breaks the problem into steps, calculates, checks, then answers.</li>' +
      '<li><strong>The cost:</strong> thinking text is tokens too, so it takes more time and money. On simple questions it is just slower.</li>' +
      '<li>ChatGPT, Claude and Gemini all offer a reasoning (thinking) mode; some decide by themselves how long to think.</li>',
    how2Note: 'Reasoning cuts errors in multi-step calculations but does not guarantee a correct answer. Check any clinical number yourself.',
    how3H: 'LV3 · How an AI agent gets things done',
    how3: '<li><strong>Think:</strong> the language model reads the task and what it knows so far, and decides the next step.</li>' +
      '<li><strong>Act:</strong> it calls a tool: list files, read a file, run code, write a file, send an email.</li>' +
      '<li><strong>Observe:</strong> it reads what the tool returned (errors included), adds it to its working memory and goes back to Think.</li>' +
      '<li><strong>Errors make it change course:</strong> when step 1 cannot find the file, it lists the folder and finds the right name.</li>' +
      '<li><strong>Human in the loop:</strong> actions that cannot be undone, like sending email or deleting files, should be approved by a person.</li>',
    how3Note: 'Claude Code, OpenAI Codex and Gemini CLI are agents like this: the same language model, plus tools and a think → act → observe loop, turns “answering” into “getting the work done”.',
    cmpH: 'All three levels at a glance',
    cmpTable: '<table class="cmp"><thead><tr><th></th><th>LV1 Generative AI (chat)</th><th>LV2 + reasoning</th><th>LV3 AI agent</th></tr></thead><tbody>' +
      '<tr><th scope="row">What it does</th><td>Continues the context one word at a time</td><td>Writes a thinking draft, then the answer</td><td>Loops think → act → observe, using tools</td></tr>' +
      '<tr><th scope="row">What you get</th><td>A text answer</td><td>Reasoning + answer</td><td>Real results: files, messages</td></tr>' +
      '<tr><th scope="row">Good for</th><td>Explaining, drafting, translating, ideas</td><td>Calculations, conversions, multi-step logic</td><td>Reading data, organising, multi-step jobs</td></tr>' +
      '<tr><th scope="row">Watch out for</th><td>Confidently wrong answers (hallucination)</td><td>Slower, uses more tokens</td><td>Set tool permissions; a person approves key actions</td></tr>' +
      '</tbody></table>'
  }
};

// Training sentences (tokens separated by spaces), starts, and race questions per language.
const DATA = {
  zh: {
    corpus: [
      '空腹血糖 的 正常 範圍 是 70 到 99 mg/dL 。',
      '空腹血糖 達到 126 mg/dL 以上 ， 可能 是 糖尿病 ， 需要 再 檢查 確認 。',
      '血壓 的 正常 範圍 是 收縮壓 小於 120 mmHg 。',
      '血壓 太 高 時 ， 應該 休息 五 分鐘 再 量 一次 。',
      '成人 的 正常 體溫 約 是 36.5 到 37.5 °C 。',
      '體溫 達到 38 °C 以上 ， 通常 稱為 發燒 。',
      '成人 的 正常 心跳 是 每 分鐘 60 到 100 下 。',
      '白血球 的 正常 範圍 是 每 微升 4000 到 10000 個 。',
      '白血球 太 高 時 ， 可能 有 感染 ， 需要 醫師 判斷 。',
      '發燒 時 ， 應該 多 喝 水 並 好好 休息 。',
      '糖尿病 的 病人 應該 定期 檢查 血糖 。',
      '量 血壓 前 ， 應該 先 休息 五 分鐘 。'
    ],
    seeds: [['空腹血糖'], ['血壓'], ['成人', '的'], ['白血球'], ['體溫'], ['發燒']],
    qs: [
      { label: '發燒的英文', q: '「發燒」的英文是什麼？', fast: 'Fever。', fastOk: true,
        think: '問的是中文「發燒」的英文。這是常見的醫學詞彙，不需要計算。答案是 fever。', ans: 'Fever。', truth: 'Fever', best: 2,
        lesson: '簡單的題目，兩邊都答對。推理只是多花了時間和 token。' },
      { label: '藥可以吃幾天', q: '藥袋寫：每次 2 顆，一天 3 次。共拿了 4 盒，每盒 28 顆。可以吃幾天？', fast: '可以吃 28 天。', fastOk: false,
        think: '一天要吃 2 × 3 = 6 顆。\n總共有 4 × 28 = 112 顆。\n112 ÷ 6 = 18 餘 4。\n檢查：18 × 6 = 108，112 − 108 = 4。\n所以能吃滿 18 天，會剩 4 顆。', ans: '可以吃滿 18 天，最後剩 4 顆。', truth: '18 天（剩 4 顆）', best: 1,
        lesson: '要算好幾步的題目，直接回答容易被題目裡的「28」帶著走；先推理能一步一步算，還會回頭檢查。' },
      { label: '血糖單位換算', q: '血糖 126 mg/dL 等於多少 mmol/L？（18 mg/dL = 1 mmol/L）', fast: '大約 7.5 mmol/L。', fastOk: false,
        think: '要從 mg/dL 換成 mmol/L，所以除以 18。\n126 ÷ 18：18 × 7 = 126，剛好整除。\n檢查：7 × 18 = 126，正確。', ans: '等於 7.0 mmol/L。', truth: '7.0 mmol/L', best: 1,
        lesson: '「看起來差不多」的數字最危險。推理模式把算式寫出來再驗算，就能抓到錯誤。' }
    ]
  },
  en: {
    corpus: [
      'Fasting glucose is normally 70 to 99 mg/dL .',
      'Fasting glucose of 126 mg/dL or higher may mean diabetes , so test again to confirm .',
      'Blood pressure is normally below 120 mmHg systolic .',
      'When blood pressure is high , rest five minutes and measure again .',
      'An adult body temperature is normally 36.5 to 37.5 °C .',
      'A body temperature of 38 °C or higher is called a fever .',
      'An adult heart rate is normally 60 to 100 beats per minute .',
      'White blood cells are normally 4000 to 10000 per microliter .',
      'When white blood cells are high , there may be an infection , so a doctor should decide .',
      'With a fever , drink water and rest well .',
      'People with diabetes should check blood glucose regularly .',
      'Before measuring blood pressure , rest five minutes .'
    ],
    seeds: [['Fasting', 'glucose'], ['Blood', 'pressure'], ['An', 'adult'], ['White', 'blood', 'cells'], ['A', 'body', 'temperature'], ['With', 'a', 'fever']],
    qs: [
      { label: 'Fever in Chinese', q: 'What is the Chinese word for “fever”?', fast: '發燒 (fāshāo).', fastOk: true,
        think: 'The question asks for the Chinese word for “fever”. It is a common medical word and needs no calculation. The answer is 發燒.', ans: '發燒 (fāshāo).', truth: '發燒', best: 2,
        lesson: 'An easy question: both are right. Reasoning only cost extra time and tokens.' },
      { label: 'Days of medicine', q: 'The label says: 2 tablets each time, 3 times a day. You got 4 boxes of 28 tablets. How many days will they last?', fast: 'They will last 28 days.', fastOk: false,
        think: 'Per day: 2 × 3 = 6 tablets.\nIn total: 4 × 28 = 112 tablets.\n112 ÷ 6 = 18 remainder 4.\nCheck: 18 × 6 = 108, and 112 − 108 = 4.\nSo 18 full days, with 4 tablets left.', ans: '18 full days, with 4 tablets left over.', truth: '18 days (4 left)', best: 1,
        lesson: 'With several steps, a direct answer is easily pulled toward the “28” in the question. Reasoning works step by step and checks itself.' },
      { label: 'Glucose units', q: 'Blood glucose 126 mg/dL is how many mmol/L? (18 mg/dL = 1 mmol/L)', fast: 'About 7.5 mmol/L.', fastOk: false,
        think: 'Going from mg/dL to mmol/L, so divide by 18.\n126 ÷ 18: 18 × 7 = 126, exactly.\nCheck: 7 × 18 = 126. Correct.', ans: 'It is 7.0 mmol/L.', truth: '7.0 mmol/L', best: 1,
        lesson: 'A number that looks “about right” is the most dangerous kind. Writing the sum out and checking it catches the mistake.' }
    ]
  }
};
const EXTRA = {
  zh: {
    // Measurement records, unit conversions, and data organization.
    corpora: [
      [
        '血壓 量測 後 記下 日期 與 時間 。',
        '血壓 量測 後 記下 收縮壓 與 舒張壓 。',
        '體溫 量測 後 記下 量測 部位 。',
        '體溫 紀錄 要 包含 量測 時間 。',
        '量測 紀錄 要 包含 數值 與 單位 。',
        '量測 紀錄 可 依 時間 排列 。'
      ],
      [
        '一 公升 等於 1000 毫升 。',
        '一 毫升 等於 1000 微升 。',
        '一 公克 等於 1000 毫克 。',
        '一 公斤 等於 1000 公克 。',
        '半 公升 等於 500 毫升 。',
        '兩 公升 等於 2000 毫升 。'
      ],
      [
        '整理 表格 時 每 欄 使用 清楚 的 欄名 。',
        '整理 表格 時 每 列 代表 一筆 紀錄 。',
        '缺少 數值 時 將 欄位 標記 為 缺值 。',
        '重複 的 紀錄 可 用 編號 核對 。',
        '同一 欄 的 數值 使用 相同 的 單位 。',
        '匯出 表格 前 先 核對 欄名 與 單位 。'
      ]
    ],
    seeds: [['量測', '紀錄'], ['一', '公升'], ['整理', '表格']],
    checks: [
      ['表格 裡 的 體溫 紀錄 要 包含 量測', '時間'],
      ['這筆 血壓 量測 後 記下 日期 與', '時間'],
      ['換算 時 一 公克 等於 1000', '毫克'],
      ['已知 半 公升 等於 500', '毫升'],
      ['請注意 整理 表格 時 每 列 代表 一筆', '紀錄'],
      ['遇到 缺少 數值 時 將 欄位 標記 為', '缺值']
    ]
  },
  en: {
    corpora: [
      [
        'Blood pressure logs include the date and time .',
        'Blood pressure logs include systolic and diastolic values .',
        'A body temperature log records the measurement site .',
        'A body temperature log includes the measurement time .',
        'Measurement records include a value and a unit .',
        'Measurement records can be sorted by time .'
      ],
      [
        'One liter equals 1000 milliliters .',
        'One milliliter equals 1000 microliters .',
        'One gram equals 1000 milligrams .',
        'One kilogram equals 1000 grams .',
        'Half a liter equals 500 milliliters .',
        'Two liters equal 2000 milliliters .'
      ],
      [
        'In a table each column has a clear heading .',
        'In a table each row represents one record .',
        'Mark a missing value as missing .',
        'Check for duplicate records using their IDs .',
        'Use the same unit for values in one column .',
        'Check headings and units before exporting a table .'
      ]
    ],
    seeds: [['Measurement', 'records'], ['One', 'liter'], ['In', 'a', 'table']],
    checks: [
      ["The student's body temperature log records the measurement", 'site'],
      ['Our blood pressure logs include the date and', 'time'],
      ['For this conversion one liter equals 1000', 'milliliters'],
      ['Remember that half a liter equals 500', 'milliliters'],
      ['In this table each row represents one', 'record'],
      ['In our records, mark a missing value as', 'missing']
    ]
  }
};

// Agent script: tools and effects are the same in both languages; text comes from I18N[lang].steps.
const TOOL_NAMES = ['list_files', 'read_file', 'run_code', 'write_file', 'send_email'];
const FILES = ['reports-week41.csv', 'review-rules.md', 'staff.csv'];
const STEPS = [
  { tool: 'read_file', arg: 'reports.csv', err: true },
  { tool: 'list_files', arg: '.', fix: true, read: FILES },
  { tool: 'read_file', arg: 'review-rules.md', read: ['review-rules.md'] },
  { tool: 'read_file', arg: 'reports-week41.csv', read: ['reports-week41.csv'] },
  { tool: 'run_code', arg: 'filter(K > 5.5 or K < 3.0 or hemolysed)' },
  { tool: 'write_file', arg: 'recheck-list.md', write: 'recheck-list.md' },
  { tool: 'read_file', arg: 'staff.csv', read: ['staff.csv'] },
  { tool: 'send_email', arg: 'chem-lead@lab.example', ask: true }
];

let lang = 'zh';
try { const saved = localStorage.getItem('genai-agent-lang'); if (saved in I18N) lang = saved; } catch (e) {}
const t = k => I18N[lang][k];
const fill = (k, v = {}) => t(k).replace(/\{(\w+)\}/g, (_, n) => v[n] ?? '');
const D = () => DATA[lang];
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const C = { ink: css('--ink'), panel: css('--panel'), line: css('--line'), fg: css('--fg'), muted: css('--muted'),
  amber: css('--amber'), cyan: css('--cyan'), coral: css('--coral'), lime: css('--lime'), violet: css('--violet') };
const cjk = () => lang === 'zh' ? '"Noto Sans TC", "PingFang TC", ' : '';
const fBody = (px, w = 400) => `${w} ${px}px ${cjk()}"IBM Plex Sans", sans-serif`;
const fMono = px => `${px}px "IBM Plex Mono", ${cjk()}monospace`;
let speedMul = 1, level = 1;

// Join tokens for display: Chinese runs together, but keep a space between Latin/number tokens; English uses spaces.
const LATIN_END = /[A-Za-z0-9.%\/°)]$/, LATIN_START = /^[A-Za-z0-9°(]/;
function needsSpace(prev, tok) {
  if (!prev) return false;
  if (lang === 'en') return !/^[.,]$/.test(tok);
  return LATIN_END.test(prev) && LATIN_START.test(tok);
}
const joinToks = arr => arr.reduce((s, tok, i) => s + (needsSpace(arr[i - 1], tok) ? ' ' : '') + tok, '');
const isEnd = tok => tok === '。' || tok === '.';

// =====================================================================
// LV1 · a tiny "longest-match" n-gram language model
// For each context length k (1..6) count which word followed. The longest
// matching context dominates; shorter ones leak in with small weight, which
// is what lets the model stitch facts from different sentences together.
// =====================================================================
const MAXK = 6, BACKOFF = 0.12;
let models;
let model;
const contextKey = words => words.join('\u0001').toLowerCase();
function buildModel(corpus, seeds) {
  const sents = corpus.map(s => s.split(' '));
  const maps = [null]; for (let k = 1; k <= MAXK; k++) maps.push(new Map());
  for (const s of sents) for (let i = 0; i < s.length - 1; i++) for (let k = 1; k <= Math.min(MAXK, i + 1); k++) {
    const key = contextKey(s.slice(i - k + 1, i + 1));
    let m = maps[k].get(key); if (!m) maps[k].set(key, m = new Map());
    m.set(s[i + 1], (m.get(s[i + 1]) || 0) + 1);
  }
  return { sents, maps, seeds };
}
let temp = 1;
function nextDist(ctx, activeModel = model, temperature = temp) {
  const levels = [];
  for (let k = Math.min(MAXK, ctx.length); k >= 1; k--) { const m = activeModel.maps[k].get(contextKey(ctx.slice(-k))); if (m) levels.push({ k, m }); }
  if (!levels.length) return null;
  const acc = new Map(); let w = 1, ws = 0;
  for (const { m } of levels) {
    let c = 0; for (const v of m.values()) c += v;
    for (const [tok, v] of m) acc.set(tok, (acc.get(tok) || 0) + w * v / c);
    ws += w; w *= BACKOFF;
  }
  const list = [...acc].map(([tok, p]) => ({ tok, p: p / ws }));
  let z = 0; for (const o of list) { o.q = Math.pow(o.p, 1 / temperature); z += o.q; }
  for (const o of list) o.q /= z;
  list.sort((a, b) => b.q - a.q);
  return { list, k: levels[0].k };
}
function sample(list) { let r = Math.random(); for (let i = 0; i < list.length; i++) { r -= list[i].q; if (r <= 0) return i; } return list.length - 1; }

const s1 = { mode: 'manual', conv: [], cur: null, dist: null, picked: -1, wait: 0, autoNext: 0, lastSeed: -1, hit: -1,
  stats: { tok: 0, psum: 0, ans: 0, novel: 0 } };
function startSeed(i) {
  if (s1.cur && !s1.cur.done) s1.conv.pop();
  const seed = model.seeds[i];
  s1.cur = { seed: i, toks: seed.map(tok => ({ tok, seed: true })), done: false, verdict: null };
  s1.conv.push(s1.cur); while (s1.conv.length > 4) s1.conv.shift();
  s1.lastSeed = i; s1.wait = 0; s1.hit = -1;
  refreshDist(); renderChat(); renderSeeds(); renderCorpus();
}
function refreshDist() {
  s1.picked = -1; s1.wait = 0;
  s1.dist = s1.cur && !s1.cur.done ? nextDist(s1.cur.toks.map(o => o.tok)) : null;
  renderBars();
}
function choose(o) {
  const cur = s1.cur; if (!cur || cur.done) return;
  cur.toks.forEach(x => x.fresh = false);
  cur.toks.push({ tok: o.tok, p: o.q, fresh: true });
  s1.stats.tok++; s1.stats.psum += o.q;
  const gen = cur.toks.filter(x => !x.seed).length;
  if (isEnd(o.tok) || gen >= 40) finish(gen >= 40 && !isEnd(o.tok));
  else refreshDist();
  renderChat(); renderStats1();
}
function finish(cut) {
  const cur = s1.cur; cur.done = true; s1.stats.ans++;
  const text = cur.toks.map(x => x.tok).join(' ');
  const idx = model.sents.findIndex(s => s.join(' ') === text);
  cur.verdict = cut ? { cut: true } : idx >= 0 ? { copy: idx + 1 } : { novel: true };
  if (idx < 0) s1.stats.novel++;
  s1.hit = idx; s1.autoNext = 2200;
  refreshDist(); renderCorpus();
}
function tok1Class(o) { if (o.seed) return 'seed'; return o.p >= 0.5 ? 'hi' : o.p >= 0.15 ? 'mid' : 'lo'; }
function renderChat() {
  const box = $('msgs');
  if (!s1.conv.length) { box.innerHTML = `<p class="empty">${esc(t('chatEmpty'))}</p>`; $('chatState').textContent = t('stIdle'); return; }
  box.innerHTML = s1.conv.map(c => {
    const seedText = joinToks(model.seeds[c.seed]);
    const words = c.toks.map(x => x.tok);
    const body = c.toks.map((x, i) => (needsSpace(words[i - 1], x.tok) ? ' ' : '') +
      `<span class="tok ${tok1Class(x)}${x.fresh ? ' fresh' : ''}"${x.seed ? '' : ` title="p = ${(x.p * 100).toFixed(1)}%"`}>${esc(x.tok)}</span>`).join('');
    const v = c.verdict;
    const verdict = !v ? '<span class="caret"></span>' :
      v.copy ? `<span class="verdict copy">${esc(fill('vCopy', { n: v.copy }))}</span>` :
      `<span class="verdict novel">${esc(t(v.cut ? 'vCut' : 'vNovel'))}</span>`;
    return `<div class="msg user">${esc(fill('userSay', { seed: seedText }))}</div><div class="msg ai"><span class="who">AI</span>${body}${verdict}</div>`;
  }).join('');
  box.scrollTop = box.scrollHeight;
  const writing = s1.cur && !s1.cur.done;
  $('chatState').textContent = t(writing ? 'stWriting' : 'stIdle');
  $('chatState').className = writing ? 'on' : '';
}
function renderBars() {
  const d = s1.dist, cur = s1.cur;
  if (!d) {
    $('ctx').textContent = '';
    $('bars').innerHTML = `<p class="bars-empty">${esc(t(cur && cur.done ? 'probDone' : 'probEmpty'))}</p>`;
    $('step1').disabled = true; return;
  }
  const words = cur.toks.map(x => x.tok), k = d.k;
  const before = words.slice(Math.max(0, words.length - k - 4), words.length - k);
  $('ctx').innerHTML = esc(t('ctxL')) + ' ' + (before.length ? '…' + esc(joinToks(before)) + ' ' : '') + `<mark>${esc(joinToks(words.slice(-k)))}</mark> → ?`;
  const top = d.list.slice(0, 6), auto = s1.mode === 'auto';
  $('bars').innerHTML = top.map((o, i) =>
    `<button class="bar${i === s1.picked ? ' picked' : ''}" data-i="${i}"${auto ? ' disabled' : ''}><span class="w">${esc(o.tok)}</span><span class="track"><span class="fill" style="width:${(o.q * 100).toFixed(1)}%"></span></span><span class="pct">${o.q >= 0.995 ? '100%' : (o.q * 100).toFixed(o.q < 0.1 ? 1 : 0) + '%'}</span></button>`).join('') +
    (d.list.length > 6 ? `<p class="bars-empty" style="font-size:12px">${esc(fill('probMore', { n: d.list.length - 6 }))}</p>` : '');
  $('step1').disabled = auto;
}
function renderSeeds() {
  $('seeds').innerHTML = model.seeds.map((s, i) =>
    `<button class="chip" data-seed="${i}" aria-pressed="${!!(s1.cur && s1.cur.seed === i && !s1.cur.done)}">${esc(joinToks(s))}…</button>`).join('');
}
function renderCorpus() {
  $('corpus-count').textContent = fill('corpusCount', { n: model.sents.length });
  if (s1.hit >= 0) $('corpus').parentElement.open = true;
  $('corpus').innerHTML = model.sents.map((s, i) => `<li${i === s1.hit ? ' class="hit"' : ''}>${esc(joinToks(s))}</li>`).join('');
}
function renderDatasetChecks() {
  const checks = EXTRA[lang].checks;
  const score = { original: 0, expanded: 0, total: checks.length };
  $('dataset-checks').innerHTML = checks.map(([phrase, expected]) => {
    const words = phrase.split(' ');
    const original = nextDist(words, models.original, 1)?.list[0].tok;
    const expanded = nextDist(words, models.expanded, 1)?.list[0].tok;
    score.original += Number(original === expected);
    score.expanded += Number(expanded === expected);
    return `<li>${esc(fill('checkRow', {
      context: joinToks(words), expected,
      original: original ?? t('noPrediction'), expanded: expanded ?? t('noPrediction')
    }))}</li>`;
  }).join('');
  $('dataset-score').textContent = fill('datasetScore', score);
}
function selectDataset() {
  model = models[$('dataset').value];
  Object.assign(s1, {
    conv: [], cur: null, hit: -1, lastSeed: -1, autoNext: 600,
    stats: { tok: 0, psum: 0, ans: 0, novel: 0 }
  });
  refreshDist(); renderChat(); renderSeeds(); renderCorpus(); renderStats1();
}
function renderStats1() {
  const st = s1.stats;
  $('s1-tok').textContent = st.tok.toLocaleString();
  $('s1-avg').textContent = st.tok ? Math.round(st.psum / st.tok * 100) + '%' : '–';
  $('s1-ans').textContent = st.ans;
  const nv = $('s1-novel'); nv.textContent = st.novel; nv.className = st.novel ? 'bad' : '';
}
function setMode1(m) {
  s1.mode = m;
  $('m1-manual').setAttribute('aria-pressed', m === 'manual');
  $('m1-auto').setAttribute('aria-pressed', m === 'auto');
  $('hint1').textContent = t(m === 'auto' ? 'hint1Auto' : 'hint1Manual');
  s1.picked = -1; s1.wait = 0; s1.autoNext = 400;
  renderBars();
}
function tick1(dt) {
  if (s1.mode !== 'auto') return;
  const d = dt * speedMul;
  if (s1.cur && !s1.cur.done && s1.dist) {
    s1.wait += d;
    if (s1.picked < 0 && s1.wait > 520) { s1.picked = sample(s1.dist.list); s1.wait = 0; if (s1.picked > 5) { const o = s1.dist.list[s1.picked]; choose(o); } else renderBars(); }
    else if (s1.picked >= 0 && s1.wait > 320) choose(s1.dist.list[s1.picked]);
  } else {
    s1.autoNext -= d;
    if (s1.autoNext <= 0) {
      const n = model.seeds.length; let i; do { i = Math.random() * n | 0; } while (i === s1.lastSeed && n > 1);
      startSeed(i);
    }
  }
}
$('m1-manual').addEventListener('click', () => setMode1('manual'));
$('m1-auto').addEventListener('click', () => setMode1('auto'));
$('seeds').addEventListener('click', e => { const b = e.target.closest('[data-seed]'); if (b) startSeed(+b.dataset.seed); });
$('bars').addEventListener('click', e => {
  const b = e.target.closest('.bar'); if (!b || b.disabled || !s1.dist) return;
  choose(s1.dist.list[+b.dataset.i]);
});
$('step1').addEventListener('click', () => { if (s1.dist) choose(s1.dist.list[sample(s1.dist.list)]); });
$('dataset').addEventListener('change', selectDataset);
$('clear1').addEventListener('click', () => { s1.conv = []; s1.cur = null; s1.hit = -1; s1.autoNext = 1200; refreshDist(); renderChat(); renderSeeds(); renderCorpus(); });
$('temp').addEventListener('input', e => {
  temp = +e.target.value; $('tempOut').textContent = temp.toFixed(1);
  if (s1.cur && !s1.cur.done) refreshDist();
});

// =====================================================================
// LV2 · direct answer vs. reasoning race (scripted)
// =====================================================================
const s2 = { q: 1, guess: -1, run: false, t: 0, done: false, score: { a: 0, b: 0 }, shown: -1 };
const units = text => lang === 'zh' ? Array.from(text) : text.split(/(\s+)/).filter(Boolean);
const countU = arr => lang === 'zh' ? arr.filter(c => c.trim()).length : arr.filter(w => w.trim()).length;
const rate = () => (lang === 'zh' ? 14 : 5) * speedMul;   // chars (zh) or words (en) per second
function lanes2() {
  const q = D().qs[s2.q];
  return { fast: [{ kind: 'ans', u: units(q.fast) }], slow: [{ kind: 'think', u: units(q.think) }, { kind: 'ans', u: units(q.ans) }] };
}
function reset2(keepQ = true) { s2.run = false; s2.t = 0; s2.done = false; s2.guess = -1; s2.shown = -1; if (!keepQ) s2.q = 0; render2(true); }
function renderLane(id, segs, n, ok, started) {
  let rem = n, html = '', total = 0, shown = 0;
  for (const seg of segs) total += seg.u.length;
  for (const seg of segs) {
    const part = seg.u.slice(0, Math.max(0, rem)); rem -= part.length; shown += countU(part);
    if (seg.kind === 'think') {
      if (!started) continue;
      const fin = part.length === seg.u.length;
      html += `<p class="think"><span class="lab">${esc(fin ? fill('thought', { n: countU(seg.u) }) : t('thinking'))}</span>${esc(part.join(''))}</p>`;
    } else html += `<p class="answer">${esc(part.join(''))}${started && part.length < seg.u.length && part.length > 0 ? '<span class="caret"></span>' : ''}</p>`;
  }
  const fin = started && n >= total;
  if (fin) html += `<span class="badge ${ok ? 'ok' : 'no'}">${esc(t(ok ? 'ok' : 'no'))}</span>`;
  $(id + 'Out').innerHTML = html;
  $(id + 'Count').textContent = started ? fill('units', { n: shown }) : '';
  return total;
}
function render2(force) {
  const q = D().qs[s2.q], L = lanes2();
  const n = Math.floor(s2.t * rate());
  if (!force && n === s2.shown) return;
  s2.shown = n;
  const started = s2.run || s2.done;
  const tf = renderLane('fast', L.fast, n, q.fastOk, started), ts = renderLane('slow', L.slow, n, true, started);
  const max = Math.max(tf, ts);
  $('fastBar').style.width = started ? Math.min(n, tf) / max * 100 + '%' : '0';
  $('slowBar').style.width = started ? Math.min(n, ts) / max * 100 + '%' : '0';
  if (s2.run && n >= max) {
    s2.run = false; s2.done = true; s2.score.b++;
    if (s2.guess === q.best) s2.score.a++;
  }
  if (force || s2.done) {
    $('qchips').innerHTML = D().qs.map((x, i) => `<button class="chip" data-q="${i}" aria-pressed="${i === s2.q}"${s2.run ? ' disabled' : ''}>${esc(x.label)}</button>`).join('');
    $('qtext').textContent = q.q;
    $('guesses').innerHTML = ['g0', 'g1', 'g2'].map((k, i) => `<button class="chip" data-g="${i}" aria-pressed="${i === s2.guess}"${started ? ' disabled' : ''}>${esc(t(k))}</button>`).join('');
    $('go2').textContent = t(s2.done ? 'again' : 'go');
    $('go2').disabled = s2.run || (!s2.done && s2.guess < 0);
    $('score2').textContent = s2.done || s2.score.b ? fill('score', s2.score) : (s2.guess < 0 ? t('needGuess') : '');
    const r = $('result2');
    r.hidden = !s2.done;
    if (s2.done) r.innerHTML = `<p class="label">${esc(t(s2.guess === q.best ? 'youRight' : 'youWrong'))}</p><p><strong>${esc(fill('truth', { a: q.truth }))}</strong></p><p>${esc(q.lesson)}</p>`;
  }
}
function tick2(dt) { if (s2.run) { s2.t += dt / 1000; render2(false); } }
$('qchips').addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (!b || s2.run) return; s2.q = +b.dataset.q; reset2(); });
$('guesses').addEventListener('click', e => { const b = e.target.closest('[data-g]'); if (!b || s2.run || s2.done) return; s2.guess = +b.dataset.g; render2(true); });
$('go2').addEventListener('click', () => {
  if (s2.done) { s2.q = (s2.q + 1) % D().qs.length; reset2(); return; }
  if (s2.guess < 0) return;
  s2.run = true; s2.t = 0; s2.shown = -1; render2(true);
});

// =====================================================================
// LV3 · agent loop: think → act → observe (scripted, interactive approval)
// =====================================================================
const PHASE_MS = 1500;
const s3 = { mode: 'agent', play: false, i: 0, ph: 0, acc: 0, wait: false, approved: null, log: [], files: [], outbox: 0,
  used: {}, tool: null, last: -1, finished: false, chatT: 0, stats: { loops: 0, tools: 0, fix: 0, ctx: 0 } };
function reset3() {
  Object.assign(s3, { play: false, i: 0, ph: 0, acc: 0, wait: false, approved: null, log: [], outbox: 0, used: {}, tool: null,
    last: -1, finished: false, chatT: 0, stats: { loops: 0, tools: 0, fix: 0, ctx: 0 } });
  s3.files = FILES.map(name => ({ name, state: '' }));
  render3();
}
const approveOn = () => $('approve').checked;
function flashFiles(names) {
  for (const f of s3.files) if (names.includes(f.name) && f.state !== 'new') {
    f.state = 'read'; setTimeout(() => { if (f.state === 'read') { f.state = ''; renderFiles(); } }, 1600 / Math.min(speedMul, 2));
  }
}
function advance() {
  if (s3.finished || s3.wait) return;
  if (s3.i >= STEPS.length) {
    s3.log.push({ kind: 'final' }); s3.finished = true; s3.play = false; s3.last = -1; s3.tool = null;
    render3(); return;
  }
  const st = STEPS[s3.i];
  if (s3.ph === 0) {
    s3.log.push({ kind: 'think', i: s3.i, noAsk: st.ask && !approveOn() }); s3.stats.loops++; s3.tool = null; s3.ph = 1;
  } else if (s3.ph === 1) {
    s3.log.push({ kind: 'act', i: s3.i }); s3.stats.tools++; s3.used[st.tool] = (s3.used[st.tool] || 0) + 1; s3.tool = st.tool;
    if (st.ask && approveOn()) { s3.wait = true; s3.approved = null; } else { s3.approved = true; s3.ph = 2; }
  } else {
    const deny = st.ask && s3.approved === false;
    const text = I18N[lang].steps[s3.i][deny ? 'obDeny' : 'ob'];
    if (st.read) flashFiles(st.read);
    if (st.write && !s3.files.some(f => f.name === st.write)) s3.files.push({ name: st.write, state: 'new' });
    if (st.ask && !deny) s3.outbox++;
    if (st.fix) s3.stats.fix++;
    s3.stats.ctx += text.length;
    s3.log.push({ kind: 'obs', i: s3.i, deny, err: !!st.err });
    s3.ph = 0; s3.i++;
  }
  s3.last = s3.log[s3.log.length - 1].kind === 'think' ? 0 : s3.log[s3.log.length - 1].kind === 'act' ? 1 : 2;
  render3();
}
function entryHTML(e) {
  const T = I18N[lang], st = STEPS[e.i];
  if (e.kind === 'think') return [`<span class="tg think">${esc(t('tgThink'))}</span>`, esc(e.noAsk ? T.steps[e.i].thNoAsk : T.steps[e.i].th)];
  if (e.kind === 'act') return [`<span class="tg act">${esc(t('tgAct'))}</span>`, `<code>${esc(st.tool)}(${esc(st.arg)})</code>`];
  if (e.kind === 'obs') return [`<span class="tg ${e.err ? 'err' : 'obs'}">${esc(t(e.err ? 'tgErr' : 'tgObs'))}</span>`, esc(T.steps[e.i][e.deny ? 'obDeny' : 'ob'])];
  if (e.kind === 'final') return [`<span class="tg done">${esc(t('tgDone'))}</span>`, esc(t(s3.approved === false ? 'finalDeny' : 'final'))];
  return [`<span class="tg chat">${esc(t('tgChat'))}</span>`, esc(t('chatReply'))];
}
function renderFiles() {
  $('files').innerHTML = s3.files.map(f => `<li class="${f.state}"><span>${esc(f.name)}</span>${f.state === 'new' ? '<small>new</small>' : ''}</li>`).join('') +
    `<li class="out"><span>${esc(fill('outbox', { n: s3.outbox }))}</span></li>`;
}
function renderCap() {
  const cap = $('cap');
  if (s3.mode === 'chat') {
    const full = Array.from(t('chatReply')), n = Math.min(full.length, Math.floor(s3.chatT * (lang === 'zh' ? 18 : 60)));
    cap.innerHTML = n ? `<span class="tg chat">${esc(t('tgChat'))}</span><p>${esc(full.slice(0, n).join(''))}${n < full.length ? '<span class="caret"></span>' : ''}</p>` : `<p class="keys">${esc(t('hint3Chat'))}</p>`;
    return;
  }
  const e = s3.log[s3.log.length - 1];
  if (!e) { cap.innerHTML = `<p class="keys">${esc(t('capReady'))}</p>`; return; }
  const [tag, body] = entryHTML(e);
  cap.innerHTML = tag + `<p>${body}</p>` + (s3.wait ? `<div class="ask"><p>${esc(fill('ask', { who: STEPS[s3.i].arg }))}</p><div class="row"><button class="btn" id="allow">${esc(t('allow'))}</button><button class="btn ghost" id="deny">${esc(t('deny'))}</button></div></div>` : '');
}
function render3() {
  $('m3-chat').setAttribute('aria-pressed', s3.mode === 'chat');
  $('m3-agent').setAttribute('aria-pressed', s3.mode === 'agent');
  $('hint3').textContent = t(s3.mode === 'chat' ? 'hint3Chat' : 'hint3Agent');
  $('play3').textContent = t(s3.play ? 'pause' : 'play');
  $('step3').disabled = s3.mode === 'chat' || s3.finished || s3.wait;
  $('approve').disabled = s3.mode === 'chat';
  $('ringTitle').textContent = t(s3.mode === 'chat' ? 'ringChat' : 'ringAgent');
  const done = s3.finished || (s3.mode === 'chat' && s3.chatT > 0 && !s3.play);
  const st = $('ringState');
  st.textContent = t(s3.wait ? 'stWait' : done ? 'stDone' : s3.play ? 'stRun' : 'stReady');
  st.className = s3.wait ? 'bad' : s3.play ? 'on' : '';
  $('s3-loops').textContent = s3.stats.loops; $('s3-tools').textContent = s3.stats.tools;
  $('s3-fix').textContent = s3.stats.fix; $('s3-ctx').textContent = s3.stats.ctx.toLocaleString();
  const tools = I18N[lang].tools;
  $('tools').innerHTML = TOOL_NAMES.map(n => `<div class="tool${s3.tool === n ? ' on' : ''}"><b>${n}<span>${s3.used[n] ? '×' + s3.used[n] : ''}</span></b>${esc(tools[n])}</div>`).join('');
  renderFiles();
  renderCap();
  const log = s3.mode === 'chat' ? (s3.chatT > 0 ? [{ kind: 'chat' }] : []) : s3.log;
  $('log').innerHTML = log.length ? log.map(e => { const [tag, body] = entryHTML(e); return `<li>${tag}<span>${body}</span></li>`; }).join('') : `<li><span></span><span class="none">${esc(t('logEmpty'))}</span></li>`;
  $('log').scrollTop = $('log').scrollHeight;
}
function tick3(dt) {
  if (!s3.play) return;
  if (s3.mode === 'chat') {
    s3.chatT += dt / 1000 * speedMul;
    const len = Array.from(t('chatReply')).length;
    if (s3.chatT * (lang === 'zh' ? 18 : 60) >= len) { s3.play = false; render3(); } else renderCap();
    return;
  }
  if (s3.wait) return;
  s3.acc += dt * speedMul;
  if (s3.acc >= PHASE_MS) { s3.acc = 0; advance(); }
}
$('play3').addEventListener('click', () => {
  if (s3.mode === 'chat') { if (!s3.play && s3.chatT > 0) s3.chatT = 0; s3.play = !s3.play; render3(); return; }
  if (s3.finished) reset3();
  s3.play = !s3.play;
  if (s3.play && !s3.log.length) { s3.acc = 0; advance(); }
  render3();
});
$('step3').addEventListener('click', () => { s3.play = false; s3.acc = 0; advance(); render3(); });
$('reset3').addEventListener('click', reset3);
$('cap').addEventListener('click', e => {
  if (!s3.wait || !e.target.closest('#allow, #deny')) return;
  s3.approved = e.target.closest('#allow') !== null; s3.wait = false; s3.ph = 2; s3.acc = 0;
  advance(); render3();
});
const setMode3 = m => { s3.mode = m; reset3(); };
$('m3-chat').addEventListener('click', () => setMode3('chat'));
$('m3-agent').addEventListener('click', () => setMode3('agent'));

// Ring canvas: three nodes on a circle with the language model in the middle; a dot travels to the next phase.
function fitCanvas(cv, ctx) {
  const dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return false;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); cv.cssW = w; cv.cssH = h;
  return true;
}
const ring = $('ring'), rg = ring.getContext('2d');
const PH_COL = () => [C.violet, C.amber, C.cyan];
const ANG = [-90, 30, 150].map(a => a * Math.PI / 180);
function drawRing(now) {
  if (!fitCanvas(ring, rg)) return;
  const w = ring.cssW, h = ring.cssH, S = Math.min(w, h * 1.1), cx = w / 2, cy = h / 2 + S * 0.03;
  const R = S * 0.33, nr = S * 0.105, cr = S * 0.13, chat = s3.mode === 'chat', cols = PH_COL();
  rg.fillStyle = C.ink; rg.fillRect(0, 0, w, h);
  rg.strokeStyle = C.line; rg.globalAlpha = .35; rg.lineWidth = 1;
  for (let x = 40; x < w; x += 40) { rg.beginPath(); rg.moveTo(x + .5, 0); rg.lineTo(x + .5, h); rg.stroke(); }
  rg.globalAlpha = chat ? .25 : 1;
  // ring arcs with clockwise arrowheads
  rg.strokeStyle = C.line; rg.lineWidth = 3; rg.beginPath(); rg.arc(cx, cy, R, 0, Math.PI * 2); rg.stroke(); rg.lineWidth = 1;
  for (let k = 0; k < 3; k++) {
    const a = ANG[k] + Math.PI / 3, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a), d = a + Math.PI / 2, s = S * 0.025;
    rg.fillStyle = C.muted; rg.beginPath();
    rg.moveTo(x + s * Math.cos(d), y + s * Math.sin(d));
    rg.lineTo(x + s * Math.cos(d + 2.5), y + s * Math.sin(d + 2.5));
    rg.lineTo(x + s * Math.cos(d - 2.5), y + s * Math.sin(d - 2.5)); rg.closePath(); rg.fill();
  }
  // spoke from the model to the active node
  if (!chat && s3.last >= 0) {
    const a = ANG[s3.last];
    rg.strokeStyle = cols[s3.last]; rg.setLineDash([4, 5]); rg.beginPath();
    rg.moveTo(cx + cr * Math.cos(a), cy + cr * Math.sin(a)); rg.lineTo(cx + (R - nr) * Math.cos(a), cy + (R - nr) * Math.sin(a)); rg.stroke(); rg.setLineDash([]);
  }
  // nodes
  rg.textAlign = 'center'; rg.textBaseline = 'middle';
  for (let k = 0; k < 3; k++) {
    const x = cx + R * Math.cos(ANG[k]), y = cy + R * Math.sin(ANG[k]), on = !chat && s3.last === k;
    if (on) { rg.fillStyle = cols[k]; rg.globalAlpha = .18 + .1 * Math.sin(now / 200); rg.beginPath(); rg.arc(x, y, nr * 1.35, 0, Math.PI * 2); rg.fill(); rg.globalAlpha = 1; }
    rg.fillStyle = on ? cols[k] : C.panel; rg.beginPath(); rg.arc(x, y, nr, 0, Math.PI * 2); rg.fill();
    rg.strokeStyle = cols[k]; rg.lineWidth = 2; rg.stroke(); rg.lineWidth = 1;
    rg.fillStyle = on ? C.ink : C.fg; rg.font = fBody(Math.round(S * (lang === 'zh' ? 0.06 : 0.042)), 700);
    rg.fillText(t('ph' + k), x, y - S * 0.012);
    rg.fillStyle = on ? C.ink : C.muted; rg.font = fMono(Math.max(10, Math.round(S * 0.026)));
    rg.fillText(t('ph' + k + 's'), x, y + S * 0.042);
  }
  // tool label next to the act node
  if (!chat && s3.tool) {
    const x = cx + R * Math.cos(ANG[1]), y = cy + R * Math.sin(ANG[1]) + nr + S * 0.05;
    rg.font = fMono(Math.max(11, Math.round(S * 0.03))); rg.fillStyle = C.amber;
    rg.textAlign = x + 80 > w ? 'right' : 'center'; rg.fillText(s3.tool + '()', Math.min(x, w - 8), Math.min(y, h - 12)); rg.textAlign = 'center';
  }
  // travelling dot
  if (!chat && s3.play && !s3.wait && !s3.finished && s3.last >= 0) {
    const f = Math.min(1, s3.acc / PHASE_MS), a = ANG[s3.last] + f * (2 * Math.PI / 3);
    rg.fillStyle = C.fg; rg.shadowColor = C.fg; rg.shadowBlur = 12;
    rg.beginPath(); rg.arc(cx + R * Math.cos(a), cy + R * Math.sin(a), S * 0.018, 0, Math.PI * 2); rg.fill(); rg.shadowBlur = 0;
  }
  rg.globalAlpha = 1;
  // the language model in the centre
  const talk = chat && s3.play;
  rg.fillStyle = chat ? color(C.amber, talk ? .3 + .15 * Math.sin(now / 150) : .2) : C.panel;
  rg.beginPath(); rg.arc(cx, cy, cr, 0, Math.PI * 2); rg.fill();
  rg.strokeStyle = chat ? C.amber : C.muted; rg.lineWidth = 2; rg.stroke(); rg.lineWidth = 1;
  rg.fillStyle = C.fg; rg.font = `700 ${Math.round(S * 0.05)}px Silkscreen, monospace`; rg.fillText('LLM', cx, cy - S * 0.015);
  rg.fillStyle = C.muted; rg.font = fBody(Math.max(10, Math.round(S * 0.028))); rg.fillText(t('llm'), cx, cy + S * 0.04);
  if (chat) { rg.fillStyle = C.amber; rg.font = fBody(Math.max(11, Math.round(S * 0.032)), 600); rg.fillText(t('chatNoLoop'), cx, Math.min(h - 14, cy + R + nr + S * 0.06)); }
  else { rg.textAlign = 'left'; rg.textBaseline = 'top'; rg.fillStyle = C.muted; rg.font = fMono(12); rg.fillText(`${t('s3Loops')} ${s3.stats.loops}`, 12, 10); }
}
function color(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }

// =====================================================================
// shared: level switch, speed, language, main loop
// =====================================================================
function setLevel(n) {
  level = n;
  document.querySelectorAll('.lvl').forEach(b => b.setAttribute('aria-pressed', +b.dataset.lvl === n));
  for (const k of [1, 2, 3]) $('lv' + k).hidden = k !== n;
  try { localStorage.setItem('genai-agent-level', n); } catch (e) {}
  renderHow();
}
function renderHow() {
  $('how-h').textContent = t('how' + level + 'H');
  $('howList').innerHTML = t('how' + level);
  $('howNote').textContent = t('how' + level + 'Note');
}
document.querySelectorAll('.lvl').forEach(b => b.addEventListener('click', () => setLevel(+b.dataset.lvl)));
function setSpeed() {
  speedMul = 2 ** +$('speed').value;
  $('speedOut').textContent = (speedMul < 10 ? speedMul.toFixed(2) : speedMul.toFixed(0)) + '×';
}
$('speed').addEventListener('input', setSpeed);

function applyLang() {
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  $('lang').textContent = t('langBtn');
  // The language model and the race are language-specific: start them fresh.
  const { corpus, seeds } = D();
  const extra = EXTRA[lang];
  models = {
    original: buildModel(corpus, seeds),
    expanded: buildModel([...corpus, ...extra.corpora.flat()], [...seeds, ...extra.seeds])
  };
  selectDataset();
  renderDatasetChecks();
  $('hint1').textContent = t(s1.mode === 'auto' ? 'hint1Auto' : 'hint1Manual');
  reset2();
  render3();
  renderHow();
}
$('lang').addEventListener('click', () => {
  lang = lang === 'zh' ? 'en' : 'zh';
  try { localStorage.setItem('genai-agent-lang', lang); } catch (e) {}
  applyLang();
});

let lastT = performance.now();
function loop(now) {
  const dt = Math.min(100, now - lastT); lastT = now;
  if (document.body.dataset.route !== 'demo') { requestAnimationFrame(loop); return; }
  if (level === 1) tick1(dt);
  else if (level === 2) tick2(dt);
  else { tick3(dt); drawRing(now); }
  requestAnimationFrame(loop);
}

setSpeed();
reset3();
applyLang();
let startLevel = 1;
try { const v = +localStorage.getItem('genai-agent-level'); if ([1, 2, 3].includes(v)) startLevel = v; } catch (e) {}
setLevel(startLevel);
requestAnimationFrame(loop);
})();
