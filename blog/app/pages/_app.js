import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import PageTransition from '../components/PageTransition'

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Initialize theme immediately to prevent flash
    const savedTheme = localStorage.getItem('theme') || 'light'
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme === 'system' ? (prefersDark ? 'dark' : 'light') : savedTheme
    
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    
    // Initialize theme toggle functionality
    if (typeof window !== 'undefined') {
      import('../../../js/theme-toggle.js').then(({ initThemeToggle }) => {
        initThemeToggle();
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Prevent flash by setting initial theme in head
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme') || 'light';
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var initialTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
                    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
                  } catch (e) {}
                })();
              `,
            }}
          />
        </Head>
        {/* Loading skeleton */}
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="h-[100px] bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-700/60 fixed top-0 left-0 right-0 z-50">
              <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between h-full">
                <div className="flex items-center gap-3 h-full">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="w-48 h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="flex items-center gap-5 h-full">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-20 h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  ))}
                  <div className="w-24 h-9 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="pt-[100px]">
              <div className="mx-auto max-w-4xl px-4 py-8">
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/40 p-6">
                      <div className="w-3/4 h-8 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                      <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
                      <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme') || 'light';
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var initialTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
                    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
                  } catch (e) {}
                })();
              `,
            }}
          />
        </Head>
        
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
              <a href="/blog/posts/" className="hover:underline text-base flex items-center" style={{ height: '40px' }}>Blog</a>
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
    </PageTransition>
  )
}
