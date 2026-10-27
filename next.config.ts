import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Car photos are uploaded through a server action (the default limit is 1 MB).
    serverActions: { bodySizeLimit: "12mb" },
  },
};

export default nextConfig;
