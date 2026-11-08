'use strict';
// Break countdown with background music.
// Markup: <div data-break-timer data-minutes="10" data-music="assets/x.mp3"> … </div> inside a .slide.
// With data-music, the file plays (looped, with fades); without it, a 60s-style tune is generated (Web Audio, no file).

function createMusic(){
  const ctx=new (window.AudioContext||window.webkitAudioContext)();
  const master=ctx.createGain();master.gain.value=0;
  const tone=ctx.createBiquadFilter();tone.type='lowpass';tone.frequency.value=2600;tone.Q.value=.4;
  // Small bright room: short generated impulse response, mixed with the dry signal.
  const verb=ctx.createConvolver();const len=ctx.sampleRate*1.8;const ir=ctx.createBuffer(2,len,ctx.sampleRate);
  for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2);}
  verb.buffer=ir;const wet=ctx.createGain();wet.gain.value=.3;
  tone.connect(master);tone.connect(verb);verb.connect(wet);wet.connect(master);
  // Make-up gain: the voices are mixed quietly, so lift the sum to a comfortable background level.
  const makeup=ctx.createGain();makeup.gain.value=8;master.connect(makeup);makeup.connect(ctx.destination);
  // The closing chime has its own bus so it is not affected by the music fade-out.
  const chimeBus=ctx.createGain();chimeBus.gain.value=.9;chimeBus.connect(ctx.destination);

  const hz=m=>440*Math.pow(2,(m-69)/12);
  // Original tune in a 1960s doo-wop / Motown feel (style only; no existing song is quoted).
  // Classic I–vi–IV–V loop in C, swung eighths, ~132 BPM.
  const chords=[{root:36,tri:[52,55,60],walk:[0,4,7,9]},{root:33,tri:[52,57,60],walk:[0,3,7,10]},{root:29,tri:[53,57,60],walk:[0,4,7,9]},{root:31,tri:[50,55,59],walk:[0,4,7,5]}];
  const lead=[72,74,76,79,81,84]; // C major pentatonic
  const BEAT=.455,BAR=BEAT*4,SWING=BEAT*2/3;
  function voice(freq,start,dur,peak,type='sine',attack=1.8,release=2.6){
    const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;
    g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(peak,start+attack);
    g.gain.setValueAtTime(peak,start+Math.max(attack,dur-release));g.gain.linearRampToValueAtTime(0,start+dur);
    o.connect(g);g.connect(tone);o.start(start);o.stop(start+dur+.1);
  }
  function bell(freq,start,peak=.05,dest=tone){
    [[1,1],[2.01,.25]].forEach(([mul,amp])=>{
      const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq*mul;
      g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(peak*amp,start+.02);g.gain.exponentialRampToValueAtTime(.0001,start+2.4);
      o.connect(g);g.connect(dest);o.start(start);o.stop(start+2.5);
    });
  }
  // Combo organ: sine + octave + soft triangle, with a gentle tremolo.
  const trem=ctx.createOscillator(),tremDepth=ctx.createGain(),organBus=ctx.createGain();
  trem.frequency.value=5.5;tremDepth.gain.value=.25;organBus.gain.value=1;trem.connect(tremDepth);tremDepth.connect(organBus.gain);trem.start();organBus.connect(tone);
  function organ(m,start,dur,peak){
    [[1,'sine',1],[2,'sine',.45],[1,'triangle',.35]].forEach(([mul,type,amp])=>{
      const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=hz(m)*mul;
      g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(peak*amp,start+.015);g.gain.setValueAtTime(peak*amp,start+dur-.05);g.gain.linearRampToValueAtTime(0,start+dur);
      o.connect(g);g.connect(organBus);o.start(start);o.stop(start+dur+.05);
    });
  }
  // Walking bass: round, short notes.
  function bass(m,start){
    const o=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o.frequency.value=hz(m);
    g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(.075,start+.01);g.gain.exponentialRampToValueAtTime(.002,start+BEAT*.95);
    o.connect(g);g.connect(tone);o.start(start);o.stop(start+BEAT);
  }
  // Surf-style twang: bright pluck with a little vibrato.
  function twang(m,start,peak=.032){
    const o=ctx.createOscillator(),g=ctx.createGain(),v=ctx.createOscillator(),vd=ctx.createGain();o.type='triangle';o.frequency.value=hz(m);
    v.frequency.value=6;vd.gain.value=hz(m)*.006;v.connect(vd);vd.connect(o.frequency);
    g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(peak,start+.008);g.gain.exponentialRampToValueAtTime(.0001,start+.9);
    o.connect(g);g.connect(tone);o.start(start);v.start(start);o.stop(start+.95);v.stop(start+.95);
  }
  // Soft kick on 1 and 3, tambourine on 2 and 4.
  const noise=ctx.createBuffer(1,ctx.sampleRate*.2,ctx.sampleRate);{const d=noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
  function kick(start){
    const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(110,start);o.frequency.exponentialRampToValueAtTime(45,start+.12);
    g.gain.setValueAtTime(.09,start);g.gain.exponentialRampToValueAtTime(.001,start+.18);o.connect(g);g.connect(master);o.start(start);o.stop(start+.2);
  }
  function tamb(start,peak=.022){
    const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noise;f.type='highpass';f.frequency.value=7000;
    g.gain.setValueAtTime(peak,start);g.gain.exponentialRampToValueAtTime(.0001,start+.16);s.connect(f);f.connect(g);g.connect(master);s.start(start);
  }
  let bar=0,nextAt=0,timer=null;
  function schedule(){
    while(nextAt<ctx.currentTime+1.5){
      const ch=chords[bar%chords.length];
      for(let b=0;b<4;b++){
        const at=nextAt+b*BEAT;
        bass(ch.root+ch.walk[b],at);
        if(b%2===0)kick(at);else{tamb(at);ch.tri.forEach(m=>organ(m,at,BEAT*.55,.016));}
        tamb(at+SWING,.008);
      }
      ch.tri.forEach(m=>organ(m,nextAt,BEAT*.9,.01));
      // A short twangy phrase on the swung grid every bar, resting now and then.
      if(bar%4!==3){let idx=Math.floor(Math.random()*3)+1;
        [0,SWING,BEAT,BEAT+SWING,BEAT*2,BEAT*2+SWING].forEach(off=>{if(Math.random()<.6){idx=Math.max(0,Math.min(lead.length-1,idx+(Math.random()<.5?1:-1)));twang(lead[idx],nextAt+off);}});}
      nextAt+=BAR;bar++;
    }
  }
  let level=.32;
  return{
    start(){ctx.resume();if(!timer){nextAt=ctx.currentTime+.1;schedule();timer=setInterval(schedule,500);}
      master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(level,ctx.currentTime+3);},
    stop(fade=2.5){master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(0,ctx.currentTime+fade);
      const t=timer;timer=null;setTimeout(()=>{if(!timer){clearInterval(t);}},fade*1000+50);},
    volume(v){level=v*.7;if(timer){master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(level,ctx.currentTime);}},
    chime(){ctx.resume();[76,79,84].forEach((m,i)=>bell(hz(m),ctx.currentTime+.1+i*.55,.12,chimeBus));}
  };
}

// File-based music with the same interface as createMusic(): start, stop(fade), volume(0–1), chime, rewind.
function createTrack(src){
  const el=new Audio(src);el.preload='auto';el.loop=true;el.volume=0;
  let level=.6,raf=0,ctx=null;
  function fadeTo(target,secs,done){
    cancelAnimationFrame(raf);const from=el.volume,t0=performance.now();
    const frame=now=>{const k=Math.min(1,(now-t0)/(secs*1000));el.volume=from+(target-from)*k;if(k<1)raf=requestAnimationFrame(frame);else done?.();};
    raf=requestAnimationFrame(frame);
  }
  function bell(freq,start,peak){
    [[1,1],[2.01,.25]].forEach(([mul,amp])=>{
      const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq*mul;
      g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(peak*amp,start+.02);g.gain.exponentialRampToValueAtTime(.0001,start+2.4);
      o.connect(g);g.connect(ctx.destination);o.start(start);o.stop(start+2.5);
    });
  }
  return{
    start(){el.play().catch(()=>{});fadeTo(level,3);},
    stop(fade=2.5){fadeTo(0,fade,()=>el.pause());},
    volume(v){level=v;if(!el.paused)fadeTo(level,.15);},
    rewind(){el.currentTime=0;},
    chime(){ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();ctx.resume();
      [76,79,84].forEach((m,i)=>bell(440*Math.pow(2,(m-69)/12),ctx.currentTime+.1+i*.55,.12));}
  };
}

document.querySelectorAll('[data-break-timer]').forEach(box=>{
  const total=Number(box.dataset.minutes||10)*60000;
  const $=s=>box.querySelector(s);
  const timeEl=$('.brk-time'),fill=$('.brk-bar i'),status=$('.brk-status'),startBtn=$('[data-act=start]'),musicBtn=$('[data-act=music]'),vol=$('[data-act=volume]');
  const returnEl=box.closest('.slide').querySelector('.brk-return');
  let remaining=total,endAt=0,tick=null,music=null,musicOn=true;
  const fmt=ms=>{const s=Math.ceil(ms/1000);return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;};
  const clock=d=>`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  function render(){
    timeEl.textContent=fmt(remaining);fill.style.width=`${(1-remaining/total)*100}%`;
    box.classList.toggle('last-minute',remaining>0&&remaining<=60000);
  }
  function setStatus(text){status.textContent=text;}
  const newMusic=()=>box.dataset.music?createTrack(box.dataset.music):createMusic();
  function play(){if(!musicOn)return;music=music||newMusic();music.volume(vol.value/100);music.start();}
  function start(){
    endAt=Date.now()+remaining;tick=setInterval(step,250);startBtn.textContent='⏸ 暫停';box.classList.add('running');
    if(returnEl){returnEl.textContent=`約 ${clock(new Date(endAt))} 回來`;returnEl.classList.remove('idle');}
    setStatus('休息中，音樂播放中');if(!musicOn)setStatus('休息中');play();
  }
  function pause(){clearInterval(tick);tick=null;startBtn.textContent='▶ 繼續';box.classList.remove('running');music?.stop();setStatus('暫停中');}
  function step(){
    remaining=Math.max(0,endAt-Date.now());render();
    if(remaining===0){clearInterval(tick);tick=null;box.classList.remove('running');box.classList.add('done');startBtn.textContent='▶ 開始';
      music?.stop(4);if(musicOn){music=music||newMusic();setTimeout(()=>music.chime(),800);}
      setStatus('時間到，請回座');timeEl.textContent='時間到';}
  }
  function reset(){clearInterval(tick);tick=null;remaining=total;box.classList.remove('running','done');startBtn.textContent='▶ 開始';music?.stop(1);setTimeout(()=>music?.rewind?.(),1100);render();
    if(returnEl){returnEl.textContent='按下開始，自動算出回場時間';returnEl.classList.add('idle');}setStatus('按「開始」計時，輕音樂會一起播放');}
  startBtn.addEventListener('click',()=>{if(tick)pause();else{if(remaining===0)reset();start();}});
  $('[data-act=reset]').addEventListener('click',reset);
  musicBtn.addEventListener('click',()=>{musicOn=!musicOn;musicBtn.setAttribute('aria-pressed',String(musicOn));musicBtn.textContent=musicOn?'♪ 音樂開':'♪ 音樂關';
    if(musicOn&&tick)play();else music?.stop(1);});
  vol.addEventListener('input',()=>{music?.volume(vol.value/100);});
  // Leaving the break slide fades the music; the countdown keeps running.
  new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)music?.stop(2);else if(tick)play();});},{threshold:.2}).observe(box.closest('.slide'));
  render();
});
