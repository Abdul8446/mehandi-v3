import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com','drive.google.com','images.unsplash.com','res.cloudinary.com','m.media-amazon.com','i.pinimg.com','img3.exportersindia.com','lifeline-foundation.org'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
};

export default nextConfig;
