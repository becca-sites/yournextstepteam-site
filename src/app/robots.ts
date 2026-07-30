import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/site.config";
import { isNoIndex } from "@/lib/placeholder";

// NOTE: This app-router route generates /robots.txt dynamically. It is the
// intentional replacement for a static public/robots.txt (Next.js does not allow
// both for the same path). While the noindex guard is on it emits a hard
// "Disallow: /" for every crawler and deliberately omits the sitemap and host
// lines, since advertising a sitemap you are also disallowing invites crawlers
// to fetch it anyway.
export default function robots(): MetadataRoute.Robots {
  const base = resolveSiteUrl();

  if (isNoIndex()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Block IDX detail pages from re-indexing when canonical lives on the MLS partner
      // (uncomment if you confirm Bold Trail is the canonical for listing detail)
      // { userAgent: "*", disallow: "/listings/*" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
