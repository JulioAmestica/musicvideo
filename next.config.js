/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'storage.googleapis.com',
      'i.scdn.co',
      'mosaic.scdn.co',
      'media.giphy.com',
      'image-cdn-fa.spotifycdn.com',
      'image-cdn-ak.spotifycdn.com',
    ],
  },
}

module.exports = nextConfig
