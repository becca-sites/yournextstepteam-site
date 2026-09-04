import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: `Neighborhood guides across the ${tenant.market.primaryArea} and the Eastside, curated by ${tenant.agent.name}.`,
  alternates: { canonical: "/neighborhoods" },
};

const REGION_HEADINGS: Record<string, string> = {
  primary: tenant.market.primaryArea,
  eastside: "Greater Eastside",
  extended: "Extended service area",
};

export default function NeighborhoodsIndex() {
  const grouped = tenant.neighborhoods.reduce<Record<string, typeof tenant.neighborhoods>>(
    (acc, n) => {
      (acc[n.region] = acc[n.region] || []).push(n);
      return acc;
    },
    {},
  );
  const photos = tenant.media.aerial;

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Neighborhoods", url: "/neighborhoods" },
        ]}
      />
      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">Local knowledge</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight md:text-6xl">
            Neighborhoods we serve.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-muted)] md:text-xl">
            The {tenant.market.primaryArea} and the greater Eastside. We know
            the streets, the schools, the commute times, and the homes that do
            not show up on a search portal.
          </p>
        </div>
      </section>

      <div className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {Object.entries(grouped).map(([region, list]) => (
            <section key={region} className="mb-16 last:mb-0">
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">
                {REGION_HEADINGS[region] || region}
              </h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((n, i) => (
                  <li key={n.slug}>
                    <Link
                      href={`/neighborhoods/${n.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                        <Image
                          src={photos[(i + region.length) % photos.length]}
                          alt={`${n.name} aerial`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="px-6 py-5">
                        <p className="text-xs uppercase tracking-widest text-[color:var(--color-secondary)]">
                          {n.zip} &middot; {n.commute}
                        </p>
                        <h3 className="mt-2 font-heading text-xl font-semibold">
                          {n.name}, {tenant.market.stateAbbreviation}
                        </h3>
                        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                          {n.tagline}
                        </p>
                        <p className="mt-4 text-sm font-medium">
                          Median {n.median}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
