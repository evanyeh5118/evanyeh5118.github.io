import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize theme toggle functionality
    if (typeof window !== 'undefined') {
      // Import and initialize theme toggle
      import('../../../js/theme-toggle.js').then(({ initThemeToggle }) => {
        initThemeToggle();
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Banner */}
      <header className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-700/60 fixed top-0 left-0 right-0 z-50 h-24">
        <div className="max-w-7xl mx-auto px-4 py-3 h-full flex items-center justify-between">
          
          {/* Logo + Name */}
          <a href="/" className="flex items-center gap-3 h-full">
            <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 grid place-items-center font-bold text-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
              Y
            </div>
            <span className="font-semibold text-2xl leading-10">
              葉語 (Yu Yeh) 🧋🇹🇼
            </span>
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-5 text-base h-full">
            <a href="/timeline_full/timeline.html" className="h-10 flex items-center hover:underline transition-all duration-200">Timelines</a>
            <a href="/publications/publications.html" className="h-10 flex items-center hover:underline transition-all duration-200">Publications</a>
            <a href="/projects/projects.html" className="h-10 flex items-center hover:underline transition-all duration-200">Projects</a>
            <a href="/share/share.html" className="h-10 flex items-center hover:underline transition-all duration-200">Resources</a>
            <a href="/blog/" className="h-10 flex items-center hover:underline transition-all duration-200">Blog</a>
            <button id="themeToggle" className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm h-9 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:opacity-80 transition-all duration-200">
              Toggle theme
            </button>
          </nav>

        </div>
      </header>

      {/* Main content with top margin for fixed header */}
      <main className="pt-24">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
