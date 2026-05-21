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
      // Protocol docs live on docs.medialane.io — must come before the
      // /docs/:slug catch-all below (first match wins).
      { source: '/docs/Getting-Started', destination: 'https://docs.medialane.io/docs/protocol', permanent: true },
      { source: '/docs/IP-Assets', destination: 'https://docs.medialane.io/learn/programmable-ip', permanent: true },
      { source: '/docs/Launchpad', destination: 'https://docs.medialane.io/learn/creator-launchpad', permanent: true },
      { source: '/docs/Marketplace', destination: 'https://docs.medialane.io/learn/marketplace', permanent: true },
      { source: '/docs/SDK', destination: 'https://docs.medialane.io/docs/sdk', permanent: true },
      { source: '/docs/Contracts', destination: 'https://docs.medialane.io/docs/contracts', permanent: true },
      // The DAO library moved from /docs to /guidelines.
      { source: '/docs/:slug', destination: '/guidelines/:slug', permanent: true },
      { source: '/docs', destination: '/guidelines', permanent: true },
      // Members page renamed to Token.
      { source: '/members', destination: '/token', permanent: true },
    ]
  },
}

export default nextConfig
