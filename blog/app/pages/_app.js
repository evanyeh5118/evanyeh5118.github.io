import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageTransition from '../components/PageTransition'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [router.asPath])

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
    setDark(nextDark)
  }

  const navItems = [
    ['/publications/publications.html', 'Publications'],
    ['/projects/projects.html', 'Research'],
    ['/timeline_full/timeline.html', 'Experience'],
    ['/share/share.html', 'Resources'],
    ['/blog/posts/', 'Blog'],
  ]

  return (
    <div className="site-shell min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="sticky top-0 z-40">
        <header className="site-header relative backdrop-blur bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/70 dark:border-slate-700/70">
          <div className="mx-auto max-w-6xl px-4 min-h-[72px] flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3 shrink-0" aria-label="Yu Yeh homepage">
              <span className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center font-bold" aria-hidden="true">YY</span>
              <span>
                <span className="block font-semibold leading-tight">Yu Yeh</span>
                <span className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">PhD Researcher · Networked Control</span>
              </span>
            </a>
            <button
              className="md:hidden p-2 rounded-lg border border-slate-300 dark:border-slate-700"
              type="button"
              aria-controls="siteNav"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="text-xl" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
            </button>
            <nav id="siteNav" className={`${menuOpen ? 'is-open' : ''} md:flex flex-col md:flex-row items-stretch md:items-center gap-1 md:gap-5 text-sm`} aria-label="Primary navigation">
              {navItems.map(([href, label]) => (
                <a key={href} href={href} className="nav-link py-2" aria-current={label === 'Blog' ? 'page' : undefined}>{label}</a>
              ))}
              <a href="/assets/files/cv.pdf" className="nav-link py-2" target="_blank" rel="noopener">CV</a>
              <button className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm" type="button" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={toggleTheme}>
                {dark ? '☀ Light' : '☾ Dark'}
              </button>
            </nav>
          </div>
        </header>
      </div>

      <main id="main-content" className="flex-1">
        <PageTransition><Component {...pageProps} /></PageTransition>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">© {new Date().getFullYear()} Yu Yeh · Built on GitHub Pages</div>
      </footer>
    </div>
  )
}
