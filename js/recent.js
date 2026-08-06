import { el } from './utils/dom.js';

export function initRecent({ limit } = {}) {
  const container = document.getElementById('recentContainer');
  if (!container) return;
  fetch('/data/recent.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((items) => {
      container.innerHTML = '';
      const events = items.slice(0, limit || items.length);
      const list = el('ol', { class: 'divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800' });
      events.forEach((event) => list.append(el('li', { class: 'py-5 grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-5' },
        el('time', { class: 'font-mono text-sm text-slate-500' }, `${event.month} ${event.year}`),
        el('p', { class: 'text-slate-700 dark:text-slate-300' }, event.event))));
      container.append(list);
    })
    .catch(() => { container.innerHTML = '<p class="text-red-600 dark:text-red-400">Recent news could not be loaded.</p>'; });
}
