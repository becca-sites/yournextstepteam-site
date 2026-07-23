import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";

/**
 * Person + RealEstateAgent dual schema for the agent profile. Used on the
 * homepage and the About page.
 */
export function RealEstateAgentSchema() {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const sameAs = Object.values(siteConfig.social).filter(Boolean) as string[];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}#person`,
        name: siteConfig.agentName,
        givenName: siteConfig.agentFirstName,
        image: `${base}${siteConfig.agentPhotoUrl}`,
        jobTitle: siteConfig.agentTitle,
        worksFor: {
          "@type": "Organization",
          name: siteConfig.brokerage,
        },
        telephone: siteConfig.agentPhone,
        email: siteConfig.agentEmail,
        url: base,
        sameAs,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          identifier: siteConfig.licenseNumber,
        },
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${base}#agent`,
        name: siteConfig.agentName,
        agent: { "@id": `${base}#person` },
        areaServed: siteConfig.serviceArea.map((city) => ({
          "@type": "City",
          name: city,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
