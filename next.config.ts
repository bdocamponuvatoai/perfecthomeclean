import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Keeps `/about/` -> `about/index.html`, matching the original URLs.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
