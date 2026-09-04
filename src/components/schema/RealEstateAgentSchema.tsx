import { tenant } from "@/config/tenant";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";

/**
 * Person + RealEstateAgent dual schema for the agent profile. Used on the
 * homepage and the About page.
 *
 * The Person node carries every designation as its own credential node rather
 * than leaving SRES® as a word inside a job title. That is the difference
 * between an answer engine being able to state that Becca is a Seniors Real
 * Estate Specialist and it having to infer it from prose.
 */
/**
 * The counties Becca actually works, named as administrative areas alongside
 * the town list. Shared with LocalBusinessSchema so the two nodes describing
 * the same business cannot claim different footprints.
 */
export const SERVICE_COUNTIES = [
  "Pierce County, Washington",
  "King County, Washington",
  "Thurston County, Washington",
  "Kitsap County, Washington",
  "Mason County, Washington",
  "Lewis County, Washington",
];

export function RealEstateAgentSchema() {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const sameAs = Object.values(siteConfig.social).filter(Boolean) as string[];
  if (tenant.agent.expProfileUrl) sameAs.push(tenant.agent.expProfileUrl);

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
        description: tenant.agent.bio,
        knowsAbout: tenant.agent.knowsAbout,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: tenant.agent.education.institution,
          url: tenant.agent.education.url,
        },
        // The license, then each designation. SRES® is a discrete node here on
        // purpose; it is the single most useful fact about Becca for the
        // families searching for help with a parent's move.
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: `Washington real estate broker license ${siteConfig.licenseNumber}`,
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
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${base}#agent`,
        // Matches the sitewide LocalBusiness node: the brand names the business,
        // the Person node above names Becca.
        name: siteConfig.brandName,
        alternateName: siteConfig.agentName,
        url: base,
        agent: { "@id": `${base}#person` },
        employee: tenant.team.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
        })),
        // Counties as well as towns. Becca works a wider footprint than the
        // town list implies, and an areaServed of towns alone tells a King or
        // Thurston County searcher they are out of range when they are not.
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
