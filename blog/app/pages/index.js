import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { format } from 'date-fns'

export default function Home({ allPostsData }) {
  return (
    <div className="container">
      <Head>
        <title>Blog - Personal Website</title>
        <meta name="description" content="Personal blog with thoughts and insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Blog</h1>
        <p className="description">Thoughts, insights, and updates</p>
        
        <div className="posts">
          {allPostsData.map(({ id, date, title, description, tags }) => (
            <article key={id} className="post">
              <Link href={`/${id}/`}>
                <h2 className="post-title">{title}</h2>
              </Link>
              <div className="post-meta">
                <time className="post-date">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </time>
                {tags && (
                  <div className="post-tags">
                    {tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {description && (
                <p className="post-description">{description}</p>
              )}
            </article>
          ))}
        </div>
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
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 2rem 0;
        }
        .posts {
          width: 100%;
        }
        .post {
          margin-bottom: 2rem;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .post:hover {
          border-color: #0070f3;
        }
        .post-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          color: #0070f3;
          cursor: pointer;
        }
        .post-title:hover {
          text-decoration: underline;
        }
        .post-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #666;
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
        .post-description {
          margin: 0;
          color: #333;
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
