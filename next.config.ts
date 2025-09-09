import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", // browser-accessible
        port: "9002",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
