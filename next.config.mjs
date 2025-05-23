/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default nextConfig; 