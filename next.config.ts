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
    reactCompiler: {
      compilationMode: "annotation",
    },
    staleTimes: {
      dynamic: 120,
      static: 200,
    },
  },
};

export default nextConfig;
