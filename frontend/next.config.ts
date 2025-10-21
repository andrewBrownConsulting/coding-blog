import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "blog-images-s3-andrewb.s3.us-east-1.amazonaws.com",
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
