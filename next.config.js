/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site (out/), so it can be mirrored on any static host.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
