/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/submit',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-src https://forms.cloud.microsoft;',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
