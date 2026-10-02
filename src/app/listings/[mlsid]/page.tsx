import type { Metadata } from "next";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { BoldTrailWidget } from "@/components/idx/BoldTrailWidget";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

interface Props {
  params: Promise<{ mlsid: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mlsid } = await params;
  return {
    title: `Listing ${mlsid}`,
    description: `Property details for listing ${mlsid}, represented by ${tenant.agent.name}.`,
    alternates: { canonical: `/listings/${mlsid}` },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { mlsid } = await params;

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Listings", url: "/listings" },
          { name: `Listing ${mlsid}`, url: `/listings/${mlsid}` },
        ]}
      />

      <section className="bg-[var(--color-surface)] section-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-sm text-muted">
            <Link href="/listings" className="underline-offset-4 hover:underline">
              Listings
            </Link>{" "}
            &middot; #{mlsid}
          </p>
          <h1 className="mt-4 font-display text-3xl md:text-5xl">
            Listing details
          </h1>
          <p className="mt-4 text-base text-muted">
            Loading property details from the MLS. Pricing, photos, square
            footage, and tour booking load below.
          </p>
        </div>
      </section>

      <section className="bg-white section-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <BoldTrailWidget variant="listing-detail" mlsId={mlsid} />
          <p className="mt-12 text-sm text-muted">
            {tenant.agent.brokerageDisclosure}
          </p>
        </div>
      </section>
    </>
  );
}
