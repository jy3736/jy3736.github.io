(function () {
  var labels = { "language-c": "C 程式", "language-text": "輸出", "language-sh": "終端機指令", "language-plaintext": "示意" };

  document.querySelectorAll("pre > code").forEach(function (code) {
    var pre = code.parentElement;
    var lang = (code.className.match(/language-[a-z]+/) || [""])[0];
    var label = labels[lang];
    if (label) {
      var tag = document.createElement("span");
      tag.className = "code-label";
      tag.textContent = label;
      pre.appendChild(tag);
      pre.classList.add("has-label");
    }
    if (lang === "language-c" || lang === "language-sh") {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "複製";
      btn.addEventListener("click", function () {
        var text = code.innerText;
        var done = function () {
          btn.textContent = "已複製";
          setTimeout(function () { btn.textContent = "複製"; }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { btn.textContent = "請手動選取"; });
        } else {
          btn.textContent = "請手動選取";
        }
      });
      pre.appendChild(btn);
    }
  });

  // Theme toggle: dark by default; the choice is remembered per browser.
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  function paintTheme() {
    if (!themeBtn) return;
    var light = root.getAttribute("data-theme") === "light";
    themeBtn.querySelector(".theme-icon").textContent = light ? "🌙" : "☀️";
    themeBtn.querySelector(".theme-text").textContent = light ? "深色" : "淺色";
    themeBtn.setAttribute("aria-label", light ? "切換成深色主題" : "切換成淺色主題");
  }
  if (themeBtn) {
    paintTheme();
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("learn-c-theme", next); } catch (e) {}
      paintTheme();
    });
  }

  // Podcast player in the sidebar.
  var audio = document.getElementById("podcast-audio");
  if (audio) {
    var playBtn = document.getElementById("tocAudioPlay");
    var timeDisplay = document.getElementById("tocAudioTime");
    var progressWrap = document.getElementById("tocAudioProgressWrap");
    var progressBar = document.getElementById("tocAudioProgressBar");
    var speedBtns = Array.prototype.slice.call(document.querySelectorAll(".toc-speed-btn"));
    var fallbackTotal = timeDisplay ? timeDisplay.textContent.split(" / ")[1] : "00:00";

    var fmt = function (s) {
      if (isNaN(s) || !isFinite(s)) return "00:00";
      var m = Math.floor(s / 60), sec = Math.floor(s % 60);
      return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
    };
    var updateUI = function () {
      var total = audio.duration && isFinite(audio.duration) ? fmt(audio.duration) : fallbackTotal;
      if (timeDisplay) timeDisplay.textContent = fmt(audio.currentTime) + " / " + total;
      var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + "%";
      if (progressWrap) {
        progressWrap.setAttribute("aria-valuenow", String(Math.round(pct)));
        progressWrap.setAttribute("aria-valuetext", fmt(audio.currentTime));
      }
    };
    var setPlaying = function (playing) {
      if (!playBtn) return;
      playBtn.textContent = playing ? "⏸" : "▶";
      playBtn.setAttribute("aria-label", playing ? "暫停" : "播放");
    };
    var seekTo = function (t) {
      var max = audio.duration && isFinite(audio.duration) ? audio.duration : t;
      audio.currentTime = Math.max(0, Math.min(max, t));
      updateUI();
    };

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (audio.paused) audio.play(); else audio.pause();
      });
    }
    audio.addEventListener("play", function () { setPlaying(true); });
    audio.addEventListener("pause", function () { setPlaying(false); });
    audio.addEventListener("ended", function () { setPlaying(false); });
    ["timeupdate", "loadedmetadata", "durationchange"].forEach(function (ev) {
      audio.addEventListener(ev, updateUI);
    });

    if (progressWrap) {
      progressWrap.addEventListener("click", function (e) {
        if (!audio.duration) return;
        var r = progressWrap.getBoundingClientRect();
        seekTo(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration);
      });
      progressWrap.addEventListener("keydown", function (e) {
        var step = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
        if (e.key === "Home") { e.preventDefault(); seekTo(0); }
        else if (e.key === "End" && audio.duration) { e.preventDefault(); seekTo(audio.duration); }
        else if (step) { e.preventDefault(); seekTo(audio.currentTime + step); }
      });
    }

    speedBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var spd = parseFloat(btn.getAttribute("data-speed"));
        if (!spd) return;
        audio.playbackRate = spd;
        speedBtns.forEach(function (b) {
          var on = Math.abs(parseFloat(b.getAttribute("data-speed")) - spd) < 0.01;
          b.classList.toggle("active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });
    });
  }
})();
