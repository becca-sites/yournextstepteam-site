import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { HeroMosaicBackground } from "@/components/HeroMosaic";
import { HeroVideo } from "@/components/HeroVideo";
import { ContactBlock } from "@/components/ContactBlock";
import { StatCardRow } from "@/components/sections/StatCardRow";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { RealEstateAgentSchema } from "@/components/schema/RealEstateAgentSchema";
import { HeroVideoSchema } from "@/components/schema/HeroVideoSchema";
import { getAllPosts } from "@/lib/content";

function HeroSection() {
  const video = tenant.media.heroVideo;

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-white">
      {/* Falls back to the photo mosaic if the video is ever unset. */}
      {video ? <HeroVideo video={video} /> : <HeroMosaicBackground />}
      <div className="relative z-10 flex min-h-[85vh] items-center">
        {/* Deliberately not <Container>: its inner `mx-auto max-w-2xl` centers
            the column below lg, which pushed the hero text out of line with the
            "By the numbers" strip underneath. This mirrors StatCardRow's own
            wrapper (max-w-7xl, px-4 lg:px-8) so the eyebrow, H1, paragraph, and
            CTAs share a left edge with the section below at every breakpoint. */}
        <div className="mx-auto w-full max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
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
    </section>
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
  // White here so the three stacked sections (stats, about, scenarios) read as
  // three sections instead of one long warm block.
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
            <p className="mt-5 text-base text-neutral-600 md:text-lg">
              {tenant.agent.storyLong}
            </p>
            <p className="mt-4 text-base text-neutral-600 md:text-lg">
              I&apos;m based in {tenant.market.city} and I work Puyallup, North
              Tacoma, Eatonville, and the rest of {tenant.market.primaryArea},
              plus King, Thurston, and Mason when the right home is there. First
              house or tenth, upsizing, downsizing, investing, relocating: the
              questions change, the way I work them stays the same.
            </p>
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
      <StatCardRow
        stats={tenant.stats}
        eyebrow="By the numbers"
        heading="Becca Pitts: 270 closings across Western Washington"
      />
      <AboutPreviewSection />
      <ScenariosSection />
      <TestimonialCarousel heading="What clients are saying." />
      <ContactBlock heading="Ready to talk about your next step?">
        <p>
          Five minutes or an hour, whatever it takes to figure out what your next
          step actually is. Let&apos;s talk.
        </p>
      </ContactBlock>
    </>
  );
}
