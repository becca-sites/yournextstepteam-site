import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { ContactBlock } from "@/components/ContactBlock";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

export const metadata: Metadata = {
  title: tenant.podcast.name,
  description: tenant.podcast.description,
  alternates: { canonical: "/podcast" },
  openGraph: {
    ...baseOpenGraph,
    title: tenant.podcast.name,
    description: tenant.podcast.description,
    url: "/podcast",
  },
};

export default function PodcastPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: tenant.podcast.name, url: "/podcast" },
        ]}
      />

      <section className="bg-[var(--color-surface)] section-y">
        <Container>
          <FadeIn>
            <p className="eyebrow">Podcast</p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">
              {tenant.podcast.name}
            </h1>
            <p className="mt-6 text-lg text-muted">
              {tenant.podcast.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={tenant.social.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Watch on YouTube
              </a>
              {tenant.podcast.transistorUrl && (
                <a
                  href={tenant.podcast.transistorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Listen on Transistor
                </a>
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Subscribe bar */}
      <section className="border-y border-black/5 bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <span className="text-muted">Subscribe:</span>
            {tenant.podcast.applePodcastsUrl && (
              <a
                href={tenant.podcast.applePodcastsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition hover:underline"
              >
                Apple Podcasts
              </a>
            )}
            {tenant.podcast.spotifyUrl && (
              <a
                href={tenant.podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition hover:underline"
              >
                Spotify
              </a>
            )}
            <a
              href={tenant.social.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink transition hover:underline"
            >
              YouTube
            </a>
            {tenant.podcast.transistorUrl && (
              <a
                href={tenant.podcast.transistorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition hover:underline"
              >
                Transistor
              </a>
            )}
            {!tenant.podcast.applePodcastsUrl && !tenant.podcast.spotifyUrl && (
              <span className="text-muted italic">
                Apple Podcasts and Spotify links coming soon
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* Episode grid */}
      <section className="bg-white section-y">
        <Container>
          <FadeIn>
            <h2 className="font-display text-3xl">
              Episodes
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Real conversations about the decisions that shape your next chapter.
            </p>
          </FadeIn>
          <FadeInStagger className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tenant.episodes.map((ep) => {
              const hasVideo = ep.youtubeId && !ep.youtubeId.startsWith("TODO");
              return (
                <FadeIn key={ep.slug}>
                  <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-[var(--color-surface)] transition hover:shadow-lg">
                    {hasVideo ? (
                      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                        <img
                          src={`https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`}
                          alt={ep.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-sunshine)] shadow-lg">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-ink">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-[var(--color-fog)]">
                        <p className="text-sm text-muted">Video coming soon</p>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-moss-deep)] text-sm font-semibold text-white">
                          {ep.number}
                        </span>
                        <span className="text-sm text-muted">
                          Episode {ep.number} · {ep.duration}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold leading-snug">
                        {ep.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {ep.description}
                      </p>
                      <div className="mt-4 flex gap-3">
                        <Link
                          href={`/your-best-season/${ep.slug}`}
                          className="text-sm font-medium text-ink transition hover:underline"
                        >
                          Watch episode
                        </Link>
                        {hasVideo && (
                          <a
                            href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted transition hover:text-ink"
                          >
                            YouTube
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </FadeInStagger>
        </Container>
      </section>

      {/* About the podcast */}
      <section className="bg-[var(--color-surface)] section-y">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl">
              Why this podcast exists
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              The conversations that matter most during a major life transition
              are the ones nobody prepares you for. {tenant.podcast.name} brings
              in the professionals families actually need to hear from: hospice
              workers, estate planners, senior move managers, and the people who
              do this work every day.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              New episodes are published on YouTube and distributed to all major
              podcast platforms. Subscribe so you do not miss an episode.
            </p>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Have a question about something you heard?">
        <p>
          Every episode opens a conversation. If something raised a question
          about your own situation, let us talk it through.
        </p>
      </ContactBlock>
    </>
  );
}
