import { el } from './utils/dom.js';

export function initPublications({ limit } = {}) {
  const container = document.getElementById('pubTrack');
  const status = document.getElementById('pubStatus');
  if (!container) return;

  fetch('/data/publications.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((items) => {
      const publications = items.sort((a, b) => (b.year || 0) - (a.year || 0)).slice(0, limit || items.length);
      container.innerHTML = '';
      publications.forEach((publication) => {
        const links = Object.entries(publication.links || {})
          .filter(([, url]) => url && url !== '#')
          .map(([label, url]) => el('a', {
            href: url, target: '_blank', rel: 'noopener',
            class: 'text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline'
          }, label));
        const authors = el('p', { class: 'mt-2 text-sm text-slate-600 dark:text-slate-400' });
        const parts = (publication.authors || '').split('Yu Yeh');
        parts.forEach((part, index) => {
          authors.append(document.createTextNode(part));
          if (index < parts.length - 1) authors.append(el('strong', { class: 'text-slate-900 dark:text-slate-100' }, 'Yu Yeh'));
        });
        container.append(el('article', {
          class: 'publication-block card-lift p-5 md:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
        },
        el('div', { class: 'flex flex-col sm:flex-row sm:items-start justify-between gap-2' },
          el('h3', { class: 'font-semibold text-lg leading-snug' }, publication.title || ''),
          el('span', { class: 'text-sm font-mono text-slate-500 shrink-0' }, String(publication.year || ''))),
        authors,
        el('p', { class: 'mt-2 text-sm font-medium' }, publication.venue || ''),
        links.length ? el('div', { class: 'mt-4 flex flex-wrap gap-x-5 gap-y-2' }, links) : null,
        publication.abstract ? el('div', { class: 'publication-abstract' },
          el('div', {},
            el('p', { class: 'pt-4 border-t border-slate-200 dark:border-slate-700 text-sm leading-relaxed text-slate-600 dark:text-slate-300' }, publication.abstract)
          )
        ) : null));
      });
      if (status) status.textContent = `${publications.length} selected publications loaded`;
    })
    .catch(() => {
      container.innerHTML = '<p class="text-red-600 dark:text-red-400">Publications could not be loaded.</p>';
      if (status) status.textContent = 'Publications could not be loaded';
    });
}
