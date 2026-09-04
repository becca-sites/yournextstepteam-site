import { tenant } from "@/config/tenant";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";

/**
 * ProfilePage JSON-LD for /about.
 *
 * Google treats ProfilePage as the "this page is about one specific person"
 * signal, which is exactly what the About page is. It points at the Person node
 * that RealEstateAgentSchema already emits on this page rather than restating
 * it, so there is one Becca in the graph and this node only says which page
 * describes her.
 *
 * The extra detail an answer engine needs lives here too, because the shared
 * Person node is rendered on the homepage as well and this is the page that
 * earns the long version: her designations (SRES® in particular), her degree,
 * the year she was licensed, and the topics she is actually asked about.
 */
export function ProfilePageSchema() {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const { agent } = tenant;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${base}/about#profilepage`,
    url: `${base}/about`,
    name: `About ${agent.name}`,
    // The subject of the page, merged into the Person node declared by
    // RealEstateAgentSchema through the shared @id.
    mainEntity: {
      "@type": "Person",
      "@id": `${base}#person`,
      name: agent.name,
      givenName: agent.firstName,
      jobTitle: agent.title,
      description: agent.bio,
      image: `${base}${agent.headshot}`,
      birthPlace: {
        "@type": "Place",
        name: "Eatonville, Washington",
      },
      homeLocation: {
        "@type": "Place",
        name: `${tenant.market.city}, ${tenant.market.state}`,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: agent.education.institution,
        url: agent.education.url,
      },
      worksFor: {
        "@type": "Organization",
        name: agent.brokerage,
        url: "https://exprealty.com",
      },
      knowsAbout: agent.knowsAbout,
      knowsLanguage: ["en-US"],
      // The license plus every designation, each as its own credential node so
      // "SRES" is a discrete machine-readable fact rather than a word in a bio.
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: `Washington real estate broker license ${agent.license}`,
          identifier: agent.license,
          recognizedBy: {
            "@type": "Organization",
            name: `${tenant.market.state} Department of Licensing`,
          },
          validFrom: `${agent.licensedSince}-01-01`,
        },
        ...agent.certifications.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: c.name,
          alternateName: c.abbreviation,
          description: c.description,
          recognizedBy: { "@type": "Organization", name: c.issuedBy },
        })),
      ],
      // Allbree, so a client who searches her name lands on a page that says
      // who she is and which business she belongs to.
      colleague: tenant.team.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        worksFor: { "@type": "Organization", name: siteConfig.brandName },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
