import Head from 'next/head'
import { getAllPostIds, getPostData } from '../lib/posts'
import { useRouter } from 'next/router'

export default function Post({ postData }) {
  const router = useRouter()
  
  // Fallback for static generation
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Head>
        <title>{postData.title} - Yu Yeh's Blog</title>
        <meta name="description" content={postData.description} />
        <meta name="keywords" content={postData.tags.join(', ')} />
        <meta name="author" content="Yu Yeh" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://evanyeh5118.github.io/blog/posts/${postData.id}/`} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://evanyeh5118.github.io/blog/posts/${postData.id}/`} />
        <meta property="og:image" content="https://evanyeh5118.github.io/assets/images/og.png" />
        <meta property="og:site_name" content="Yu Yeh - Personal Blog" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content={postData.date} />
        <meta property="article:author" content="Yu Yeh" />
        {postData.tags && postData.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.description} />
        <meta name="twitter:image" content="https://evanyeh5118.github.io/assets/images/og.png" />
        <meta name="twitter:creator" content="@evanyeh5118" />
        
        {/* Structured Data for Blog Post */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": postData.title,
          "description": postData.description,
          "author": {
            "@type": "Person",
            "name": "Yu Yeh",
            "url": "https://evanyeh5118.github.io/"
          },
          "publisher": {
            "@type": "Person",
            "name": "Yu Yeh",
            "url": "https://evanyeh5118.github.io/"
          },
          "datePublished": postData.date,
          "dateModified": postData.date,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://evanyeh5118.github.io/blog/posts/${postData.slug}/`
          },
          "keywords": postData.tags ? postData.tags.join(', ') : '',
          "articleSection": "Blog",
          "url": `https://evanyeh5118.github.io/blog/posts/${postData.slug}/`
        })}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://evanyeh5118.github.io/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://evanyeh5118.github.io/blog/"
            },
                         {
               "@type": "ListItem",
               "position": 3,
               "name": postData.title,
               "item": `https://evanyeh5118.github.io/blog/posts/${postData.slug}/`
             }
          ]
        })}
        </script>
      </Head>

      {/* Article Header */}
      <article className="mb-16">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          <div className="flex items-center justify-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
            <time dateTime={postData.date} className="italic">
              {new Date(postData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>By Yu Yeh</span>
          </div>
          {postData.tags && postData.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-center mb-4">
              {postData.tags.map(tag => (
                <span key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-700 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {postData.description && (
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {postData.description}
            </p>
          )}
        </header>

        {/* Article Content Container */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </div>
        </div>
      </article>

      {/* Navigation */}
      <nav className="flex justify-center items-center pt-8 border-t border-slate-200 dark:border-slate-700">
        <a
          href="/blog/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm shadow-soft hover:opacity-90 transition-opacity"
        >
          ← Back to Blog
        </a>
      </nav>
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
