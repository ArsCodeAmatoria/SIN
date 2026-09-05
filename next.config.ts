import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [
      {
        source: "/og.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, immutable" },
          { key: "Content-Type", value: "image/png" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/safety/swa-library",
        destination: "/safety/jha-library",
        permanent: true,
      },
      {
        source: "/safety/swa/:slug",
        destination: "/safety/jha/:slug",
        permanent: true,
      },
      {
        source: "/hire",
        destination: "/safety",
        permanent: true,
      },
      {
        source: "/crew",
        destination: "/",
        permanent: true,
      },
      {
        source: "/whoopwire",
        destination: "/wire",
        permanent: true,
      },
      {
        source: "/whoopwire/:path*",
        destination: "/wire/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
