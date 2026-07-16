import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/site.config";
import { tenant } from "@/config/tenant";
import { getAllPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();
  const now = new Date();

  const staticPaths = [
    "/",
    "/about",
    "/listings",
    "/buyers",
    "/buyers/questionnaire",
    "/sellers",
    "/your-best-season",
    "/podcast",
    "/case-studies",
    "/contact",
    "/neighborhoods",
    "/blog",
  ];

  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt
      ? new Date(p.updatedAt)
      : p.publishedAt
      ? new Date(p.publishedAt)
      : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const neighborhoods = tenant.neighborhoods.map((n) => ({
    url: `${base}/neighborhoods/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const episodes = tenant.episodes.map((ep) => ({
    url: `${base}/your-best-season/${ep.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticEntries = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  return [...staticEntries, ...posts, ...neighborhoods, ...episodes];
}
