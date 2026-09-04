import { tenant } from "@/config/tenant";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
import { SERVICE_COUNTIES } from "./RealEstateAgentSchema";

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
    // The business is the named entity here; Becca is the person behind it and
    // is modelled separately in RealEstateAgentSchema's Person node.
    name: siteConfig.brandName,
    alternateName: siteConfig.agentName,
    image: `${base}${siteConfig.agentPhotoUrl}`,
    logo: `${base}${siteConfig.logoUrl}`,
    url: base,
    telephone: siteConfig.agentPhone,
    email: siteConfig.agentEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.primaryCity,
      addressRegion: siteConfig.stateAbbreviation,
      addressCountry: "US",
    },
    description: tenant.agent.bio,
    knowsAbout: tenant.agent.knowsAbout,
    // Counties and towns together, shared with the RealEstateAgent node on the
    // homepage and About page so both describe the same footprint.
    areaServed: [
      ...SERVICE_COUNTIES.map((county) => ({
        "@type": "AdministrativeArea",
        name: county,
      })),
      ...siteConfig.serviceArea.map((city) => ({
        "@type": "City",
        name: city,
      })),
    ],
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.brokerage,
      url: "https://exprealty.com",
    },
    knowsLanguage: ["en-US"],
    sameAs,
    // License plus every designation, so SRES® is present in structured data on
    // every page of the site rather than only where the Person node renders.
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: `Washington real estate broker license ${siteConfig.licenseNumber}`,
        recognizedBy: {
          "@type": "Organization",
          name: `${siteConfig.state} Department of Licensing`,
        },
        identifier: siteConfig.licenseNumber,
        validFrom: `${tenant.agent.licensedSince}-01-01`,
      },
      ...tenant.agent.certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: c.name,
        alternateName: c.abbreviation,
        description: c.description,
        recognizedBy: { "@type": "Organization", name: c.issuedBy },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
