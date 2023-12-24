/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/photos/**', // Adjust the pathname regex pattern to match Unsplash image URLs
      },
    ],
  },
}

module.exports = nextConfig
