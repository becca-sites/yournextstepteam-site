import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";
import { FinalCtaBlock } from "@/components/sections/FinalCtaBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

function findNeighborhood(slug: string) {
  return tenant.neighborhoods.find((n) => n.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = findNeighborhood(slug);
  if (!n) return { title: "Neighborhood not found" };
  return pageMetadata({
    title: `${n.name}, ${tenant.market.stateAbbreviation} real estate`,
    description: `${n.tagline}. ${n.description.slice(0, 140)}`,
    path: `/neighborhoods/${slug}`,
  });
}

export default async function NeighborhoodDetail({ params }: Props) {
  const { slug } = await params;
  const n = findNeighborhood(slug);
  if (!n) notFound();

  const photos = tenant.media.aerial;
  const heroIdx = Math.abs(slug.length) % photos.length;
  const nearby = tenant.neighborhoods.filter((x) => x.slug !== n.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Neighborhoods", url: "/neighborhoods" },
          { name: n.name, url: `/neighborhoods/${slug}` },
        ]}
      />

      <section className="bg-[var(--color-surface)] section-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/neighborhoods"
            className="text-sm text-muted underline-offset-4 hover:underline"
          >
            ← All neighborhoods
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-20">
          <div className="lg:col-span-6">
            <p className="eyebrow text-muted">
              {n.zip} &middot; {n.commute}
            </p>
            <h1 className="mt-4 font-display text-4xl md:text-6xl">
              {n.name}, {tenant.market.state} real estate.
            </h1>
            <p className="mt-3 text-2xl text-muted">
              {n.tagline}.
            </p>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {n.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Let&apos;s have a conversation
              </Link>
              <a href={`tel:${tenant.agent.phone}`} className="btn-ghost">
                {tenant.agent.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-xl">
              <Image
                src={photos[heroIdx]}
                alt={`${n.name} aerial`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          <div className="px-6 py-10">
            <p className="display-num text-3xl md:text-4xl">{n.median}</p>
            <p className="mt-2 text-sm uppercase tracking-wide">Median home price</p>
          </div>
          <div className="px-6 py-10">
            <p className="display-num text-3xl md:text-4xl">{n.zip}</p>
            <p className="mt-2 text-sm uppercase tracking-wide">ZIP code</p>
          </div>
          <div className="px-6 py-10">
            <p className="display-num text-3xl md:text-4xl">{n.commute}</p>
            <p className="mt-2 text-sm uppercase tracking-wide">To {tenant.market.hubCity}</p>
          </div>
          <div className="px-6 py-10">
            <p className="text-xl font-semibold">{tenant.market.schoolDistrict}</p>
            <p className="mt-2 text-sm uppercase tracking-wide">Primary district</p>
          </div>
        </div>
      </section>

      <section className="bg-white section-y">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="eyebrow">What makes it special</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            {n.name} highlights.
          </h2>
          <ol className="mt-10 space-y-6">
            {n.highlights.map((h, i) => (
              <li
                key={h}
                className="flex gap-5 rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6"
              >
                <p className="display-num text-3xl text-[var(--color-moss)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="self-center text-base leading-relaxed">{h}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="surface-warm section-y">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <p className="eyebrow">Also worth a look</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Nearby neighborhoods.
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {nearby.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/neighborhoods/${other.slug}`}
                    className="block rounded-2xl shadow-card border border-black/5 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <p className="text-xl font-semibold">{other.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      Median {other.median} &middot; {other.zip}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCtaBlock
        heading={`Thinking about ${n.name}?`}
        subhead="Fifteen minutes on the phone. We can talk through what is on the market, what is coming on, and what the right next step looks like."
      />
    </>
  );
}
