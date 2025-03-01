import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Enable image optimization for all sources
    unoptimized: false,
    // domains: ["*", "lh3.googleusercontent.com", "res.cloudinary.com"],

    // Add supported domains for external images (example, modify with your actual domains)
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
