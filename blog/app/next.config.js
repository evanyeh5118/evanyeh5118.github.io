/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/blog',
  assetPrefix: '/blog',
  distDir: '../posts',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
