import { tenant } from "@/config/tenant";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
import { SERVICE_COUNTIES } from "./RealEstateAgentSchema";

/**
 * The sitewide entity graph, rendered in the root layout so every page carries
 * it with stable @ids:
 *
 *   #agent    RealEstateAgent, the business (a LocalBusiness subtype)
 *   #person   Becca
 *   #website  the site
 *
 * Page-level graphs (area pages, articles, breadcrumbs) point back at these
 * ids rather than restating them. The homepage and About page also render
 * RealEstateAgentSchema, which uses the same #agent and #person ids, so the
 * two merge into one entity rather than describing two.
 *
 * No address. Becca's Google Business Profile is a service-area business with
 * no street address, and directories already disagree about where she is; a
 * locality here would be one more location claim to reconcile. The business is
 * located by areaServed instead. That makes it ineligible for the LocalBusiness
 * rich result, which requires an address, and that is the accepted trade.
 *
 * No Review or AggregateRating, here or anywhere: a business marking up reviews
 * about itself is ineligible for review stars and risks a manual action.
 */
export function LocalBusinessSchema() {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const sameAs = Object.values(siteConfig.social).filter(Boolean) as string[];
  if (siteConfig.gbp.profileUrl) sameAs.push(siteConfig.gbp.profileUrl);

  const credentials = [
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
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${base}#agent`,
        name: siteConfig.brandName,
        alternateName: siteConfig.agentName,
        image: `${base}${siteConfig.agentPhotoUrl}`,
        logo: `${base}${siteConfig.logoUrl}`,
        url: `${base}/`,
        telephone: siteConfig.agentPhone,
        email: siteConfig.agentEmail,
        description: tenant.agent.bio,
        foundingDate: String(tenant.agent.licensedSince),
        knowsAbout: tenant.agent.knowsAbout,
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
        // The licensed firm, by its licensed name (tenant FIRM_LICENSED_NAME).
        parentOrganization: {
          "@type": "Organization",
          name: siteConfig.brokerage,
          url: "https://exprealty.com",
        },
        founder: { "@id": `${base}#person` },
        employee: { "@id": `${base}#person` },
        knowsLanguage: ["en-US"],
        sameAs,
        hasCredential: credentials,
      },
      {
        "@type": "Person",
        "@id": `${base}#person`,
        name: siteConfig.agentName,
        givenName: siteConfig.agentFirstName,
        familyName: "Pitts",
        jobTitle: siteConfig.agentTitle,
        url: `${base}/about`,
        image: `${base}${siteConfig.agentPhotoUrl}`,
        telephone: siteConfig.agentPhone,
        email: siteConfig.agentEmail,
        worksFor: { "@id": `${base}#agent` },
        knowsAbout: tenant.agent.knowsAbout,
        hasCredential: credentials,
        owns: {
          "@type": "Organization",
          name: tenant.sibling.name,
          url: tenant.sibling.url,
          description: tenant.sibling.description,
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${base}#website`,
        url: `${base}/`,
        name: siteConfig.brandName,
        publisher: { "@id": `${base}#agent` },
        inLanguage: "en-US",
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
