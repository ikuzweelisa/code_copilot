import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  experimental: {
    dynamicIO: true,
    ppr: true,
    reactCompiler: {
      compilationMode: "annotation",
    },
  },
};

export default nextConfig;
