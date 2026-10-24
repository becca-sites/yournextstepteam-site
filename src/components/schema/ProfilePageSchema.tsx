import { tenant } from "@/config/tenant";
import { resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
import { PERSON_ID, WEBSITE_ID } from "@/lib/entity";

/**
 * ProfilePage JSON-LD for /about.
 *
 * Google treats ProfilePage as the "this page is about one specific person"
 * signal, which is exactly what the About page is. Its mainEntity is a bare
 * reference to the shared Person node that EntitySchema emits site-wide. It
 * deliberately adds no properties of its own: that node must stay
 * byte-identical with the copy on burienbestcarehome.com, so every fact about
 * Becca lives in src/data/becca-pitts.entity.json and nowhere else.
 */
export function ProfilePageSchema() {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${base}/about#profilepage`,
    url: `${base}/about`,
    name: `About ${tenant.agent.name}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
