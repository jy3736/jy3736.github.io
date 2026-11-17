// Self-study notes for the text handout (#handout), one entry per slide of the ML Intro deck.
// Each entry: goals, explain (paragraphs, inline HTML allowed), example, pitfall, check [[question, answer]], try (optional).
// Numbers here must match the game: 4 → 20 → 20 → 1 network, 541 parameters, samples every 3 frames,
// 20% validation split by throw, 84 px paddle (42 px half width), paddle speed cap 8 px per step.
window.HANDOUT_NOTES = {
  zh: {
    ui: {
      howTitle: '怎麼使用這份講義',
      how: [
        ['先看學習目標', '知道這一節要學會什麼。'],
        ['對照圖解', '投影片縮圖和圖卡整理了重點。'],
        ['聽 Podcast 或讀說明', '兩位主持人用對話帶你走一遍，也可以直接閱讀詳細說明。'],
        ['自我檢查', '先自己作答，再展開看參考答案。']
      ],
      goals: '學完這一節，你能夠', diagram: '圖解重點', explain: '詳細說明', example: '例題演練',
      pitfall: '常見誤解', check: '自我檢查', reveal: '看參考答案', tryIt: '動手試試',
      done: '我已讀完這一節', progress: '已完成 {n} / {total} 節', reset: '清除進度',
      podcast: '本節 Podcast', minutes: '約 {m} 分鐘'
    },
    sections: [
      {
        goals: ['用一句話說明什麼是機器學習。', '分辨「預測類別」和「預測數量」兩種任務。', '說出人工智慧、機器學習、神經網路三者的關係。'],
        explain: [
          '傳統寫程式時，人要先想好規則，例如「信件標題有『中獎』就當成垃圾郵件」。但真實世界的情況太多，規則很難寫完整。<b>機器學習</b>換個做法：準備大量「例子＋答案」，讓電腦自己找出輸入和答案之間的規律。',
          '學到的規律存在<b>模型</b>裡。模型可以想成一個「有很多旋鈕的公式」，訓練就是把旋鈕調到適當位置，讓公式算出來的結果接近答案。',
          '依照要預測的東西，常見任務分兩類：預測<b>類別</b>（垃圾郵件／一般郵件，又稱分類）和預測<b>數量</b>（明天賣幾杯，又稱迴歸）。打磚塊的球拍屬於後者：模型預測一個位置數字，程式再依照這個數字移動球拍。'
        ],
        example: '<b>題目：</b>下列哪些任務是預測類別、哪些是預測數量？①判斷照片是貓還是狗 ②預估房屋售價 ③判斷交易是否為盜刷 ④預估明天的用電量。<br><b>解答：</b>①③預測類別；②④預測數量。',
        pitfall: '「模型像人一樣理解了問題」——其實模型只是從資料中找到統計上的規律。資料沒涵蓋到的情況，它可能會給出離譜的答案。',
        check: [
          ['預測明天的最高氣溫，是預測類別還是數量？', '數量。答案是一個連續的數字（例如 31.5 °C），不是從幾個固定類別中挑一個。'],
          ['工程師手寫「標題含有『免費』就丟進垃圾桶」的程式，算機器學習嗎？', '不算。規則是人寫的，不是從有答案的例子中學出來的。']
        ]
      },
      {
        goals: ['說出三種學習方式各自依賴什麼回饋。', '判斷一個任務屬於哪一種學習方式。', '解釋為什麼本遊戲屬於監督式學習。'],
        explain: [
          '<b>監督式學習</b>的每筆例子都附有答案（標籤）。模型預測後立刻知道對錯和差多少，所以學得最直接。',
          '<b>非監督式學習</b>只有資料、沒有答案。模型負責找出結構，例如把購買習慣相近的顧客分成幾群；每一群代表什麼意義，仍要由人來判斷。',
          '<b>強化學習</b>沒有每一步的標準答案，只有行動之後得到的<b>獎勵</b>。例如機器人往前走得越遠，分數越高。獎勵常常是延遲的，代理必須靠大量嘗試，才知道哪些行動有幫助。',
          '在打磚塊裡，球落地後，遊戲就知道球真正的落點，可以替這一球的每筆觀察配上精確答案。這比只告訴模型「接到／沒接到」提供了更多資訊，所以本遊戲採用監督式學習。'
        ],
        example: '<b>同一個遊戲，三種學法：</b><br>監督式：答案是落點 x，模型學習預測落點。<br>非監督式：把許多球的飛行軌跡分群，找出「直落型」「反彈型」等模式。<br>強化學習：接到球 +1、漏接 −1，代理在嘗試中學會怎麼移動球拍。',
        pitfall: '「AI 自己玩，所以一定是強化學習」——在「AI 學習」模式中，AI 確實自己玩，但它學習用的是遊戲提供的落點答案，因此仍然是監督式學習。',
        check: [
          ['音樂 App 依照聆聽紀錄把歌曲分群，事先沒有任何曲風標籤。這是哪一種學習？', '非監督式學習。資料沒有答案，模型只負責找出相似的群組。'],
          ['機器狗每往前走一公尺就加分，牠逐漸學會走路。這是哪一種學習？', '強化學習。牠沒有每一步的標準動作，只能從獎勵中學習策略。']
        ]
      },
      {
        goals: ['在表格中指出特徵與標籤。', '說明「一筆例子」包含什麼。', '列出整理資料時要注意的三件事。'],
        explain: [
          '把問題變成機器學習任務，第一步是整理資料表：<b>每一列是一筆例子</b>，前面幾欄是<b>特徵</b>（做預測時拿得到的資訊），最後一欄是<b>標籤</b>（想預測的答案）。',
          '特徵必須是「預測當下就拿得到」的資訊。前一晚要預測明天的銷量，只能用氣象預報，不能用明天實際測到的氣溫。不小心把「未來才知道的資訊」放進特徵，叫做<b>資料洩漏</b>：模型在練習時看起來很準，真正使用時卻失準。',
          '其他要注意的事：單位要一致（不能有的寫攝氏、有的寫華氏）；文字類別要轉成數字（平日＝0、假日＝1）；例子要涵蓋各種情況，例如只收集夏天的資料，模型就不會預測冬天。',
          '打磚塊也一樣。每筆觀察的特徵是球的位置 x、y 和方向 dx、dy。程式會先把位置換算到 −1～1，再把方向換成長度為 1 的向量。這樣四個特徵的數值大小差不多，訓練比較穩定。'
        ],
        example: '<b>題目：</b>飲料店新增一欄「當天實際來客數」，可以拿來預測當天的杯數嗎？<br><b>解答：</b>不適合。來客數要等到當天結束才知道，前一晚預測時拿不到；而且它幾乎直接決定了杯數，會讓模型在練習時表現得過於理想。',
        pitfall: '「欄位越多越好」——跟任務無關、或預測時拿不到的欄位，反而會干擾模型。選特徵時，先問「預測當下拿得到嗎？跟答案有關嗎？」',
        check: [
          ['在「20 °C、平日、30 杯」這筆資料中，哪個是標籤？', '30 杯。這是我們想預測的答案；氣溫和日期類型是特徵。'],
          ['為什麼遊戲要把球的位置換算到 −1～1？', '讓不同特徵的數值範圍接近。否則數值大的特徵（例如 0～600 的 y）會主導計算，讓訓練變慢或不穩定。']
        ]
      },
      {
        goals: ['分辨訓練階段和推論階段。', '描述「預測→比較→調整」的訓練循環。', '說明資料檔和模型檔分別存什麼。'],
        explain: [
          '<b>訓練</b>是調整模型參數（權重）的過程：取一批例子，讓模型預測，計算預測和答案的差距，再把每個權重往「讓差距變小」的方向調一點點。這個循環要重複幾千次以上。每次調多少由<b>學習率</b>決定，太大容易來回震盪，太小則學得很慢。',
          '<b>推論</b>是使用模型的階段：輸入新的情況，模型用固定的權重算出答案，不再調整。推論只要做一次計算，速度很快，所以遊戲每一格畫面都能即時預測。',
          '<b>資料檔</b>保存原始例子，在本遊戲中可以匯出成 CSV。<b>模型檔</b>只保存學到的權重，存成 JSON。有了模型檔，不需要原始資料也能使用模型；想重新訓練或改進模型時，才需要用到資料。'
        ],
        example: '<b>用一個最簡單的模型體會訓練：</b>假設「杯數 ≈ a × 氣溫 + b」，一開始 a = 1、b = 0。<br>28 °C 時模型預測 28 杯，實際賣出 48 杯，少估了 20 杯。<br>所以把 a 和 b 都調大一點，例如 a = 1.3、b = 2，預測變成 38.4 杯，更接近答案了。<br>對每一筆資料反覆這樣做，就是訓練。神經網路只是旋鈕更多（本遊戲有 541 個）。',
        pitfall: '「模型邊用邊變聰明」——在「AI 上場」模式中，權重完全固定。漏接一球，下一球也不會因此變好。會邊玩邊學的是「AI 學習」模式。',
        check: [
          ['在「AI 上場」模式中，模型漏接一球後，下次遇到一樣的球會接到嗎？', '不會。推論時權重固定，同樣的輸入會得到同樣的預測。'],
          ['存下來的模型檔包含你玩過的每一球紀錄嗎？', '不包含。模型檔只有權重和偏差值（共 541 個數字），原始紀錄在資料檔裡。']
        ]
      },
      {
        goals: ['解釋為什麼要保留驗證資料。', '計算正確率與平均誤差。', '從訓練誤差和驗證誤差辨認過度擬合。'],
        explain: [
          '模型在練習題上考高分，不代表遇到新題目也會。所以要先保留一部分例子不參與訓練，訓練完再用它們測試，這部分稱為<b>驗證資料</b>。',
          '預測類別時常用<b>正確率</b>＝答對數 ÷ 總數。預測數量時則看<b>誤差</b>，例如每筆「預測值與實際值差多少」的平均。本遊戲用像素（px）表示誤差。',
          '如果訓練誤差一直下降，驗證誤差卻停住甚至上升，代表模型開始<b>背答案</b>，記住了訓練資料的細節和雜訊，這叫<b>過度擬合</b>。選模型時，應該看驗證資料上的表現。',
          '還要注意<b>情況改變</b>：用夏天資料訓練的銷量模型，到了冬天可能失準；遊戲速度和球的反彈方式改變，模型表現也可能變差。'
        ],
        example: '<b>題目：</b>三天的預測與實際杯數分別是 50／60、40／38、70／75，平均誤差是多少？<br><b>解答：</b>各天誤差為 10、2、5 杯，平均 (10 + 2 + 5) ÷ 3 ≈ 5.7 杯。',
        pitfall: '「訓練資料上 100% 正確＝完美模型」——這往往是過度擬合的警訊。真正要看的是模型在沒看過的資料上表現如何。',
        check: [
          ['模型 A：訓練誤差 2 px、驗證誤差 30 px；模型 B：訓練誤差 8 px、驗證誤差 9 px。該選哪一個？', '選 B。B 在沒看過的資料上表現較好；A 的兩種誤差差距很大，可能已經過度擬合。'],
          ['50 封信中分類正確 45 封，正確率是多少？', '45 ÷ 50 ＝ 90%。']
        ]
      },
      {
        goals: ['說出模型的四個輸入和一個輸出。', '計算一個小型神經網路的參數數量。', '比較「寫規則」和「學規則」的差異。'],
        explain: [
          '模型每次只看四個數字：球的位置 <b>x、y</b> 和移動方向 <b>dx、dy</b>。它看不到畫面，也不知道磚塊在哪裡。輸出只有一個數字：球拍應該前往的 x 位置。',
          '方向用長度為 1 的向量表示，不直接使用速度。遊戲中途球速可能改變，但球會飛往哪裡只取決於方向，所以這樣能讓模型專注在真正有用的資訊上。',
          '網路結構是 <b>4 → 20 → 20 → 1</b>：每個神經元把上一層的數值乘上權重、加總，再加上偏差值。中間層會通過 tanh 函數，把數值壓到 −1～1，讓網路能學出彎曲、非直線的關係。輸出層則直接輸出一個位置。',
          '其實這個問題也能用反彈公式直接算出答案。正因如此，它很適合教學：我們能清楚知道模型學得對不對。'
        ],
        example: '<b>參數怎麼數？</b>每層的參數數量＝輸入數 × 輸出數（權重）＋輸出數（偏差）。<br>4→20：4×20＋20＝100<br>20→20：20×20＋20＝420<br>20→1：20×1＋1＝21<br>合計 100＋420＋21＝<b>541</b> 個可訓練參數。',
        pitfall: '「神經網路看著畫面玩遊戲」——本遊戲的網路只收到四個數字。它沒有看見磚塊、分數或球拍。',
        check: [
          ['如果網路改成 4 → 10 → 1，有幾個參數？', '(4×10＋10)＋(10×1＋1)＝50＋11＝61 個。'],
          ['為什麼方向要換成長度為 1 的向量，而不是直接用速度？', '落點主要由方向決定。球速改變時，如果直接用速度，模型會把同樣的方向當成不同的情況，比較難學。']
        ],
        try: ['前往 AI 上場，勾選「顯示模型預測的落點」，觀察預測點如何隨球移動。', '#play']
      },
      {
        goals: ['比較模仿學習和從錯誤中學習的答案來源。', '預測示範品質會如何影響模仿模型。', '說明「只用接到的球訓練」的用途。'],
        explain: [
          '<b>模仿學習</b>的答案是「你最後把球拍放在哪裡」。模型學的是「你會怎麼做」，不一定是最好的做法。你的習慣、反應慢半拍或失誤，都會被一起學進去。勾選「只用接到的球訓練」可以排除失誤的示範。',
          '<b>從錯誤中學習</b>的答案是「球真正的落點」，由遊戲的物理規則決定，是客觀答案。AI 從亂猜開始，每落一球，就把這一球的觀察和真正落點存進資料庫（最多保留 20,000 筆），再拿來訓練。',
          '兩種方式的取捨：模仿學習需要人花時間示範，但資料量少也能起步；從錯誤中學習不需要人，但需要更多球，學習曲線可能起伏。'
        ],
        example: '<b>情境：</b>你玩了 30 球，漏接 12 球。如果你習慣用球拍右側接球，模仿模型會學到什麼？<br><b>解答：</b>它也會學會「把球拍放在落點左邊一點」，讓球落在球拍右側。勾選只用接到的球時，會剩下 18 球的資料可以訓練。',
        pitfall: '「模仿模型一定比我差」——大多數時候它的上限接近示範者，但它會把很多球的示範平均起來，有時比你偶爾手滑的表現更穩定。',
        check: [
          ['哪一種方式的答案比較客觀？為什麼？', '從錯誤中學習。落點由遊戲的物理規則決定，不受個人習慣或失誤影響。'],
          ['示範時你常常漏接，模仿模型的接球率可能會怎樣？', '可能偏低，因為它把失誤也學進去了。可以勾選「只用接到的球訓練」，或多收集一些較好的示範。']
        ],
        try: ['前往手動模式，玩幾球後看看「接到的比例」，再決定要不要勾選只用接到的球。', '#manual']
      },
      {
        goals: ['描述一筆訓練樣本如何產生。', '說明反向傳播在訓練中扮演的角色。', '解釋預測正確仍可能漏接的原因。'],
        explain: [
          '<b>收集：</b>球往下掉時，遊戲每隔 3 個畫面記錄一次球的狀態。相鄰畫面幾乎一樣，隔幾格記錄可以減少重複資料。等球到達球拍高度，才知道答案，再替這一球所有的觀察配上同一個答案。所以<b>一球會產生許多筆樣本</b>。',
          '<b>訓練：</b>模型做出預測 ŷ，和答案 y 比較，計算平方誤差。<b>反向傳播</b>從輸出層往回推，算出每個權重對誤差的影響，再用最佳化方法（本遊戲使用 Adam，學習率 0.003）一點一點調整權重。每次用一小批樣本計算，重複很多次。',
          '<b>使用：</b>每一格畫面都把當下的球況交給模型，模型輸出預測位置，球拍朝那裡移動。但 AI 的球拍每步最多只能移動 8 px，如果預測太晚變準，球拍可能來不及到位。'
        ],
        example: '<b>情境：</b>一球從開始下落到抵達球拍高度共經過 42 個畫面，最後落在 x = 312。會產生幾筆樣本？答案是什麼？<br><b>解答：</b>每 3 格記錄一次，約 14 筆樣本。這 14 筆的答案都是落點 312（在網路內部換算成 312 ÷ 480 = 0.65）。',
        pitfall: '「一球就是一筆資料」——實際上同一球會在不同高度留下多筆觀察。所以切分驗證資料時，要以整球為單位，下一節會說明原因。',
        check: [
          ['球剛開始往下掉時的觀察，為什麼比較難預測？', '距離落點還很遠，中途可能撞牆反彈好幾次，只要方向有一點誤差，落點就會差很多。'],
          ['模型的預測很準，球拍卻沒接到球，可能的原因是什麼？', '球拍有速度上限，每步最多 8 px。如果開始時預測位置離得太遠，或預測太晚才修正，球拍就可能來不及到位。']
        ],
        try: ['前往 AI 學習，把速度調高，觀察網路圖的權重顏色怎麼隨訓練變化。', '#learn']
      },
      {
        goals: ['正確使用特徵、標籤、損失、梯度更新、驗證、推論六個名詞。', '讀懂訓練過程圖。', '解釋為什麼要以整球切分資料。'],
        explain: [
          '把六個名詞串成一次學習：<b>特徵</b>（x、y、dx、dy）輸入模型 → 模型輸出預測 → 和<b>標籤</b>比較得到<b>損失</b> → 根據損失做一次<b>梯度更新</b> → 重複很多次 → 用<b>驗證</b>資料檢查 → 存檔後用固定權重做<b>推論</b>。',
          '<b>讀圖：</b>手動模式的訓練圖有兩條線。橘線是訓練資料的誤差，青線是驗證資料的誤差，虛線是 42 px（球拍寬度的一半）。兩條線一起往下降、且接近虛線，就是好的訊號。如果橘線持續下降、青線卻上升，代表模型開始過度擬合。',
          '<b>為什麼以整球切分？</b>同一球的多筆觀察非常相似，答案也一樣。如果隨機切分，驗證資料裡會出現和訓練資料幾乎相同的樣本，驗證成績就會偏高，看起來比實際上更準。以整球為單位切分，驗證時才是真正沒看過的球。'
        ],
        example: '<b>跟著一筆預測走一次：</b>輸入 (0.2, −0.5, 0.6, 0.8) → 模型輸出 0.55 → 換算成 0.55 × 480 = 264 px。實際落點 300 px，誤差 36 px，小於 42 px，表示預測落點在半個球拍寬度內，只要球拍及時到位，就能接到球。',
        pitfall: '「損失低＝接球率高」——兩者相關，但不完全相同。接球還受球拍移動速度影響，所以最後要用「AI 上場」的接球率來驗證。',
        check: [
          ['為什麼驗證資料要以整球為單位切分？', '同一球的觀察幾乎重複。隨機切分會讓驗證資料和訓練資料太像，驗證成績會比實際好。'],
          ['某次預測誤差 50 px，在球拍寬度的一半以內嗎？', '不在。球拍寬 84 px，一半是 42 px，50 px 已經超出範圍，即使球拍完全對準預測位置也接不到。']
        ],
        try: ['在手動模式按「訓練模型」，觀察訓練與驗證兩條誤差線的走勢。', '#manual']
      },
      {
        goals: ['設計一個公平的模型比較實驗。', '記錄並解讀實驗結果。', '提出改進模型的想法。'],
        explain: [
          '比較兩個模型時，除了模型本身，其他條件都要相同，這叫做<b>控制變因</b>。速度要一樣，因為速度會影響球拍是否來得及到位；落球數量也要接近，最好至少 50 球，因為接球率是用最近 50 球計算的。',
          '球數太少時，結果很容易受運氣影響。接 5 球中 4 球（80%）和接 50 球中 40 球（80%）的比例相同，但後者可信得多。',
          '記錄結果後，可以試著改變一個條件再比較，例如收集更多資料、只用接到的球訓練，或讓 AI 學得更久。一次只改一個條件，才知道是哪個改變造成差異。'
        ],
        example: '<b>建議的紀錄表：</b><br>模型名稱｜訓練方式｜資料球數｜驗證誤差｜速度｜落球數｜接球率<br>小明模仿版｜模仿學習｜32｜28 px｜1×｜60｜72%<br>AI 自學版｜從錯誤中學習｜400｜18 px｜1×｜60｜88%<br>（表中數字為示意）',
        pitfall: '「看幾球就下結論」——少量落球的接球率起伏很大。至少讓每個模型打 50 球以上再比較。',
        check: [
          ['為什麼兩個模型要在相同速度下比較？', '速度越快，球拍越可能來不及到位。速度不同時，接球率差異可能來自速度，而不是模型本身。'],
          ['想知道「只用接到的球」有沒有幫助，實驗該怎麼設計？', '用同一批資料各訓練一個模型：一個勾選、一個不勾選，其他條件都相同，再以相同速度和球數比較接球率。']
        ],
        try: ['依序完成手動模式、AI 學習，再到 AI 上場比較兩個模型。', '#manual']
      }
    ],
    review: [
      ['飲料店的例子中，哪些欄位是特徵？哪一欄是標籤？', '特徵是氣溫和日期類型；標籤是實際賣出的杯數。'],
      ['為什麼手動模式要保留 20% 的球不參與訓練？', '用來檢查模型對沒看過的球預測得準不準，避免只會背訓練資料。'],
      ['模仿學習和從錯誤中學習，使用的答案有什麼不同？', '模仿學習用你最後的球拍位置；從錯誤中學習用球真正的落點。'],
      ['模型在訓練例子上表現很好，為什麼遇到新的球仍可能接不到？', '可能是過度擬合、訓練資料沒涵蓋這種球，或球拍速度有上限，來不及移動到預測位置。']
    ]
  },
  en: {
    ui: {
      howTitle: 'How to use this handout',
      how: [
        ['Read the goals', 'Know what each section should teach you.'],
        ['Scan the diagrams', 'The slide thumbnail and cards sum up the key points.'],
        ['Listen or read', 'Two hosts talk the idea through, or read the full explanation.'],
        ['Check yourself', 'Answer first, then reveal the suggested answer.']
      ],
      goals: 'After this section you can', diagram: 'Key points in diagrams', explain: 'Explanation', example: 'Worked example',
      pitfall: 'Common misconception', check: 'Check yourself', reveal: 'Show answer', tryIt: 'Try it',
      done: 'I have finished this section', progress: '{n} of {total} sections done', reset: 'Clear progress',
      podcast: 'Section podcast', minutes: 'About {m} min'
    },
    sections: [
      {
        goals: ['Explain machine learning in one sentence.', 'Tell predicting a category apart from predicting a number.', 'Describe how AI, machine learning and neural networks relate.'],
        explain: [
          'In ordinary programming, people write the rules first, such as “if the subject says <i>you won</i>, mark it as spam.” Real situations vary too much for rules like these to cover everything. <b>Machine learning</b> works the other way around: collect many examples with answers and let the computer find the pattern linking inputs to answers.',
          'The pattern it learns is stored in a <b>model</b>. Think of a model as a formula with many adjustable knobs. Training turns the knobs until the formula’s output lands close to the answers.',
          'Common tasks fall into two groups: predicting a <b>category</b> (spam or not, called classification) and predicting a <b>number</b> (cups sold tomorrow, called regression). The Arkanoid paddle uses the second kind. The model predicts a position, and the program moves the paddle toward it.'
        ],
        example: '<b>Question:</b> Which tasks predict a category and which predict a number? ① cat or dog in a photo ② a house’s sale price ③ whether a card payment is fraud ④ tomorrow’s electricity use.<br><b>Answer:</b> ① and ③ predict a category; ② and ④ predict a number.',
        pitfall: '“The model understands the problem like a person.” It only captures statistical patterns in its data. In situations the data never covered, it can give badly wrong answers.',
        check: [
          ['Is predicting tomorrow’s high temperature a category or a number?', 'A number. The answer is a continuous value such as 31.5 °C, not one choice from a fixed list.'],
          ['An engineer writes “if the subject contains <i>free</i>, send it to spam.” Is that machine learning?', 'No. A person wrote the rule; it was not learned from labelled examples.']
        ]
      },
      {
        goals: ['Name the feedback each of the three learning types relies on.', 'Classify a task by learning type.', 'Explain why this game uses supervised learning.'],
        explain: [
          'In <b>supervised learning</b>, every example comes with an answer (a label). After each prediction the model learns how far off it was, so learning is direct.',
          '<b>Unsupervised learning</b> has data but no answers. The model finds structure, such as groups of customers with similar buying habits. People still decide what each group means.',
          '<b>Reinforcement learning</b> has no correct answer for each step, only a <b>reward</b> after acting. A robot might score more the farther it walks. Rewards often arrive late, so the agent needs many attempts to discover which actions help.',
          'In Arkanoid, once the ball lands the game knows exactly where. It can attach a precise answer to every observation of that throw. That says much more than “caught” or “missed,” so this game uses supervised learning.'
        ],
        example: '<b>One game, three ways to learn:</b><br>Supervised: the answer is the landing x; the model learns to predict it.<br>Unsupervised: group many ball paths into patterns such as “straight drop” and “wall bounce.”<br>Reinforcement: +1 for a catch, −1 for a miss; the agent learns how to move by trial and error.',
        pitfall: '“The AI plays by itself, so it must be reinforcement learning.” In AI Learn the AI does play alone, but it learns from landing positions the game supplies. That is still supervised learning.',
        check: [
          ['A music app groups songs from listening history with no genre labels. Which type is this?', 'Unsupervised learning. There are no answers; the model only finds groups of similar songs.'],
          ['A robot dog earns points for each metre it walks and gradually learns to walk. Which type is this?', 'Reinforcement learning. Nobody shows it the right move for each step; it learns a strategy from rewards.']
        ]
      },
      {
        goals: ['Point out features and labels in a table.', 'Describe what one example contains.', 'List three things to check when preparing data.'],
        explain: [
          'To turn a question into a machine-learning task, first build a table. <b>Each row is one example.</b> The first columns are <b>features</b> (information available when predicting), and the last column is the <b>label</b> (the answer to predict).',
          'Features must be available at prediction time. To predict tomorrow’s sales tonight, you can use the weather forecast but not the temperature measured tomorrow. Using information from the future is called <b>data leakage</b>. The model looks accurate in practice runs but fails in real use.',
          'Also: keep units consistent (not a mix of °C and °F); turn text categories into numbers (weekday = 0, weekend = 1); and cover varied situations. A model trained only on summer data cannot predict winter.',
          'Arkanoid works the same way. Each observation’s features are the ball’s position x, y and direction dx, dy. The program scales positions to −1…1 and turns the direction into a vector of length 1. All four features then have similar sizes, which keeps training stable.'
        ],
        example: '<b>Question:</b> The shop adds a column “customers who visited that day.” Should it be a feature for predicting that day’s sales?<br><b>Answer:</b> No. The visitor count is only known when the day ends, so it is not available the night before. It also nearly determines the sales, which would make the model look unrealistically good in practice.',
        pitfall: '“More columns are always better.” Columns that are unrelated, or unavailable when predicting, can mislead the model. For each feature ask: can I get it at prediction time, and does it relate to the answer?',
        check: [
          ['In the row “20 °C, weekday, 30 cups,” what is the label?', '30 cups. That is the answer we want to predict; temperature and day type are features.'],
          ['Why does the game scale the ball position to −1…1?', 'To keep feature ranges similar. Otherwise a large-valued feature such as y (0–600) would dominate, making training slower or unstable.']
        ]
      },
      {
        goals: ['Tell training apart from inference.', 'Describe the predict → compare → adjust loop.', 'Say what a data file and a model file each store.'],
        explain: [
          '<b>Training</b> adjusts the model’s parameters (weights). Take a batch of examples, let the model predict, measure the gap to the answers, then nudge every weight slightly in the direction that shrinks the gap. Repeat thousands of times. The <b>learning rate</b> sets the size of each nudge. Too large and training swings back and forth; too small and it crawls.',
          '<b>Inference</b> is using the model. Give it a new case and it computes an answer with fixed weights, without adjusting anything. It is a single quick calculation, so the game can predict on every frame.',
          'A <b>data file</b> stores the raw examples; this game exports them as CSV. A <b>model file</b> stores only the learned weights, as JSON. You can use a model without its data, but you need the data to retrain or improve it.'
        ],
        example: '<b>Training a tiny model:</b> suppose “cups ≈ a × temperature + b,” starting from a = 1, b = 0.<br>At 28 °C the model predicts 28 cups. The shop actually sold 48, so it was 20 short.<br>Raise a and b a little, say a = 1.3, b = 2. The prediction becomes 38.4 cups, closer to the answer.<br>Repeating this over every row is training. A neural network just has more knobs: 541 in this game.',
        pitfall: '“The model gets smarter as it plays.” In AI Play the weights are fixed. Missing a ball does not improve the next attempt. Only AI Learn updates the model while it plays.',
        check: [
          ['In AI Play, after the model misses a ball, will it catch the same ball next time?', 'No. During inference the weights are fixed, so the same input gives the same prediction.'],
          ['Does a saved model file contain a record of every throw you played?', 'No. It holds only weights and biases (541 numbers). The throw records live in the data file.']
        ]
      },
      {
        goals: ['Explain why some data is held out for validation.', 'Compute accuracy and mean error.', 'Recognise overfitting from training and validation error.'],
        explain: [
          'Scoring well on practice questions does not guarantee doing well on a new exam. So keep part of the examples out of training and test on them afterwards. These are the <b>validation data</b>.',
          'For categories, <b>accuracy</b> = correct ÷ total. For numbers, look at the <b>error</b>, such as the average gap between predicted and actual values. This game measures error in pixels (px).',
          'If training error keeps falling while validation error stalls or rises, the model is <b>memorising</b> details and noise in the training data. This is <b>overfitting</b>. Choose models by their validation performance.',
          'Watch for <b>changing conditions</b> too. A sales model trained on summer data may fail in winter, and a game model may struggle if speed or bounces change.'
        ],
        example: '<b>Question:</b> Over three days the predicted / actual cups were 50 / 60, 40 / 38 and 70 / 75. What is the mean error?<br><b>Answer:</b> The errors are 10, 2 and 5 cups, so the mean is (10 + 2 + 5) ÷ 3 ≈ 5.7 cups.',
        pitfall: '“100% correct on the training data means a perfect model.” That is often a warning sign of overfitting. What matters is performance on data the model has never seen.',
        check: [
          ['Model A: training error 2 px, validation error 30 px. Model B: 8 px and 9 px. Which should you pick?', 'B. It does better on unseen data. A’s large gap between the two errors suggests overfitting.'],
          ['45 of 50 emails are classified correctly. What is the accuracy?', '45 ÷ 50 = 90%.']
        ]
      },
      {
        goals: ['Name the model’s four inputs and one output.', 'Count the parameters in a small neural network.', 'Contrast writing rules with learning them.'],
        explain: [
          'The model sees only four numbers: the ball’s position <b>x, y</b> and direction <b>dx, dy</b>. It cannot see the screen and does not know where the bricks are. Its single output is the x position the paddle should move to.',
          'Direction is a vector of length 1, not the raw velocity. Ball speed can change during a game, but where the ball goes depends only on its direction. This keeps the model focused on what matters.',
          'The network is <b>4 → 20 → 20 → 1</b>. Each neuron multiplies the previous layer’s values by weights, adds them up with a bias, and in hidden layers passes the result through tanh, which squeezes it into −1…1. That lets the network learn curved, non-linear relationships. The output layer gives the position directly.',
          'This problem could also be solved with a bounce formula. That is exactly why it suits teaching: we can check whether the model learned the right thing.'
        ],
        example: '<b>Counting parameters:</b> each layer has inputs × outputs weights plus one bias per output.<br>4→20: 4×20 + 20 = 100<br>20→20: 20×20 + 20 = 420<br>20→1: 20×1 + 1 = 21<br>Total 100 + 420 + 21 = <b>541</b> trainable parameters.',
        pitfall: '“The network watches the screen.” This network receives four numbers only. It never sees bricks, the score or the paddle.',
        check: [
          ['How many parameters does a 4 → 10 → 1 network have?', '(4×10 + 10) + (10×1 + 1) = 50 + 11 = 61.'],
          ['Why turn direction into a length-1 vector instead of using velocity?', 'Landing position depends mainly on direction. With raw velocity, the same direction at different speeds would look like different situations, which is harder to learn.']
        ],
        try: ['Open AI Play, tick “Show the model’s predicted landing point,” and watch the prediction move with the ball.', '#play']
      },
      {
        goals: ['Compare where the answers come from in each mode.', 'Predict how demonstration quality affects an imitation model.', 'Explain what “Train only on caught balls” is for.'],
        explain: [
          'In <b>imitation learning</b>, the answer is where you finally put the paddle. The model learns what <i>you</i> do, which is not always the best move. Your habits, slow reactions and mistakes are learned too. Ticking “Train only on caught balls” filters out failed demonstrations.',
          'In <b>learning from mistakes</b>, the answer is where the ball actually lands. The game’s physics decides it, so it is objective. The AI starts by guessing. After every throw it adds that throw’s observations and landing point to a buffer (up to 20,000 samples) and trains on it.',
          'The trade-off: imitation needs a person to demonstrate but can start from little data. Learning from mistakes needs no person but takes more throws, and progress can fluctuate.'
        ],
        example: '<b>Scenario:</b> You play 30 throws and miss 12. You tend to catch with the right side of the paddle. What will the imitation model learn?<br><b>Answer:</b> It will also place the paddle slightly left of the landing point. With only caught balls ticked, 18 throws remain for training.',
        pitfall: '“An imitation model is always worse than me.” Its ceiling is usually close to the demonstrator’s, but it averages over many throws and can be steadier than your occasional slips.',
        check: [
          ['Which kind of answer is more objective, and why?', 'The actual landing point. Game physics determines it, unaffected by personal habits or mistakes.'],
          ['If you miss often while demonstrating, what may happen to the imitation model’s catch rate?', 'It may be low, because it learned the mistakes too. Tick “Train only on caught balls” or collect better demonstrations.']
        ],
        try: ['Open Manual, play a few throws, check the caught ratio, then decide whether to train only on caught balls.', '#manual']
      },
      {
        goals: ['Describe how one training sample is created.', 'Explain the role of backpropagation.', 'Explain why an accurate prediction can still miss.'],
        explain: [
          '<b>Collect:</b> while the ball falls, the game records its state every 3 frames. Neighbouring frames are nearly identical, so skipping a few reduces duplicates. The answer is only known when the ball reaches paddle height, and then every observation of that throw gets the same answer. So <b>one throw yields many samples</b>.',
          '<b>Train:</b> the model predicts ŷ, compares it with the answer y and computes the squared error. <b>Backpropagation</b> works backwards from the output to find how much each weight contributed to the error. An optimiser (Adam here, learning rate 0.003) then adjusts the weights a little. Each update uses a small batch, and the process repeats many times.',
          '<b>Use:</b> on every frame the current ball state goes into the model, and the paddle moves toward the predicted position. The AI paddle moves at most 8 px per step, so if the prediction becomes accurate too late, the paddle may not arrive in time.'
        ],
        example: '<b>Scenario:</b> A ball falls for 42 frames before reaching paddle height and lands at x = 312. How many samples are made, and what is their answer?<br><b>Answer:</b> Recording every 3 frames gives about 14 samples. All 14 share the answer 312 (inside the network, 312 ÷ 480 = 0.65).',
        pitfall: '“One throw is one data point.” A throw leaves many observations at different heights. That is why validation data is split by whole throws, as the next section explains.',
        check: [
          ['Why are observations from early in the fall harder to predict?', 'The ball is still far from landing and may bounce off walls several times; a tiny direction error grows into a large landing error.'],
          ['The prediction is accurate but the paddle misses. What could cause that?', 'The paddle’s speed cap of 8 px per step. If it starts far away or the prediction corrects late, it cannot reach the spot in time.']
        ],
        try: ['Open AI Learn, raise the speed, and watch the weight colours in the network chart change during training.', '#learn']
      },
      {
        goals: ['Use features, label, loss, gradient step, validation and inference correctly.', 'Read the training chart.', 'Explain why data is split by whole throws.'],
        explain: [
          'One pass through learning uses all six terms. <b>Features</b> (x, y, dx, dy) go into the model → it predicts → comparing with the <b>label</b> gives the <b>loss</b> → the loss drives one <b>gradient step</b> → repeat many times → check on <b>validation</b> data → save and run <b>inference</b> with fixed weights.',
          '<b>Reading the chart:</b> Manual mode’s training chart has two lines. Amber is training error, cyan is validation error, and the dashed line marks 42 px (half the paddle width). Both falling together toward the dashed line is a good sign. Amber falling while cyan rises means overfitting.',
          '<b>Why split by throw?</b> Observations from one throw are very similar and share the same answer. A random split would put near-copies of training samples into validation, inflating the score. Splitting by whole throws means validation uses throws the model truly never saw.'
        ],
        example: '<b>Following one prediction:</b> input (0.2, −0.5, 0.6, 0.8) → model output 0.55 → 0.55 × 480 = 264 px. The ball lands at 300 px, an error of 36 px. That is under 42 px, so the landing point is within half a paddle width and the ball is caught if the paddle gets there in time.',
        pitfall: '“Low loss means a high catch rate.” They are related but not the same, because catching also depends on paddle speed. Confirm with the catch rate in AI Play.',
        check: [
          ['Why is validation data split by whole throws?', 'Observations from one throw are near-duplicates. A random split makes validation too similar to training, so the score looks better than it is.'],
          ['A prediction is 50 px off. Is it within half the paddle width?', 'No. The paddle is 84 px wide, so half is 42 px. At 50 px the ball misses even if the paddle sits exactly on the prediction.']
        ],
        try: ['In Manual, press “Train model” and watch how the training and validation lines move.', '#manual']
      },
      {
        goals: ['Design a fair comparison between models.', 'Record and interpret results.', 'Suggest ways to improve a model.'],
        explain: [
          'When comparing two models, keep everything except the model the same. This is <b>controlling variables</b>. Use the same speed, because speed affects whether the paddle arrives in time. Play a similar number of throws, ideally at least 50, because the catch rate covers the latest 50 throws.',
          'With few throws, luck dominates. Catching 4 of 5 (80%) and 40 of 50 (80%) give the same rate, but the second is far more trustworthy.',
          'After recording results, change one condition and compare again: more data, only caught balls, or longer AI learning. Change one thing at a time so you know which change made the difference.'
        ],
        example: '<b>A suggested results table:</b><br>Model | Method | Throws of data | Validation error | Speed | Throws played | Catch rate<br>Sam’s imitation | Imitation | 32 | 28 px | 1× | 60 | 72%<br>AI self-taught | From mistakes | 400 | 18 px | 1× | 60 | 88%<br>(Illustrative numbers)',
        pitfall: '“A few throws are enough to decide.” Catch rates over a handful of throws swing widely. Let each model play at least 50 throws before comparing.',
        check: [
          ['Why compare both models at the same speed?', 'At higher speed the paddle is more likely to arrive late. With different speeds, a gap in catch rate may come from speed rather than the model.'],
          ['How would you test whether “only caught balls” helps?', 'Train two models on the same data, one with the option ticked and one without, keep everything else equal, then compare catch rates at the same speed and number of throws.']
        ],
        try: ['Work through Manual and AI Learn, then compare both models in AI Play.', '#manual']
      }
    ],
    review: [
      ['In the drink-shop example, which columns are features and which is the label?', 'Temperature and day type are features; cups sold is the label.'],
      ['Why does Manual mode keep 20% of throws out of training?', 'To check how well the model predicts throws it has never seen, rather than just memorising training data.'],
      ['How do the answers differ between imitation learning and learning from mistakes?', 'Imitation uses your final paddle position; learning from mistakes uses where the ball actually lands.'],
      ['Why can a model that does well on training examples still miss new balls?', 'It may overfit, the training data may not cover that kind of throw, or the paddle’s speed cap may stop it reaching the predicted spot.']
    ]
  }
};
