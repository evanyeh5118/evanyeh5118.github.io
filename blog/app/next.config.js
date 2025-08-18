/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/blog',
  assetPrefix: '/blog',
  distDir: '../out',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
