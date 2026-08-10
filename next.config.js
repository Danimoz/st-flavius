/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Three 10 MB evidence files plus multipart form overhead.
      bodySizeLimit: '31mb',
    },
  },
  images: {
    qualities: [75, 100],
  },
}

module.exports = nextConfig
