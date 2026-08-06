import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Head>
        <title>Blog - Yu Yeh</title>
        <meta name="description" content="Notes from Yu Yeh on research, engineering, and life as a PhD researcher." />
        <link rel="canonical" href="https://evanyeh5118.github.io/blog/posts/" />
        <link rel="icon" href="/assets/images/profile_photo.jpg" type="image/jpeg" />
      </Head>

      {/* Page Header */}
      <section className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="max-w-3xl">
          <p className="section-kicker mb-3">Writing</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Thoughts, insights, and updates from my journey.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Posts</h2>
          <div className="text-sm text-slate-500">{allPostsData.length} {allPostsData.length === 1 ? 'post' : 'posts'}</div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {allPostsData.map(({ id, title, date, description, tags }) => (
          <article
            key={id}
            className="blog-card card-lift rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7"
          >
            <Link href={`/blog/posts/${id}/`} className="block rounded-sm">
              <h2 className="text-2xl font-bold tracking-tight mb-3 hover:text-blue-600 dark:hover:text-blue-400">
                {title}
              </h2>
            </Link>
            <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {tags && tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {tags.map(tag => (
                    <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-700 dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {description && (
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{description}</p>
            )}
          </article>
        ))}
        </div>
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
