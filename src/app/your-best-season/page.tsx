import type { Metadata } from "next";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: tenant.videos.seriesTitle,
  description: tenant.videos.seriesDescription,
  alternates: { canonical: "/your-best-season" },
};

export default function YourBestSeasonPage() {
  return (
    <>
      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <Container>
          <FadeIn className="max-w-3xl">
            <p className="eyebrow">Video series</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {tenant.videos.seriesTitle}
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl">
              {tenant.videos.seriesDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={tenant.videos.featuredPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Watch on YouTube
              </a>
              <Link href="/podcast" className="btn-ghost">
                Listen to the podcast
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container>
          <FadeInStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tenant.episodes.map((ep) => (
              <FadeIn key={ep.slug}>
                <Link
                  href={`/your-best-season/${ep.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-black/5 bg-[var(--color-surface)] p-7 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-moss)] text-sm font-semibold text-white">
                      {ep.number}
                    </span>
                    <h2 className="font-display text-xl font-semibold group-hover:text-[var(--color-moss)] transition">
                      {ep.title}
                    </h2>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-neutral-600">
                    {ep.description}
                  </p>
                  <p className="mt-auto pt-6 text-sm font-medium text-[var(--color-moss)] group-hover:underline">
                    Watch episode &rarr;
                  </p>
                </Link>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <ContactBlock heading="Have questions after watching?">
        <p>
          The series covers the big topics. If your situation needs a more
          personal conversation, we are here.
        </p>
      </ContactBlock>
    </>
  );
}
