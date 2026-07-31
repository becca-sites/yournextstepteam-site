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
    title: "Education before everything",
    body: "I would rather give you too much information than not enough. You can always tell me to get to the point. No pressure timeline — we move at your pace, and every question gets a real answer, not a sales pitch.",
  },
  {
    title: "Honest about what I do not know",
    body: "If something is outside my expertise, I will tell you that and send you to someone who can answer it better than me. I do not just hand you a name — I check in with them first, make sure they are still active and still good, and then I introduce you.",
  },
  {
    title: "I catch the things other people miss",
    body: "Plumbing fixtures marked NA on an inspection when they should not be. A showing system left on auto-accept when it should be manual. The details matter, and fifteen years of contract work means I know where to look.",
  },
  {
    title: "The relationship does not end at closing",
    body: "I have helped clients move furniture, retrieve forgotten items from new owners, and coordinate storage after the deal closed. Closing day is where the real relationship starts. Most of my work comes from families I have already served.",
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
                Your agent should be your advocate, not your salesperson.
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
                {tenant.market.stateAbbreviation}. I work across Pierce and
                South King County — buyers, sellers, land, relocations, estate
                transitions. Some agents these days prove this career is not for
                them. I have been doing this for fifteen years because I actually
                care about getting it right.
              </p>
              <p>
                Every client gets the same patient process. The challenging ones
                get the same level of care as the easy ones. Off the clock,
                there is a Boxer named Jagger who, in the family&apos;s words,
                &quot;has moves like Mick Jagger.&quot;
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

      <ContactBlock heading="Like the way I work?">
        <p>
          A short conversation. No pressure. If I am not the right fit, I will
          tell you — and I will point you to someone who is.
        </p>
      </ContactBlock>
    </>
  );
}
