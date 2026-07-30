import { tenant } from "@/config/tenant";

/**
 * Sticky demo ribbon. Top-right corner of every page when tenant.demo.ribbon
 * is true. Hidden in production by toggling the flag in `src/config/tenant.ts`.
 */
export function DemoRibbon() {
  if (!tenant.demo.ribbon) return null;
  return (
    // role="note" so the ribbon is exposed as a landmark-ish region; aria-label
    // on a bare div is ignored by most screen readers. 11px uppercase was below
    // the floor this site sets for legibility.
    <div
      role="note"
      aria-label="Demo site notice"
      className="pointer-events-none fixed right-4 top-4 z-50 rounded-full bg-[var(--color-accent)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-ink)] shadow-md md:right-6 md:top-6"
    >
      Demo site
    </div>
  );
}
