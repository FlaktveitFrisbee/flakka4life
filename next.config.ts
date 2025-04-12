import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  // reactCompiler: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  // Ignore eslint and typescript errors during build since we have a separate linting step
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
