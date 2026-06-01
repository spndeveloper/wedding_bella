import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wed.ts-invitation.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
