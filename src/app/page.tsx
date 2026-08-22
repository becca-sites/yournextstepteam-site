import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { HeroMosaicBackground } from "@/components/HeroMosaic";
import { HeroVideo } from "@/components/HeroVideo";
import { ScrollCrossfadePortrait } from "@/components/ScrollCrossfadePortrait";
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

      {/* There is deliberately no scrim over the video down here. The stat
          cards are frosted white with dark type, so they carry their own
          contrast; a dark band behind them would fight both the cards and the
          hero's own left-to-right white wash. */}

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
 * Frosted glass, matched to the category tiles in the Living In platform hero.
 *
 * The recipe there is a vertical white gradient rather than a flat alpha: 0.40
 * at the top opening up to 0.85 at the bottom, so the card looks lit from
 * below and the type at the bottom sits on the most opaque part. That is why
 * the tiles read as frosted rather than as a grey film.
 *
 * Two departures from the reference, both because this sits on moving video
 * instead of a still photo. It gets a real backdrop blur, which the reference
 * does not have and does not need on a fixed image. And the shadow is kept, so
 * the card still separates from a frame that happens to be white.
 */
const GLASS_BACKGROUND =
  "linear-gradient(rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.85) 100%)";

/** Reference shadow, unchanged: a tight contact shadow plus a soft lift. */
const GLASS_SHADOW =
  "shadow-[0_1px_2px_rgba(0,0,0,0.16),0_8px_18px_rgba(0,0,0,0.22)]";

interface StatIcon {
  /** Chip fill. */
  chip: string;
  /** Glyph stroke. White on the dark chips, ink on the gold one. */
  glyph: string;
  path: React.ReactNode;
}

/**
 * One icon per stat, keyed by its label in tenant.stats.
 *
 * Keyed rather than indexed so reordering the stats moves the right icon with
 * the right number, and unknown labels fall through to the star instead of
 * leaving a hole where the chip should be.
 *
 * The gold chip takes an ink glyph. White on #D99A2B is about 2.2:1, which is
 * thin even for decoration; dark on gold is roughly 8:1 and reads as a badge.
 */
const STAT_ICONS: Record<string, StatIcon> = {
  "Years in real estate": {
    chip: "var(--color-moss)",
    glyph: "#FFFFFF",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  Closings: {
    chip: "var(--color-slate)",
    glyph: "#FFFFFF",
    path: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
        <path d="M10 21v-6h4v6" />
      </>
    ),
  },
  "Senior Real Estate Specialist": {
    chip: "var(--color-ink-soft)",
    glyph: "#FFFFFF",
    path: (
      <>
        <circle cx="12" cy="9" r="5.5" />
        <path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5" />
      </>
    ),
  },
  "eXp Icon Agent": {
    chip: "var(--color-sunshine-deep)",
    glyph: "var(--color-ink)",
    path: <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6.1L12 16.8l-5.4 2.9 1.2-6.1-4.5-4.2 6.1-.8z" />,
  },
};

const FALLBACK_ICON: StatIcon = STAT_ICONS["eXp Icon Agent"];

/**
 * The four proof points, sitting on the video at the bottom of the hero.
 *
 * Two up on phones and four across from md, so the row never squeezes a value
 * like "SRES®" onto three lines. Each card is its own pane rather than one
 * wide bar, which keeps the 2x2 mobile grid looking deliberate instead of like
 * a broken strip.
 *
 * Icon chip on top, then the number at display weight, then the label. The
 * reference tiles carry an icon over a single label; the number is the piece
 * this row exists for, so it gets the size.
 */
function HeroStatRow() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 lg:px-8 lg:pb-12">
      <FadeIn>
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {tenant.stats.map((s) => {
            const icon = STAT_ICONS[s.label] ?? FALLBACK_ICON;

            return (
              <div
                key={s.label}
                className={`flex h-full flex-col items-center justify-center rounded-2xl border border-[color:var(--color-fog)] px-3 py-5 text-center backdrop-blur-[12px] sm:px-4 sm:py-7 ${GLASS_SHADOW}`}
                style={{ background: GLASS_BACKGROUND }}
              >
                <dt className="flex flex-col items-center gap-2 sm:gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl"
                    style={{ background: icon.chip, color: icon.glyph }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      aria-hidden="true"
                    >
                      {icon.path}
                    </svg>
                  </span>
                  <span className="display-num text-3xl text-[color:var(--color-ink)] sm:text-4xl">
                    {s.value}
                  </span>
                </dt>
                <dd className="mt-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-ink)] sm:text-sm">
                    {s.label}
                  </span>
                  {/* text-xs, not an arbitrary px value: this site redefines
                      --text-xs to 14px as its type floor, so anything smaller
                      would be undercutting that on purpose. The detail line
                      separates from the label by case and color instead of by
                      size. */}
                  {s.detail && (
                    <p className="mt-1 text-xs leading-snug text-[color:var(--color-muted)]">
                      {s.detail}
                    </p>
                  )}
                </dd>
              </div>
            );
          })}
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
            {/* Two portraits stacked in one frame, crossfading on scroll. The
                alt photo is optional in the tenant config, so this falls back
                to the primary headshot in both slots if it is ever unset. */}
            <ScrollCrossfadePortrait
              className="mx-auto max-w-sm"
              primarySrc={tenant.agent.headshot}
              secondarySrc={tenant.agent.headshotAlt ?? tenant.agent.headshot}
              alt={`${tenant.agent.name} portrait`}
            />
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
