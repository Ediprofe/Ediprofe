/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Usar SSG con generateStaticParams
  trailingSlash: true,
}

module.exports = nextConfig
