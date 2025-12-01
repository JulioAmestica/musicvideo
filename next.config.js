/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'i.scdn.co', 'mosaic.scdn.co'],
  },
}

module.exports = nextConfig
