export function initHeader() {
  const menuButton = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const path = window.location.pathname;
  document.querySelectorAll('#siteNav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href.replace(/[^/]+$/, ''))) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
