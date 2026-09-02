import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { HeroMosaicBackground } from "@/components/HeroMosaic";
import { HeroVideo } from "@/components/HeroVideo";
import { ScrollCrossfadePortrait } from "@/components/ScrollCrossfadePortrait";
import { ContactBlock } from "@/components/ContactBlock";
import { ClosingCrawl } from "@/components/sections/ClosingCrawl";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { RealEstateAgentSchema } from "@/components/schema/RealEstateAgentSchema";
import { HeroVideoSchema } from "@/components/schema/HeroVideoSchema";
import { getAllPosts } from "@/lib/content";

function HeroSection() {
  const video = tenant.media.heroVideo;

  return (
    <section className="relative flex min-h-[90vh] flex-col overflow-hidden bg-white">
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
            cards further down the screen, and the whole stack has to clear an
            800px-tall desktop viewport with the header above it. */}
        <div className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
          <FadeIn className="max-w-2xl text-left">
            <p className="eyebrow">{tenant.brand.eyebrow}</p>
            {/* Hard break rather than a width constraint: "Puget Sound" over
                "Real Estate Expert" is the intended reading, and letting it
                wrap on its own would put "Real" up on line one at 6xl. */}
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 md:text-6xl">
              Puget Sound
              <br />
              Real Estate Expert
            </h1>
            {/* Hero subhead is written for this page rather than pulled from
                tenant.agent.bio, so the headline and the copy under it read as
                one thought. The bio still carries the About page hero.

                neutral-700 plus a soft text-shadow: the video's white wash
                keeps this readable on most frames, but the shadow is the
                safety net for the darker ones. */}
            <p
              className="mt-5 max-w-xl text-lg text-neutral-700 md:text-xl"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
            >
              Hi, I&apos;m Becca Pitts. Pierce, King, and the surrounding
              counties. Fifteen years in real estate in Washington and 270
              closings behind me, so I can tell you what your street is doing,
              what that house is really worth, and what it takes to get you
              into it.
            </p>
            {/* Buying and selling carry equal weight, so both CTAs use the
                same button treatment. */}
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/buyers" className="btn-primary">
                Buying a Home
              </Link>
              <Link href="/sellers" className="btn-primary">
                Selling a Home
              </Link>
            </div>
            <div className="mt-3">
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

/**
 * The four proof points, sitting on the video at the bottom of the hero.
 *
 * Landscape panes, not portrait tiles: the number sits on the left and the
 * label runs beside it, so a card is roughly 16:9 or wider instead of a tall
 * stack. That shape is what lets the header, headline, subhead, CTAs, and all
 * four cards clear an 800px-tall desktop viewport without scrolling.
 *
 * Two up until lg, four across above it. Four across at md would leave each
 * card about 168px, which is narrower than "SRES®" and its label side by side,
 * so tablets get the 2x2 instead. Each card is its own pane rather than one
 * wide bar, which keeps the 2x2 grid looking deliberate instead of like a
 * broken strip.
 *
 * The `detail` line each stat carries is deliberately not rendered here. It is
 * the piece that forced these cards tall, and the About page already shows all
 * four stats with their details in StatCardRow.
 */
function HeroStatRow() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 lg:px-8 lg:pb-10">
      <FadeIn>
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tenant.stats.map((s) => (
            <div
              key={s.label}
              // Number beside the label from sm up. Below that a card is about
              // 166px wide, and "SRES®" next to "Senior Real Estate Specialist"
              // does not fit on one line at any size worth reading, so the two
              // stack instead of overflowing the pane.
              className={`flex h-full flex-col items-start gap-1 rounded-2xl border border-[color:var(--color-fog)] px-4 py-3 backdrop-blur-[12px] sm:flex-row sm:items-center sm:gap-4 sm:px-5 ${GLASS_SHADOW}`}
              style={{ background: GLASS_BACKGROUND }}
            >
              {/* shrink-0 so a wrapping label never squeezes the numeral, and
                  the numeral is the thing the row exists for. One size at every
                  breakpoint: the values are not all short numerals, and at 4xl
                  "SRES®" ate enough of a 288px card to wrap its label onto four
                  lines, which set the height of the whole row. */}
              <dt className="display-num shrink-0 text-3xl text-[color:var(--color-ink)]">
                {s.value}
              </dt>
              {/* text-xs, not an arbitrary px value: this site redefines
                  --text-xs to 14px as its type floor, so anything smaller
                  would be undercutting that on purpose. */}
              <dd className="text-xs font-semibold uppercase leading-tight tracking-wide text-[color:var(--color-ink)]">
                {s.label}
              </dd>
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
  const hrefFor = (card: (typeof tenant.scenarios)[number]) =>
    publishedSlugs.has(card.articleSlug)
      ? `/blog/${card.articleSlug}`
      : card.href;
  const ctaFor = (card: (typeof tenant.scenarios)[number]) =>
    publishedSlugs.has(card.articleSlug) ? "Read the full guide" : "Start here";

  // Exactly one scenario is flagged featured in tenant.ts. It comes out of the
  // grid and runs full width above it; the rest stay two across.
  const featured = tenant.scenarios.find((c) => c.featured);
  const rest = tenant.scenarios.filter((c) => !c.featured);

  return (
    <section className="surface-warm py-20 md:py-28">
      <Container>
        <SectionIntro
          eyebrow="Find your next step"
          title="What does your next step look like?"
        >
          <p>
            Real scenarios from buyers and sellers across the Puget Sound
            region. Find the one that sounds like yours.
          </p>
        </SectionIntro>

        {/* Senior transitions, full width above the grid. Gold border and soft
            gold wash carry the emphasis: the deep gold is too light to read at
            eyebrow size, so the colour lives in the border and the words stay
            dark. This is the only card on the page that gold ranks. The
            eyebrow is plain text, never a filled pill. Site-wide rule: a
            rounded, filled container around a label reads as a button, and
            nothing that is not a control should look like one. */}
        {featured && (
          <FadeIn className="mt-12">
            <Link
              href={hrefFor(featured)}
              className="group flex flex-col rounded-2xl border-2 border-[var(--color-sunshine)] bg-[#FEF9EF] p-7 shadow-[0_2px_18px_rgba(217,154,43,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-xl md:p-10"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]">
                Senior Real Estate Specialist
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-4xl text-base leading-relaxed text-neutral-700 md:text-lg">
                {featured.description}
              </p>
              <p className="mt-6 text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                {ctaFor(featured)} &rarr;
              </p>
            </Link>
          </FadeIn>
        )}

        <FadeInStagger className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((card) => (
            <FadeIn key={card.title}>
              <Link
                href={hrefFor(card)}
                className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-xl"
              >
                <h3 className="font-display text-xl font-semibold">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {card.description}
                </p>
                <p className="mt-auto pt-6 text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                  {ctaFor(card)} &rarr;
                </p>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}

/*
 * The four things Becca named when she and Brett reviewed this page, so these
 * are her words about her own process rather than a system invented for her.
 *
 * Titles are written to break onto two lines at the four-across desktop
 * layout, and the h3 is held to two lines' worth of height at every
 * breakpoint, so all four cards line up. Anything longer than about four short
 * words per line pushes a card to three lines and breaks the row, so keep new
 * titles inside that budget.
 */
const PILLARS = [
  {
    title: "Education and Communication",
    body: "I move at your pace, and you will know what each step means before you take it. I would rather give you too much information than leave you guessing, and you can always tell me to get to the point.",
  },
  {
    title: "I Know These Neighborhoods",
    body: "Which streets flood, what a school district boundary really does to resale, why two blocks a quarter mile apart price differently. Fifteen years across Pierce, King, and the surrounding counties means I can tell you before you write the offer.",
  },
  {
    title: "A Network I've Personally Vetted",
    body: "Lenders, inspectors, contractors, attorneys. I check in with them first, confirm they are still active and still good, and then I make the introduction. If something is outside my lane, I know exactly who to hand you to.",
  },
  {
    title: "The Tenacity to Figure It Out",
    body: "I have driven hours to track down a signature on a deal everyone else had written off. When a file gets complicated, that is usually the point where I get useful, and I keep working the problem until there is a real answer.",
  },
];

/*
 * There is deliberately no separate "the truth about online listings" section
 * here. <ClosingCrawl> above already carries that argument, in Becca's exact
 * framing: "You might find the house yourself. Most of my buyers do," the
 * search is five percent, the other ninety-five is the crawl. A second section
 * making the same point in the same words read as a duplicate. If the crawl
 * ever comes off the page, this is the section that has to replace it.
 */
function DealTogetherSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <SectionIntro eyebrow="How I work" title="How to keep your deal together." />
      <Container>
        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((card) => (
            <FadeIn key={card.title}>
              {/* h-full against the grid's default stretch is what makes the
                  four cards the same height. The hover scale is small on
                  purpose: these are static cards, not links, so the lift
                  acknowledges the cursor rather than promising a click.
                  Reduced-motion users get the border and shadow without it. */}
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 transition duration-300 hover:scale-[1.02] hover:border-[var(--color-moss)] hover:shadow-lg motion-reduce:hover:scale-100">
                {/* Two lines' worth of height at leading-snug (1.375), held at
                    every breakpoint so a one-line title on tablet does not
                    shorten its card. text-balance splits the two lines evenly
                    instead of leaving one orphan word. */}
                <h3 className="min-h-[2.75em] font-display text-lg font-semibold leading-snug text-balance">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {card.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}

function ClientStorySection() {
  return (
    <section className="surface-warm py-20 md:py-24">
      <Container>
        <FadeIn className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-black/5 bg-white p-8 md:p-10">
            <div className="border-l-4 border-[var(--color-moss)] pl-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-moss)]">
                Client story
              </p>
              <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                A young couple wanted to buy raw land in Graham and build on it.
                Different loan, different down payment, different timeline.
                Before I connected them with a lender, I researched the programs
                myself: what the down payment would run, how a construction loan
                layers on top, whether a family member&apos;s veteran status
                could help. Then I was straight with them about the piece I did
                not know and sent them to someone who did. Getting you a real
                answer from the right person is the whole job.
              </p>
              {/* No "details changed for privacy" line. It read as a hedge on a
                  true story, which undercut the story. */}
            </div>
          </div>
        </FadeIn>
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
      {/* The closing crawl. Sits here, between "who I am" and "which of these
          sounds like you", because it is the answer to the question the about
          section leaves open: fine, but what do you actually do all day. It is
          also the only black band on the page, which is what stops the white
          about section and the warm scenarios section running together. */}
      <ClosingCrawl />
      <ScenariosSection />
      {/* Then how I work, then one story that shows it. Warm, white, warm: no
          two adjacent sections share a background. */}
      <DealTogetherSection />
      <ClientStorySection />
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
