import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern image formats when you add your photo / logos.
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
};

export default nextConfig;
