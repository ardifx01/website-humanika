/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  transpilePackages: ["jsonwebtoken", "bcryptjs", "mongodb"],

  webpack: (config, { isServer }) => {
    // Gunakan import dinamis untuk polyfill
    if (!isServer) {
      config.resolve.fallback = {
        crypto: false,
        stream: false,
        querystring: false,
      };
    }
    return config;
  },

  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
