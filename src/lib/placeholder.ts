/**
 * placeholder.ts
 *
 * Pre-launch privacy guard.
 *
 * Two things live here:
 *
 * 1. isPlaceholderMode() — while the site still carries demo/scaffold content,
 *    this keeps all schema.org JSON-LD (RealEstateAgent, Person, LocalBusiness,
 *    Service, Article, FAQ, breadcrumbs, listings) out of the crawlable output so
 *    none of it can be indexed or attributed as the real agent's identity.
 *
 * 2. isNoIndex() — the single source of truth for whether the site should be
 *    walled off from crawlers. Every noindex surface reads from this one function:
 *    the <meta name="robots"> tag (src/app/layout.tsx), the X-Robots-Tag response
 *    header (next.config.ts, which inlines the same rule), and /robots.txt
 *    (src/app/robots.ts).
 *
 * FAIL-SAFE DEFAULT: both are ON unless PLACEHOLDER_MODE is explicitly set to the
 * exact string "false". A deploy that forgets the env var, sets it wrong, or loses
 * it during a project migration still stays private. Nothing has to be configured
 * correctly in a Vercel dashboard for the site to be safe. Going public is a
 * deliberate act.
 *
 * To go live: set PLACEHOLDER_MODE=false AND flip tenant.demo.noIndex to false in
 * src/config/tenant.ts. Both must agree, so an accidental env var change alone
 * cannot expose the site.
 *
 * Read server-side only (no NEXT_PUBLIC prefix). All consumers are Server
 * Components or build-time config, so the value resolves on the server.
 */
import { tenant } from "@/config/tenant";

export function isPlaceholderMode(): boolean {
  return process.env.PLACEHOLDER_MODE !== "false";
}

/**
 * True when the site must not be indexed. Deliberately ORs the two guards so
 * turning off one is not enough to expose the site.
 */
export function isNoIndex(): boolean {
  return tenant.demo.noIndex || isPlaceholderMode();
}
