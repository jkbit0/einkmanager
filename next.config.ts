import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_SERVER: process.env.BACKEND_SERVER,
  }
};
export default nextConfig;
