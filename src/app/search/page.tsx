import type { Metadata } from "next";
import { tenant } from "@/config/tenant";
import { BoldTrailWidget } from "@/components/idx/BoldTrailWidget";

export const metadata: Metadata = {
  title: "Search homes",
  description: `Search homes across the ${tenant.market.primaryArea} and the Eastside.`,
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  return (
    <>
      <section className="bg-[var(--color-surface)] section-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">MLS search</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">
            Search homes across the {tenant.market.primaryArea}.
          </h1>
          <p className="mt-6 text-lg text-muted">
            Set your filters, save your searches, and get notified when new
            homes hit the market. Listings refresh continuously.
          </p>
        </div>
      </section>

      <section className="bg-white section-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <BoldTrailWidget variant="search" />
          <p className="mt-12 text-sm text-muted">
            {tenant.agent.brokerageDisclosure}
          </p>
        </div>
      </section>
    </>
  );
}
