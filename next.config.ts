import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import { tenant } from "./src/config/tenant";

/**
 * Mirror of isNoIndexHeader() in src/lib/placeholder.ts: the header is lifted at
 * search stage 2, after robots.txt (stage 1) and before the meta tag (stage 3).
 *
 * next.config.ts is evaluated outside the app's module graph, so it imports the
 * tenant data by relative path and restates the env rule rather than importing
 * the helper. Same logic, same fail-safe: noindex is ON unless PLACEHOLDER_MODE
 * is the exact string "false" AND tenant.demo.searchStage is 2 or more.
 *
 * This is resolved at build time, which is what we want. The header ships baked
 * into the deployment and does not depend on a runtime env var surviving in a
 * Vercel project nobody can see.
 */
const NO_INDEX = process.env.PLACEHOLDER_MODE !== "false" || tenant.demo.searchStage < 2;

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [["rehype-slug"], ["rehype-autolink-headings"]],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx", "md"],
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.boldtrail.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
  experimental: {
    mdxRs: false,
  },
  async headers() {
    if (!NO_INDEX) return [];
    // Applies to every response the deployment serves, including static assets,
    // images and PDFs, which a <meta> tag cannot cover. "noimageindex" also keeps
    // Becca's headshots out of image search while the site is under review.
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
