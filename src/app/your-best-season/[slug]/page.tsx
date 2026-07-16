import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { ContactBlock } from "@/components/ContactBlock";
import { VideoObjectSchema } from "@/components/schema/VideoObjectSchema";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tenant.episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ep = tenant.episodes.find((e) => e.slug === slug);
  if (!ep) return {};
  return {
    title: `${ep.title} | ${tenant.videos.seriesTitle}`,
    description: ep.description,
    alternates: { canonical: `/your-best-season/${ep.slug}` },
  };
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const ep = tenant.episodes.find((e) => e.slug === slug);
  if (!ep) notFound();

  const prev = tenant.episodes.find((e) => e.number === ep.number - 1);
  const next = tenant.episodes.find((e) => e.number === ep.number + 1);

  const hasVideo = ep.youtubeId && !ep.youtubeId.startsWith("TODO");

  return (
    <>
      <VideoObjectSchema episode={ep} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: tenant.videos.seriesTitle, url: "/your-best-season" },
          { name: ep.title, url: `/your-best-season/${ep.slug}` },
        ]}
      />
      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <Container>
          <FadeIn>
            <Link
              href="/your-best-season"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-moss)] hover:underline"
            >
              &larr; All episodes
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-moss)] text-lg font-semibold text-white">
                {ep.number}
              </span>
              <p className="text-sm text-neutral-500">
                Episode {ep.number} of {tenant.episodes.length}
              </p>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {ep.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-neutral-600 md:text-xl">
              {ep.description}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-12 md:py-16">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            {hasVideo ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                  title={ep.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-neutral-100 text-center">
                <div>
                  <p className="text-lg font-medium text-neutral-500">
                    Video coming soon
                  </p>
                  <a
                    href={tenant.videos.featuredPlaylistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-moss)] hover:underline"
                  >
                    Watch the full playlist on YouTube &rarr;
                  </a>
                </div>
              </div>
            )}
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-8 md:py-12">
        <Container>
          <div className="mx-auto flex max-w-4xl items-center justify-between border-t border-neutral-200 pt-8">
            {prev ? (
              <Link
                href={`/your-best-season/${prev.slug}`}
                className="text-sm font-medium text-[var(--color-moss)] hover:underline"
              >
                &larr; {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/your-best-season/${next.slug}`}
                className="text-sm font-medium text-[var(--color-moss)] hover:underline"
              >
                {next.title} &rarr;
              </Link>
            ) : (
              <span />
            )}
          </div>
        </Container>
      </section>

      <ContactBlock heading="Have a question about this topic?">
        <p>
          Every situation is different. If this episode raised questions about
          your own next step, let us talk through it.
        </p>
      </ContactBlock>
    </>
  );
}
