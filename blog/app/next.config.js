/** @type {import('next').NextConfig} */

// Set to true for production deployment, false for local development
const isProduction = false;

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // For local development, use relative paths
  ...(isProduction && {
    basePath: '/blog',
    assetPrefix: '/blog',
  }),
  // For local development, use absolute paths from posts directory
  // This ensures CSS works from both posts/ and posts/hello-world/ directories
  assetPrefix: isProduction ? '/blog' : '/blog/posts',
  distDir: '../posts',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
