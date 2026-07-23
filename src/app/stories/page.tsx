import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllStories } from "@/lib/content";
import { tenant } from "@/config/tenant";
import { FinalCtaBlock } from "@/components/sections/FinalCtaBlock";

export const metadata: Metadata = {
  title: "Client stories",
  description: `Sold stories and case studies from buyers and sellers across the ${tenant.market.primaryArea}.`,
  alternates: { canonical: "/stories" },
};

export default function StoriesIndexPage() {
  const stories = getAllStories();
  const fallback = tenant.media.listingShowcase;

  return (
    <>
      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">Sold stories</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight md:text-6xl">
            Real outcomes from real {tenant.market.primaryArea} clients.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-muted)] md:text-xl">
            Case studies told in the words of the buyers and sellers who lived
            them. Specific homes, specific numbers, specific timelines.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {stories.length === 0 ? (
            <p className="text-base text-[color:var(--color-muted)]">
              Stories ship with the first tenant configuration. The
              <code className="mx-1 rounded bg-neutral-100 px-1">content/stories/</code>
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
                    className="group block overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
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
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-secondary)]">
                          {story.outcome}
                        </p>
                      )}
                      <h2 className="mt-3 font-heading text-xl font-semibold leading-snug">
                        {story.title}
                      </h2>
                      <p className="mt-3 text-sm text-[color:var(--color-muted)]">
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
