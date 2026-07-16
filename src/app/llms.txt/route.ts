import { NextResponse } from "next/server";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { getAllPosts, getAllNeighborhoods } from "@/lib/content";

// llms.txt. A manifest for AI crawlers that summarizes site purpose,
// key pages, and the canonical content surfaces an LLM should index.
export function GET() {
  const base = resolveSiteUrl();
  const posts = getAllPosts();
  const neighborhoods = getAllNeighborhoods();

  const body = [
    `# ${siteConfig.agentName}`,
    "",
    `> ${siteConfig.agentTitle} affiliated with ${siteConfig.brokerage}, serving ${siteConfig.serviceArea.join(", ")}. License #${siteConfig.licenseNumber} (${siteConfig.stateAbbreviation}).`,
    "",
    "## Core pages",
    `- [Home](${base}/): Agent intro, featured listings, neighborhood guides preview.`,
    `- [About](${base}/about): Background, philosophy, brokerage disclosure.`,
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
