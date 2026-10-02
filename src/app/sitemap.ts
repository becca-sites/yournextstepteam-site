import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/site.config";
import { tenant, readyNeighborhoods } from "@/config/tenant";
import { getAllPosts } from "@/lib/content";
import { getPublishedAreas } from "@/lib/areas";
import { isNoIndex } from "@/lib/placeholder";

/*
 * lastModified is the real date the content changed, or absent where there is
 * no reliable date. It is never the build time: stamping every URL with
 * `new Date()` makes the whole site look edited on every deploy, which search
 * engines learn to ignore. priority and changeFrequency are omitted because
 * Google ignores both.
 *
 * Held area pages are not listed. Only areas that clear the content gate in
 * src/lib/areas.ts exist on the site, so only they appear here.
 */

/** Pages whose content date is known. Update when the page's words change. */
const STATIC_DATES: Record<string, string | undefined> = {
  "/": undefined,
  "/about": "2026-09-05",
  "/areas": "2026-10-02",
  "/listings": undefined,
  "/buyers": undefined,
  "/sellers": undefined,
  "/your-best-season": undefined,
  "/podcast": undefined,
  "/contact": undefined,
  "/neighborhoods": undefined,
  "/blog": undefined,
  "/privacy": "2026-10-02",
  "/consumer-health-data": "2026-10-02",
  "/accessibility": "2026-10-02",
  "/terms": "2026-10-02",
  "/fair-housing": "2026-10-02",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();

  // While the site is walled off, hand crawlers an empty sitemap rather than a
  // map of every page we are asking them not to visit.
  if (isNoIndex()) return [];

  const entry = (path: string, date?: string) => ({
    url: `${base}${path}`,
    ...(date ? { lastModified: new Date(date) } : {}),
  });

  const staticEntries = Object.entries(STATIC_DATES).map(([path, date]) =>
    entry(path, date),
  );

  const areas = getPublishedAreas().map((a) =>
    entry(`/areas/${a.slug}`, a.dateModified),
  );

  const posts = getAllPosts().map((p) =>
    entry(`/blog/${p.slug}`, p.updatedAt ?? p.publishedAt),
  );

  const neighborhoods = readyNeighborhoods().map((n) => entry(`/neighborhoods/${n.slug}`));
  const episodes = tenant.episodes.map((ep) => entry(`/your-best-season/${ep.slug}`));

  return [...staticEntries, ...areas, ...posts, ...neighborhoods, ...episodes];
}
