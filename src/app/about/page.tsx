import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { Border } from "@/components/Border";
import { ContactBlock } from "@/components/ContactBlock";
import { RealEstateAgentSchema } from "@/components/schema/RealEstateAgentSchema";
import { StatCardRow } from "@/components/sections/StatCardRow";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${tenant.agent.name}, Senior Real Estate Specialist serving the ${tenant.market.primaryArea}.`,
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Patience over pressure",
    body: "Senior transitions take time. We move at the family's pace, answer every question, and never push toward a decision that is not ready.",
  },
  {
    title: "Tell the truth",
    body: "Honest pricing, honest condition assessments, honest market reads. Families making big decisions deserve straight information.",
  },
  {
    title: "Coordinate the full picture",
    body: "Attorney, financial planner, contractor, moving company. We work alongside the team the family already trusts and fill in the gaps.",
  },
  {
    title: "Stay in the relationship",
    body: "Closing day is where the long part of the relationship starts. Most of our work comes from families we have already served.",
  },
];

export default function AboutPage() {
  return (
    <>
      <RealEstateAgentSchema />

      <section className="bg-[var(--color-surface)]">
        <Container className="pt-16 pb-12 lg:pt-24 lg:pb-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow">About</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Real estate for the moves that matter most.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                {tenant.agent.bio}
              </p>
            </FadeIn>
            <FadeIn scaleIn className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-white shadow-xl">
                <Image
                  src={tenant.agent.headshot}
                  alt={`${tenant.agent.name} portrait`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <StatCardRow
        stats={tenant.stats}
        eyebrow="Credentials"
        heading="The background behind the work."
      />

      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">The longer story</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Why senior real estate.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-neutral-700">
              <p>{tenant.agent.storyLong}</p>
              <p>
                Grew up in Eatonville and now based in {tenant.market.city},{" "}
                {tenant.market.stateAbbreviation}, serving Pierce and South King
                County across the {tenant.market.primaryArea}. The focus is
                senior real estate: helping older adults and their families with
                aging-in-place conversions, medical-accessible modifications,
                downsizing, and the estate transitions that come with a
                later-in-life move.
              </p>
              <p>
                Every client gets the same patient process and the same
                attention. Off the clock, there is a Boxer named Jagger who, in
                the family&apos;s words, &quot;has moves like Mick Jagger.&quot;
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-warm py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="How we work"
            title="Four principles that shape every transaction."
          />
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {VALUES.map((v) => (
              <FadeIn key={v.title}>
                <div className="rounded-2xl border border-black/5 bg-white p-7">
                  <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {v.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <SectionIntro
              eyebrow={tenant.podcast.name}
              title="Education-first, always."
            >
              <p>
                {tenant.podcast.description}
              </p>
            </SectionIntro>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/podcast" className="btn-primary">
                Listen to the podcast
              </Link>
              <a
                href={tenant.videos.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                YouTube channel
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--color-fog)] py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">Part of the family</p>
            <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
              {tenant.sibling.name}
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              {tenant.sibling.description} When families need care placement as
              part of their transition, Burien Best Care Home is the sister
              business Becca trusts.
            </p>
            <a
              href={tenant.sibling.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-[var(--color-moss)] hover:underline"
            >
              Visit {tenant.sibling.name}
            </a>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-warm py-12">
        <Container>
          <FadeIn>
            <Border className="pt-8">
              <div className="mx-auto max-w-3xl text-sm text-neutral-600">
                <p className="font-semibold text-neutral-950">
                  Brokerage disclosure
                </p>
                <p className="mt-3">{tenant.agent.brokerageDisclosure}</p>
                <p className="mt-2">
                  The brokerage relationship is {tenant.agent.brokerage}, license{" "}
                  {tenant.agent.license}.
                </p>
              </div>
            </Border>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Like the way we work?">
        <p>
          A short, no pressure call to see if we are a fit for what you are
          working on.
        </p>
      </ContactBlock>
    </>
  );
}
