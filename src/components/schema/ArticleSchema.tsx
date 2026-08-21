import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";

interface Props {
  title: string;
  summary?: string;
  published: string;
  updated?: string;
  path: string;
  speakable?: string[];
  image?: string;
}

/**
 * Article schema with embedded SpeakableSpecification. Speakable lets voice
 * assistants and AI answer engines quote sections of the page in voice
 * responses. CSS selectors passed in `speakable` mark which sections qualify.
 */
export function ArticleSchema({
  title,
  summary,
  published,
  updated,
  path,
  speakable = ["h1", "h2", ".speakable"],
  image,
}: Props) {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const url = `${base}${path}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: summary,
    image: image ? [image] : [`${base}/og/default.jpg`],
    datePublished: published || undefined,
    dateModified: updated || published || undefined,
    author: { "@id": `${base}#person`, "@type": "Person", name: siteConfig.agentName },
    // The site publishes this, not the brokerage. The logo path is the real
    // brand mark rather than the /placeholders/ file, which does not exist.
    publisher: {
      "@id": `${base}#agent`,
      "@type": "Organization",
      name: siteConfig.brandName,
      logo: { "@type": "ImageObject", url: `${base}${siteConfig.logoUrl}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: speakable,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
