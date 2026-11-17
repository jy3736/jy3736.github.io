// Arkanoid Learns — four pages: ML Intro, Manual (imitation learning), AI Learn (learning from
// its own errors) and AI Play (inference with a saved model). Plain script, no build step, so the
// folder also works when index.html is opened straight from disk.
(() => {
'use strict';
const $ = id => document.getElementById(id);

// ====================================================================================
// Language / 語言
// ====================================================================================
// Slide text below feeds the illustrated slides' titles and the 自學講義 handout.
function buildOpeningSlides(english, sheet) {
  const c = english ? {
    title: 'Machine learning starts with examples',
    lead: 'A model learns patterns from data and uses them to make predictions about new cases.',
    applications: [
      ['Sort messages', 'Email content → spam or regular mail', 'Predict a category', 'mint', '✉'],
      ['Plan drink stock', 'Weather and day of week → cups sold', 'Predict a number', 'sky', '▥'],
      ['Control a paddle', 'Ball position and direction → paddle position', 'Use a prediction to guide an action', 'butter', '↔']
    ],
    scope: 'AI is the broader field. Machine learning is one approach within AI. Neural networks are one family of machine-learning models.',
    typesTitle: 'What feedback does the model learn from?',
    typesLead: 'Different learning tasks provide different kinds of feedback.',
    types: [
      ['Supervised learning', 'Examples + target answers', 'Use past sales records to predict tomorrow’s sales. Targets can be categories or numbers.', 'mint', '✓'],
      ['Unsupervised learning', 'Examples without target answers', 'Group customers with similar buying patterns. People interpret what the groups mean.', 'sky', '◉'],
      ['Reinforcement learning', 'Actions + rewards', 'An agent tries actions and learns a strategy from the rewards it receives.', 'butter', '★']
    ],
    typesNote: 'This game supplies target positions. Even when the AI plays by itself, it learns from those target answers through supervised updates.',
    dataTitle: 'Turn a real question into training examples',
    dataLead: 'Suppose a drink shop wants to estimate how many cups it will sell tomorrow.',
    tableCaption: 'Illustrative records for teaching', headers: ['Temp.', 'Day', 'Cups sold'],
    rows: [['20 °C', 'Weekday', '30'], ['28 °C', 'Weekday', '48'], ['32 °C', 'Weekend', '80']],
    inputs: 'Inputs · features', inputsText: 'Information available when making the prediction, such as temperature and day type.',
    targets: 'Answer · label', targetsText: 'The observed number of cups sold, paired with the inputs from that day.',
    dataNote: 'One day is one example. Use consistent units and relevant, reliable records. These numbers are invented for this illustration.',
    stagesTitle: 'Train first, then use the model',
    stagesLead: 'Training produces a model. Prediction uses that trained model on a new case.',
    training: 'Training', trainingFlow: ['Past examples + answers', 'Predict and compare', 'Adjust the model'],
    trainingText: 'Repeat across many examples to improve the model’s predictions.',
    prediction: 'Prediction · inference', predictionFlow: ['Tomorrow’s weather forecast and day', 'Use the trained model', 'Estimated cups sold'],
    predictionText: 'The model uses its learned parameters to produce an estimate. These parameters stay fixed during this prediction.',
    files: 'A data file stores examples. A saved model stores the parameters learned from those examples.',
    evaluationTitle: 'Does it work on cases it has never seen?',
    evaluationLead: 'Keep some examples out of training, then compare the model’s predictions with their actual answers.',
    category: 'For a category', categoryScore: '90%', categoryExample: '9 correct predictions out of 10 messages', categoryText: 'Accuracy is the fraction of predictions that are correct.',
    number: 'For a number', numberScore: '10 cups', numberExample: 'Predicted 50 cups · actually sold 60', numberText: 'Measure how far the prediction is from the observed value.',
    limits: 'Good performance on training examples can fail to carry over to new cases. Different data, incomplete inputs and mistakes in the examples can affect the results.',
    bridge: 'Next, use Arkanoid to collect examples, train a model and measure its catch rate.'
  } : {
    title: '機器學習，從例子開始',
    lead: '模型從資料中學習規律，再用學到的規律，對新的情況做預測。',
    applications: [
      ['分類郵件', '郵件內容 → 垃圾郵件或一般郵件', '預測一個類別', 'mint', '✉'],
      ['準備飲料備料', '天氣與星期 → 預估銷售杯數', '預測一個數量', 'sky', '▥'],
      ['控制遊戲球拍', '球的位置與方向 → 球拍位置', '用預測結果協助行動', 'butter', '↔']
    ],
    scope: '人工智慧（AI）的範圍較廣，機器學習是其中一種方法。神經網路則是機器學習中的一類模型。',
    typesTitle: '模型從什麼回饋中學習？',
    typesLead: '依照任務不同，學習時拿到的回饋也不同。',
    types: [
      ['監督式學習', '例子＋答案', '用過去的銷售紀錄，學習預測明天的銷量。答案可以是類別，也可以是數量。', 'mint', '✓'],
      ['非監督式學習', '例子，沒有預先指定的答案', '依購買習慣把相似的顧客分組，再由人解讀每一組的意義。', 'sky', '◉'],
      ['強化學習', '行動＋獎勵', '代理在環境中嘗試行動，根據得到的獎勵，逐步學習行動策略。', 'butter', '★']
    ],
    typesNote: '本遊戲會提供目標位置作為答案。即使 AI 自己玩，也會利用這些答案進行監督式更新。',
    dataTitle: '把生活問題，整理成訓練例子',
    dataLead: '假設飲料店想預估明天會賣出幾杯，先看看過去的紀錄。',
    tableCaption: '教學用示意紀錄', headers: ['氣溫', '日期類型', '實際賣出杯數'],
    rows: [['20 °C', '平日', '30'], ['28 °C', '平日', '48'], ['32 °C', '假日', '80']],
    inputs: '輸入・特徵', inputsText: '做預測時能取得的資訊，例如氣溫、平日或假日。',
    targets: '答案・標籤', targetsText: '把當天實際賣出的杯數，和當天的輸入資訊配成一筆例子。',
    dataNote: '一天是一筆例子。資料的單位要一致，紀錄要可靠且與任務相關。表中數字為教學假設。',
    stagesTitle: '先訓練，再拿來預測',
    stagesLead: '訓練會產生模型；預測則把新的情況交給已訓練好的模型。',
    training: '訓練階段', trainingFlow: ['過去的例子與答案', '做預測、比較答案', '調整模型'],
    trainingText: '用許多例子反覆練習，讓模型的預測逐步改善。',
    prediction: '使用階段・推論', predictionFlow: ['明天的天氣預報與日期類型', '使用訓練好的模型', '預估銷售杯數'],
    predictionText: '模型利用學到的參數給出預估值，這次預測過程中的參數保持固定。',
    files: '資料檔保存訓練例子，模型存檔則保存從例子中學到的參數。',
    evaluationTitle: '遇到沒看過的情況，也能預測嗎？',
    evaluationLead: '先保留一部分例子，不參與訓練，再把模型的預測和實際答案比較。',
    category: '預測類別時', categoryScore: '90%', categoryExample: '10 封郵件中，有 9 封分類正確', categoryText: '正確率就是預測正確的比例。',
    number: '預測數量時', numberScore: '10 杯', numberExample: '預測賣出 50 杯・實際賣出 60 杯', numberText: '用預測值和實際值的差距，衡量誤差。',
    limits: '模型在訓練例子上表現良好，遇到新情況仍可能出錯。資料分布改變、輸入資訊不足或例子有誤，都會影響結果。',
    bridge: '接下來，用打磚塊收集例子、訓練模型，再觀察實際接球率。'
  };
  const cards = items => `<div class="info-three">${items.map(([title, subtitle, text, color, icon]) => `<article class="info-panel ${color}"><span class="ml-symbol" aria-hidden="true">${icon}</span><h3>${title}</h3><p class="ml-emphasis">${subtitle}</p><p>${text}</p></article>`).join('')}</div>`;
  const flow = steps => `<ol class="ml-step-flow">${steps.map(step => `<li>${step}</li>`).join('')}</ol>`;
  return sheet('ml-welcome', c.title, c.lead, cards(c.applications) + `<p class="info-takeaway">${c.scope}</p>`)
    + sheet('ml-learning-types', c.typesTitle, c.typesLead, cards(c.types) + `<p class="info-takeaway">${c.typesNote}</p>`)
    + sheet('ml-examples', c.dataTitle, c.dataLead, `
      <div class="info-two ml-data-layout">
        <div class="ml-data-table"><table><caption>${c.tableCaption}</caption><thead><tr>${c.headers.map(header => `<th scope="col">${header}</th>`).join('')}</tr></thead><tbody>${c.rows.map(row => `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
        <div class="ml-data-labels"><article class="info-panel mint"><h3>${c.inputs}</h3><p>${c.inputsText}</p></article><article class="info-panel butter"><h3>${c.targets}</h3><p>${c.targetsText}</p></article></div>
      </div><p class="info-takeaway">${c.dataNote}</p>`)
    + sheet('ml-train-predict', c.stagesTitle, c.stagesLead, `
      <div class="info-two"><article class="info-panel mint"><h3>${c.training}</h3>${flow(c.trainingFlow)}<p>${c.trainingText}</p></article><article class="info-panel sky"><h3>${c.prediction}</h3>${flow(c.predictionFlow)}<p>${c.predictionText}</p></article></div><p class="info-takeaway">${c.files}</p>`)
    + sheet('ml-evaluate', c.evaluationTitle, c.evaluationLead, `
      <div class="info-two"><article class="info-panel mint"><h3>${c.category}</h3><b class="ml-score">${c.categoryScore}</b><p class="ml-emphasis">${c.categoryExample}</p><p>${c.categoryText}</p></article><article class="info-panel butter"><h3>${c.number}</h3><b class="ml-score">${c.numberScore}</b><p class="ml-emphasis">${c.numberExample}</p><p>${c.numberText}</p></article></div><p class="info-takeaway">${c.limits}</p><p class="info-question">${c.bridge}</p>`);
}

function buildIntro(english = false) {
  const copy = english ? {
    title: 'How does a computer learn to play Arkanoid?',
    lead: 'Give it examples. Train a model. Use the model to predict where the paddle should go.',
    task: 'From four inputs to one prediction', state: 'Observe the ball', position: 'Position', direction: 'Direction',
    model: 'Neural network', modelNote: 'Learn a mapping from examples', output: 'Predict a position', outputNote: 'Move the paddle to the predicted x',
    rule: 'In ordinary programming, people write the movement rules. In machine learning, examples help fit the model’s weights.',
    workflow: 'How learning happens', workflowLead: 'Each example pairs the ball’s state with a target position.',
    collect: 'Collect data', collectText: 'Record the falling ball every 3 frames. At paddle height, attach a target to those observations.',
    input: 'Ball state', label: 'Target position', sample: 'One training sample',
    train: 'Train the model', trainText: 'Compare the prediction with the target. Backpropagation adjusts the weights to reduce loss.',
    predict: 'Predict', compare: 'Compare', adjust: 'Adjust weights', repeat: 'Repeat the updates',
    use: 'Use the model', useText: 'Supply the current ball state to the trained model. Its output tells the paddle where to move.',
    fixed: 'Fixed weights during inference', network: '4 → 20 → 20 → 1 network · 541 trainable parameters',
    sources: 'Where do the answers come from?', sourcesLead: 'Both modes train a predictor. They use different targets.',
    manual: 'Imitation learning', manualTarget: 'Target = your paddle position', manualText: 'You play while the computer records your examples. The model learns to imitate your choices.',
    manualQuality: 'Your examples affect what it learns. Use “Train only on caught balls” to filter the data.',
    self: 'Learn from mistakes', selfTarget: 'Target = the ball’s actual landing x', selfText: 'The game supplies the landing point after each throw. The AI uses that feedback to update its model while playing.',
    selfQuality: 'Observe whether the error falls as training continues. Progress can fluctuate.',
    player: 'Player demonstration', game: 'Game feedback', data: 'Training examples',
    terms: 'Read a learning result', termsLead: 'Follow one prediction from inputs through training to evaluation.',
    feature: 'Features', featureText: 'The four inputs x, y, dx and dy.', target: 'Label', targetText: 'The target position paired with an input.',
    loss: 'Loss / error', lossText: 'The difference between a prediction and its target.',
    gradient: 'Gradient step', gradientText: 'One weight update based on the loss.',
    validation: 'Validation', validationText: 'Keep 20% of manual-mode throws out of training to check predictions on unseen throws.',
    inference: 'Inference', inferenceText: 'Make predictions using fixed, trained weights.',
    splitTrain: '80% training', splitVal: '20% validation', splitNote: 'Split by throw, keeping observations from the same throw together.',
    practice: 'Train two models. Compare their play.', practiceLead: 'Use the same game speed when comparing their catch rates.',
    manualStep: 'Play at least 20 throws. Train, name and save your imitation model.',
    learnStep: 'Start learning and raise the speed. When median error is below 42 px, stop, then train and save.',
    playStep: 'Load each saved model in turn and compare catch rates over a similar number of throws.',
    threshold: '42 px = half the paddle width', thresholdNote: 'A useful landing-error reference. Catching also depends on paddle movement.',
    question: 'Which model catches more balls? How do your demonstrations affect the imitation model?',
    manualLink: 'Open Manual', learnLink: 'Open AI Learn', playLink: 'Open AI Play'
  } : {
    title: '電腦怎麼「學會」打磚塊？',
    lead: '給它例子、訓練模型，再讓模型預測球拍該去哪裡。',
    task: '四個輸入，換成一個位置預測', state: '觀察球的狀態', position: '位置', direction: '方向',
    model: '神經網路', modelNote: '從例子學出輸入與輸出的關係', output: '預測球拍位置', outputNote: '讓球拍往預測的 x 位置移動',
    rule: '一般寫程式，由人寫好移動規則。機器學習則用訓練例子來調整模型的權重。',
    workflow: '模型怎麼學？', workflowLead: '把球的狀態和目標位置配成一筆資料，再反覆練習。',
    collect: '收集資料', collectText: '球往下掉時，每隔 3 個畫面記錄狀態。到達球拍高度後，再為這些觀察配上答案。',
    input: '球的狀態', label: '目標位置', sample: '一筆訓練樣本',
    train: '訓練模型', trainText: '把預測和答案比較，算出損失，再用反向傳播調整權重，讓損失變小。',
    predict: '預測', compare: '比較答案', adjust: '調整權重', repeat: '反覆更新',
    use: '使用模型', useText: '把當下的球況交給訓練好的模型，模型輸出一個位置，球拍就朝那裡移動。',
    fixed: '推論時，模型權重固定', network: '網路結構 4 → 20 → 20 → 1・共 541 個可訓練參數',
    sources: '答案從哪裡來？', sourcesLead: '兩種模式都訓練預測模型，使用的答案不同。',
    manual: '模仿學習', manualTarget: '答案 = 你最後的球拍位置', manualText: '你來玩，電腦在旁邊記錄。訓練出的模型會學著模仿你的操作。',
    manualQuality: '你的示範會影響模型。可勾選「只用接到的球訓練」來篩選資料。',
    self: '從錯誤中學習', selfTarget: '答案 = 球真正的落點 x', selfText: '每球落下後，由遊戲提供真正落點。AI 用這個回饋修正模型，邊玩邊學。',
    selfQuality: '觀察訓練後誤差是否下降，學習過程可能出現波動。',
    player: '玩家示範', game: '遊戲回饋', data: '訓練例子',
    terms: '看懂一次學習的結果', termsLead: '從輸入、答案到評估，把重要名詞串起來。',
    feature: '特徵', featureText: '模型的四個輸入 x、y、dx、dy。', target: '標籤', targetText: '與每個輸入配對的目標位置。',
    loss: '損失／誤差', lossText: '模型預測和答案之間的差距。',
    gradient: '梯度更新', gradientText: '根據損失，調整一次模型權重。',
    validation: '驗證', validationText: '手動模式保留 20% 的球，不參與訓練，用來檢查模型對沒看過的球預測得準不準。',
    inference: '推論', inferenceText: '用固定的已訓練權重做預測。',
    splitTrain: '80% 訓練', splitVal: '20% 驗證', splitNote: '以整球分組，同一球的觀察資料放在同一組。',
    practice: '練出兩個模型，讓它們上場比較', practiceLead: '比較接球率時，使用相同的遊戲速度。',
    manualStep: '先玩至少 20 球，訓練模型、取名字，再儲存模仿模型。',
    learnStep: '開始學習並調高速度。誤差中位數低於 42 px 時停止，再訓練並儲存。',
    playStep: '依序載入兩個模型，以接近的落球次數比較接球率。',
    threshold: '42 px = 球拍寬度的一半', thresholdNote: '用來參考落點偏差，能否接到球也和球拍移動有關。',
    question: '哪個模型接球率較高？你的示範會怎麼影響模仿模型？',
    manualLink: '前往手動模式', learnLink: '前往 AI 學習', playLink: '前往 AI 上場'
  };
  const c = copy;
  const arrow = '<span class="info-arrow" aria-hidden="true">➜</span>';
  const network = `<div class="info-network" aria-hidden="true">${[4, 5, 5, 1].map((count, layer) => `<div class="network-layer">${'<i></i>'.repeat(count)}<small>${[4, 20, 20, 1][layer]}</small></div>`).join('')}</div>`;
  const court = `<div class="info-court" aria-hidden="true"><div class="info-bricks">${'<i></i>'.repeat(12)}</div><div class="info-ball"></div><div class="info-trail"></div><div class="info-paddle"></div><div class="info-target">x</div></div>`;
  const sheet = (name, title, lead, body) => `<section class="info-slide ${name}"><div class="info-heading"><h2>${title}</h2><p>${lead}</p></div>${body}</section>`;
  return buildOpeningSlides(english, sheet)
  + sheet('info-overview', c.title, c.lead, `
    <h3 class="info-caption">${c.task}</h3>
    <div class="info-pipeline">
      <div class="info-node mint"><h3>${c.state}</h3><div class="info-features"><div><b>x</b><b>y</b><span>${c.position}</span></div><div><b>dx</b><b>dy</b><span>${c.direction}</span></div></div></div>
      ${arrow}<div class="info-node sky"><h3>${c.model}</h3>${network}<p>${c.modelNote}</p></div>
      ${arrow}<div class="info-node butter"><h3>${c.output}</h3>${court}<p>${c.outputNote}</p></div>
    </div><p class="info-takeaway">${c.rule}</p>`)
  + sheet('info-sources', c.sources, c.sourcesLead, `
    <div class="info-two">
      <article class="info-panel mint"><h3><a href="#manual">${c.manual}</a></h3><div class="source-diagram"><span class="source-symbol" aria-hidden="true">✋</span>${arrow}<div class="source-record"><b>${c.player}</b><span>${c.data}</span></div></div><p class="info-answer">${c.manualTarget}</p><p>${c.manualText}</p><p class="info-note">${c.manualQuality}</p></article>
      <article class="info-panel sky"><h3><a href="#learn">${c.self}</a></h3><div class="source-diagram"><span class="source-symbol source-ball" aria-hidden="true">●</span>${arrow}<div class="source-record"><b>${c.game}</b><span>${c.data}</span></div></div><p class="info-answer">${c.selfTarget}</p><p>${c.selfText}</p><p class="info-note">${c.selfQuality}</p></article>
    </div>`)
  + sheet('info-workflow', c.workflow, c.workflowLead, `
    <div class="info-three">
      <article class="info-panel mint"><h3>${c.collect}</h3><div class="sample-diagram"><div><b>x · y · dx · dy</b><span>${c.input}</span></div><span aria-hidden="true">+</span><div><b>x</b><span>${c.label}</span></div></div><p class="diagram-caption">${c.sample}</p><p>${c.collectText}</p></article>
      <article class="info-panel sky"><h3>${c.train}</h3><div class="update-diagram"><b>${c.predict}</b><span aria-hidden="true">↓</span><b>${c.compare}</b><span aria-hidden="true">↓</span><b>${c.adjust}</b></div><p class="diagram-caption">↻ ${c.repeat}</p><p>${c.trainText}</p></article>
      <article class="info-panel butter"><h3>${c.use}</h3>${court}<p class="diagram-caption">${c.fixed}</p><p>${c.useText}</p></article>
    </div><p class="info-takeaway info-network-note">${c.network}</p>`)
  + sheet('info-terms', c.terms, c.termsLead, `
    <dl class="info-term-grid">${[
      [c.feature, 'x · y · dx · dy', c.featureText, 'mint'], [c.target, 'x', c.targetText, 'butter'],
      [c.loss, 'ŷ − y', c.lossText, 'rose'], [c.gradient, '↻', c.gradientText, 'sky'],
      [c.validation, '80 / 20', c.validationText, 'lavender'], [c.inference, '→', c.inferenceText, 'mint']
    ].map(([term, symbol, text, color]) => `<div class="info-term ${color}"><dt><span aria-hidden="true">${symbol}</span>${term}</dt><dd>${text}</dd></div>`).join('')}</dl>
    <div class="info-split"><div><b>${c.splitTrain}</b><b>${c.splitVal}</b></div><p>${c.splitNote}</p></div>`)
  + sheet('info-practice', c.practice, c.practiceLead, `
    <ol class="info-three info-exercises">
      <li class="info-panel mint"><h3>${english ? 'Manual' : '手動模式'}</h3><p>${c.manualStep}</p><a class="info-link" href="#manual">${c.manualLink}<span aria-hidden="true"> →</span></a></li>
      <li class="info-panel sky"><h3>${english ? 'AI Learn' : 'AI 學習'}</h3><p>${c.learnStep}</p><a class="info-link" href="#learn">${c.learnLink}<span aria-hidden="true"> →</span></a></li>
      <li class="info-panel butter"><h3>${english ? 'AI Play' : 'AI 上場'}</h3><p>${c.playStep}</p><a class="info-link" href="#play">${c.playLink}<span aria-hidden="true"> →</span></a></li>
    </ol><div class="info-measure"><b>${c.threshold}</b><p>${c.thresholdNote}</p></div><p class="info-question">${c.question}</p>`);
}
function buildIllustratedIntro(markup) {
  const template = document.createElement('template');
  template.innerHTML = markup;
  template.content.querySelectorAll('.info-slide').forEach((slide, index) => {
    const title = slide.querySelector('h2').textContent;
    const description = slide.querySelector('.info-heading p').textContent;
    const image = document.createElement('img');
    image.className = 'slide-illustration';
    image.src = `slide-images/concise/${String(index + 1).padStart(2, '0')}-zh.png`;
    image.alt = `${title} — ${description}`;
    image.width = 1672;
    image.height = 941;
    image.decoding = 'async';
    image.loading = index === 0 ? 'eager' : 'lazy';
    slide.classList.add('illustrated-slide');
    slide.setAttribute('aria-label', title);
    slide.replaceChildren(image);   // the slide's full text lives in the 自學講義 tab
    // Narration for this slide: the matching podcast episode, when it has been generated.
    const episode = (window.HANDOUT_PODCAST?.zh || [])[index];
    if (episode?.src) {
      const narration = document.createElement('div');
      narration.className = 'slide-audio';
      narration.innerHTML = `<span aria-hidden="true">🎧</span><span class="slide-audio-label">本頁語音導讀</span><audio controls preload="none" src="${episode.src}" aria-label="本頁語音導讀：${title}"></audio>`;
      image.after(narration);
    }
  });
  return template.innerHTML;
}
const INTRO_ZH = buildIllustratedIntro(buildIntro());
const INTRO_EN = INTRO_ZH;

// The handout turns the slide deck into a self-study guide: each slide's diagrams plus goals,
// explanation, a worked example, a misconception and self-check questions from handout-notes.js.
function buildHandout(english = false) {
  const c = english ? {
    kicker: 'Self-study handout · Machine learning basics', title: 'Machine learning, one example at a time',
    lead: 'A self-paced guide to the ten slides of the ML Intro deck. Each section explains one idea in depth, works through an example and ends with questions so you can check your own understanding.',
    meta: ['10 sections', 'About 40 minutes', 'Pairs with the Arkanoid exercises'],
    contents: 'Contents', slide: 'Slide',
    parts: [['Part 1', 'Machine learning basics'], ['Part 2', 'Learning to play Arkanoid']],
    reviewTitle: 'Review', reviewLead: 'Check your understanding before moving on to the game.',
    keyTitle: 'Key ideas',
    keys: [
      'A model learns patterns from examples, then predicts new cases.',
      'Supervised learning pairs each example (features) with an answer (label).',
      'Training adjusts weights to reduce loss; during inference the weights stay fixed.',
      'Measure the model on examples it has never seen, such as a validation set.',
      'In Arkanoid, the answers come from your demonstrations or from where the ball actually lands.'
    ],
    askTitle: 'Final questions',
    next: 'Ready to try it?', nextLink: 'Open Manual'
  } : {
    kicker: '自學講義・機器學習入門', title: '機器學習，從一個個例子開始',
    lead: '依照「機器學習入門」投影片的 10 張內容編寫的自學講義。每一節都會深入說明一個觀念，搭配例題演練，最後用自我檢查題確認是否真正理解。',
    meta: ['共 10 節', '自學約 40 分鐘', '搭配打磚塊實作'],
    contents: '目錄', slide: '投影片',
    parts: [['第一部分', '機器學習的基本概念'], ['第二部分', '讓電腦學會打磚塊']],
    reviewTitle: '總複習', reviewLead: '進入遊戲實作之前，先確認自己掌握了這些觀念。',
    keyTitle: '重要觀念',
    keys: [
      '模型從例子中學習規律，再對新的情況做預測。',
      '監督式學習把每筆例子的輸入（特徵）和答案（標籤）配成一對。',
      '訓練時調整權重讓損失變小；推論時權重保持固定。',
      '要用沒參與訓練的例子（例如驗證資料）檢查模型表現。',
      '在打磚塊中，答案可以來自你的示範，也可以來自球真正的落點。'
    ],
    askTitle: '綜合問答',
    next: '準備好動手試試了嗎？', nextLink: '前往手動模式'
  };
  const notes = (window.HANDOUT_NOTES || {})[english ? 'en' : 'zh'] || { ui: {}, sections: [], review: [] };
  const ui = notes.ui;
  const template = document.createElement('template');
  template.innerHTML = buildIntro(english);
  const slides = [...template.content.querySelectorAll('.info-slide')];
  const half = Math.ceil(slides.length / 2);
  const num = i => String(i + 1).padStart(2, '0');
  const partOf = i => c.parts[i < half ? 0 : 1];
  const qa = list => `<ol class="handout-qa">${list.map(([q, a]) => `<li><p class="handout-q">${q}</p><details><summary>${ui.reveal}</summary><p>${a}</p></details></li>`).join('')}</ol>`;
  const sub = (icon, text) => `<h3 class="handout-sub"><span aria-hidden="true">${icon}</span>${text}</h3>`;
  const toc = c.parts.map((part, p) => `<li><p class="handout-part-name"><b>${part[0]}</b> ${part[1]}</p><ol>${slides
    .map((slide, i) => [slide, i]).filter(([, i]) => (i < half) === (p === 0))
    .map(([slide, i]) => `<li><a href="#handout" data-jump="handout-${num(i)}"><span class="handout-toc-num">${num(i)}</span><span class="handout-toc-title">${slide.querySelector('h2').innerHTML}</span><span class="handout-toc-done" aria-hidden="true">✓</span></a></li>`).join('')}</ol></li>`).join('');
  const episodes = (window.HANDOUT_PODCAST || {})[english ? 'en' : 'zh'] || [];
  // Podcast card: player only, shown once the episode's audio has been generated.
  const podcast = episode => !episode?.src ? '' : `<section class="handout-podcast" aria-label="${ui.podcast}: ${episode.title}">
      <div class="handout-podcast-head"><span class="handout-podcast-icon" aria-hidden="true">🎧</span><div><p>${ui.podcast}${episode.duration ? ` · ${ui.minutes.replace('{m}', Math.max(1, Math.round(episode.duration / 60)))}` : ''}</p><b>${episode.title}</b></div></div>
      <audio controls preload="metadata" src="${episode.src}"></audio>
    </section>`;
  const sections = slides.map((slide, i) => {
    const heading = slide.querySelector('.info-heading');
    const title = heading.querySelector('h2').innerHTML;
    const lead = heading.querySelector('p').innerHTML;
    heading.remove();
    const n = notes.sections[i];
    const [partLabel, partName] = partOf(i);
    const src = english ? `slide-images/${num(i)}-en.png` : `slide-images/concise/${num(i)}-zh.png`;
    const partBreak = i === 0 || i === half ? `<p class="handout-divider"><b>${partLabel}</b>${partName}</p>` : '';
    const study = n ? `
      <section class="handout-explain">${sub('✎', ui.explain)}<div class="handout-prose">${n.explain.map(text => `<p>${text}</p>`).join('')}</div></section>
      <div class="handout-callouts">
        <aside class="handout-callout example">${sub('✐', ui.example)}<p>${n.example}</p></aside>
        <aside class="handout-callout pitfall">${sub('!', ui.pitfall)}<p>${n.pitfall}</p></aside>
      </div>
      ${n.try ? `<p class="handout-try"><b>${ui.tryIt}</b><span>${n.try[0]}</span><a href="${n.try[1]}">→</a></p>` : ''}
      <section class="handout-check">${sub('?', ui.check)}${qa(n.check)}
        <label class="handout-done"><input type="checkbox" data-done="${num(i)}"> ${ui.done}</label>
      </section>` : '';
    return `${partBreak}<article class="handout-section" id="handout-${num(i)}" aria-labelledby="handout-${num(i)}-title">
      <header class="handout-head">
        <span class="handout-num" aria-hidden="true">${num(i)}</span>
        <div class="handout-titles"><p class="handout-eyebrow">${partLabel} · ${c.slide} ${i + 1}</p><h2 id="handout-${num(i)}-title" tabindex="-1">${title}</h2><p class="handout-lead">${lead}</p>
          ${n ? `<div class="handout-goals"><p>${ui.goals}</p><ul>${n.goals.map(goal => `<li>${goal}</li>`).join('')}</ul></div>` : ''}</div>
        <figure class="handout-figure"><img src="${src}" alt="" width="1672" height="941" loading="lazy" decoding="async"><figcaption>${c.slide} ${i + 1}</figcaption></figure>
      </header>
      ${podcast(episodes[i])}
      ${n ? sub('◧', ui.diagram) : ''}
      <div class="handout-body ${[...slide.classList].filter(name => name !== 'info-slide').join(' ')}">${slide.innerHTML}</div>
      ${study}
    </article>`;
  }).join('');
  return `<div class="handout-doc">
    <header class="handout-cover">
      <p class="handout-kicker">${c.kicker}</p>
      <h2>${c.title}</h2>
      <p class="handout-intro">${c.lead}</p>
      <ul class="handout-meta">${c.meta.map(item => `<li>${item}</li>`).join('')}</ul>
      ${ui.how ? `<div class="handout-how"><h3>${ui.howTitle}</h3><ol>${ui.how.map(([step, text]) => `<li><b>${step}</b><span>${text}</span></li>`).join('')}</ol></div>` : ''}
      <nav class="handout-toc" aria-label="${c.contents}">
        <div class="handout-toc-head"><h3>${c.contents}</h3><p class="handout-progress" aria-live="polite"><span class="handout-progress-text" data-template="${ui.progress || ''}"></span><span class="handout-meter" aria-hidden="true"><i></i></span><button class="handout-reset" type="button">${ui.reset || ''}</button></p></div>
        <ol class="handout-toc-parts">${toc}</ol>
      </nav>
    </header>
    ${sections}
    <section class="handout-section handout-review" aria-labelledby="handout-review-title">
      <header class="handout-head"><span class="handout-num" aria-hidden="true">✓</span><div class="handout-titles"><h2 id="handout-review-title">${c.reviewTitle}</h2><p class="handout-lead">${c.reviewLead}</p></div></header>
      <div class="info-two">
        <article class="info-panel mint"><h3>${c.keyTitle}</h3><ul class="handout-list">${c.keys.map(item => `<li>${item}</li>`).join('')}</ul></article>
        <article class="info-panel butter"><h3>${c.askTitle}</h3>${qa(notes.review)}</article>
      </div>
      <p class="info-question">${c.next} <a href="#manual">${c.nextLink}<span aria-hidden="true"> →</span></a></p>
    </section>
  </div>`;
}
const HANDOUT_ZH = buildHandout(false);
const HANDOUT_EN = buildHandout(true);

const I18N = {
  zh: {
    slidesOpen: '播放投影片', slidesTitle: '機器學習入門投影片', slidesPrev: '← 上一張', slidesNext: '下一張 →',
    slidesClose: '關閉', slidesFullscreen: '全螢幕', slidesKeys: '← → 換頁 · Esc 離開', slidesCount: '第 {n} 張，共 {total} 張',
    slidesLight: '淺色模式', slidesDark: '深色模式', slidesAudioPlay: '🔊 語音導讀', slidesAudioStop: '⏸ 停止語音',
    modeHelp: '操作說明',
    mSavePending: '尚無已訓練模型。先按「訓練模型」，完成後即可儲存。',
    mSaveTraining: '模型訓練中，完成後即可儲存。', mSaveReady: '模型已訓練完成，可以儲存。',
    viewProgress: '遊戲＋訓練過程', viewNetwork: '遊戲＋網路', viewBoth: '遊戲＋兩個圖表', viewAll: '全部', gameControls: '操作面板',
    h1: '打磚塊 <span>AI 學習版</span>', langBtn: 'English', expand: '放大', collapse: '縮小',
    tag: '用一個小遊戲走過機器學習的完整流程：收集資料、訓練模型、讓模型上場。',
    navIntro: '機器學習入門', navHandout: '自學講義', handout: HANDOUT_ZH, sizeLabel: '字級', sizeSmaller: '縮小文字', sizeLarger: '放大文字', sizeReset: '目前字級 {p}，按一下恢復 100%', navManual: '手動模式', navLearn: 'AI 學習', navPlay: 'AI 上場', intro: INTRO_ZH,
    speedL: '遊戲速度', showPred: '顯示模型預測的落點',
    manualT: '手動模式：你來玩，順便收集資料',
    manualD: '每一球落下時，記錄球的狀態和你最後把球拍放在哪裡。收集夠了，就訓練一個「模仿你」的模型並存下來。',
    learnT: 'AI 學習：從錯誤中學習',
    learnD: 'AI 從亂猜開始自己玩。每一球落地，遊戲告訴它真正的落點，它立刻用誤差修正自己。按「停止學習」後，再把收集到的資料訓練成模型存下來。',
    playT: 'AI 上場：使用訓練好的模型',
    playD: '載入一個存好的模型（手動模仿或 AI 自學）讓它來玩。這裡只使用模型，不再學習，可以比較不同模型的表現。',
    hintManual: '用滑鼠、觸控或 ← → 鍵移動球拍。點擊畫面或按空白鍵發球。太快可以把速度調慢。',
    hintLearn: '調高速度可以加快學習。隨時可以停止，之後再繼續。',
    hintPlay: '選好模型後按「開始」。調高速度可以快速看完很多局。',
    // manual
    mDataH: '① 收集資料', mThrows: '已記錄的球數', mSamples: '訓練樣本數', mCaught: '你的接球率',
    mOnlyCaught: '只用接到的球訓練（清理資料）', mCsv: '下載資料 CSV', mClear: '清除資料',
    mTrainH: '② 訓練模型', mTrain: '訓練模型', mTrainErr: '訓練誤差', mValErr: '驗證誤差',
    mNote: '至少需要 {n} 球。每次訓練都從隨機權重開始：80% 的球拿來訓練，20% 留著驗證（模型沒看過的球）。',
    mSaveH: '③ 儲存模型', mSave: '儲存模型', namePh: '模型名稱（可留空）', defManual: '手動模仿', defLearn: 'AI 自學',
    // learn
    lStatsH: '學習狀態', sThrows: '已觀察的落球次數', sSamples: '訓練樣本數', sSteps: '梯度更新次數',
    sErr: '誤差中位數（近 20 球）', sCatch: 'AI 接球率（近 50 球）', sGames: 'AI 已玩局數',
    lStart: '開始學習', lResume: '繼續學習', lStop: '停止學習', lReset: '重置模型',
    lSaveH: '儲存模型', lSave: '訓練並儲存模型', lNote: '停止學習後，會用收集到的全部資料再訓練 {n} 次，然後存檔。',
    // play
    pPickH: '選擇模型', pChoose: '— 請選擇模型 —', pNone: '（還沒有儲存的模型）', pGroupImitate: '手動模仿', pGroupLanding: 'AI 自學',
    pInfo: '{kind} · {when} · 學過 {throws} 球 · {steps} 次更新', pInfoNone: '先到「手動模式」或「AI 學習」訓練並儲存模型，或匯入模型檔案。',
    kindImitate: '模仿玩家的球拍位置', kindLanding: '預測球的落點',
    pStart: '開始', pPause: '暫停', pImport: '匯入檔案…', pExport: '匯出檔案…', pDelete: '刪除',
    pStatsH: '表現（只使用模型，不再學習）', pCatch: '接球率（近 50 球）', pErr: '落點誤差中位數（近 20 球）', pGames: '已玩局數', pBest: '最高分',
    confirm: '再按一次確認',
    // charts
    lossH: '訓練過程：平均誤差（px）', legTrain: '訓練資料', legVal: '驗證資料',
    errH: '接球率變化（近 50 球，%）', rateLegend: '接到', rateMissed: '漏接', rateWindow: '每個點為當時最近 50 球的接球率', legLine: '虛線：球拍寬度的一半（42 px）',
    netH: '網路權重與即時激活值', legPos: '正權重', legNeg: '負權重', legIn: '輸入：球的位置 x、y 與方向 dx、dy',
    // toasts
    tNeedData: '資料不夠：至少要 {n} 球，目前只有 {have} 球。', tNoData: '還沒有資料，先玩幾球吧。',
    tTraining: '訓練中… {p}%', tTrained: '訓練完成，驗證誤差 {err} px。取個名字後按「儲存模型」。',
    tCleared: '資料已清除。', tNeedModel: '請先訓練模型。', tSaved: '已儲存「{name}」。到「AI 上場」就能載入。',
    tStoreFail: '這個瀏覽器封鎖了本機儲存，已改為下載模型檔案。之後可在「AI 上場」匯入。',
    tStopFirst: '請先按「停止學習」。', tNoThrows: '資料還不夠，請先讓 AI 學一陣子。', tSaving: '整理訓練中… {p}%',
    tReset: '模型已重置，從隨機權重重新開始。',
    tPick: '請先選擇或匯入一個模型。', tLoaded: '已載入「{name}」。按「開始」讓它上場。', tImported: '已匯入「{name}」。',
    tBadFile: '這個檔案不是打磚塊模型，或網路大小不符。', tExported: '已下載 {file}。',
    tExportFail: '這裡無法下載檔案。請直接用瀏覽器開啟 index.html 再試一次。', tDeleted: '已刪除「{name}」。',
    // canvas
    cScore: '分數', cLv: '關卡', cOver: '遊戲結束', cRestart: '重新開始中…', cAgain: '點擊或按空白鍵再玩一次',
    cLaunch: '點擊或按空白鍵發球', cAxis: '較舊 ← 落球 → 最新', cEmpty: '還沒有資料。', cLand: '落點 x', cPad: '球拍 x',
    cManual: '手動 · 收集資料中', cLearn: 'AI 學習中', cLearnIdle: 'AI 學習 · 暫停', cPlay: 'AI 上場',
    cIdleLearn: '按「開始學習」', cIdlePlay: '選好模型後按「開始」', cLossEmpty: '按「訓練模型」後，這裡會畫出誤差下降的過程。',
    cNetEmpty: '訓練好模型後，這裡會顯示它的網路。', cSteps: '梯度更新次數 →'
  },
  en: {
    slidesOpen: 'Present slides', slidesTitle: 'Machine learning slides', slidesPrev: '← Previous', slidesNext: 'Next →',
    slidesClose: 'Close', slidesFullscreen: 'Full screen', slidesKeys: '← → navigate · Esc exit', slidesCount: 'Slide {n} of {total}',
    slidesLight: 'Light theme', slidesDark: 'Dark theme', slidesAudioPlay: '🔊 Narration', slidesAudioStop: '⏸ Stop narration',
    modeHelp: 'Instructions',
    mSavePending: 'No trained model yet. Click “Train model”, then save when training finishes.',
    mSaveTraining: 'Training in progress. Save when training finishes.', mSaveReady: 'The model is trained and ready to save.',
    viewProgress: 'Play + progress', viewNetwork: 'Play + network', viewBoth: 'Play + both charts', viewAll: 'All', gameControls: 'Controls',
    h1: 'ARKANOID <span>LEARNS</span>', langBtn: '中文', expand: 'Expand', collapse: 'Close',
    tag: 'Walk through the whole machine learning workflow with one small game: collect data, train a model, let it play.',
    navIntro: 'ML Intro', navHandout: 'Study Guide', handout: HANDOUT_EN, sizeLabel: 'Text size', sizeSmaller: 'Smaller text', sizeLarger: 'Larger text', sizeReset: 'Text size {p}. Click to reset to 100%', navManual: 'Manual', navLearn: 'AI Learn', navPlay: 'AI Play', intro: INTRO_EN,
    speedL: 'Playing speed', showPred: 'Show the model’s predicted landing point',
    manualT: 'Manual: you play, and collect data',
    manualD: 'For every falling ball, the ball state and where you finally put the paddle are recorded. When you have enough, train a model that imitates you and save it.',
    learnT: 'AI Learn: learning from mistakes',
    learnD: 'The AI starts by guessing at random. After every throw the game tells it where the ball really landed, and it corrects itself right away. Press “Stop learning”, then train the collected data into a model and save it.',
    playT: 'AI Play: use a trained model',
    playD: 'Load a saved model (imitation or self-taught) and let it play. Nothing is learned here, so you can compare models fairly.',
    hintManual: 'Move the paddle with mouse, touch or ← →. Click or press Space to launch. Slow the game down if it is too fast.',
    hintLearn: 'Raise the speed to learn faster. You can stop and continue at any time.',
    hintPlay: 'Pick a model and press “Start”. Raise the speed to watch many games quickly.',
    mDataH: '① Collect data', mThrows: 'throws recorded', mSamples: 'training samples', mCaught: 'your catch rate',
    mOnlyCaught: 'Train only on caught balls (clean the data)', mCsv: 'Download data CSV', mClear: 'Clear data',
    mTrainH: '② Train a model', mTrain: 'Train model', mTrainErr: 'training error', mValErr: 'validation error',
    mNote: 'Needs at least {n} throws. Each run starts from random weights: 80% of throws train the model, 20% are held back to validate it.',
    mSaveH: '③ Save the model', mSave: 'Save model', namePh: 'Model name (optional)', defManual: 'Imitation', defLearn: 'Self-taught',
    lStatsH: 'Learning status', sThrows: 'throws observed', sSamples: 'training samples', sSteps: 'gradient steps',
    sErr: 'median error, last 20', sCatch: 'AI catch rate, last 50', sGames: 'AI games played',
    lStart: 'Start learning', lResume: 'Resume learning', lStop: 'Stop learning', lReset: 'Reset model',
    lSaveH: 'Save the model', lSave: 'Train & save model', lNote: 'After you stop, the model trains {n} more steps on all collected data, then it is saved.',
    pPickH: 'Choose a model', pChoose: '— choose a model —', pNone: '(no saved models yet)', pGroupImitate: 'Imitation', pGroupLanding: 'Self-taught',
    pInfo: '{kind} · {when} · {throws} throws · {steps} steps', pInfoNone: 'Train and save a model in Manual or AI Learn first, or import a model file.',
    kindImitate: 'imitates the player’s paddle', kindLanding: 'predicts the landing point',
    pStart: 'Start', pPause: 'Pause', pImport: 'Import file…', pExport: 'Export file…', pDelete: 'Delete',
    pStatsH: 'Performance (model only, no learning)', pCatch: 'catch rate, last 50', pErr: 'median landing error, last 20', pGames: 'games played', pBest: 'best score',
    confirm: 'Click again to confirm',
    lossH: 'Training: mean error (px)', legTrain: 'training data', legVal: 'validation data',
    errH: 'Catch rate over time (last 50 throws, %)', rateLegend: 'Caught', rateMissed: 'Missed', rateWindow: 'Each point shows the catch rate over the latest 50 throws', legLine: 'dashed line: half the paddle width (42 px)',
    netH: 'Network weights & live activations', legPos: 'positive weight', legNeg: 'negative weight', legIn: 'inputs: ball x, y, direction dx, dy',
    tNeedData: 'Not enough data: needs {n} throws, you have {have}.', tNoData: 'No data yet. Play a few throws first.',
    tTraining: 'Training… {p}%', tTrained: 'Trained. Validation error {err} px. Name it and press “Save model”.',
    tCleared: 'Data cleared.', tNeedModel: 'Train a model first.', tSaved: 'Saved “{name}”. Load it in AI Play.',
    tStoreFail: 'This browser blocks local storage, so the model was downloaded as a file instead. Import it in AI Play.',
    tStopFirst: 'Press “Stop learning” first.', tNoThrows: 'Not enough data yet. Let the AI learn for a while.', tSaving: 'Final training… {p}%',
    tReset: 'Model reset. The network starts from random weights.',
    tPick: 'Choose or import a model first.', tLoaded: 'Loaded “{name}”. Press “Start” to let it play.', tImported: 'Imported “{name}”.',
    tBadFile: 'This file is not an Arkanoid model, or the network size does not match.', tExported: 'Downloaded {file}.',
    tExportFail: 'Downloads are not available here. Open index.html directly in a browser and try again.', tDeleted: 'Deleted “{name}”.',
    cScore: 'SCORE', cLv: 'LV', cOver: 'GAME OVER', cRestart: 'Restarting…', cAgain: 'Click or press Space to play again',
    cLaunch: 'Click or press Space to launch', cAxis: 'older ← throws → newest', cEmpty: 'No throws yet.', cLand: 'land x', cPad: 'paddle x',
    cManual: 'MANUAL · RECORDING', cLearn: 'AI LEARNING', cLearnIdle: 'AI LEARN · PAUSED', cPlay: 'AI PLAY',
    cIdleLearn: 'Press “Start learning”', cIdlePlay: 'Pick a model and press “Start”', cLossEmpty: 'Press “Train model” to watch the error go down here.',
    cNetEmpty: 'The network appears here once a model is trained.', cSteps: 'gradient steps →'
  }
};
let lang = 'zh';
// The language switch was removed, so the page is always Traditional Chinese; the English strings stay for later.
const t = k => I18N[lang][k] ?? I18N.zh[k] ?? k;
const fill = (k, v = {}) => t(k).replace(/\{(\w+)\}/g, (_, n) => v[n] ?? '');
const cjk = () => lang === 'zh' ? '"Noto Sans TC", "PingFang TC", ' : '';
const fDisplay = px => `${px}px ${lang === 'zh' ? '"Noto Sans TC", "PingFang TC", sans-serif' : 'Silkscreen, monospace'}`;
const fBody = px => `${px}px ${cjk()}"IBM Plex Sans", sans-serif`;
const fMono = px => `${px}px "IBM Plex Mono", ${cjk()}monospace`;

// ====================================================================================
// Constants
// ====================================================================================
const W = 480, H = 600, PY = H - 36, PW = 84, PH = 12, R = 6;
const COLS = 8, ROWS = 6, BTOP = 64, BH = 18, BGAP = 4, BSIDE = 14;
const BW = (W - 2 * BSIDE - (COLS - 1) * BGAP) / COLS;
const TOPZ = BTOP + ROWS * (BH + BGAP) + 6;        // samples only below the brick wall
const PADDLE_MAX = 8;                               // AI paddle speed cap (px/step)
const MAX_ANGLE = Math.PI / 3;                      // 60° from vertical
const SIZES = [4, 20, 20, 1];
const MIN_THROWS = 5, MANUAL_STEPS = 3000, LEARN_FINAL = 1000, BUF_MAX = 20000;

const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const C = { ink: css('--ink'), panel: css('--panel'), line: css('--line'), fg: css('--fg'), muted: css('--muted'),
  amber: css('--amber'), cyan: css('--cyan'), coral: css('--coral'), lime: css('--lime'), violet: css('--violet') };
const ROW_COLORS = [C.coral, C.amber, C.lime, C.cyan, C.violet, C.fg];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const tick = () => new Promise(r => setTimeout(r, 0));
const pushCap = (arr, v, max) => { arr.push(v); if (arr.length > max) arr.shift(); };
const catchRate = catches => catches.length ? catches.reduce((sum, caught) => sum + (caught ? 1 : 0), 0) / catches.length : null;
const median = arr => { if (!arr.length) return null; const s = arr.slice().sort((a, b) => a - b); return s[s.length >> 1]; };

// ====================================================================================
// Neural network (MLP, tanh hidden, linear out, Adam)
// ====================================================================================
class MLP {
  constructor(sizes = SIZES, lr = 0.003) { this.sizes = sizes; this.lr = lr; this.reset(); }
  reset() {
    const s = this.sizes; this.W = []; this.b = []; this.m = []; this.v = []; this.t = 0;
    for (let l = 0; l < s.length - 1; l++) {
      const n = s[l], o = s[l + 1], sc = Math.sqrt(1 / n) * 1.7;
      const w = new Float64Array(n * o);
      for (let i = 0; i < w.length; i++) w[i] = (Math.random() * 2 - 1) * sc;
      this.W.push(w); this.b.push(new Float64Array(o));
      this.m.push([new Float64Array(n * o), new Float64Array(o)]);
      this.v.push([new Float64Array(n * o), new Float64Array(o)]);
    }
    this.acts = s.map(n => new Float64Array(n));
  }
  forward(x) {
    const L = this.W.length, a = [Float64Array.from(x)];
    for (let l = 0; l < L; l++) {
      const n = this.sizes[l], o = this.sizes[l + 1], w = this.W[l], b = this.b[l], inp = a[l], out = new Float64Array(o);
      for (let j = 0; j < o; j++) { let s = b[j]; for (let i = 0; i < n; i++) s += w[j * n + i] * inp[i]; out[j] = l < L - 1 ? Math.tanh(s) : s; }
      a.push(out);
    }
    this.acts = a; return a[L][0];
  }
  trainBatch(batch) {
    const L = this.W.length;
    const gW = this.W.map(w => new Float64Array(w.length)), gb = this.b.map(b => new Float64Array(b.length));
    let loss = 0;
    for (const [x, y] of batch) {
      const p = this.forward(x), a = this.acts;
      let d = new Float64Array([p - y]); loss += (p - y) ** 2;
      for (let l = L - 1; l >= 0; l--) {
        const n = this.sizes[l], o = this.sizes[l + 1], w = this.W[l], inp = a[l], nd = new Float64Array(n);
        for (let j = 0; j < o; j++) { gb[l][j] += d[j]; for (let i = 0; i < n; i++) { gW[l][j * n + i] += d[j] * inp[i]; nd[i] += w[j * n + i] * d[j]; } }
        if (l > 0) for (let i = 0; i < n; i++) nd[i] *= 1 - inp[i] * inp[i];
        d = nd;
      }
    }
    this.t++;
    const B = batch.length, b1 = 0.9, b2 = 0.999, c1 = 1 - b1 ** this.t, c2 = 1 - b2 ** this.t;
    const upd = (p, g, m, v) => { for (let i = 0; i < p.length; i++) { const gi = g[i] / B; m[i] = b1 * m[i] + (1 - b1) * gi; v[i] = b2 * v[i] + (1 - b2) * gi * gi; p[i] -= this.lr * (m[i] / c1) / (Math.sqrt(v[i] / c2) + 1e-8); } };
    for (let l = 0; l < L; l++) { upd(this.W[l], gW[l], this.m[l][0], this.v[l][0]); upd(this.b[l], gb[l], this.m[l][1], this.v[l][1]); }
    return loss / B;
  }
}
const netToData = net => ({ sizes: net.sizes.slice(), weights: net.W.map(a => Array.from(a)), biases: net.b.map(a => Array.from(a)) });
function netFromData(d) {
  const ok = d && Array.isArray(d.sizes) && d.sizes.join() === SIZES.join() &&
    Array.isArray(d.weights) && d.weights.length === SIZES.length - 1 && d.weights.every((w, l) => w?.length === SIZES[l] * SIZES[l + 1]) &&
    Array.isArray(d.biases) && d.biases.length === SIZES.length - 1 && d.biases.every((b, l) => b?.length === SIZES[l + 1]);
  if (!ok) return null;
  const net = new MLP();
  net.W = d.weights.map(a => Float64Array.from(a)); net.b = d.biases.map(a => Float64Array.from(a));
  return net;
}

const features = (x, y, vx, vy) => { const s = Math.hypot(vx, vy); return [x / W * 2 - 1, y / H * 2 - 1, vx / s, vy / s]; };
const predictX = (net, b) => clamp(net.forward(features(b.x, b.y, b.vx, b.vy)) * W, R, W - R);
// Train `steps` mini-batches of 32 samples drawn from `data` ([features, label] pairs).
function trainSteps(net, data, steps) {
  if (!data.length) return;
  for (let k = 0; k < steps; k++) {
    const batch = []; for (let i = 0; i < 32; i++) batch.push(data[Math.random() * data.length | 0]);
    net.trainBatch(batch);
  }
}
// Mean absolute error in pixels, on at most ~1500 samples.
function maePx(net, data) {
  if (!data.length) return 0;
  const stride = Math.max(1, Math.floor(data.length / 1500)); let s = 0, n = 0;
  for (let i = 0; i < data.length; i += stride) { s += Math.abs(net.forward(data[i][0]) - data[i][1]); n++; }
  return s / n * W;
}

// ====================================================================================
// Game engine (one instance per page, so each page keeps its own game)
// ====================================================================================
function makeBricks() {
  const out = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++)
    out.push({ x: BSIDE + c * (BW + BGAP), y: BTOP + r * (BH + BGAP), alive: true, row: r });
  return out;
}
class Game {
  constructor() { this.newGame(); }
  newGame() {
    Object.assign(this, { score: 0, lives: 3, level: 1, speed: 5, over: false, bricks: makeBricks(), paddleX: W / 2, landing: null });
    this.resetBall();
  }
  resetBall() { this.ball = { x: this.paddleX, y: PY - R - 1, vx: 0, vy: 0, stuck: true }; this.fall = null; this.wait = 0; }
  launch() {
    if (!this.ball.stuck || this.over) return;
    const a = (Math.random() * 2 - 1) * MAX_ANGLE * 0.7;
    Object.assign(this.ball, { vx: this.speed * Math.sin(a), vy: -this.speed * Math.cos(a), stuck: false });
  }
  // ctrl(game) moves game.paddleX. hooks: onSample(fall, game), onLand(info, game).
  step(ctrl, hooks = {}) {
    if (this.over) return;
    ctrl(this);
    this.paddleX = clamp(this.paddleX, PW / 2, W - PW / 2);
    const b = this.ball;
    if (b.stuck) { b.x = this.paddleX; b.y = PY - R - 1; return; }

    const prevY = b.y, prevVy = b.vy;
    b.x += b.vx; b.y += b.vy;
    if (b.x < R) { b.x = R; b.vx = Math.abs(b.vx); }
    if (b.x > W - R) { b.x = W - R; b.vx = -Math.abs(b.vx); }
    if (b.y < R) { b.y = R; b.vy = Math.abs(b.vy); }

    for (const k of this.bricks) {
      if (!k.alive) continue;
      const cx = clamp(b.x, k.x, k.x + BW), cy = clamp(b.y, k.y, k.y + BH), dx = b.x - cx, dy = b.y - cy;
      if (dx * dx + dy * dy <= R * R) {
        k.alive = false; this.score += 10 * (ROWS - k.row);
        const ox = Math.min(b.x + R - k.x, k.x + BW - (b.x - R)), oy = Math.min(b.y + R - k.y, k.y + BH - (b.y - R));
        if (ox < oy) b.vx = -b.vx; else b.vy = -b.vy;
        this.fall = null;                         // trajectory changed: discard unlabeled states
        break;
      }
    }
    if (this.bricks.every(k => !k.alive)) {
      this.level++; this.speed = Math.min(8, this.speed + 0.5); this.bricks = makeBricks(); this.resetBall(); return;
    }

    // a new fall begins; `aim` is a random offset so the AI returns the ball at varied angles
    if (b.vy > 0 && prevVy <= 0) this.fall = { k: 0, states: [], firstPred: null, aim: (Math.random() * 2 - 1) * PW * 0.32 };

    // observe states during the fall
    if (b.vy > 0 && b.y > TOPZ && b.y < PY - R && this.fall && this.fall.k++ % 3 === 0) {
      this.fall.states.push(features(b.x, b.y, b.vx, b.vy));
      hooks.onSample?.(this.fall, this);
    }

    // reaching the paddle line: label + bounce
    if (b.vy > 0 && prevY < PY - R && b.y >= PY - R) {
      const landX = b.x, rel = (landX - this.paddleX) / (PW / 2 + R), caught = Math.abs(rel) <= 1, fall = this.fall;
      this.fall = null; this.landing = { x: landX, t: 30 };
      hooks.onLand?.({ fall, states: fall ? fall.states : [], landX, paddleX: this.paddleX, caught }, this);
      if (caught) {
        const a = clamp(rel, -1, 1) * MAX_ANGLE;
        b.vx = this.speed * Math.sin(a); b.vy = -this.speed * Math.cos(a); b.y = PY - R;
      }
    }

    if (b.y > H + R) {
      this.lives--;
      if (this.lives <= 0) { this.over = true; this.wait = 0; } else this.resetBall();
    }
  }
}
// AI controller: while the ball falls, move toward the model's prediction at a capped speed.
const aiCtrl = (getNet, aimScale) => g => {
  const b = g.ball, net = getNet();
  let target = g.paddleX;
  if (net && !b.stuck && b.vy > 0) target = predictX(net, b) + (g.fall ? g.fall.aim * aimScale() : 0);
  else if (!b.stuck) target = W / 2;
  g.paddleX += clamp(target - g.paddleX, -PADDLE_MAX, PADDLE_MAX);
};
// Auto-launch and auto-restart for the AI pages. Returns true when the game step should be skipped.
function aiHousekeeping(g, onNewGame) {
  if (g.over) { if (++g.wait > 40) { onNewGame(); g.newGame(); } return true; }
  if (g.ball.stuck && ++g.wait > 30) g.launch();
  return false;
}

// ====================================================================================
// Model library (localStorage) and file download
// ====================================================================================
const STORE_KEY = 'arkanoid-models', DATA_KEY = 'arkanoid-manual-data';
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
function loadStore() { try { const a = JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
function saveStore(list) { localStorage.setItem(STORE_KEY, JSON.stringify(list)); }
// A record exported by the earlier single-page version ('arkanoid-learns-mlp') is converted on import.
function recordFrom(d, fallbackName) {
  if (d?.format === 'arkanoid-learns-model' && netFromData(d.net))
    return { ...d, id: d.id || uid(), name: d.name || fallbackName, kind: d.kind === 'imitate' ? 'imitate' : 'landing', stats: d.stats || {} };
  if (d?.format === 'arkanoid-learns-mlp') {
    const net = { sizes: d.sizes, weights: d.weights, biases: d.biases };
    if (netFromData(net)) return { format: 'arkanoid-learns-model', version: 2, id: uid(), name: fallbackName, kind: 'landing',
      savedAt: d.savedAt || new Date().toISOString(), stats: { throws: d.stats?.throws || 0, steps: d.stats?.steps || 0 }, net };
  }
  return null;
}
// Move a model saved by the earlier single-page version into the library.
(() => {
  try {
    const raw = localStorage.getItem('arkanoid-model'); if (!raw) return;
    const rec = recordFrom(JSON.parse(raw), lang === 'zh' ? '舊版存檔' : 'Earlier save');
    if (rec) { const list = loadStore(); list.push(rec); saveStore(list); }
    localStorage.removeItem('arkanoid-model');
  } catch (e) {}
})();

const fmtWhen = iso => new Date(iso).toLocaleString(lang === 'zh' ? 'zh-TW' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' });
const stamp = () => new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
const defaultName = key => `${t(key)} ${new Date().toLocaleString(lang === 'zh' ? 'zh-TW' : 'en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}`;

// Inside the claude.ai viewer, files go through the `downloads` capability; opened locally, a normal download link.
const framed = window.top !== window;
let downloadsApi = null;
if (framed && window.claude?.use) window.claude.use('downloads').then(d => { downloadsApi = d; }).catch(() => {});
async function downloadText(file, text, type) {
  if (framed) {
    if (!downloadsApi) { setToast('tExportFail', {}, true); return false; }
    try { await downloadsApi.save({ filename: file, data: text }); setToast('tExported', { file }); return true; }
    catch (e) { if (e?.code !== 'declined') setToast('tExportFail', {}, true); return false; }
  }
  try {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement('a'); a.href = url; a.download = file; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setToast('tExported', { file }); return true;
  } catch (e) { setToast('tExportFail', {}, true); return false; }
}
// Save a trained network into the library; falls back to a file download when storage is blocked.
function saveModel({ name, kind, net, stats }) {
  const rec = { format: 'arkanoid-learns-model', version: 2, id: uid(), name, kind, savedAt: new Date().toISOString(), stats, net: netToData(net) };
  try { const list = loadStore(); list.push(rec); saveStore(list); setToast('tSaved', { name }); }
  catch (e) { downloadText(`arkanoid-model-${stamp()}.json`, JSON.stringify(rec), 'application/json').then(ok => ok && setToast('tStoreFail', {}, true)); }
  return rec;
}

// ====================================================================================
// Page state
// ====================================================================================
let pointerX = null; const keys = {};

// ---- Manual: imitation learning. Label = where the player's paddle was when the ball arrived.
const manual = { game: new Game(), data: [], hist: [], model: null, training: false };
try { const a = JSON.parse(localStorage.getItem(DATA_KEY) || '[]'); if (Array.isArray(a)) manual.data = a.filter(d => d && Array.isArray(d.s)); } catch (e) {}
let dataTimer = null;
const saveManualData = () => { clearTimeout(dataTimer); dataTimer = setTimeout(() => { try { localStorage.setItem(DATA_KEY, JSON.stringify(manual.data)); } catch (e) {} }, 400); };
const manualCtrl = g => {
  if (pointerX !== null) g.paddleX = pointerX;
  if (keys.left) g.paddleX -= 9;
  if (keys.right) g.paddleX += 9;
};
const manualHooks = {
  onLand: ({ states, landX, paddleX, caught }) => {
    if (!states.length) return;
    const r4 = v => Math.round(v * 1e4) / 1e4;
    pushCap(manual.data, { s: states.map(f => f.map(r4)), land: Math.round(landX), pad: Math.round(paddleX), caught }, 3000);
    saveManualData();
  }
};
function manualStep() { manual.game.step(manualCtrl, manualHooks); }

// ---- AI Learn: online learning from its own errors. Label = where the ball really landed.
const learn = { game: new Game(), net: new MLP(), buffer: [], running: false, started: false, saving: false,
  ml: { throws: 0, steps: 0, errs: [], catches: [], rates: [], games: 0 } };
const learnCtrl = aiCtrl(() => learn.net, () => 1);
const learnHooks = {
  onSample: (fall, g) => { if (fall.firstPred === null) fall.firstPred = predictX(learn.net, g.ball); },
  onLand: ({ fall, states, landX, caught }) => {
    const ml = learn.ml;
    if (states.length) {
      for (const f of states) { const s = [f, landX / W]; if (learn.buffer.length < BUF_MAX) learn.buffer.push(s); else learn.buffer[Math.random() * BUF_MAX | 0] = s; }
      ml.throws++;
      if (fall.firstPred !== null) pushCap(ml.errs, Math.abs(fall.firstPred - landX), 160);
      if (learn.buffer.length >= 32) { trainSteps(learn.net, learn.buffer, 16); ml.steps += 16; }
    }
    pushCap(ml.catches, caught ? 1 : 0, 50);
    pushCap(ml.rates, { rate: catchRate(ml.catches) * 100, caught }, 160);
  }
};
function learnStep() {
  if (!learn.running) return;
  const g = learn.game;
  if (aiHousekeeping(g, () => learn.ml.games++)) return;
  g.step(learnCtrl, learnHooks);
}

// ---- AI Play: inference only, the loaded model never changes.
const play = { game: new Game(), rec: null, net: null, running: false, catches: [], rates: [], errs: [], games: 0, best: 0 };
// An imitation model already contains the player's own aiming, so it gets only a little random aim.
const playCtrl = aiCtrl(() => play.net, () => play.rec?.kind === 'imitate' ? 0.3 : 1);
const playHooks = {
  onSample: (fall, g) => { if (fall.firstPred === null) fall.firstPred = predictX(play.net, g.ball); },
  onLand: ({ fall, landX, caught }) => {
    if (fall && fall.firstPred !== null) pushCap(play.errs, Math.abs(fall.firstPred - landX), 160);
    pushCap(play.catches, caught ? 1 : 0, 50);
    pushCap(play.rates, { rate: catchRate(play.catches) * 100, caught }, 160);
  }
};
function playStep() {
  if (!play.running || !play.net) return;
  const g = play.game;
  if (aiHousekeeping(g, () => play.games++)) return;
  g.step(playCtrl, playHooks);
  play.best = Math.max(play.best, g.score);
}

// ====================================================================================
// Rendering: game canvas
// ====================================================================================
const cv = $('game'), g2 = cv.getContext('2d');
let showPred = true;
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function drawGame(game, o) {
  const g = g2, b = game.ball;
  g.fillStyle = C.ink; g.fillRect(0, 0, W, H);
  g.strokeStyle = C.line; g.globalAlpha = 0.35; g.lineWidth = 1;
  for (let x = 40; x < W; x += 40) { g.beginPath(); g.moveTo(x + .5, 0); g.lineTo(x + .5, H); g.stroke(); }
  g.globalAlpha = 1;
  // HUD
  g.font = fDisplay(14); g.fillStyle = C.muted; g.textBaseline = 'top';
  g.textAlign = 'left'; g.fillText(t('cScore') + ' ' + String(game.score).padStart(5, '0'), 14, 16);
  g.textAlign = 'center'; g.fillText(t('cLv') + ' ' + game.level, W / 2, 16);
  g.textAlign = 'right'; g.fillText('♥'.repeat(Math.max(0, game.lives)), W - 14, 16);
  g.textAlign = 'left'; g.fillStyle = o.color; g.font = fMono(11); g.fillText(o.label, 14, 36);
  // bricks
  for (const k of game.bricks) {
    if (!k.alive) continue;
    g.fillStyle = ROW_COLORS[k.row]; g.fillRect(k.x, k.y, BW, BH);
    g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(k.x, k.y, BW, 3);
    g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(k.x, k.y + BH - 3, BW, 3);
  }
  // paddle line
  g.strokeStyle = C.line; g.setLineDash([4, 6]); g.beginPath(); g.moveTo(0, PY - .5); g.lineTo(W, PY - .5); g.stroke(); g.setLineDash([]);
  // model prediction
  if (showPred && o.net && !b.stuck && b.vy > 0 && b.y > TOPZ - 40 && !game.over) {
    const px = predictX(o.net, b);
    g.strokeStyle = C.cyan; g.globalAlpha = .45; g.setLineDash([3, 5]);
    g.beginPath(); g.moveTo(b.x, b.y); g.lineTo(px, PY); g.stroke(); g.setLineDash([]); g.globalAlpha = 1;
    g.fillStyle = C.cyan; g.beginPath(); g.moveTo(px, PY - 2); g.lineTo(px - 7, PY + 10); g.lineTo(px + 7, PY + 10); g.closePath(); g.fill();
  }
  if (game.landing && game.landing.t > 0) {
    const L = game.landing;
    g.globalAlpha = L.t / 30; g.strokeStyle = C.fg; g.beginPath(); g.arc(L.x, PY, 10 + (30 - L.t) * .6, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;
    L.t--;
  }
  // paddle & ball
  g.fillStyle = C.amber; roundRect(g, game.paddleX - PW / 2, PY, PW, PH, 4); g.fill();
  g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(game.paddleX - PW / 2 + 4, PY + 2, PW - 8, 2);
  g.fillStyle = C.fg; g.beginPath(); g.arc(b.x, b.y, R, 0, Math.PI * 2); g.fill();
  // overlays
  g.textAlign = 'center';
  if (game.over) {
    g.fillStyle = 'rgba(12,15,36,.75)'; g.fillRect(0, H / 2 - 50, W, 100);
    g.fillStyle = C.coral; g.font = fDisplay(28); g.fillText(t('cOver'), W / 2, H / 2 - 26);
    g.fillStyle = C.muted; g.font = fBody(13); g.fillText(o.overText, W / 2, H / 2 + 12);
  } else if (o.idle) {
    g.fillStyle = 'rgba(12,15,36,.75)'; g.fillRect(0, H / 2 + 36, W, 56);
    g.fillStyle = C.fg; g.font = fBody(15); g.fillText(o.idle, W / 2, H / 2 + 54);
  } else if (b.stuck && o.launchText) {
    g.fillStyle = C.muted; g.font = fBody(13); g.fillText(o.launchText, W / 2, H / 2 + 60);
  }
  g.textAlign = 'left';
}
function drawCurrent() {
  if (cur === 'manual') drawGame(manual.game, { label: t('cManual'), color: C.amber, net: manual.model?.net, overText: t('cAgain'), launchText: t('cLaunch') });
  else if (cur === 'learn') drawGame(learn.game, { label: learn.running ? t('cLearn') : t('cLearnIdle'), color: C.cyan, net: learn.net, overText: t('cRestart'), idle: !learn.running && t('cIdleLearn') });
  else if (cur === 'play') drawGame(play.game, { label: play.rec ? `${t('cPlay')} · ${play.rec.name}` : t('cPlay'), color: C.cyan, net: play.net, overText: t('cRestart'), idle: !play.running && t('cIdlePlay') });
}

// ====================================================================================
// Rendering: charts
// ====================================================================================
// Size a chart canvas to its on-screen box at device resolution; drawing uses CSS pixels.
function fitCanvas(c) {
  const ctx = c._ctx || (c._ctx = c.getContext('2d'));
  const dpr = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
  if (!w || !h) return null;
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); c.cssW = w; c.cssH = h;
  ctx.fillStyle = C.panel; ctx.fillRect(0, 0, w, h);
  return ctx;
}
function emptyText(ctx, c, key) {
  ctx.font = fMono(12); ctx.fillStyle = C.muted; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(t(key), c.cssW / 2, c.cssH / 2);
}
// Shared y axis: 0…240+ px with the 42 px "within reach" line.
function pxAxis(ctx, w, h, l, r, tp, b, k) {
  const maxY = 240, y = v => tp + (1 - Math.min(v, maxY) / maxY) * (h - tp - b);
  ctx.font = fMono(Math.round(11 * k)); ctx.fillStyle = C.muted; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.lineWidth = 1;
  for (const v of [0, 60, 120, 180, 240]) { ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(l, y(v) + .5); ctx.lineTo(w - r, y(v) + .5); ctx.stroke(); ctx.fillText(v === 240 ? '240+' : v, l - 6, y(v)); }
  ctx.strokeStyle = C.cyan; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(l, y(42)); ctx.lineTo(w - r, y(42)); ctx.stroke(); ctx.setLineDash([]);
  return y;
}
function drawCatchRate(c, rates) {
  const ctx = fitCanvas(c); if (!ctx) return;
  const w = c.cssW, h = c.cssH, k = Math.min(1.5, Math.max(1, w / 640));
  const left = 48 * k, right = 10, top = 12, bottom = 24 * k;
  const plotHeight = Math.max(1, h - top - bottom);
  const y = percent => top + (100 - percent) / 100 * plotHeight;
  ctx.font = fMono(Math.round(11 * k));
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.lineWidth = 1;
  for (const percent of [0, 25, 50, 75, 100]) {
    ctx.strokeStyle = C.line;
    ctx.beginPath(); ctx.moveTo(left, y(percent)); ctx.lineTo(w - right, y(percent)); ctx.stroke();
    ctx.fillStyle = C.muted; ctx.fillText(`${percent}%`, left - 6, y(percent));
  }
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(t('cAxis'), left, h - 6);
  if (!rates.length) {
    ctx.textAlign = 'center'; ctx.fillText(t('cEmpty'), (w + left) / 2, h / 2); return;
  }
  const step = (w - left - right) / 159, offset = 160 - rates.length;
  ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; ctx.beginPath();
  rates.forEach(({ rate }, i) => {
    const x = left + (offset + i) * step;
    i ? ctx.lineTo(x, y(rate)) : ctx.moveTo(x, y(rate));
  });
  ctx.stroke();
  rates.forEach(({ rate, caught }, i) => {
    ctx.fillStyle = caught ? C.cyan : C.coral;
    ctx.beginPath(); ctx.arc(left + (offset + i) * step, y(rate), 2.6 * k, 0, Math.PI * 2); ctx.fill();
  });
}
function drawLoss(c, hist, total) {
  const ctx = fitCanvas(c); if (!ctx) return;
  if (!hist.length) { emptyText(ctx, c, 'cLossEmpty'); return; }
  const w = c.cssW, h = c.cssH, k = Math.min(1.5, Math.max(1, w / 640)), l = 40 * k, r = 10, tp = 10, b = 24 * k;
  const y = pxAxis(ctx, w, h, l, r, tp, b, k), x = s => l + s / total * (w - l - r);
  ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = C.muted; ctx.fillText(`${t('cSteps')} ${total.toLocaleString()}`, w - r, h - 6);
  ctx.textAlign = 'left'; ctx.fillText('0', l, h - 6);
  ctx.lineWidth = 2;
  for (const [key, color] of [['tr', C.amber], ['va', C.cyan]]) {
    ctx.strokeStyle = color; ctx.beginPath();
    hist.forEach((p, i) => i ? ctx.lineTo(x(p.s), y(p[key])) : ctx.moveTo(x(p.s), y(p[key])));
    ctx.stroke();
  }
  ctx.lineWidth = 1;
}
function drawNet(c, net, outKey) {
  const ctx = fitCanvas(c); if (!ctx) return;
  if (!net) { emptyText(ctx, c, 'cNetEmpty'); return; }
  const w = c.cssW, h = c.cssH, sizes = net.sizes, L = sizes.length, k = Math.min(1.8, Math.max(1, h / 260));
  ctx.font = fMono(Math.round(11 * Math.min(k, 1.4)));
  const right = ctx.measureText(t(outKey)).width + 22 * k;   // room for the output label
  const xs = sizes.map((_, i) => 46 + i * (w - 46 - right) / (L - 1));
  const pos = (l, i) => [xs[l], 14 + (sizes[l] === 1 ? (h - 28) / 2 : i * (h - 28) / (sizes[l] - 1))];
  for (let l = 0; l < L - 1; l++) {
    const n = sizes[l], o = sizes[l + 1], Wt = net.W[l];
    for (let j = 0; j < o; j++) for (let i = 0; i < n; i++) {
      const v = Wt[j * n + i], [x1, y1] = pos(l, i), [x2, y2] = pos(l + 1, j);
      ctx.strokeStyle = v > 0 ? C.amber : C.violet; ctx.globalAlpha = Math.min(.8, Math.abs(v) * .35);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
  }
  ctx.globalAlpha = 1; ctx.textBaseline = 'middle';
  const names = ['x', 'y', 'dx', 'dy'];
  for (let l = 0; l < L; l++) for (let i = 0; i < sizes[l]; i++) {
    const [x, y] = pos(l, i), a = net.acts[l] ? net.acts[l][i] : 0, rr = (l === 0 || l === L - 1 ? 6 : 4) * k;
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = a >= 0 ? C.amber : C.violet; ctx.globalAlpha = Math.min(1, Math.abs(a)); ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.stroke();
    if (l === 0) { ctx.fillStyle = C.fg; ctx.textAlign = 'right'; ctx.fillText(names[i], x - 8 - rr, y); }
  }
  ctx.fillStyle = C.fg; ctx.textAlign = 'left'; ctx.fillText(t(outKey), xs[L - 1] + 6 + 6 * k, h / 2);
}
function redrawCharts() {
  if (cur === 'manual') { drawLoss($('m-loss'), manual.hist, MANUAL_STEPS); drawNet($('m-net'), manual.model?.net, 'cPad'); }
  else if (cur === 'learn') { drawCatchRate($('l-err-plot'), learn.ml.rates); drawNet($('l-net'), learn.net, 'cLand'); }
  else if (cur === 'play') { drawCatchRate($('p-err-plot'), play.rates); drawNet($('p-net'), play.net, play.rec?.kind === 'imitate' ? 'cPad' : 'cLand'); }
}

// ====================================================================================
// Stats & buttons
// ====================================================================================
const setStat = (id, text, cls = '') => { const e = $(id); e.textContent = text; e.className = cls; };
const errStat = (id, errs) => { const m = median(errs.slice(-20)); m === null ? setStat(id, '–') : setStat(id, m.toFixed(0) + ' px', m <= 42 ? 'good' : 'bad'); };
const rateStat = (id, arr) => {
  if (!arr.length) return setStat(id, '–');
  const r = catchRate(arr);
  setStat(id, Math.round(r * 100) + '%', r >= .8 ? 'good' : r < .5 ? 'bad' : '');
};
function updateStats() {
  if (cur === 'manual') {
    const d = manual.data;
    setStat('m-throws', d.length.toLocaleString());
    setStat('m-samples', d.reduce((a, x) => a + x.s.length, 0).toLocaleString());
    rateStat('m-caught', d.map(x => x.caught));
    const st = manual.model?.stats;
    setStat('m-trainErr', st ? st.trainErr.toFixed(0) + ' px' : '–');
    setStat('m-valErr', st ? st.valErr.toFixed(0) + ' px' : '–', st ? (st.valErr <= 42 ? 'good' : 'bad') : '');
  } else if (cur === 'learn') {
    const ml = learn.ml;
    setStat('l-throws', ml.throws.toLocaleString()); setStat('l-samples', learn.buffer.length.toLocaleString());
    setStat('l-steps', ml.steps.toLocaleString()); errStat('l-err', ml.errs); rateStat('l-catch', ml.catches); rateStat('l-plot-rate', ml.catches);
    setStat('l-games', ml.games.toLocaleString());
  } else if (cur === 'play') {
    rateStat('p-catch', play.catches); rateStat('p-plot-rate', play.catches); errStat('p-err', play.errs);
    setStat('p-games', play.games.toLocaleString()); setStat('p-best', play.best.toLocaleString());
  }
}
function updateButtons() {
  $('m-train').disabled = manual.training;
  $('m-save').disabled = manual.training || !manual.model;
  $('m-save-status').textContent = t(manual.training ? 'mSaveTraining' : manual.model ? 'mSaveReady' : 'mSavePending');
  $('m-clear').disabled = manual.training;
  $('l-run').textContent = t(learn.running ? 'lStop' : learn.started ? 'lResume' : 'lStart');
  $('l-run').disabled = learn.saving;
  $('l-reset').disabled = learn.saving;
  $('l-save').disabled = learn.running || learn.saving || learn.buffer.length < 32;
  $('p-run').textContent = t(play.running ? 'pPause' : 'pStart');
  $('p-run').disabled = !play.net;
  $('p-export').disabled = $('p-delete').disabled = !play.rec;
}
const setBar = (id, f) => { $(id).firstElementChild.style.width = Math.round(f * 100) + '%'; };

// Two-step confirm for destructive buttons (no browser dialogs).
function armed(btn, action) {
  if (btn.dataset.armed) { delete btn.dataset.armed; clearTimeout(btn._t); btn.textContent = t(btn.dataset.i18n); action(); return; }
  btn.dataset.armed = '1'; btn.textContent = t('confirm');
  btn._t = setTimeout(() => { delete btn.dataset.armed; btn.textContent = t(btn.dataset.i18n); }, 3000);
}

let toastKey = '', toastVars = {}, toastErr = false;
function setToast(k, vars = {}, err = false) {
  toastKey = k; toastVars = vars; toastErr = err;
  $('toast').textContent = k ? fill(k, vars) : ''; $('toast').classList.toggle('err', err);
}

// ====================================================================================
// Manual page actions
// ====================================================================================
$('m-train').addEventListener('click', async () => {
  if (manual.training) return;
  const use = manual.data.filter(d => !$('m-only').checked || d.caught);
  if (use.length < MIN_THROWS) { setToast('tNeedData', { n: MIN_THROWS, have: use.length }, true); return; }
  // split by throw, so validation throws are ones the model has never seen
  const sh = use.slice(); for (let i = sh.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [sh[i], sh[j]] = [sh[j], sh[i]]; }
  const nVal = Math.max(1, Math.round(sh.length * 0.2));
  const toSamples = arr => arr.flatMap(d => d.s.map(f => [f, d.pad / W]));
  const val = toSamples(sh.slice(0, nVal)), tr = toSamples(sh.slice(nVal));
  const net = new MLP();
  manual.training = true; manual.model = null; manual.hist = [{ s: 0, tr: maePx(net, tr), va: maePx(net, val) }];
  updateButtons(); updateStats();
  for (let s = 0; s < MANUAL_STEPS;) {
    const n = Math.min(100, MANUAL_STEPS - s); trainSteps(net, tr, n); s += n;
    manual.hist.push({ s, tr: maePx(net, tr), va: maePx(net, val) });
    setToast('tTraining', { p: Math.round(s / MANUAL_STEPS * 100) }); setBar('m-bar', s / MANUAL_STEPS);
    if (cur === 'manual') drawLoss($('m-loss'), manual.hist, MANUAL_STEPS);
    await tick();
  }
  const last = manual.hist[manual.hist.length - 1];
  manual.model = { net, stats: { throws: use.length, samples: tr.length + val.length, steps: MANUAL_STEPS, trainErr: last.tr, valErr: last.va } };
  manual.training = false;
  setToast('tTrained', { err: last.va.toFixed(0) }); updateButtons(); updateStats(); redrawCharts();
});
$('m-save').addEventListener('click', () => {
  if (!manual.model) { setToast('tNeedModel', {}, true); return; }
  const name = $('m-name').value.trim() || defaultName('defManual');
  const st = manual.model.stats;
  saveModel({ name, kind: 'imitate', net: manual.model.net, stats: { throws: st.throws, samples: st.samples, steps: st.steps, valErr: Math.round(st.valErr) } });
  $('m-name').value = '';
});
$('m-clear').addEventListener('click', e => armed(e.currentTarget, () => {
  manual.data = []; manual.hist = []; manual.model = null; saveManualData(); setBar('m-bar', 0);
  setToast('tCleared'); updateButtons(); updateStats(); redrawCharts();
}));
$('m-csv').addEventListener('click', () => {
  if (!manual.data.length) { setToast('tNoData', {}, true); return; }
  const rows = ['throw,x_norm,y_norm,dx,dy,land_x,paddle_x,caught'];
  manual.data.forEach((d, i) => d.s.forEach(f => rows.push([i + 1, ...f, d.land, d.pad, d.caught ? 1 : 0].join(','))));
  downloadText(`arkanoid-data-${stamp()}.csv`, rows.join('\n'), 'text/csv');
});

// ====================================================================================
// AI Learn page actions
// ====================================================================================
$('l-run').addEventListener('click', () => {
  learn.running = !learn.running;
  if (learn.running && !learn.started) { learn.started = true; learn.game.newGame(); }
  setToast(''); updateButtons();
});
$('l-reset').addEventListener('click', e => armed(e.currentTarget, () => {
  learn.net = new MLP(); learn.buffer = []; learn.running = false; learn.started = false;
  learn.ml = { throws: 0, steps: 0, errs: [], catches: [], rates: [], games: 0 }; learn.game.newGame(); setBar('l-bar', 0);
  setToast('tReset'); updateButtons(); updateStats(); redrawCharts();
}));
$('l-save').addEventListener('click', async () => {
  if (learn.running) { setToast('tStopFirst', {}, true); return; }
  if (learn.buffer.length < 32) { setToast('tNoThrows', {}, true); return; }
  learn.saving = true; updateButtons();
  for (let s = 0; s < LEARN_FINAL;) {
    const n = Math.min(100, LEARN_FINAL - s); trainSteps(learn.net, learn.buffer, n); s += n; learn.ml.steps += n;
    setToast('tSaving', { p: Math.round(s / LEARN_FINAL * 100) }); setBar('l-bar', s / LEARN_FINAL);
    await tick();
  }
  const name = $('l-name').value.trim() || defaultName('defLearn');
  saveModel({ name, kind: 'landing', net: learn.net, stats: { throws: learn.ml.throws, samples: learn.buffer.length, steps: learn.ml.steps } });
  $('l-name').value = ''; learn.saving = false; updateButtons(); updateStats();
});

// ====================================================================================
// AI Play page actions
// ====================================================================================
function refreshModelList() {
  const list = loadStore(), sel = $('p-model'), keep = play.rec?.id || '';
  sel.innerHTML = '';
  const opt = (value, text) => { const o = document.createElement('option'); o.value = value; o.textContent = text; return o; };
  if (!list.length) { sel.append(opt('', t('pNone'))); sel.disabled = true; }
  else {
    sel.disabled = false; sel.append(opt('', t('pChoose')));
    for (const [kind, key] of [['imitate', 'pGroupImitate'], ['landing', 'pGroupLanding']]) {
      const items = list.filter(m => m.kind === kind); if (!items.length) continue;
      const grp = document.createElement('optgroup'); grp.label = t(key);
      items.forEach(m => grp.append(opt(m.id, m.name))); sel.append(grp);
    }
  }
  sel.value = list.some(m => m.id === keep) ? keep : '';
  showModelInfo();
}
function showModelInfo() {
  const r = play.rec;
  $('p-info').textContent = r ? fill('pInfo', { kind: t(r.kind === 'imitate' ? 'kindImitate' : 'kindLanding'), when: fmtWhen(r.savedAt),
    throws: (r.stats?.throws || 0).toLocaleString(), steps: (r.stats?.steps || 0).toLocaleString() }) : (loadStore().length ? '' : t('pInfoNone'));
}
function loadPlay(rec) {
  const net = rec && netFromData(rec.net);
  if (!net) { setToast('tBadFile', {}, true); return false; }
  Object.assign(play, { rec, net, running: false, catches: [], rates: [], errs: [], games: 0, best: 0 });
  play.game.newGame(); showModelInfo(); updateButtons(); updateStats(); redrawCharts();
  return true;
}
$('p-model').addEventListener('change', e => {
  const rec = loadStore().find(m => m.id === e.target.value);
  if (!rec) { Object.assign(play, { rec: null, net: null, running: false }); showModelInfo(); updateButtons(); redrawCharts(); return; }
  if (loadPlay(rec)) setToast('tLoaded', { name: rec.name });
});
$('p-run').addEventListener('click', () => {
  if (!play.net) { setToast('tPick', {}, true); return; }
  play.running = !play.running; setToast(''); updateButtons();
});
$('p-import').addEventListener('click', () => $('p-file').click());
$('p-file').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  let rec = null;
  try { rec = recordFrom(JSON.parse(await f.text()), f.name.replace(/\.json$/i, '')); } catch (err) {}
  if (!rec) { setToast('tBadFile', {}, true); return; }
  try { const list = loadStore().filter(m => m.id !== rec.id); list.push(rec); saveStore(list); } catch (err) {}
  loadPlay(rec); refreshModelList(); setToast('tImported', { name: rec.name });
});
$('p-export').addEventListener('click', () => {
  if (!play.rec) { setToast('tPick', {}, true); return; }
  downloadText(`arkanoid-model-${stamp()}.json`, JSON.stringify(play.rec, null, 1), 'application/json');
});
$('p-delete').addEventListener('click', e => {
  if (!play.rec) return;
  armed(e.currentTarget, () => {
    const name = play.rec.name;
    try { saveStore(loadStore().filter(m => m.id !== play.rec.id)); } catch (err) {}
    Object.assign(play, { rec: null, net: null, running: false, catches: [], rates: [], errs: [], games: 0, best: 0 });
    play.game.newGame(); refreshModelList(); updateButtons(); updateStats(); redrawCharts();
    setToast('tDeleted', { name });
  });
});

// ====================================================================================
// Routing: #intro, #handout, #manual, #learn, #play
// ====================================================================================
const ROUTES = ['intro', 'handout', 'manual', 'learn', 'play'];
const MODE_TEXT = { manual: ['manualT', 'manualD', 'hintManual'], learn: ['learnT', 'learnD', 'hintLearn'], play: ['playT', 'playD', 'hintPlay'] };
let cur = 'intro', stepAcc = 0;
let gameView = 'all';
try {
  const saved = localStorage.getItem('arkanoid-game-view');
  if (['progress', 'network', 'both', 'all'].includes(saved)) gameView = saved;
} catch (e) {}
function applyGameView() {
  if (expanded) setExpanded(null);
  $('page-game').dataset.view = gameView;
  $('game-controls').open = gameView === 'all';
  document.querySelectorAll('[data-game-view]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.gameView === gameView));
  });
  redrawCharts();
  fitGameViewport();
}
function fitGameViewport() {
  const page = $('page-game');
  if (page.hidden) return;
  const top = page.getBoundingClientRect().top + window.scrollY;
  const height = Math.max(0, document.documentElement.clientHeight - top - 12);
  page.style.setProperty('--game-viewport-height', `${height}px`);
}
function fitGameScreen() {
  const screen = $('screen');
  if ($('page-game').hidden) return;
  const width = Math.max(0, Math.min(screen.clientWidth, screen.clientHeight * 0.9 * W / H));
  $('game').style.width = `${width}px`;
  $('game').style.height = `${width * H / W}px`;
}
addEventListener('resize', fitGameViewport);
const gameLayoutObserver = new ResizeObserver(fitGameViewport);
gameLayoutObserver.observe(document.querySelector('header'));
gameLayoutObserver.observe($('tabs'));
new ResizeObserver(fitGameScreen).observe($('screen'));
document.querySelectorAll('[data-game-view]').forEach(button => {
  button.addEventListener('click', () => {
    gameView = button.dataset.gameView;
    try { localStorage.setItem('arkanoid-game-view', gameView); } catch (e) {}
    applyGameView();
  });
});
$('game-controls').addEventListener('toggle', () => {
  if (gameView === 'all') $('game-controls').open = true;
});
function applyModeText() {
  if (!MODE_TEXT[cur]) return;
  const [a, b, c] = MODE_TEXT[cur];
  $('mode-title').textContent = t(a); $('mode-desc').textContent = t(b); $('hint').textContent = t(c);
}
function applyRoute() {
  const r = location.hash.slice(1);
  cur = ROUTES.includes(r) ? r : 'intro';
  document.body.dataset.route = cur;
  document.querySelectorAll('.tab').forEach(a => a.dataset.route === cur ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  $('page-intro').hidden = cur !== 'intro';
  $('intro-tools').hidden = cur !== 'intro';
  $('page-handout').hidden = cur !== 'handout';
  $('handout-tools').hidden = cur !== 'handout';
  document.querySelectorAll('#page-intro audio, #page-handout audio').forEach(audio => { if (!audio.closest('#page-' + cur)) audio.pause(); });
  if (cur !== 'intro' && $('slide-player').open) closeSlides();
  $('page-game').hidden = !MODE_TEXT[cur];
  document.querySelectorAll('[data-mode]').forEach(el => { el.hidden = el.dataset.mode !== cur; });
  $('screen').classList.toggle('ai', cur !== 'manual');
  if (expanded) setExpanded(null);
  if (cur === 'play') refreshModelList();
  applyModeText(); setToast(''); updateButtons(); updateStats(); redrawCharts();
  stepAcc = 0;
  fitGameViewport();
}
addEventListener('hashchange', () => { applyRoute(); window.scrollTo(0, 0); });

// ====================================================================================
// Language
// ====================================================================================
function applyLang() {
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => { if (!el.dataset.armed) el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  applySlideTheme();
  $('m-note').textContent = fill('mNote', { n: MIN_THROWS });
  $('l-note').textContent = fill('lNote', { n: LEARN_FINAL.toLocaleString() });
  document.querySelectorAll('.expand span').forEach(s => { s.textContent = t(s.closest('.card') === expanded ? 'collapse' : 'expand'); });
  applyModeText(); setToast(toastKey, toastVars, toastErr); updateButtons();
  if (cur === 'play') refreshModelList();
  if ($('slide-player').open) renderSlide();
  syncHandoutProgress();
  applyHandoutSize();
  fitGameViewport();
  redrawCharts();
}

// Present the same handout content on a fitted canvas, including on browsers that
// provide a viewport player but do not support the Fullscreen API.
const slidePlayer = $('slide-player');
let slideTheme = 'light';
try {
  const saved = localStorage.getItem('arkanoid-slides-theme');
  if (saved === 'light' || saved === 'dark') slideTheme = saved;
} catch (e) {}
function applySlideTheme() {
  document.documentElement.dataset.slideTheme = slideTheme;
  const label = t(slideTheme === 'light' ? 'slidesDark' : 'slidesLight');
  $('slides-theme').textContent = label;
  $('handout-theme').textContent = label;
  $('player-theme').textContent = label;
}
function toggleSlideTheme() {
  slideTheme = slideTheme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('arkanoid-slides-theme', slideTheme); } catch (e) {}
  applySlideTheme();
}
$('slides-theme').addEventListener('click', toggleSlideTheme);
$('handout-theme').addEventListener('click', toggleSlideTheme);
// Text size for presenting the handout on a projector. Zoom scales text and diagrams together,
// and the handout keeps fitting its column because zoomed boxes still fill the same width.
const HANDOUT_SIZES = [0.85, 1, 1.15, 1.3, 1.5, 1.75, 2, 2.5];
let handoutSize = 1;
try {
  const saved = Number(localStorage.getItem('arkanoid-handout-size'));
  if (HANDOUT_SIZES.includes(saved)) handoutSize = saved;
} catch (e) {}
function applyHandoutSize() {
  const percent = `${Math.round(handoutSize * 100)}%`;
  $('page-handout').style.setProperty('--handout-zoom', handoutSize);
  $('handout-size').textContent = percent;
  $('handout-size').setAttribute('aria-label', fill('sizeReset', { p: percent }));
  $('handout-smaller').setAttribute('aria-label', t('sizeSmaller'));
  $('handout-larger').setAttribute('aria-label', t('sizeLarger'));
  $('handout-smaller').disabled = handoutSize === HANDOUT_SIZES[0];
  $('handout-larger').disabled = handoutSize === HANDOUT_SIZES.at(-1);
}
function setHandoutSize(size) {
  // Keep the reader's place: remember which heading is at the top and scroll back to it.
  const anchor = [...$('page-handout').querySelectorAll('.handout-section, .handout-cover')].find(el => el.getBoundingClientRect().bottom > 80);
  const offset = anchor?.getBoundingClientRect().top;
  handoutSize = size;
  try { localStorage.setItem('arkanoid-handout-size', String(size)); } catch (e) {}
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
// + / − / 0 on the handout page, leaving browser zoom (Ctrl/Cmd) and text fields alone.
addEventListener('keydown', event => {
  if (cur !== 'handout' || event.ctrlKey || event.metaKey || event.altKey || event.target.closest?.('input, textarea, select, [contenteditable]')) return;
  if (event.key === '+' || event.key === '=') stepHandoutSize(1);
  else if (event.key === '-' || event.key === '_') stepHandoutSize(-1);
  else if (event.key === '0') setHandoutSize(1);
  else return;
  event.preventDefault();
});
// Contents links scroll within the handout so the #handout route stays put.
$('page-handout').addEventListener('click', event => {
  const link = event.target.closest('[data-jump]');
  if (!link) return;
  event.preventDefault();
  const target = $(link.dataset.jump);
  target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  target.querySelector('h2').focus({ preventScroll: true });
});
// Only one recording plays at a time, across the intro slides, the handout and the slide player.
document.addEventListener('play', event => {
  [...document.querySelectorAll('audio'), deckAudio].forEach(audio => { if (audio !== event.target) audio.pause(); });
}, true);
// Self-study progress: one checkbox per section, remembered in this browser only.
let handoutDone = new Set();
try { handoutDone = new Set(JSON.parse(localStorage.getItem('arkanoid-handout-done') || '[]')); } catch (e) {}
function syncHandoutProgress() {
  const page = $('page-handout');
  const boxes = page.querySelectorAll('[data-done]');
  boxes.forEach(box => {
    box.checked = handoutDone.has(box.dataset.done);
    page.querySelector(`[data-jump="handout-${box.dataset.done}"]`)?.classList.toggle('is-done', box.checked);
  });
  const text = page.querySelector('.handout-progress-text');
  if (text) text.textContent = text.dataset.template.replace('{n}', handoutDone.size).replace('{total}', boxes.length);
  page.querySelector('.handout-meter i')?.style.setProperty('width', `${boxes.length ? handoutDone.size / boxes.length * 100 : 0}%`);
}
function saveHandoutProgress() {
  try { localStorage.setItem('arkanoid-handout-done', JSON.stringify([...handoutDone])); } catch (e) {}
  syncHandoutProgress();
}
$('page-handout').addEventListener('change', event => {
  const box = event.target.closest('[data-done]');
  if (!box) return;
  box.checked ? handoutDone.add(box.dataset.done) : handoutDone.delete(box.dataset.done);
  saveHandoutProgress();
});
$('page-handout').addEventListener('click', event => {
  if (!event.target.closest('.handout-reset')) return;
  handoutDone.clear();
  saveHandoutProgress();
});
$('player-theme').addEventListener('click', toggleSlideTheme);
let slideIndex = 0;
let slideReturnFocus = null;
let playerHadFullscreen = false;
const stackedSlides = matchMedia('(max-width: 760px), (max-width: 1000px) and (max-height: 500px)');
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
// Slide-player narration: one audio element follows the current slide. While narration is on,
// a slide that finishes speaking advances to the next one, so the whole deck can play hands-free.
const deckAudio = new Audio();
deckAudio.preload = 'none';
document.body.append(deckAudio);
let deckNarrating = false;
const slideAudioSrc = index => (window.HANDOUT_PODCAST?.zh || [])[index]?.src || null;
function syncDeckAudio() {
  const src = slideAudioSrc(slideIndex);
  const button = $('slides-audio');
  button.hidden = !(window.HANDOUT_PODCAST?.zh || []).some(episode => episode.src);
  button.disabled = !src;
  if (deckAudio.getAttribute('src') !== src) {
    deckAudio.pause();
    if (src) deckAudio.setAttribute('src', src); else deckAudio.removeAttribute('src');
  }
  if (!src) deckNarrating = false;
  if (deckNarrating && src && deckAudio.paused) deckAudio.play().catch(() => { deckNarrating = false; syncDeckAudioButton(); });
  syncDeckAudioButton();
}
function syncDeckAudioButton() {
  $('slides-audio').textContent = t(deckNarrating ? 'slidesAudioStop' : 'slidesAudioPlay');
  $('slides-audio').setAttribute('aria-pressed', String(deckNarrating));
}
function stopDeckAudio() { deckNarrating = false; deckAudio.pause(); syncDeckAudioButton(); }
$('slides-audio').addEventListener('click', () => {
  deckNarrating = !deckNarrating;
  if (deckNarrating) syncDeckAudio(); else deckAudio.pause();
  syncDeckAudioButton();
});
deckAudio.addEventListener('ended', () => {
  const total = $('page-intro').querySelectorAll('.info-slide').length;
  if (deckNarrating && slideIndex < total - 1) moveSlide(1);
  else { deckNarrating = false; deckAudio.currentTime = 0; syncDeckAudioButton(); }
});
deckAudio.addEventListener('pause', () => { if (!deckAudio.ended && deckNarrating && slidePlayer.open && !document.hidden && deckAudio.getAttribute('src') === slideAudioSrc(slideIndex)) { deckNarrating = false; syncDeckAudioButton(); } });
function renderSlide() {
  const slides = $('page-intro').querySelectorAll('.info-slide');
  slideIndex = Math.max(0, Math.min(slideIndex, slides.length - 1));
  $('slide-canvas').replaceChildren(slides[slideIndex].cloneNode(true));
  $('slide-stage').scrollTop = 0;
  $('slides-prev').disabled = slideIndex === 0;
  $('slides-next').disabled = slideIndex === slides.length - 1;
  $('slides-count').textContent = fill('slidesCount', { n: slideIndex + 1, total: slides.length });
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
$('slides-open').addEventListener('click', () => {
  slideReturnFocus = document.activeElement;
  slideIndex = 0;
  slidePlayer.showModal();
  document.body.classList.add('has-slide-player');
  renderSlide();
  $('slides-next').focus();
  enterSlideFullscreen();
});
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
    case 'End': index = $('page-intro').querySelectorAll('.info-slide').length - 1; break;
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

// ====================================================================================
// Shared controls & input
// ====================================================================================
let speedMul = 1;
function setSpeed() {
  speedMul = 2 ** +$('speed').value;
  $('speedOut').textContent = (speedMul < 10 ? speedMul.toFixed(2) : speedMul.toFixed(0)) + '×';
}
$('speed').addEventListener('input', setSpeed); setSpeed();
$('showPred').addEventListener('change', e => { showPred = e.target.checked; });

const toLogical = clientX => { const r = cv.getBoundingClientRect(); return (clientX - r.left) / r.width * W; };
const manualLaunch = () => { if (manual.game.over) manual.game.newGame(); else manual.game.launch(); };
cv.addEventListener('pointermove', e => { pointerX = toLogical(e.clientX); });
cv.addEventListener('pointerdown', e => { pointerX = toLogical(e.clientX); if (cur === 'manual') manualLaunch(); });
// Leave keys alone in text fields, selects and sliders; leave Space alone on buttons and links.
const ownsKeys = el => ['SELECT', 'TEXTAREA'].includes(el.tagName) || (el.tagName === 'INPUT' && el.type !== 'checkbox');
addEventListener('keydown', e => {
  if (e.key === 'Escape' && expanded) { setExpanded(null); return; }
  if (cur !== 'manual' || ownsKeys(e.target)) return;
  if (e.code === 'Space' && ['BUTTON', 'A'].includes(e.target.tagName)) return;
  if (['ArrowLeft', 'a', 'A'].includes(e.key)) { keys.left = true; pointerX = null; e.preventDefault(); }
  if (['ArrowRight', 'd', 'D'].includes(e.key)) { keys.right = true; pointerX = null; e.preventDefault(); }
  if (e.code === 'Space') { e.preventDefault(); manualLaunch(); }
});
addEventListener('keyup', e => {
  if (['ArrowLeft', 'a', 'A'].includes(e.key)) keys.left = false;
  if (['ArrowRight', 'd', 'D'].includes(e.key)) keys.right = false;
});

// ---------- expandable chart panels ----------
const ICONS = '<svg class="ico-open" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M10 2h4v4M6 14H2v-4M14 2 9 7M2 14l5-5"/></svg>' +
  '<svg class="ico-close" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M13 7H9V3M3 9h4v4M9 7l5-5M7 9l-5 5"/></svg><span></span>';
let expanded = null;
function setExpanded(card) {
  if (expanded) {
    expanded.classList.remove('expanded');
    const b = expanded.querySelector('.expand'); b.setAttribute('aria-expanded', 'false'); b.querySelector('span').textContent = t('expand');
  }
  const prev = expanded; expanded = card;
  if (card) {
    card.classList.add('expanded');
    const b = card.querySelector('.expand'); b.setAttribute('aria-expanded', 'true'); b.querySelector('span').textContent = t('collapse'); b.focus();
  } else if (prev) prev.querySelector('.expand').focus();
  $('backdrop').hidden = !card;
  document.body.classList.toggle('has-expanded', !!card);
  redrawCharts();
}
document.querySelectorAll('.expand').forEach(b => {
  b.innerHTML = ICONS;
  b.addEventListener('click', () => { const card = b.closest('.card'); setExpanded(expanded === card ? null : card); });
});
$('backdrop').addEventListener('click', () => setExpanded(null));
const ro = new ResizeObserver(() => redrawCharts());
document.querySelectorAll('canvas.plot').forEach(c => ro.observe(c));

// ====================================================================================
// Main loop: only the visible page's game runs
// ====================================================================================
const STEP = { manual: manualStep, learn: learnStep, play: playStep };
let frame = 0;
function loop() {
  if (STEP[cur]) {
    stepAcc += speedMul;
    const n = Math.min(64, Math.floor(stepAcc)); stepAcc -= n;
    for (let i = 0; i < n; i++) STEP[cur]();
    drawCurrent();
    if (frame % 6 === 0) { redrawCharts(); updateStats(); }
    if (frame % 30 === 0) updateButtons();
  }
  frame++;
  requestAnimationFrame(loop);
}

applyLang();
applyGameView();
applyRoute();
loop();
})();
