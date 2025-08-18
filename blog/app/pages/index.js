import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Head>
        <title>Blog - Yu Yeh</title>
        <meta name="description" content="Personal blog with thoughts and insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Back to Home Button */}
      <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </a>

      <main className="text-center">
        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
          Thoughts, insights, and updates
        </p>
        
        <div className="space-y-8 text-left">
          {allPostsData.map(({ id, title, date, description, tags }) => (
            <article key={id} className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300">
              <Link href={`/${id}/`}>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 hover:underline cursor-pointer">{title}</h2>
              </Link>
              <div className="flex items-center gap-4 mb-3 text-sm text-slate-600 dark:text-slate-400">
                <time className="italic">{new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</time>
                <div className="flex gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-700 dark:text-slate-300">{tag}</span>
                  ))}
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </main>
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
