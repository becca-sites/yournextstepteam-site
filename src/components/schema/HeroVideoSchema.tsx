import { resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
import { tenant } from "@/config/tenant";

/** Date the hero video was published to this site, not the shoot date. */
const PUBLISHED = "2026-08-21";

/**
 * VideoObject markup for the homepage hero video.
 *
 * It describes the footage accurately and places it in Eatonville, WA, a
 * locality the site already names in visible copy (it is in the footer service
 * area line and has its own entry under /neighborhoods). That match between
 * markup and visible content is what keeps the markup legitimate.
 *
 * DELIBERATELY NOT HERE: the street address, 212 Dow Ridge Dr N. Google's
 * structured data guidelines require marked-up content to be visible on the
 * page, and their spam policies treat text served only to crawlers as hidden
 * text. The address appears nowhere a visitor can read it, so putting it in the
 * markup would be cloaking, where the downside is a manual action against the
 * whole domain rather than a ranking bump.
 *
 * The compliant way to rank for that specific property is a real page for it: a
 * sold listing or case study with the address visible on screen, this video
 * embedded, and RealEstateListingSchema attached. See SESSION_LOG.md.
 *
 * Like every other schema component here, this is gated behind placeholder
 * mode, so nothing emits until the site deliberately goes live.
 */
export function HeroVideoSchema() {
  if (isPlaceholderMode()) return null;

  const video = tenant.media.heroVideo;
  if (!video) return null;

  const base = resolveSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `Property tour in ${video.locality}, ${video.region}`,
    description: video.description,
    thumbnailUrl: `${base}${video.poster}`,
    contentUrl: `${base}${video.src}`,
    uploadDate: PUBLISHED,
    duration: `PT${video.durationSeconds}S`,
    url: base,
    contentLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: video.locality,
        addressRegion: video.region,
        addressCountry: "US",
      },
    },
    author: {
      "@type": "Person",
      name: tenant.agent.name,
      url: base,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
