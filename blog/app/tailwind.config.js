/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            h5: {
              color: 'inherit',
            },
            h6: {
              color: 'inherit',
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
              backgroundColor: '#f1f5f9',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#f1f5f9',
              color: '#1e293b',
            },
            blockquote: {
              borderLeftColor: '#3b82f6',
              color: '#64748b',
            },
          },
        },
        invert: {
          css: {
            color: '#e2e8f0',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            h1: {
              color: '#f1f5f9',
            },
            h2: {
              color: '#f1f5f9',
            },
            h3: {
              color: '#f1f5f9',
            },
            h4: {
              color: '#f1f5f9',
            },
            h5: {
              color: '#f1f5f9',
            },
            h6: {
              color: '#f1f5f9',
            },
            strong: {
              color: '#f1f5f9',
            },
            code: {
              backgroundColor: '#334155',
              color: '#e2e8f0',
            },
            pre: {
              backgroundColor: '#334155',
              color: '#e2e8f0',
            },
            blockquote: {
              borderLeftColor: '#60a5fa',
              color: '#94a3b8',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
