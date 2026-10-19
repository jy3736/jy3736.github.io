// Learn-C handout script (generated pages load it from assets/). Behavior mirrors the Learn-Dart
// handouts: theme, font size and sidebar state persist per browser; TOC follows the reading position.
(function(){
  var root=document.documentElement,key='learn-c-theme';
  var themeBtn=document.querySelector('button.theme');
  if(themeBtn)themeBtn.addEventListener('click',function(){
    var dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme=dark?'light':'dark';
    try{localStorage.setItem(key,root.dataset.theme);}catch(e){}
  });
  var sbKey='learn-c-sidebar';
  function setSb(hidden){if(hidden)root.dataset.sidebar='hidden';else delete root.dataset.sidebar;}
  [['button.sidebar-hide',true],['button.sidebar-show',false]].forEach(function(pair){
    var b=document.querySelector(pair[0]);if(!b)return;
    b.addEventListener('click',function(){
      setSb(pair[1]);
      try{localStorage.setItem(sbKey,pair[1]?'hidden':'shown');}catch(e){}
      var other=document.querySelector(pair[1]?'button.sidebar-show':'button.sidebar-hide');if(other)other.focus();
    });
  });
  var fsKey='learn-c-fontsize',fsBtns=document.querySelectorAll('.fontsize button');
  function setFs(v){
    if(v==='normal')delete root.dataset.fs;else root.dataset.fs=v;
    fsBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.fs===v));});
  }
  setFs(root.dataset.fs||'normal');
  fsBtns.forEach(function(b){b.addEventListener('click',function(){
    setFs(b.dataset.fs);
    try{localStorage.setItem(fsKey,b.dataset.fs);}catch(e){}
  });});
  document.querySelectorAll('button.copy').forEach(function(btn){
    btn.addEventListener('click',function(){
      var text=btn.closest('figure').querySelector('pre').innerText;
      var done=function(){btn.textContent='已複製 ✓';setTimeout(function(){btn.textContent='複製';},1500);};
      if(navigator.clipboard){navigator.clipboard.writeText(text).then(done,fallback);}else{fallback();}
      function fallback(){var t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();
        try{document.execCommand('copy');done();}catch(e){}document.body.removeChild(t);}
    });
  });
  var links=document.querySelectorAll('.toc a');
  if(links.length&&'IntersectionObserver' in window){
    var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){
      if(en.isIntersecting){links.forEach(function(a){a.classList.remove('active');});
        var a=map[en.target.id];if(a)a.classList.add('active');}
    });},{rootMargin:'-20% 0px -70% 0px'});
    document.querySelectorAll('main h2[id]').forEach(function(h){io.observe(h);});
  }
  window.addEventListener('beforeprint',function(){document.querySelectorAll('details').forEach(function(d){d.open=true;});});
  // Only one audio plays at a time (sidebar overview vs in-page task audio).
  document.addEventListener('play',function(e){document.querySelectorAll('audio').forEach(function(a){if(a!==e.target)a.pause();});},true);
  // Podcast player in the sidebar.
  var audio=document.getElementById('podcast-audio');
  if(audio){
    var playBtn=document.getElementById('tocAudioPlay');
    var timeDisplay=document.getElementById('tocAudioTime');
    var progressWrap=document.getElementById('tocAudioProgressWrap');
    var progressBar=document.getElementById('tocAudioProgressBar');
    var speedBtns=document.querySelectorAll('.toc-speed-btn');
    var fallbackTotal=timeDisplay?timeDisplay.textContent.split(' / ')[1]:'00:00';
    function fmt(s){
      if(isNaN(s)||!isFinite(s))return '00:00';
      var m=Math.floor(s/60),sec=Math.floor(s%60);
      return (m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
    }
    function updateUI(){
      var total=audio.duration&&isFinite(audio.duration)?fmt(audio.duration):fallbackTotal;
      if(timeDisplay)timeDisplay.textContent=fmt(audio.currentTime)+' / '+total;
      var pct=audio.duration?(audio.currentTime/audio.duration)*100:0;
      if(progressBar)progressBar.style.width=pct+'%';
      if(progressWrap){progressWrap.setAttribute('aria-valuenow',String(Math.round(pct)));progressWrap.setAttribute('aria-valuetext',fmt(audio.currentTime));}
    }
    function setPlaying(p){if(!playBtn)return;playBtn.textContent=p?'⏸':'▶';playBtn.setAttribute('aria-label',p?'暫停':'播放');}
    function seekTo(t){var max=audio.duration&&isFinite(audio.duration)?audio.duration:t;audio.currentTime=Math.max(0,Math.min(max,t));updateUI();}
    if(playBtn)playBtn.addEventListener('click',function(){if(audio.paused)audio.play();else audio.pause();});
    audio.addEventListener('play',function(){setPlaying(true);});
    audio.addEventListener('pause',function(){setPlaying(false);});
    audio.addEventListener('ended',function(){setPlaying(false);});
    ['timeupdate','loadedmetadata','durationchange'].forEach(function(ev){audio.addEventListener(ev,updateUI);});
    if(progressWrap){
      progressWrap.addEventListener('click',function(e){
        if(!audio.duration)return;
        var r=progressWrap.getBoundingClientRect();
        seekTo(Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*audio.duration);
      });
      progressWrap.addEventListener('keydown',function(e){
        var step={ArrowRight:5,ArrowUp:5,ArrowLeft:-5,ArrowDown:-5}[e.key];
        if(e.key==='Home'){e.preventDefault();seekTo(0);}
        else if(e.key==='End'&&audio.duration){e.preventDefault();seekTo(audio.duration);}
        else if(step){e.preventDefault();seekTo(audio.currentTime+step);}
      });
    }
    speedBtns.forEach(function(btn){
      btn.addEventListener('click',function(){
        var spd=parseFloat(btn.dataset.speed);if(!spd)return;
        audio.playbackRate=spd;audio.defaultPlaybackRate=spd;
        speedBtns.forEach(function(b){var on=Math.abs(parseFloat(b.dataset.speed)-spd)<0.01;
          b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');});
      });
    });
  }
  // Slide viewer: buttons, arrow keys, swipe, click to advance, fullscreen.
  document.querySelectorAll('.slide-deck').forEach(function(deck){
    var slides;try{slides=JSON.parse(deck.querySelector('.slide-deck-data').textContent);}catch(e){return;}
    if(!slides.length)return;
    var img=deck.querySelector('.slide-deck-stage img'),count=deck.querySelector('.slide-deck-count'),
      title=deck.querySelector('.slide-deck-title'),prev=deck.querySelector('[data-step="-1"]'),
      next=deck.querySelector('[data-step="1"]'),full=deck.querySelector('.slide-deck-full'),i=0;
    function show(n){
      i=Math.max(0,Math.min(slides.length-1,n));
      img.src=slides[i].src;img.alt='第 '+(i+1)+' 張：'+slides[i].title;
      count.textContent=(i+1)+' / '+slides.length;title.textContent=slides[i].title;
      prev.disabled=i===0;next.disabled=i===slides.length-1;
      if(i+1<slides.length){new Image().src=slides[i+1].src;}
    }
    prev.addEventListener('click',function(){show(i-1);});
    next.addEventListener('click',function(){show(i+1);});
    img.addEventListener('click',function(){show(i+1);});
    deck.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='PageDown'){show(i+1);e.preventDefault();}
      else if(e.key==='ArrowLeft'||e.key==='PageUp'){show(i-1);e.preventDefault();}
      else if(e.key==='Home'){show(0);e.preventDefault();}
      else if(e.key==='End'){show(slides.length-1);e.preventDefault();}
    });
    var startX=null;
    deck.addEventListener('touchstart',function(e){startX=e.touches[0].clientX;},{passive:true});
    deck.addEventListener('touchend',function(e){
      if(startX===null)return;var dx=e.changedTouches[0].clientX-startX;
      if(Math.abs(dx)>40)show(dx<0?i+1:i-1);startX=null;
    });
    // Native fullscreen where supported (webkit prefix for Safari); otherwise a fixed overlay (iPhone).
    var req=deck.requestFullscreen||deck.webkitRequestFullscreen;
    function fsEl(){return document.fullscreenElement||document.webkitFullscreenElement;}
    // In full screen the control bar floats over the slide and fades after 2.5 s without input.
    var idle=null;
    function wake(){
      deck.classList.remove('bar-idle');clearTimeout(idle);
      if(deck.classList.contains('is-full'))idle=setTimeout(function(){deck.classList.add('bar-idle');},2500);
    }
    ['mousemove','touchstart','keydown'].forEach(function(ev){deck.addEventListener(ev,wake,{passive:true});});
    function setFull(on){
      deck.classList.toggle('is-full',on);wake();document.documentElement.style.overflow=on?'hidden':'';
      full.textContent=on?'✕ 離開全螢幕':'⛶ 全螢幕';full.setAttribute('aria-label',on?'離開全螢幕':'全螢幕');
      if(on)deck.focus();
    }
    full.addEventListener('click',function(){
      if(fsEl()===deck){(document.exitFullscreen||document.webkitExitFullscreen).call(document);}
      else if(deck.classList.contains('is-full')){setFull(false);}
      else if(req){var p=req.call(deck);if(p&&p.catch)p.catch(function(){setFull(true);});}
      else{setFull(true);}
    });
    ['fullscreenchange','webkitfullscreenchange'].forEach(function(ev){
      document.addEventListener(ev,function(){setFull(fsEl()===deck);});
    });
    deck.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&deck.classList.contains('is-full')&&!fsEl()){setFull(false);e.preventDefault();}
    });
    show(0);
  });
})();
