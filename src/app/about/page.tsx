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
  title: "About Becca Pitts",
  description:
    "Becca Pitts grew up in Eatonville and works Bonney Lake, Puyallup, North Tacoma, and the rest of Pierce County. 15+ years in real estate in Washington, 270 closings, SRES® certified, eXp Icon Agent 2022.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Education first, every time",
    body: "I would rather give you too much information than leave you guessing, and you can always tell me to get to the point. We move at your pace, and every question gets a real answer.",
  },
  {
    title: "Straight about what I know and what I don't",
    body: "If something sits outside my expertise, I say so and send you to the person who can answer it better. And I check in with them first, confirm they are still active and still good, and then I make the introduction.",
  },
  {
    title: "I catch what other people miss",
    body: "Plumbing fixtures marked NA on an inspection when they should have been flagged. A showing system left on auto-accept when it should be manual. Details decide deals, and fifteen years of contract work taught me where to look.",
  },
  {
    title: "The relationship keeps going after closing",
    body: "I have helped clients load furniture, retrieve forgotten items from new owners, and coordinate storage weeks after the deal closed. Closing day is where the real relationship starts. Most of my business comes from families I have already worked with.",
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
                I grew up in Eatonville. I have sold homes here for fifteen
                years.
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
        heading="Becca Pitts: 270 closings across Western Washington"
      />

      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <p className="eyebrow">The longer story</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Fifteen years, one county, 270 closings.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-neutral-700">
              {/* The first paragraph of storyLong is tenant.agent.bio, which is
                  already the hero copy at the top of this page, so the longer
                  story picks up from the second paragraph. The homepage renders
                  all of them. */}
              {tenant.agent.storyLong
                .split("\n\n")
                .slice(1)
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              <p>
                Senior transitions are one piece of that. I am SRES® certified,
                which means extra training in reverse mortgages, aging-in-place
                planning, and the tax side of selling a home someone has lived in
                for thirty years. Families lean on it hard when a move involves a
                parent, and I am glad to have it. It is one of the tools, and the
                rest of the toolbox is fifteen years of Pierce County contracts.
              </p>
              <p>
                Every client gets the same patient process. The challenging ones
                get the same care as the easy ones. Off the clock, there is a
                Boxer named Jagger who, in the family&apos;s words, &quot;has
                moves like Mick Jagger.&quot;
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-warm py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="How I work"
            title="Four things I hold to on every transaction."
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
              {tenant.sibling.description} When a family I am working with needs
              care placement as part of the move, this is the sister business I
              point them to.
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
          Let&apos;s talk. One short conversation about your timeline and where
          you want to land. If someone else is the better fit for what you need,
          I will say so and point you to them.
        </p>
      </ContactBlock>
    </>
  );
}
