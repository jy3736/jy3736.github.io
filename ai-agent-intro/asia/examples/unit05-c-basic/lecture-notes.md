# 第 1 週：課程導論、問題分解、演算法與第一支 C 程式

## 課程簡介

寫程式不是從敲鍵盤開始，而是從「把問題想清楚」開始。本週先建立計算思維（computational thinking）的基本流程：定義問題（define）→ 分解問題（decompose）→ 設計演算法（algorithm design）→ 追蹤驗證（trace）→ 實作（implement）→ 測試（test）。接著建立 C 語言編譯環境，完成第一支程式 `hello.c`，並學會用「輸入／處理／輸出」（Input/Process/Output, IPO）的觀點看待每一支程式。

**教材對應（source mapping）**

- Beej's Guide to C Programming：Ch. 1 "Foreword"（1.3 Hello, World!、1.4 Compilation、1.5 Building with `gcc`）。
- Modern C for Absolute Beginners (2nd Ed.)：Ch. 1 "Introduction to C"、Ch. 2 "Our First Program"。
- 課程文件：[18-week-course-outline.md](../18-week-course-outline.md) 第 1 週、[course-oer.md](../course-oer.md)「演算法、偽程式碼、第一支程式與編譯」列。

## 學習目標

1. 說明計算思維四個核心動作：分解、模式辨識、抽象化、演算法設計。
2. 能把一個生活問題寫成「輸入／處理／輸出」描述與偽程式碼（pseudocode）。
3. 安裝並使用 `gcc` 編譯器，說明「原始碼 → 編譯 → 執行檔 → 執行」的流程。
4. 撰寫、編譯並執行第一支 C 程式，並能預測與驗證輸出。
5. 讀懂 `hello.c` 的每一行結構：`#include`、`int main(void)`、`printf`、`return 0;`。

---

## 1. 問題定義與分解：程式從「想清楚」開始

### A. 問題、輸入、輸出與限制

**問題情境**：便利商店店員要算「找零金額」。

- **輸入（input）**：商品總價 `price`、顧客付款 `paid`（皆為整數，單位：元）。
- **輸出（output）**：找零金額 `change`。
- **處理（process）**：`change = paid - price`。
- **限制（constraints）**：`paid >= price`，且兩者皆為非負整數。

**計算思維動作：分解（decomposition）**。把「結帳」這個大問題拆成三個小步驟——讀入兩個數字、做一次減法、顯示結果。任何看似複雜的程式，都是這樣一層層拆出來的。

### B. 演算法與偽程式碼

寫 C 程式之前，先用偽程式碼把步驟寫成人看得懂的清單：

```text
演算法：計算找零
1. 讀入 price
2. 讀入 paid
3. change ← paid - price
4. 輸出 change
```

對應的流程圖（flowchart）觀念：

```text
[開始] → [輸入 price, paid] → [change = paid - price] → [輸出 change] → [結束]
```

### C. 手動追蹤（manual trace）

演算法寫完先「用手跑一遍」。假設 `price = 37`、`paid = 100`：

| 步驟 | price | paid | change | 輸出 |
| --- | --- | --- | --- | --- |
| 1 | 37 | — | — | — |
| 2 | 37 | 100 | — | — |
| 3 | 37 | 100 | 63 | — |
| 4 | 37 | 100 | 63 | 63 |

追蹤表（trace table）是本課程每週都會用到的工具：先預測，再執行，兩者一致才算理解。

### D. 常見錯誤

- 還沒定義輸入與輸出就開始寫程式碼。
- 演算法步驟順序顛倒（先算 `change` 才讀 `paid`）。
- 忽略限制條件（`paid < price` 時答案為負，這是第 4 週選擇結構要處理的情境）。

### E. 自我檢核

1. 「輸入／處理／輸出」三個詞各對應找零問題的哪一部分？
2. 把「計算兩科成績的平均」寫成四行偽程式碼。

---

## 2. 編譯流程：從原始碼到可執行檔

### A. 概念說明

C 是**編譯式語言（compiled language）**。人寫的 `hello.c` 是純文字的**原始碼（source code）**，必須經過**編譯器（compiler）**翻譯成 CPU 能執行的**可執行檔（executable）**。（Beej Ch. 1.4）

```text
hello.c ──(gcc 編譯)──> hello（或 hello.exe） ──(執行)──> 螢幕輸出
```

本課程統一使用的編譯指令（[course-oer.md](../course-oer.md)）：

```sh
gcc -std=c17 -Wall -Wextra -pedantic hello.c -o hello
./hello
```

各選項意義：

| 選項 | 意義 |
| --- | --- |
| `-std=c17` | 使用 C17 標準。 |
| `-Wall -Wextra -pedantic` | 開啟警告訊息（warning），讓編譯器幫你抓可疑寫法。 |
| `-o hello` | 指定輸出的執行檔名稱。 |

**計算思維動作：抽象化（abstraction）**。你不需要知道 CPU 指令長什麼樣子；編譯器把那一層細節隱藏起來，你只面對 C 語言這一層。

### B. 常見錯誤

- 改了 `hello.c` 卻忘了重新編譯，執行的還是舊版程式。
- 檔名打錯（`gcc helo.c`）造成 `No such file or directory`。
- 只看有沒有產生執行檔，不看警告訊息——警告常是臭蟲的前兆（第 14 週深入）。

### C. 自我檢核

1. 「編譯」和「執行」是同一件事嗎？各自的輸入與輸出是什麼？
2. `-Wall` 的用途是什麼？為什麼本課程要求一定要加？

---

## 3. 第一支 C 程式：hello.c 逐行解讀

### A. 基本範例：hello.c

**問題**：在螢幕上顯示一行問候文字。輸入：無。輸出：一行文字。

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, C World!\n");
    return 0;
}
```

逐行說明（Beej Ch. 1.3；Modern C Ch. 2）：

| 程式碼 | 說明 |
| --- | --- |
| `#include <stdio.h>` | 引入標準輸入輸出（standard I/O）標頭檔，才能使用 `printf`。 |
| `int main(void)` | 主函式（main function），程式從這裡開始執行；`int` 表示結束時回傳一個整數給作業系統。 |
| `printf("...\n");` | 把字串印到螢幕；`\n` 是換行字元（newline）。 |
| `return 0;` | 回傳 0 表示程式正常結束。 |

預期輸出：

```text
Hello, C World!
```

### B. 推理變化：多行輸出與換行字元

**問題**：同一支程式印出三行課程資訊。觀察 `\n` 位置如何決定換行。

```c
#include <stdio.h>

int main(void)
{
    printf("課程：計算機程式及實習\n");
    printf("語言：C（std=c17）\n");
    printf("第 1 週：");
    printf("第一支程式\n");
    return 0;
}
```

預期輸出：

```text
課程：計算機程式及實習
語言：C（std=c17）
第 1 週：第一支程式
```

注意第三、四個 `printf` 印在**同一行**——換行是 `\n` 造成的，不是 `printf` 造成的。這正是「先預測輸出，再執行驗證」的好題材。

### C. 應用情境：印出 IPO 分析表

**問題**：把第 1 節的找零問題分析，直接用程式印成一張小表。輸入：無（本週還沒學輸入，數值先寫死在程式裡）。輸出：IPO 描述與答案。

```c
#include <stdio.h>

int main(void)
{
    printf("=== 找零問題 IPO 分析 ===\n");
    printf("輸入：price = 37, paid = 100\n");
    printf("處理：change = paid - price\n");
    printf("輸出：change = 63\n");
    return 0;
}
```

預期輸出：

```text
=== 找零問題 IPO 分析 ===
輸入：price = 37, paid = 100
處理：change = paid - price
輸出：change = 63
```

### D. 手動追蹤

`printf` 程式的追蹤重點是「游標位置」。以範例 B 為例：

| 敘述 | 螢幕內容（□ 表示游標） |
| --- | --- |
| 第 1 個 printf | `課程：計算機程式及實習` ↵ □ |
| 第 2 個 printf | 加一行 `語言：C（std=c17）` ↵ □ |
| 第 3 個 printf | `第 1 週：□`（沒有 `\n`，游標停在同一行） |
| 第 4 個 printf | 同一行接 `第一支程式` ↵ |

### E. 常見錯誤

- 忘記分號 `;` → 編譯錯誤（error），訊息通常指向下一行。
- 字串引號沒成對：`printf("Hello);` → 編譯錯誤。
- `main` 拼錯或寫成 `Main` → 連結（link）錯誤：C 區分大小寫。
- 忘記 `#include <stdio.h>` 就用 `printf` → 編譯器警告或錯誤。
- 中文全形分號「；」混入程式碼 → 編譯錯誤；程式碼一律用半形符號。

### F. 自我檢核

1. `\n` 放在字串開頭和結尾，輸出各有什麼差別？
2. 把範例 A 的 `return 0;` 拿掉再編譯，會怎樣？（提示：C17 對 `main` 有特別規定，但本課程仍要求寫出來，理由是「明確表達意圖」。）

---

## 4. 綜合實作：我的第一支自我介紹程式

### A. 實作目標

1. 依「定義 → 演算法 → 實作 → 測試」流程完成一支程式。
2. 輸出四行：姓名、學號、選這門課的理由、一句本週學到的觀念。
3. 以課程標準指令編譯，保留指令與輸出證據（截圖或文字紀錄）。

### B. 演算法

```text
1. 印出姓名一行
2. 印出學號一行
3. 印出選課理由一行
4. 印出本週心得一行
```

### C. 完整程式碼

```c
/* intro.c -- 第 1 週綜合實作：自我介紹 */
#include <stdio.h>

int main(void)
{
    printf("姓名：王小明\n");
    printf("學號：4B0G0001\n");
    printf("選課理由：想學會用程式解決問題\n");
    printf("本週心得：先寫演算法，再寫程式\n");
    return 0;
}
```

編譯與執行：

```sh
gcc -std=c17 -Wall -Wextra -pedantic intro.c -o intro
./intro
```

預期輸出：

```text
姓名：王小明
學號：4B0G0001
選課理由：想學會用程式解決問題
本週心得：先寫演算法，再寫程式
```

### D. 程式碼亮點解析

1. `/* ... */` 是註解（comment），編譯器會忽略；第一行註解寫檔名與用途是好習慣。
2. 四個 `printf` 對應演算法的四個步驟——程式碼和演算法一一對應，就是「可說明的程式」。

### E. 測試

| 測試 | 做法 | 通過條件 |
| --- | --- | --- |
| 一般案例 | 直接執行 | 四行內容依序出現，各自成行 |
| 觀察案例 | 刪掉第二行的 `\n` 重新編譯執行 | 第二、三行黏在同一行（驗證你對 `\n` 的理解） |

### F. 擴展練習

1. 加上第五行：印出你最喜歡的一句話，前後加上 `=====` 裝飾線。
2. 故意製造一個編譯錯誤（拿掉一個分號），把錯誤訊息抄下來，說明它指向第幾行、為什麼。
3. 預習：查一查 `printf("%d", 42);` 會印出什麼（下週揭曉）。

---

## 結論與下一步

- 程式開發流程：**定義問題 → 分解 → 演算法／偽程式碼 → 手動追蹤 → C 實作 → 編譯 → 測試**。
- 編譯指令 `gcc -std=c17 -Wall -Wextra -pedantic` 是本課程每週的標準動作。
- `hello.c` 的四個部件（`#include`、`main`、`printf`、`return`）是之後每支程式的骨架。
- **下一步（第 2 週）**：程式需要記住資料才能「處理」——變數、資料型別與運算式。
