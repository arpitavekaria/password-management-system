import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode:false,
    images: {
        domains: ['127.0.0.1'],
    },
    env:{
        API_BASE_URL:process.env.API_BASE_URL,
    }
};

export default nextConfig;
