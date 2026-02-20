/** @type {import('next').NextConfig} */
const nextConfig = {
  // Firebase Hosting = static export only (no SSR, no API routes)
  output: "export",

  // Required for static export
  images: { unoptimized: true },

  // Turbopack (Next.js 15+)
  turbopack: {},
};

export default nextConfig;
