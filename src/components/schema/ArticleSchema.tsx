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
    publisher: {
      "@type": "Organization",
      name: siteConfig.brokerage,
      logo: { "@type": "ImageObject", url: `${base}/placeholders/logo.svg` },
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
