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
      {
        source: "/ea5497ae4d184e49ba89e75b7d4c1cf7.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/safety/swa-library",
        destination: "/safety/jha-library",
        statusCode: 301,
      },
      {
        source: "/safety/swa/:slug",
        destination: "/safety/jha/:slug",
        statusCode: 301,
      },
      {
        source: "/hire",
        destination: "/safety",
        statusCode: 301,
      },
      {
        source: "/crew",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/whoopwire",
        destination: "/wire",
        statusCode: 301,
      },
      {
        source: "/whoopwire/:path*",
        destination: "/wire/:path*",
        statusCode: 301,
      },
      {
        source: "/tower-crane-level-b-practice-test",
        destination: "/tower-crane-level-b-exam-bc",
        statusCode: 301,
      },
      {
        source: "/bc-tower-crane-certification",
        destination: "/tower-crane-certification-bc",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
