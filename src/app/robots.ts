import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/site.config";
import { tenant } from "@/config/tenant";
import { isPlaceholderMode } from "@/lib/placeholder";

// NOTE: This app-router route generates /robots.txt dynamically. It is the
// intentional replacement for a static public/robots.txt (Next.js does not allow
// both for the same path). While placeholder mode or the demo noIndex flag is on,
// it emits a hard "Disallow: /" so no crawler indexes the placeholder scaffold.
export default function robots(): MetadataRoute.Robots {
  const base = resolveSiteUrl();

  if (tenant.demo.noIndex || isPlaceholderMode()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${base}/sitemap.xml`,
      host: base,
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
