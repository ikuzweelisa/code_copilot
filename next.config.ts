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
    dynamicIO: true,
    ppr:true
  },
};

export default nextConfig;
