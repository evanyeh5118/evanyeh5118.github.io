import Head from 'next/head'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../lib/posts'

export default function Post({ postData }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Head>
        <title>{postData.title} - Yu Yeh</title>
        <meta name="description" content={postData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Post Header */}
      <section className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          <div className="flex items-center justify-center gap-4 text-slate-400 dark:text-slate-200 mb-4">
            <time className="italic">
              {new Date(postData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {postData.tags && (
              <div className="flex gap-2">
                {postData.tags.map(tag => (
                  <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-500 dark:text-slate-100">{tag}</span>
                ))}
              </div>
            )}
          </div>
          {postData.description && (
            <p className="text-xl text-slate-400 dark:text-slate-200">{postData.description}</p>
          )}
        </div>
      </section>

      {/* Post Content */}
      <section className="mb-16">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-12 shadow-soft bg-white dark:bg-slate-900">
          <article className="prose prose-xl dark:prose-invert max-w-none">
            <div 
              className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
            />
          </article>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="mb-16 text-center">
        <a
          href="posts/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm shadow-soft hover:opacity-90 transition-opacity"
        >
          ← Back to Blog
        </a>
      </section>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}
