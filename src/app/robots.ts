import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/site.config";
import { isCrawlBlocked } from "@/lib/placeholder";

// NOTE: This app-router route generates /robots.txt dynamically. It is the
// intentional replacement for a static public/robots.txt (Next.js does not allow
// both for the same path). While the noindex guard is on it emits a hard
// "Disallow: /" for every crawler and deliberately omits the sitemap and host
// lines, since advertising a sitemap you are also disallowing invites crawlers
// to fetch it anyway.
export default function robots(): MetadataRoute.Robots {
  const base = resolveSiteUrl();

  // Lifted first in the go-live sequence (stage 1); see tenant.demo.searchStage.
  if (isCrawlBlocked()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  // The SEO plan's section 3.4 robots.txt. Everything is crawlable, and the AI
  // search and retrieval crawlers are named explicitly so a later blanket rule
  // cannot shut them out by accident. Training crawlers (GPTBot, ClaudeBot,
  // Google-Extended) fall under the * rule; whether to block them is Becca's
  // call and has no established citation cost either way.
  //
  // Do NOT disallow thin pages here (/search, /listings/*, /stories,
  // /case-studies). They carry their own page-level noindex, and a disallow
  // would stop Google fetching them to read it: the same trap as the go-live
  // sequence, one page at a time.
  const retrievalBots = [
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "Claude-SearchBot",
    "Claude-User",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...retrievalBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
