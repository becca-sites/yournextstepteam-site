import type { Metadata } from "next";
import { tenant } from "@/config/tenant";

/**
 * Site-level Open Graph defaults.
 *
 * Next.js replaces, rather than merges, a parent's `openGraph` when a page sets
 * its own, so every page that needs an og:url has to restate these. Keeping
 * them in one object is what stops a page from silently dropping the image or
 * the site name when it adds its own URL.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "A Victorian-style home with a landscaped front yard and tall evergreens behind it at dusk",
};

export const baseOpenGraph = {
  type: "website" as const,
  locale: "en_US",
  siteName: tenant.brand.name,
  images: [DEFAULT_OG_IMAGE],
};

/**
 * Metadata for one page: a hand-written title and description, a
 * self-referencing canonical, and Open Graph that describes this page rather
 * than inheriting the homepage's og:url and og:title.
 *
 * `metadataBase` in the root layout turns the relative paths absolute, on the
 * www host.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url: path,
      images: [image ?? DEFAULT_OG_IMAGE],
    },
  };
}
