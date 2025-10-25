const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nginx",
        port: "443",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "nginx",
        port: "80",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "443",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "80",
        pathname: "/images/**",
      },
    ],
  }
};

export default nextConfig;
