(() => {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll('[data-theme-choice]')];
  const storageKey = 'mini-warehouse-scheduling-theme';

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (_) {
    // Storage may be unavailable when a page is opened directly from disk.
  }

  let theme = savedTheme === 'dark' || savedTheme === 'light'
    ? savedTheme
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const applyTheme = () => {
    root.dataset.theme = theme;
    for (const button of buttons) {
      const selected = button.dataset.themeChoice === theme;
      button.setAttribute('aria-pressed', String(selected));
      button.title = selected ? `目前為${theme === 'dark' ? '深色' : '淺色'}模式` : `切換為${button.dataset.themeChoice === 'dark' ? '深色' : '淺色'}模式`;
    }
  };

  applyTheme();

  for (const button of buttons) {
    button.addEventListener('click', () => {
      theme = button.dataset.themeChoice;
      applyTheme();
      try {
        localStorage.setItem(storageKey, theme);
      } catch (_) {
        // The selected mode still applies to this page if storage is unavailable.
      }
    });
  }

  window.addEventListener('storage', event => {
    if (event.key === storageKey && (event.newValue === 'dark' || event.newValue === 'light')) {
      theme = event.newValue;
      applyTheme();
    }
  });
})();
