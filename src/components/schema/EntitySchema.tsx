import { tenant } from "@/config/tenant";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
import {
  PERSON_ID,
  TEAM_ID,
  BROKERAGE_ID,
  WEBSITE_ID,
  CARE_HOME_ID,
  DANIELA_ID,
  PERSON_NODE,
  BROKERAGE_NODE,
  SERVICE_COUNTIES,
} from "@/lib/entity";

/**
 * The sitewide entity graph, rendered once in the root layout:
 *
 *   #becca-pitts  Becca (shared, byte-identical with burienbestcarehome.com)
 *   #exp-realty   eXp Realty LLC, the licensed firm she is affiliated with
 *   #team         Your Next Step Team, her team brand under eXp
 *   #website      the site
 *
 * plus stubs for Burien Best Care Home and Daniela Torkelson, so this site
 * asserts the same cross-business link the care home site does.
 *
 * This replaces LocalBusinessSchema and RealEstateAgentSchema, which both
 * defined #agent and #person with contradictory values (worksFor the team vs
 * worksFor eXp, Becca vs Allbree as employee). Every other schema on the site
 * references these ids rather than restating the nodes.
 *
 * Becca is worksFor eXp and owns the team. She does not own eXp.
 *
 * No address on the team: her Google Business Profile is a service-area
 * business, so the team is located by areaServed. No Review or AggregateRating,
 * here or anywhere: a business marking up reviews about itself is ineligible
 * for review stars and risks a manual action.
 */
export function EntitySchema() {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_NODE,
      BROKERAGE_NODE,
      {
        "@type": "RealEstateAgent",
        "@id": TEAM_ID,
        name: siteConfig.brandName,
        url: `${base}/`,
        image: `${base}${siteConfig.agentPhotoUrl}`,
        logo: `${base}${siteConfig.logoUrl}`,
        telephone: siteConfig.agentPhone,
        email: siteConfig.agentEmail,
        description: `${siteConfig.brandName} is Becca Pitts' real estate team, operating under ${siteConfig.brokerage} and serving buyers, sellers, and senior downsizers across Pierce County and South King County, Washington.`,
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
        knowsAbout: tenant.agent.knowsAbout,
        knowsLanguage: ["en-US"],
        parentOrganization: { "@id": BROKERAGE_ID },
        founder: { "@id": PERSON_ID },
        owner: { "@id": PERSON_ID },
        employee: [
          { "@id": PERSON_ID },
          ...tenant.team.map((member) => ({
            "@type": "Person",
            name: member.name,
            jobTitle: member.role,
          })),
        ],
        sameAs: ["https://maps.google.com/maps?cid=401486134069244938"],
      },
      {
        "@type": "LocalBusiness",
        "@id": CARE_HOME_ID,
        name: "Burien Best Care Home",
        url: "https://www.burienbestcarehome.com/",
        owner: [{ "@id": PERSON_ID }, { "@id": DANIELA_ID }],
      },
      {
        "@type": "Person",
        "@id": DANIELA_ID,
        name: "Daniela Torkelson",
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${base}/`,
        name: siteConfig.brandName,
        publisher: { "@id": TEAM_ID },
        about: { "@id": PERSON_ID },
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
