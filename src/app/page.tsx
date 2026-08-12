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
              Finding the house
              <br />
              is the easy part.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
              {tenant.agent.bio}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/buyers" className="btn-primary">
                Buying a Home
              </Link>
              <Link href="/sellers" className="btn-ghost">
                Selling a Home
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/quiz" className="text-sm font-medium text-[var(--color-moss)] hover:underline">
                Or take the Real Estate IQ Quiz &rarr;
              </Link>
            </div>
          </FadeIn>
        </Container>
      </div>
    </section>
  );
}

function ScenariosSection() {
  return (
    <section className="surface-warm py-20 md:py-28">
      <Container>
        <SectionIntro
          eyebrow="Find your next step"
          title="What does your next step look like?"
        >
          <p>
            Real scenarios from buyers and sellers across the Puget Sound
            region. Find the path that sounds like yours.
          </p>
        </SectionIntro>

        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tenant.scenarios.map((card, i) => (
            <FadeIn key={card.title}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-xl"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-moss)]/10 text-xs font-semibold text-[var(--color-moss)]">
                  {i + 1}
                </span>
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
              {tenant.agent.yearsOfExperience} years. 150+ closings. And I still
              answer my own phone.
            </h2>
            <p className="mt-5 text-base text-neutral-600 md:text-lg">
              {tenant.agent.storyLong}
            </p>
            <p className="mt-4 text-base text-neutral-600 md:text-lg">
              Based in {tenant.market.city}, working across{" "}
              {tenant.market.primaryArea} and the greater Puget Sound region.
              Close enough to commute, far enough to feel like a different pace.
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
        heading={`A ${tenant.agent.yearsOfExperience}-year track record across Western Washington.`}
      />
      <ScenariosSection />
      <TestimonialCarousel heading="What Puget Sound clients are saying." />
      <AboutPreviewSection />
      <ContactBlock heading="Ready to talk about your next step?">
        <p>
          Fifteen minutes. No pressure. No sales pitch. Just a real
          conversation about where you are and what comes next.
        </p>
      </ContactBlock>
    </>
  );
}
