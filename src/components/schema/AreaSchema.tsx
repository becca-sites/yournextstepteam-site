import { resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
import type { Area } from "@/lib/areas";

/**
 * Structured data for one area page: WebPage, Place (the city, not an office
 * address, so it makes no NAP claim), Service, BreadcrumbList, and FAQPage.
 *
 * FAQPage no longer earns a Google rich result (retired May 2026). It stays
 * because it costs nothing and keeps the question-and-answer structure
 * explicit. There is deliberately no Review or AggregateRating anywhere: a
 * business marking up reviews about itself is ineligible for review stars and
 * risks a spammy-markup manual action. Reviews are plain HTML on this site.
 *
 * Suppressed while placeholder identity is live, like every schema component.
 */
export function AreaSchema({ area }: { area: Area }) {
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const url = `${base}/areas/${area.slug}`;
  const wiki = `https://en.wikipedia.org/wiki/${encodeURIComponent(
    area.city.replace(/ /g, "_"),
  )},_Washington`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: area.h1,
      description: area.metaDescription,
      isPartOf: { "@id": `${base}#website` },
      about: { "@id": `${url}#place` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      datePublished: area.datePublished,
      dateModified: area.dateModified,
      ...(area.ogImage ? { primaryImageOfPage: `${base}${area.ogImage.url}` } : {}),
    },
    {
      "@type": "Place",
      "@id": `${url}#place`,
      name: `${area.city}, Washington`,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.city,
        addressRegion: "WA",
        addressCountry: "US",
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${area.county}, Washington`,
      },
      sameAs: wiki,
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      serviceType: "Residential real estate representation",
      provider: { "@id": `${base}#agent` },
      areaServed: { "@id": `${url}#place` },
      description: area.metaDescription,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "Areas", item: `${base}/areas` },
        { "@type": "ListItem", position: 3, name: area.city },
      ],
    },
  ];

  if (area.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      isPartOf: { "@id": `${url}#webpage` },
      mainEntity: area.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
