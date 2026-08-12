import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gojjcclbhvhwylwkrlgz.supabase.co",
      },
    ],
  },
};

export default nextConfig;