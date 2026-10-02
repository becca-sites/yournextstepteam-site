import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { getAllStories } from "@/lib/content";
import { tenant } from "@/config/tenant";
import { FinalCtaBlock } from "@/components/sections/FinalCtaBlock";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

export const metadata: Metadata = {
  // Page-level noindex, independent of the site-wide switch: no published stories yet (the template sample is a draft). Lift when real ones exist.
  robots: { index: false, follow: true },
  title: "Client stories",
  description: `Sold stories and case studies from buyers and sellers across the ${tenant.market.primaryArea}.`,
  alternates: { canonical: "/stories" },
  openGraph: {
    ...baseOpenGraph,
    title: "Client stories",
    description: `Sold stories and case studies from buyers and sellers across the ${tenant.market.primaryArea}.`,
    url: "/stories",
  },
};

export default function StoriesIndexPage() {
  const stories = getAllStories();
  const fallback = tenant.media.listingShowcase;

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Stories", url: "/stories" },
        ]}
      />
      <section className="bg-[var(--color-surface)] section-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">Sold stories</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">
            Real outcomes from real {tenant.market.primaryArea} clients.
          </h1>
          <p className="mt-6 text-lg text-muted">
            Case studies told in the words of the buyers and sellers who lived
            them. Specific homes, specific numbers, specific timelines.
          </p>
        </div>
      </section>

      <section className="bg-white section-y">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {stories.length === 0 ? (
            <p className="text-base text-muted">
              Stories ship with the first tenant configuration. The
              <code className="mx-1 rounded bg-neutral-100 px-1 text-ink">content/stories/</code>
              directory is where MDX case studies live.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, i) => {
                const img = story.heroImage ?? fallback[i % fallback.length];
                return (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="group block overflow-hidden rounded-2xl shadow-card border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={img}
                        alt={story.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="px-6 py-6">
                      {story.outcome && (
                        <p className="eyebrow text-muted">
                          {story.outcome}
                        </p>
                      )}
                      <h2 className="mt-3 text-xl font-semibold leading-snug">
                        {story.title}
                      </h2>
                      <p className="mt-3 text-sm text-muted">
                        {story.summary}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <FinalCtaBlock />
    </>
  );
}
