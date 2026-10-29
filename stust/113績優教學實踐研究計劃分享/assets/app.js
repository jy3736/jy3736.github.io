'use strict';
const slides=[...document.querySelectorAll('.slide')];
const catalog=document.querySelector('#catalog');
const catalogButton=document.querySelector('#catalog-toggle');
const notes=document.querySelector('#notes');
const notesButton=document.querySelector('#notes-toggle');
const presentButton=document.querySelector('#present-toggle');
const previous=document.querySelector('#prev');
const next=document.querySelector('#next');
let current=0;
const links=[...catalog.querySelectorAll('nav a')];
const autoPod=document.querySelector('#auto-podcast');
function nearest(from,dir){for(let i=from;i>=0&&i<slides.length;i+=dir)if(!slides[i].hidden)return i;return -1;}
function update(index,hash=true){
  const target=Math.max(0,Math.min(slides.length-1,index));
  const moved=target!==current;
  if(moved){closeReplies();stopVoice();}
  current=target;
  previous.disabled=nearest(current-1,-1)<0;next.disabled=nearest(current+1,1)<0;
  document.querySelector('#page-status').textContent=`${String(current+1).padStart(2,'0')} / ${slides.length}`;
  links.forEach((a,i)=>{if(i===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  const page=slides[current];
  document.querySelector('#notes-content').replaceChildren(page.querySelector('template').content.cloneNode(true));
  if(hash && location.hash!==`#${page.id}`)history.replaceState(null,'',`#${page.id}`);
  if(moved&&autoPod.checked)playPod();
}
function go(index){
  if(slides[index]?.hidden)index=Math.max(nearest(index,1),nearest(index,-1));
  update(index);
  slides[current].scrollIntoView({block:innerWidth<=900?'start':'center',behavior:'instant'});
}
function step(dir){const i=nearest(current+dir,dir);if(i>=0)go(i);}
function openCatalog(){catalog.showModal();catalogButton.setAttribute('aria-expanded','true');catalog.querySelector('[aria-current=page]')?.scrollIntoView({block:'nearest'});document.querySelector('#catalog-close').focus();}
function closeCatalog(){catalog.close();catalogButton.setAttribute('aria-expanded','false');catalogButton.focus({preventScroll:true});}
function toggleNotes(force){const show=typeof force==='boolean'?force:notes.hidden;notes.hidden=!show;notesButton.setAttribute('aria-pressed',String(show));}
// AI reply panels (s32–s38) start hidden; the presenter opens one at a time after reading the prompt aloud.
function setReply(button,open){button.setAttribute('aria-expanded',String(open));document.getElementById(button.getAttribute('aria-controls')).hidden=!open;}
// Read-aloud clips (s32–s38): one shared player; the button shows play/pause and elapsed time.
const voice=new Audio();let voiceButton=null,thinking=false;
const clock=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
function voiceLabel(b,playing){b.classList.toggle('playing',playing);b.setAttribute('aria-pressed',String(playing));b.dataset.time=playing&&voice.duration?`${clock(voice.currentTime)} / ${clock(voice.duration)}`:'';}
function stopVoice(){voice.pause();thinking=false;if(voiceButton){voiceButton.classList.remove('thinking');voiceLabel(voiceButton,false);}voiceButton=null;}
voice.addEventListener('timeupdate',()=>{if(voiceButton&&!thinking)voiceLabel(voiceButton,!voice.paused);});
function playVoice(b){stopVoice();voiceButton=b;voice.src=b.dataset.src;voice.play().catch(()=>{});voiceLabel(b,true);}
// 2-second "AI is thinking" cue before a chained reply; the reply button shows 思考中… and a click on it skips the cue.
function think(b){stopVoice();voiceButton=b;thinking=true;voice.src='assets/dialog/thinking.mp3';voice.play().catch(()=>{});b.classList.add('playing','thinking');b.dataset.time='思考中…';}
// Optional chaining (catalog checkbox, on by default, remembered per browser): when a prompt clip ends, play the reply clip in the same turn.
const autoReply=document.querySelector('#auto-reply');
try{autoReply.checked=localStorage.getItem('auto-reply')!=='0';}catch(e){}
autoReply.addEventListener('change',()=>{try{localStorage.setItem('auto-reply',autoReply.checked?'1':'0');}catch(e){}});
voice.addEventListener('ended',()=>{const done=voiceButton;if(thinking){playVoice(done);return;}if(done)voiceLabel(done,false);voiceButton=null;
  const reply=autoReply.checked&&done?.classList.contains('q')&&done.parentElement.querySelector('.say.a');if(reply)think(reply);
  if(autoPod.checked&&done?.classList.contains('pod')){const i=nearest(current+1,1);if(i>=0&&slides[i].querySelector('.say.pod'))go(i);}});
// Podcast autoplay (catalog checkbox, off by default, remembered per browser): arriving on a slide plays its podcast clip,
// and when a clip ends the deck moves to the next slide and keeps playing; it stops at the first slide without a clip.
// Browsers block sound before the first click, so nothing plays on page load.
function playPod(){const b=slides[current].querySelector('.say.pod');if(b&&navigator.userActivation?.hasBeenActive!==false)playVoice(b);}
try{autoPod.checked=localStorage.getItem('auto-podcast')==='1';}catch(e){}
autoPod.addEventListener('change',()=>{try{localStorage.setItem('auto-podcast',autoPod.checked?'1':'0');}catch(e){}
  if(autoPod.checked){if(!voiceButton)playPod();}else if(voiceButton?.classList.contains('pod'))stopVoice();});
function closeReplies(){let any=false;document.querySelectorAll('.ai-toggle[aria-expanded=true]').forEach(b=>{setReply(b,false);any=true;});return any;}
function togglePresent(force){const on=typeof force==='boolean'?force:!document.documentElement.classList.contains('present');document.documentElement.classList.toggle('present',on);presentButton.setAttribute('aria-pressed',String(on));presentButton.textContent=on?'退出滿版':'滿版';requestAnimationFrame(()=>go(current));}
catalogButton.addEventListener('click',openCatalog);
document.querySelector('#catalog-close').addEventListener('click',closeCatalog);
catalog.addEventListener('cancel',()=>{catalogButton.setAttribute('aria-expanded','false');});
catalog.addEventListener('click',e=>{if(e.target===catalog){const r=catalog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeCatalog();}});
links.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();closeCatalog();go(i);}));
previous.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
notesButton.addEventListener('click',()=>toggleNotes());
document.querySelector('#notes-close').addEventListener('click',()=>{toggleNotes(false);notesButton.focus();});
presentButton.addEventListener('click',()=>togglePresent());
document.querySelectorAll('.ai-toggle').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';closeReplies();setReply(b,open);if(open)document.getElementById(b.getAttribute('aria-controls')).querySelector('.ai-close').focus({preventScroll:true});}));
document.querySelectorAll('.say').forEach(b=>b.addEventListener('click',()=>{
  if(voiceButton===b&&!thinking){if(voice.paused)voice.play();else voice.pause();voiceLabel(b,!voice.paused);return;}
  playVoice(b);
}));
document.querySelectorAll('.ai-close').forEach(c=>c.addEventListener('click',()=>{closeReplies();document.querySelector(`[aria-controls="${c.closest('.ai-reply').id}"]`).focus({preventScroll:true});}));
document.addEventListener('keydown',e=>{
  if(e.target.closest('audio,input,textarea,select,[contenteditable]'))return;
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='f'){e.preventDefault();if(!catalog.open)togglePresent();return;}
  if(catalog.open)return;
  if(e.key==='Escape'&&closeReplies())return;
  if(e.key==='Escape'){toggleNotes(false);togglePresent(false);return;}
  if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();step(1);}
  if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();step(-1);}
  if(e.key==='Home'){e.preventDefault();go(nearest(0,1));}
  if(e.key==='End'){e.preventDefault();go(nearest(slides.length-1,-1));}
  if(e.key.toLowerCase()==='n'&&!e.ctrlKey&&!e.metaKey){e.preventDefault();toggleNotes();}
});
let queued=false;
window.addEventListener('scroll',()=>{if(queued||catalog.open)return;queued=true;requestAnimationFrame(()=>{queued=false;let best=0,distance=Infinity;slides.forEach((slide,i)=>{if(slide.hidden)return;const r=slide.getBoundingClientRect();const d=innerWidth<=900?Math.abs(r.top-86):Math.abs(r.top+r.height/2-innerHeight/2);if(d<distance){distance=d;best=i;}});if(best!==current)update(best);});},{passive:true});
window.addEventListener('hashchange',()=>{const i=slides.findIndex(s=>`#${s.id}`===location.hash);if(i>=0)go(i);});
let resizing;
window.addEventListener('resize',()=>{clearTimeout(resizing);resizing=setTimeout(()=>go(current),120);});
const initial=slides.findIndex(s=>`#${s.id}`===location.hash&&!s.hidden);
update(Math.max(0,initial),false);
window.addEventListener('load',()=>go(Math.max(0,initial)));
