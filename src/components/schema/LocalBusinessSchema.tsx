import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";

/**
 * Sitewide LocalBusiness JSON-LD. Rendered in the root layout so every page
 * carries the canonical organization graph.
 */
export function LocalBusinessSchema() {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const sameAs = Object.values(siteConfig.social).filter(Boolean) as string[];
  if (siteConfig.gbp.profileUrl) sameAs.push(siteConfig.gbp.profileUrl);

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${base}#agent`,
    name: siteConfig.agentName,
    image: `${base}${siteConfig.agentPhotoUrl}`,
    url: base,
    telephone: siteConfig.agentPhone,
    email: siteConfig.agentEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.primaryCity,
      addressRegion: siteConfig.stateAbbreviation,
      addressCountry: "US",
    },
    areaServed: siteConfig.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
    })),
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.brokerage,
      url: "https://exprealty.com",
    },
    knowsLanguage: ["en-US"],
    sameAs,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      recognizedBy: {
        "@type": "Organization",
        name: `${siteConfig.state} Department of Licensing`,
      },
      identifier: siteConfig.licenseNumber,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
