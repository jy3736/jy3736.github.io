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

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var dark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    });
  }
})();
