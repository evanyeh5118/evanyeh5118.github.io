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
  // For local development, use relative paths for assets
  assetPrefix: isProduction ? '/blog' : './',
  distDir: '../posts',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
