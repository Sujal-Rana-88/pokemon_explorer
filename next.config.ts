import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"], // Allow images from PokeAPI
  },
};

export default nextConfig;
