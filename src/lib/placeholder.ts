/**
 * placeholder.ts
 *
 * Placeholder-mode guard for the pre-launch scaffold phase.
 *
 * While the site still carries demo/chassis identity content, PLACEHOLDER_MODE
 * keeps all schema.org JSON-LD (RealEstateAgent, Person, LocalBusiness, Service,
 * Article, FAQ, breadcrumbs, listings) out of the crawlable output so none of it
 * can be indexed or attributed as the real agent's identity for SEO/GEO/AEO.
 *
 * FAIL-SAFE DEFAULT: placeholder mode is ON unless PLACEHOLDER_MODE is explicitly
 * set to "false". That way a deploy that forgets to set the env var still stays
 * private. To go live with real content, set PLACEHOLDER_MODE=false (see README
 * "Placeholder Mode"), which re-enables the structured-data blocks.
 *
 * Read server-side only (no NEXT_PUBLIC prefix). All schema components are Server
 * Components, so the value resolves at render time on the server.
 */
export function isPlaceholderMode(): boolean {
  return process.env.PLACEHOLDER_MODE !== "false";
}
