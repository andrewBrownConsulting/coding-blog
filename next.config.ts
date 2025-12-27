import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  //add image domains
  images: {
    domains: ['w6a1hhcupko92e7d.public.blob.vercel-storage.com'],
  },
};

export default nextConfig;