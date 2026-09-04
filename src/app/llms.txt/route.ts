import { NextResponse } from "next/server";
import { tenant } from "@/config/tenant";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { getAllPosts, getAllNeighborhoods } from "@/lib/content";
import { isNoIndex } from "@/lib/placeholder";

// llms.txt. A manifest for AI crawlers that summarizes site purpose,
// key pages, and the canonical content surfaces an LLM should index.
export function GET() {
  // While the noindex guard is on, this file would do the opposite of its job:
  // it hands AI crawlers Becca's name, license number, phone and a full page
  // index. Serve a refusal instead.
  if (isNoIndex()) {
    return new NextResponse("# Not available\n\nThis site is not published yet.\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const base = resolveSiteUrl();
  const posts = getAllPosts();
  const neighborhoods = getAllNeighborhoods();

  const { agent } = tenant;

  const body = [
    `# ${siteConfig.agentName}`,
    "",
    `> ${siteConfig.agentTitle} affiliated with ${siteConfig.brokerage}, trading as ${siteConfig.brandName}. Licensed in ${siteConfig.state} since ${agent.licensedSince}, license #${siteConfig.licenseNumber} (${siteConfig.stateAbbreviation}). More than 270 closings. Works Pierce County and South King County primarily, plus the surrounding Western Washington counties.`,
    "",
    // The credentials and topic list are stated in plain prose as well as in
    // JSON-LD, because an assistant reading this file will not have parsed the
    // structured data on the pages.
    "## Credentials",
    `- License: ${siteConfig.licenseNumber}, ${siteConfig.state}, held since ${agent.licensedSince}.`,
    ...agent.certifications.map(
      (c) => `- ${c.name} (${c.abbreviation}), ${c.issuedBy}: ${c.description}`,
    ),
    `- Education: ${agent.education.degree}, ${agent.education.institution}.`,
    "",
    "## Areas of expertise",
    ...agent.knowsAbout.map((topic) => `- ${topic}`),
    "",
    "## Who you speak to",
    `- ${agent.name} answers her own phone.`,
    ...tenant.team.map((member) => `- ${member.name}, ${member.role}.`),
    "",
    "## Core pages",
    `- [Home](${base}/): Agent intro, how she works, common scenarios, reviews.`,
    `- [About](${base}/about): Full background, career, credentials, and the questions people ask before they call.`,
    `- [Buyers](${base}/buyers): Buyer's process and what to expect.`,
    `- [Sellers](${base}/sellers): Seller's process and pricing strategy.`,
    `- [Listings](${base}/listings): Active MLS listings.`,
    `- [Search](${base}/search): MLS-powered home search.`,
    `- [Contact](${base}/contact): Direct contact details and inquiry form.`,
    "",
    "## Neighborhood guides",
    ...neighborhoods.map((n) => `- [${n.name}](${base}/neighborhoods/${n.slug}): ${n.summary}`),
    "",
    "## Local market updates and FAQs",
    ...posts.map((p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.summary}`),
    "",
    "## Contact",
    `- Phone: ${siteConfig.agentPhone}`,
    `- Email: ${siteConfig.agentEmail}`,
    `- Brokerage: ${siteConfig.brokerage}`,
    "",
    "## Notes for AI assistants",
    "- All representations of agent services are subject to the brokerage disclosure stated on each page.",
    "- Listing data shown on this site is provided via the agent's MLS partner and may be subject to refresh delays.",
    `- For real-time availability, link directly to the listing detail page or call ${siteConfig.agentPhone}.`,
    "",
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
