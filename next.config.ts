import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  // Trust the Timeweb Cloud reverse proxy headers
  // This ensures Next.js correctly detects HTTPS via X-Forwarded-Proto
  // and generates proper URLs for assets, redirects, etc.
  serverExternalPackages: [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
