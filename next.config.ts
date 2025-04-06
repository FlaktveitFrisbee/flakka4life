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
};

export default nextConfig;
