import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical theme script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var initialTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
                  
                  // Apply theme immediately
                  if (initialTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                  
                  // Set background color immediately to prevent flash
                  document.documentElement.style.backgroundColor = initialTheme === 'dark' ? 'rgb(2 6 23)' : 'rgb(248 250 252)';
                  document.documentElement.style.color = initialTheme === 'dark' ? 'rgb(248 250 252)' : 'rgb(15 23 42)';
                  
                  // Also set body background to prevent any remaining flash
                  document.body.style.backgroundColor = initialTheme === 'dark' ? 'rgb(2 6 23)' : 'rgb(248 250 252)';
                  document.body.style.color = initialTheme === 'dark' ? 'rgb(248 250 252)' : 'rgb(15 23 42)';
                } catch (e) {
                  // Fallback to light theme if localStorage is not available
                  document.documentElement.style.backgroundColor = 'rgb(248 250 252)';
                  document.documentElement.style.color = 'rgb(15 23 42)';
                  document.body.style.backgroundColor = 'rgb(248 250 252)';
                  document.body.style.color = 'rgb(15 23 42)';
                }
              })();
            `,
          }}
        />
        {/* Preload critical fonts and assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#020617" media="(prefers-color-scheme: dark)" />
        
        {/* Prevent flash by setting initial styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html {
                background-color: rgb(248 250 252) !important;
                color: rgb(15 23 42) !important;
              }
              body {
                background-color: rgb(248 250 252) !important;
                color: rgb(15 23 42) !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              html.dark {
                background-color: rgb(2 6 23) !important;
                color: rgb(248 250 252) !important;
              }
              html.dark body {
                background-color: rgb(2 6 23) !important;
                color: rgb(248 250 252) !important;
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
