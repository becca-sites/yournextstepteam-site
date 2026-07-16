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
      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">MLS search</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight md:text-6xl">
            Search homes across the {tenant.market.primaryArea}.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-muted)] md:text-xl">
            Set your filters, save your searches, and get notified when new
            homes hit the market. Listings refresh continuously.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <BoldTrailWidget variant="search" />
          <p className="mt-12 text-xs text-[color:var(--color-muted)]">
            {tenant.agent.brokerageDisclosure}
          </p>
        </div>
      </section>
    </>
  );
}
