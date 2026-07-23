import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";

export function NeighborhoodPreview() {
  const neighborhoods = tenant.neighborhoods?.filter((n) => n.region === "primary").slice(0, 6) ?? [];
  if (!neighborhoods.length) return null;

  const photos = tenant.media.aerial;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Local knowledge</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
              {tenant.market.primaryArea} neighborhoods, up close.
            </h2>
            <p className="mt-4 text-base text-[color:var(--color-muted)] md:text-lg">
              Every market has its own rhythm. These are the towns where I work
              most often, and the guides I keep current for buyers and sellers.
            </p>
          </div>
          <Link
            href="/neighborhoods"
            className="text-sm font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
          >
            See all neighborhoods →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n, i) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="group block overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={photos[i % photos.length]}
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
          ))}
        </div>
      </div>
    </section>
  );
}
