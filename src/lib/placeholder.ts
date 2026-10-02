/**
 * placeholder.ts
 *
 * Pre-launch privacy guard.
 *
 * Two things live here:
 *
 * 1. isPlaceholderMode() - while the site still carries demo/scaffold content,
 *    this keeps all schema.org JSON-LD (RealEstateAgent, Person, LocalBusiness,
 *    Service, Article, FAQ, breadcrumbs, listings) out of the crawlable output so
 *    none of it can be indexed or attributed as the real agent's identity.
 *
 * 2. The search go-live stage (tenant.demo.searchStage), which lifts the three
 *    crawler blocks one at a time in the required order: isCrawlBlocked() for
 *    /robots.txt (src/app/robots.ts), isNoIndexHeader() for the X-Robots-Tag
 *    header (next.config.ts restates it), and isNoIndex() for the meta tag
 *    (src/app/layout.tsx) and the sitemap.
 *
 * FAIL-SAFE DEFAULT: both are ON unless PLACEHOLDER_MODE is explicitly set to the
 * exact string "false". A deploy that forgets the env var, sets it wrong, or loses
 * it during a project migration still stays private. Nothing has to be configured
 * correctly in a Vercel dashboard for the site to be safe. Going public is a
 * deliberate act.
 *
 * To go live: set PLACEHOLDER_MODE=false, then step tenant.demo.searchStage
 * from 0 to 3 one deploy at a time. Both must agree, so an accidental env var
 * change alone cannot expose the site.
 *
 * Read server-side only (no NEXT_PUBLIC prefix). All consumers are Server
 * Components or build-time config, so the value resolves on the server.
 */
import { tenant } from "@/config/tenant";

export function isPlaceholderMode(): boolean {
  return process.env.PLACEHOLDER_MODE !== "false";
}

function stage(): number {
  // Fail-safe: placeholder mode overrides any stage and keeps everything shut.
  return isPlaceholderMode() ? 0 : tenant.demo.searchStage;
}

/** robots.txt disallows all crawling. Lifted first, at stage 1. */
export function isCrawlBlocked(): boolean {
  return stage() < 1;
}

/**
 * The X-Robots-Tag response header is sent. Lifted at stage 2. next.config.ts
 * restates this rule because it is evaluated outside the app's module graph.
 */
export function isNoIndexHeader(): boolean {
  return stage() < 2;
}

/**
 * The page-level <meta name="robots" content="noindex"> is rendered and the
 * sitemap is empty. Lifted last, at stage 3. Pages that must stay out of the
 * index on their own (thin or unpublished ones) set their own noindex and are
 * not affected by this.
 */
export function isNoIndex(): boolean {
  return stage() < 3;
}
