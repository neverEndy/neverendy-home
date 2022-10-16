const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/neverendy-home',
  images: {
    unoptimized: true
  }
}

module.exports = withPlugins(
  [
    optimizedImages
  ],
  {
    ...nextConfig
  }
);
