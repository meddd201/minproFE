import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dkasx1dlw/image/upload/**')],
  },
};

export default nextConfig;
