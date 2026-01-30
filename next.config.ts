import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/neo-os-demo",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
