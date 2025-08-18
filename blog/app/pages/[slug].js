import Head from 'next/head'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../lib/posts'
import { format } from 'date-fns'

export default function Post({ postData }) {
  return (
    <div className="container">
      <Head>
        <title>{postData.title} - Blog</title>
        <meta name="description" content={postData.description || postData.title} />
      </Head>

      <main>
        <article className="post">
          <header className="post-header">
            <Link href="/" className="back-link">
              ← Back to Blog
            </Link>
            <h1 className="post-title">{postData.title}</h1>
            <div className="post-meta">
              <time className="post-date">
                {format(new Date(postData.date), 'MMMM d, yyyy')}
              </time>
              {postData.tags && (
                <div className="post-tags">
                  {postData.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </article>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
          width: 100%;
        }
        .post {
          width: 100%;
        }
        .post-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 1rem;
          color: #0070f3;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .post-title {
          margin: 0 0 1rem 0;
          line-height: 1.15;
          font-size: 3rem;
          text-align: center;
        }
        .post-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #666;
          flex-wrap: wrap;
        }
        .post-date {
          font-style: italic;
        }
        .post-tags {
          display: flex;
          gap: 0.5rem;
        }
        .tag {
          background: #f0f0f0;
          padding: 0.2rem 0.5rem;
          border-radius: 15px;
          font-size: 0.8rem;
        }
        .post-content {
          line-height: 1.8;
          color: #333;
        }
        .post-content :global(h1),
        .post-content :global(h2),
        .post-content :global(h3),
        .post-content :global(h4),
        .post-content :global(h5),
        .post-content :global(h6) {
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .post-content :global(h1) {
          font-size: 2rem;
        }
        .post-content :global(h2) {
          font-size: 1.5rem;
        }
        .post-content :global(h3) {
          font-size: 1.25rem;
        }
        .post-content :global(p) {
          margin-bottom: 1rem;
        }
        .post-content :global(ul),
        .post-content :global(ol) {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
        .post-content :global(li) {
          margin-bottom: 0.5rem;
        }
        .post-content :global(blockquote) {
          border-left: 4px solid #0070f3;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #666;
        }
        .post-content :global(code) {
          background: #f0f0f0;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: monospace;
        }
        .post-content :global(pre) {
          background: #f0f0f0;
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .post-content :global(pre code) {
          background: none;
          padding: 0;
        }
        .post-content :global(a) {
          color: #0070f3;
          text-decoration: none;
        }
        .post-content :global(a:hover) {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData,
    },
  }
}
