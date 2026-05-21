/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Protocol docs now live on docs.medialane.org — see spec v2 §2.
      { source: '/docs/Getting-Started', destination: 'https://docs.medialane.org/docs/protocol', permanent: true },
      { source: '/docs/IP-Assets', destination: 'https://docs.medialane.org/learn/programmable-ip', permanent: true },
      { source: '/docs/Launchpad', destination: 'https://docs.medialane.org/learn/creator-launchpad', permanent: true },
      { source: '/docs/Marketplace', destination: 'https://docs.medialane.org/learn/marketplace', permanent: true },
      { source: '/docs/SDK', destination: 'https://docs.medialane.org/docs/sdk', permanent: true },
      { source: '/docs/Contracts', destination: 'https://docs.medialane.org/docs/contracts', permanent: true },
      // Members page renamed to Token (Task 2).
      { source: '/members', destination: '/token', permanent: true },
    ]
  },
}

export default nextConfig
