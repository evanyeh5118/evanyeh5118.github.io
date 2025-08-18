import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Head>
        <title>Blog - Yu Yeh</title>
        <meta name="description" content="Personal blog with thoughts and insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-10">
        <h1 className="text-4xl font-semibold mb-2">Blog</h1>
        <p className="text-slate-600 dark:text-slate-400">Thoughts, insights, and updates</p>
      </header>

      <div className="space-y-6">
        {allPostsData.map(({ id, title, date, description, tags }) => (
          <article
            key={id}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-6 transition-shadow duration-200 hover:shadow"
          >
            <Link href={`/${id}/`}>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 hover:underline cursor-pointer">
                {title}
              </h2>
            </Link>
            <div className="flex items-center gap-4 mb-3 text-sm text-slate-600 dark:text-slate-400">
              <time className="italic">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <div className="flex gap-2 flex-wrap">
                {tags.map(tag => (
                  <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-700 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{description}</p>
          </article>
        ))}
      </div>

      {/* Back to Home at the bottom */}
      <div className="mt-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </a>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
