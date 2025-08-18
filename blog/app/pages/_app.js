import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize theme toggle functionality
    if (typeof window !== 'undefined') {
      import('../../../js/theme-toggle.js').then(({ initThemeToggle }) => {
        initThemeToggle();
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Banner (matches partials/banner.html) */}
      <header
        className="backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-700/60 fixed top-0 left-0 right-0 z-50"
        style={{ height: '100px' }}
      >
        <div
          className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between"
          style={{ height: '100%' }}
        >
          {/* Logo + Name */}
          <a href="/" className="flex items-center gap-3" style={{ height: '100%' }}>
            <div
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 grid place-items-center font-bold text-lg"
              style={{ height: '40px', width: '40px' }}
            >
              Y
            </div>
            <span className="font-semibold text-2xl" style={{ lineHeight: '40px' }}>
              葉語 (Yu Yeh) 🧋🇹🇼
            </span>
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-5 text-base" style={{ height: '100%' }}>
            <a href="/timeline_full/timeline.html" className="hover:underline text-base flex items-center" style={{ height: '40px' }}>Timelines</a>
            <a href="/publications/publications.html" className="hover:underline text-base flex items-center" style={{ height: '40px' }}>Publications</a>
            <a href="/projects/projects.html" className="hover:underline text-base flex items-center" style={{ height: '40px' }}>Projects</a>
            <a href="/share/share.html" className="hover:underline text-base flex items-center" style={{ height: '40px' }}>Resources</a>
            <a href="/blog/" className="hover:underline text-base flex items-center" style={{ height: '40px' }}>Blog</a>
            <button id="themeToggle" className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm" style={{ height: '36px' }}>
              Toggle theme
            </button>
          </nav>
        </div>
      </header>

      {/* Main content with top margin for fixed header */}
      <main className="pt-[100px]">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
