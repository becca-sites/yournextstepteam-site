import { tenant } from "@/config/tenant";

/**
 * Sticky demo ribbon. Top-right corner of every page when tenant.demo.ribbon
 * is true. Hidden in production by toggling the flag in `src/config/tenant.ts`.
 */
export function DemoRibbon() {
  if (!tenant.demo.ribbon) return null;
  return (
    <div
      aria-label="Demo site notice"
      className="pointer-events-none fixed right-4 top-4 z-50 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#1f2421] shadow-md md:right-6 md:top-6"
    >
      Demo site
    </div>
  );
}
