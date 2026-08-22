import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { HeroMosaicBackground } from "@/components/HeroMosaic";
import { HeroVideo } from "@/components/HeroVideo";
import { ContactBlock } from "@/components/ContactBlock";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { RealEstateAgentSchema } from "@/components/schema/RealEstateAgentSchema";
import { HeroVideoSchema } from "@/components/schema/HeroVideoSchema";
import { getAllPosts } from "@/lib/content";

function HeroSection() {
  const video = tenant.media.heroVideo;

  return (
    <section className="relative flex min-h-[85vh] flex-col overflow-hidden bg-white">
      {/* Falls back to the photo mosaic if the video is ever unset. */}
      {video ? <HeroVideo video={video} /> : <HeroMosaicBackground />}

      {/*
        Bottom scrim, painted above the video (z-0) and below the content
        column (z-10). The stat cards below are translucent white glass with
        white type, and the footage cuts to bright frames (sky, siding, snow)
        where white on white would vanish. This darkens the bottom band so the
        cards read against every frame. It fades out well before the headline,
        which is dark ink and needs the light wash the video already carries.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[45%] bg-gradient-to-t from-black/60 via-black/25 to-transparent"
      />

      {/* Deliberately not <Container>: its inner `mx-auto max-w-2xl` centers
          the column below lg, which pushed the hero text out of line with the
          stat row underneath. This mirrors the stat row's own wrapper
          (max-w-7xl, px-4 lg:px-8) so the eyebrow, H1, paragraph, and CTAs
          share a left edge with the cards at every breakpoint. */}
      <div className="relative z-10 flex flex-1 items-center">
        {/* Tighter than the old hero's py-24/py-32. The stat row now lives
            inside this section, so every pixel of padding here pushes the
            cards further down the screen. */}
        <div className="mx-auto w-full max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
          <FadeIn className="max-w-2xl text-left">
            <p className="eyebrow">{tenant.brand.eyebrow}</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 md:text-7xl">
              I know Pierce County
              <br />
              street by street.
            </h1>
            {/* Hero subhead is written for this page rather than pulled from
                tenant.agent.bio, so the headline and the copy under it read as
                one thought. The bio still carries the About page hero. */}
            <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
              Bonney Lake, Puyallup, North Tacoma, Eatonville. Fifteen years in
              real estate in Washington and 270 closings behind me, so I can
              tell you what your street is doing, what that house is really
              worth, and what it takes to get you into it.
            </p>
            {/* Buying and selling carry equal weight, so both CTAs use the
                same button treatment. */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/buyers" className="btn-primary">
                Buying a Home
              </Link>
              <Link href="/sellers" className="btn-primary">
                Selling a Home
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/quiz" className="text-sm font-medium text-[var(--color-moss)] hover:underline">
                Or take YOUR Real Estate IQ Quiz &rarr;
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      <HeroStatRow />
    </section>
  );
}

/**
 * The four proof points, sitting on the video at the bottom of the hero.
 *
 * Two up on phones and four across from md, so the row never squeezes a
 * value like "SRES®" onto three lines. Each card is its own pane of glass
 * rather than one wide bar, which keeps the 2x2 mobile grid looking
 * deliberate instead of like a broken strip.
 */
function HeroStatRow() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <FadeIn>
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {tenant.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/25 bg-white/15 px-4 py-5 text-white shadow-lg backdrop-blur-[12px] md:px-6 md:py-6"
              // Tailwind has no drop-shadow utility for text, and the type
              // still has to survive a blown-out frame behind the glass.
              style={{ textShadow: "0 1px 12px rgba(0,0,0,0.45)" }}
            >
              <dt className="display-num text-3xl md:text-4xl">{s.value}</dt>
              <dd className="mt-2 text-xs font-semibold uppercase tracking-wide md:text-sm">
                {s.label}
              </dd>
              {s.detail && (
                <p className="mt-1.5 text-xs leading-snug text-white/80">
                  {s.detail}
                </p>
              )}
            </div>
          ))}
        </dl>
      </FadeIn>
    </div>
  );
}

function ScenariosSection() {
  // Each card is meant to open its full article. Until an article's .mdx file
  // exists in content/blog, the card falls back to its hub page so nothing on
  // the homepage ever links to a 404.
  const publishedSlugs = new Set(getAllPosts().map((p) => p.slug));

  return (
    <section className="surface-warm py-20 md:py-28">
      <Container>
        <SectionIntro
          eyebrow="Find your next step"
          title="What does your next step look like?"
        >
          <p>
            Real scenarios from buyers and sellers across Bonney Lake, Puyallup,
            North Tacoma, and Eatonville. Find the one that sounds like yours.
          </p>
        </SectionIntro>

        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tenant.scenarios.map((card) => {
            const hasArticle = publishedSlugs.has(card.articleSlug);
            const href = hasArticle ? `/blog/${card.articleSlug}` : card.href;

            return (
              <FadeIn key={card.title}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-xl"
                >
                  <h3 className="font-display text-xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {card.description}
                  </p>
                  <p className="mt-auto pt-6 text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                    {hasArticle ? "Read the full guide" : "Start here"} &rarr;
                  </p>
                </Link>
              </FadeIn>
            );
          })}
        </FadeInStagger>
      </Container>
    </section>
  );
}

function AboutPreviewSection() {
  // White here so this reads as its own section against the warm scenarios
  // block below it, and so it meets the bottom of the hero video cleanly.
  return (
    <section className="bg-white py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <p className="eyebrow">Nice to meet you</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
              {tenant.agent.yearsOfExperience} years. 270 closings. And I still
              answer my own phone.
            </h2>
            {/* All of the about copy comes from tenant.agent.storyLong so the
                homepage and the About page never drift apart. */}
            <div className="mt-5 space-y-4 text-base text-neutral-600 md:text-lg">
              {tenant.agent.storyLong.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                Read the full story
              </Link>
              <Link href="/contact" className="btn-ghost">
                Let&apos;s talk
              </Link>
            </div>
          </FadeIn>

          <FadeIn scaleIn className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl">
              <Image
                src={tenant.agent.headshot}
                alt={`${tenant.agent.name} portrait`}
                fill
                sizes="(min-width: 1024px) 33vw, 80vw"
                className="object-cover"
              />
            </div>
            {/* Brokerage identification now lives with the full disclosure at
                the very bottom of the footer, so it is not repeated here. */}
            <p className="mt-4 text-center text-sm text-neutral-500">
              {tenant.agent.name} &middot; {tenant.agent.yearsOfExperience}+
              years in real estate in {tenant.market.state}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <RealEstateAgentSchema />
      <HeroVideoSchema />
      <HeroSection />
      {/* Nothing between these two. The stats used to sit here as their own
          strip; they now overlay the bottom of the hero, so the about section
          is the first thing under the fold. */}
      <AboutPreviewSection />
      <ScenariosSection />
      <TestimonialCarousel heading="What clients are saying" />
      <ContactBlock heading="Ready to talk about your next step?">
        <p>
          Five minutes or an hour, whatever it takes to figure out what your next
          step actually is. Let&apos;s talk.
        </p>
      </ContactBlock>
    </>
  );
}
