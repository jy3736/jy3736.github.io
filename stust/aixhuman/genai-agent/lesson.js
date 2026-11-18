(() => {
'use strict';
const $ = id => document.getElementById(id);
const lessons = window.LESSON;
const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
// Two-host podcast explainer per slide (audio/slide_podcast.py writes window.GENAI_SLIDE_PODCASTS).
const podcast = i => {
 const ep = window.GENAI_SLIDE_PODCASTS?.[i + 1];
 if (!ep) return '';
 const label = 'Podcast 導讀（沒來上課也聽得懂）';
 return `<div class="slide-podcast"><div class="slide-podcast-head"><span aria-hidden="true">🎙️</span><div><p>${label} · ${Object.values(ep.hosts).join('、')} · ${ep.duration}</p><b>${ep.title}</b></div></div>
 <audio controls preload="none" src="${ep.src}" aria-label="${label}：${ep.title}（${ep.duration}）"></audio></div>`;
};
const sourceLinks = s =>`<p class="lesson-source">參考：${s.sources.map(([url, label]) => `<a href="${url}">${label}</a>`).join('')}</p>`;
function slide(s, i, player = false) {
 const number = String(i + 1).padStart(2, '0');
 return `<article class="info-slide illustrated-slide" ${player ? '' : `id="slide-${i+1}"`} aria-label="第 ${i+1} 張，共 ${lessons.length} 張：${s.title}">
 <h2 class="sr-only">${s.title}</h2>
 <img class="slide-illustration" src="${s.image}" alt="${s.title}。${s.visualAlt}" width="1672" height="941" decoding="async" loading="${player || i===0 ? 'eager' : 'lazy'}">
 ${player ? '' : `${podcast(i)}<details class="slide-study"><summary>自學重點與檢查 · ${number} / ${lessons.length}</summary><p>${s.visualSummary}</p><p><b>想一想：</b>${s.question}</p><details><summary>查看答案</summary><p>${s.answer}</p></details></details>
 <div class="slide-links"><a href="#handout/${i+1}">閱讀本張完整講義 →</a>${s.route ? `<a href="#${s.route}">${s.label} →</a>` : ''}<button type="button" class="lesson-action" data-present="${i}">放映這張</button></div>`}
 </article>`;
}
$('page-intro').innerHTML = lessons.map((s,i) => slide(s,i)).join('');
// Only one episode plays at a time.
$('page-intro').addEventListener('play', e => document.querySelectorAll('.slide-podcast audio').forEach(a => { if (a !== e.target) a.pause(); }), true);
$('page-handout').innerHTML = `<article class="handout-doc">
 <div class="handout-cover"><p class="handout-kicker">READ · TRY · CHECK</p><h2>生成式 AI 到 Agent</h2><p class="handout-intro">五張概念簡報的延伸講義。先讀解釋，再操作三個模擬示範，最後交辦一個能親自驗收的小工具。</p>
 <ul class="handout-meta"><li>5 個主題</li><li>3 個互動示範</li><li>1 個實作任務</li></ul>
 <nav class="handout-toc" aria-label="講義目錄"><h3>閱讀目錄</h3><ol class="handout-toc-parts">${lessons.map((s,i) => `<li><a href="#handout/${i+1}"><span class="handout-toc-num">${String(i+1).padStart(2,'0')}</span>${s.title}</a></li>`).join('')}</ol></nav></div>
 ${lessons.map((s,i) => `<section class="handout-section" id="handout-${i+1}"><div class="handout-head"><span class="handout-num">${String(i+1).padStart(2,'0')}</span><div class="handout-titles"><p class="handout-eyebrow">對應投影片 ${i+1} / 5</p><h2 tabindex="-1">${s.title}</h2><p class="handout-lead">${s.subtitle}</p></div></div>
 <div class="handout-body"><figure class="lesson-figure"><img src="${s.image}" alt="${s.visualAlt}" width="1672" height="941" loading="lazy" decoding="async"><figcaption>投影片 ${i+1}：${s.title}</figcaption></figure><div class="handout-explain">${s.explain}</div><p class="info-takeaway">${s.takeaway}</p><div class="handout-check"><h3>動手練習與檢核</h3>${s.exercise}${s.route ? `<a class="lesson-action" href="#${s.route}">${s.label} →</a>` : ''}</div><details><summary>自我檢查：${s.question}</summary><p>${s.answer}</p></details>${sourceLinks(s)}<a href="#intro/${i+1}">← 回到投影片 ${i+1}</a></div></section>`).join('')}
 <section class="handout-section"><h2>教材來源與改編說明</h2><p>依 Learn-Codex 第 1、2、7 單元改寫；三個互動示範延續本站既有程式。來源摘錄日期為 2026 年 11 月 18 日，摘錄保存在本網站 resources 資料夾，方便離線閱讀與逐段核對。本文未以摘錄中的產品介面、方案或價格作為現況保證。</p><p>原始資料夾：Learn-Codex/docs。各段附上的「參考」可開啟本次使用的章節原文摘錄。講義解釋、練習指引與投影片均為教學改寫。</p></section></article>`;

const dialog = $('slide-player');
let active = 0;
let size = Math.max(100, Math.min(200, Number(read('genai-handout-size','100')) || 100));
let theme = read('genai-slide-theme','light') === 'dark' ? 'dark' : 'light';
function applyTheme() {
 document.documentElement.dataset.slideTheme = theme;
 document.querySelectorAll('[data-theme]').forEach(b => {
  b.textContent = theme === 'light' ? '深色教材' : '淺色教材';
  b.setAttribute('aria-label', theme === 'light' ? '切換為深色教材' : '切換為淺色教材');
 });
 save('genai-slide-theme',theme);
}
document.querySelectorAll('[data-theme]').forEach(b => b.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; applyTheme(); }));
function applySize() {
 document.querySelector('.handout-doc').style.setProperty('--reading-scale',size/100);
 $('handout-size').textContent = `${size}%`;
 $('handout-smaller').disabled = size <= 100;
 $('handout-larger').disabled = size >= 200;
 save('genai-handout-size',size);
}
$('handout-smaller').onclick = () => { size = Math.max(100,size-25); applySize(); };
$('handout-larger').onclick = () => { size = Math.min(200,size+25); applySize(); };
$('handout-size').onclick = () => { size=100; applySize(); };
$('handout-print').onclick = () => window.print();

function fit() {
 if (!dialog.open) return;
 const stage = $('slide-stage'), canvas = $('slide-canvas');
 if (matchMedia('(max-width:760px), (max-width:1000px) and (max-height:500px)').matches) {
  canvas.style.transform='none'; return;
 }
 const scale = Math.min(stage.clientWidth/1280,stage.clientHeight/720);
 canvas.style.transform = `translate(-50%,-50%) scale(${scale})`;
}
function render() {
 $('slide-canvas').innerHTML = slide(lessons[active],active,true);
 $('slides-count').textContent = `${active+1} / ${lessons.length}`;
 // Keep navigation focus on a usable control at the endpoints.
 $('slides-prev').disabled = active===0;
 $('slides-next').disabled = active===lessons.length-1;
 $('slide-stage').scrollTop = 0;
 fit();
}
let opener = null;
function openSlides(i) {
 opener=document.activeElement;
 active=Math.max(0,Math.min(lessons.length-1,i));
 dialog.showModal(); document.body.classList.add('has-slide-player'); render(); $('slides-close').focus();
}
function closeSlides() { dialog.close(); }
dialog.addEventListener('close', () => { document.body.classList.remove('has-slide-player'); if(opener?.isConnected) opener.focus(); });
$('slides-open').onclick = () => openSlides(active);
$('slides-close').onclick = closeSlides;
$('slides-prev').onclick = () => { active=Math.max(0,active-1); render(); };
$('slides-next').onclick = () => { active=Math.min(lessons.length-1,active+1); render(); };
document.addEventListener('click', e => {
 const b=e.target.closest('[data-present]'); if(b) openSlides(Number(b.dataset.present));
});
dialog.addEventListener('keydown',e => {
 let i=active;
 if(['ArrowRight','PageDown',' '].includes(e.key) && e.target.tagName !== 'BUTTON') i++;
 else if(['ArrowRight','PageDown'].includes(e.key)) i++;
 else if(['ArrowLeft','PageUp'].includes(e.key)) i--;
 else if(e.key==='Home') i=0;
 else if(e.key==='End') i=lessons.length-1;
 else return;
 e.preventDefault(); active=Math.max(0,Math.min(lessons.length-1,i)); render();
});
let touchX=0,touchY=0;
$('slide-stage').addEventListener('touchstart', e => { touchX=e.changedTouches[0].clientX; touchY=e.changedTouches[0].clientY; },{passive:true});
$('slide-stage').addEventListener('touchend', e => {
 const dx=e.changedTouches[0].clientX-touchX,dy=e.changedTouches[0].clientY-touchY;
 if(Math.abs(dx)>70 && Math.abs(dx)>Math.abs(dy)*1.5) { active=Math.max(0,Math.min(lessons.length-1,active+(dx<0?1:-1))); render(); }
},{passive:true});
new ResizeObserver(fit).observe($('slide-stage'));
window.addEventListener('resize',fit);

function route() {
 const [part,number] = location.hash.slice(1).split('/');
 const demoLevels={generate:1,reason:2,agent:3};
 const current=['intro','handout',...Object.keys(demoLevels)].includes(part) ? part : 'intro';
 const isDemo = current in demoLevels;
 if(dialog.open) closeSlides();
 document.body.dataset.route=isDemo?'demo':current;
 $('page-intro').hidden=current!=='intro';
 $('page-handout').hidden=current!=='handout';
 $('page-demo').hidden=!isDemo;
 $('intro-tools').hidden=current!=='intro';
 $('handout-tools').hidden=current!=='handout';
 $('lang').hidden=!isDemo;
 document.querySelector('.skip-link').href=isDemo?'#page-demo':`#page-${current}`;
 document.querySelectorAll('.tab[data-route]').forEach(a => {
  if(a.dataset.route===current) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
 });
 if(isDemo) document.querySelector(`.lvl[data-lvl="${demoLevels[current]}"]`).click();
 const index=Number(number);
 if(Number.isInteger(index) && index>=1 && index<=lessons.length && !isDemo) {
  if(current==='intro') active=index-1;
  const target=$(current==='intro'?`slide-${index}`:`handout-${index}`);
  requestAnimationFrame(() => { target.scrollIntoView({block:'start'}); if(current==='handout') target.querySelector('h2').focus({preventScroll:true}); });
 } else window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
// Skip links target existing elements without changing the selected route.
document.querySelector('.skip-link').addEventListener('click',e => {
 e.preventDefault(); const target=$(e.currentTarget.getAttribute('href').slice(1));
 target.tabIndex=-1; target.focus(); target.scrollIntoView();
});
document.addEventListener('click',async e => {
 const b=e.target.closest('[data-copy]'); if(!b)return;
 const text=$(b.dataset.copy).textContent;
 try {
  if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
  else { const ta=document.createElement('textarea'); ta.value=text; document.body.append(ta); ta.select(); if(!document.execCommand('copy')) throw Error(); ta.remove(); }
  $('copy-status').textContent=' 已複製';
 } catch { $('copy-status').textContent=' 請選取上方文字手動複製'; }
});
applyTheme(); applySize(); route();
})();
