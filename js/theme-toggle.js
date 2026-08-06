export function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle || toggle.dataset.ready) return;
  toggle.dataset.ready = 'true';
  const update = () => {
    const dark = document.documentElement.classList.contains('dark');
    toggle.textContent = dark ? '☀ Light' : '☾ Dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  };
  toggle.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    update();
  });
  update();
}
