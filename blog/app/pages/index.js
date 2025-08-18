import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Head>
        <title>Blog - Yu Yeh</title>
        <meta name="description" content="Personal blog with thoughts and insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page Header */}
      <section className="mt-10 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Thoughts, insights, and updates from my journey.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Posts</h2>
          <div className="text-sm text-slate-500">{allPostsData.length} posts</div>
        </div>

        <div className="space-y-6">
          {allPostsData.map(({ id, title, date, description, tags }) => (
          <article
            key={id}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-6 transition-shadow duration-200 hover:shadow"
          >
            <Link href={`/posts/${id}/`}>
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
      </section>

      {/* Back to Home */}
      <section className="mb-16 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm shadow-soft hover:opacity-90 transition-opacity"
        >
          ← Back to Home
        </a>
      </section>
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
