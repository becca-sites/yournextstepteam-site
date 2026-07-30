import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { HeroMosaicBackground } from "@/components/HeroMosaic";
import { ContactBlock } from "@/components/ContactBlock";
import { StatCardRow } from "@/components/sections/StatCardRow";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { RealEstateAgentSchema } from "@/components/schema/RealEstateAgentSchema";

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-white">
      <HeroMosaicBackground />
      <div className="relative z-10 flex min-h-[85vh] items-center">
        <Container className="py-24 lg:py-32">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow">{tenant.brand.eyebrow}</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 md:text-7xl">
              Senior real estate
              <br />
              for every next step.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
              {tenant.agent.bio}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/buyers" className="btn-primary">
                I am buying
              </Link>
              <Link href="/sellers" className="btn-ghost">
                I am selling
              </Link>
            </div>
            <p className="mt-6 text-sm text-neutral-500">
              {tenant.market.city}, {tenant.market.stateAbbreviation} &middot;{" "}
              {tenant.market.commuteToHub} to {tenant.market.hubCity}
            </p>
          </FadeIn>
        </Container>
      </div>
    </section>
  );
}

function PodcastSection() {
  const featured = tenant.episodes[0];
  if (!featured) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="eyebrow">Listen and watch</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {tenant.podcast.name}
            </h2>
            <p className="mt-6 text-lg text-[var(--color-ink-soft)]">
              {tenant.podcast.description}
            </p>
            <FadeInStagger className="mt-8 space-y-4" faster>
              {tenant.episodes.map((ep) => (
                <FadeIn key={ep.slug}>
                  <Link
                    href={`/your-best-season/${ep.slug}`}
                    className="group flex min-h-[44px] items-center gap-3 text-base"
                  >
                    <span className="font-mono text-xs text-[var(--color-moss)]">
                      {String(ep.number).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-neutral-950 group-hover:text-[var(--color-moss)] transition">
                      {ep.title}
                    </span>
                    <span className="text-xs text-[var(--color-ink-soft)]">
                      {ep.duration}
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </FadeInStagger>
            <div className="mt-8">
              <Link href="/podcast" className="btn-primary text-sm">
                All episodes and subscribe
              </Link>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-xl ring-1 ring-neutral-900/5">
              {featured.youtubeId && !featured.youtubeId.startsWith("TODO") ? (
                <img
                  src={`https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`}
                  alt={`${featured.title} thumbnail`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={tenant.media.lifestyle[0] ?? tenant.media.heroPrimary}
                  alt={`${tenant.podcast.name} featured episode`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href={`/your-best-season/${featured.slug}`}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-sunshine)] shadow-lg transition hover:scale-110 hover:bg-[var(--color-sunshine-deep)]"
                  aria-label="Watch featured episode"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-[var(--color-ink)]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function ScenariosSection() {
  return (
    <section className="surface-warm py-20 md:py-28">
      <Container>
        <SectionIntro
          eyebrow="Find your next step"
          title="Where in the move are you?"
        >
          <p>
            Real scenarios from buyers and sellers across the{" "}
            {tenant.market.primaryArea}. Find the path that sounds like yours.
          </p>
        </SectionIntro>

        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tenant.scenarios.map((card, i) => (
            <FadeIn key={card.title}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-xl"
              >
                <p className="font-mono text-xs tracking-widest text-[var(--color-moss)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {card.description}
                </p>
                <p className="mt-auto pt-6 text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                  Start here &rarr;
                </p>
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}

function AboutPreviewSection() {
  return (
    <section className="surface-warm py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <p className="eyebrow">Nice to meet you</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
              A {tenant.agent.yearsOfExperience}-year career built on patience,
              local relationships, and a clear process.
            </h2>
            <p className="mt-5 text-base text-neutral-600 md:text-lg">
              {tenant.agent.storyLong}
            </p>
            <p className="mt-4 text-base text-neutral-600 md:text-lg">
              Based in {tenant.market.city}, working across the{" "}
              {tenant.market.primaryArea}. {tenant.market.commuteToHub} from{" "}
              {tenant.market.hubCity}, close enough to commute and far enough to
              feel like a different pace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                Read the full story
              </Link>
              <Link href="/contact" className="btn-ghost">
                Book a consultation
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
            <p className="mt-4 text-center text-sm text-neutral-500">
              {tenant.agent.name} &middot; {tenant.agent.brokerage} &middot;{" "}
              {tenant.agent.yearsOfExperience} years in{" "}
              {tenant.market.stateAbbreviation}
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
      <HeroSection />
      <StatCardRow
        stats={tenant.stats}
        eyebrow="By the numbers"
        heading={`A ${tenant.agent.yearsOfExperience}-year track record across ${tenant.market.state}.`}
      />
      <PodcastSection />
      <ScenariosSection />
      <TestimonialCarousel />
      <AboutPreviewSection />
      <ContactBlock heading="Ready to talk about your next step?">
        <p>
          Fifteen minutes. No pressure. A real conversation about where you
          are and what comes next.
        </p>
      </ContactBlock>
    </>
  );
}
