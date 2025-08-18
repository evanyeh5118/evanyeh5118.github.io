import Head from 'next/head'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../lib/posts'

export default function Post({ postData }) {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <Head>
        <title>{postData.title} - Yu Yeh</title>
        <meta name="description" content={postData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Back to Home Button */}
      <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </a>

      {/* Back to Blog Button */}
      <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 mb-6 ml-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </a>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          <div className="flex items-center justify-center gap-4 text-slate-600 dark:text-slate-400 mb-4">
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
                  <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-700 dark:text-slate-300">{tag}</span>
                ))}
              </div>
            )}
          </div>
          {postData.description && (
            <p className="text-xl text-slate-600 dark:text-slate-400">{postData.description}</p>
          )}
        </header>

        <div 
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
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
