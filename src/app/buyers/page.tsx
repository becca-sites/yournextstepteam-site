import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { ContactBlock } from "@/components/ContactBlock";
import { ServiceSchema } from "@/components/schema/ServiceSchema";

export const metadata: Metadata = {
  title: `Buy a home in ${tenant.market.city}`,
  description: `Senior-focused buyer representation across the ${tenant.market.primaryArea}. Single-level homes, aging-in-place features, and patient guidance for every step.`,
  alternates: { canonical: "/buyers" },
};

const SCENARIOS = [
  {
    title: "Finding the right single-level home",
    body: "No stairs, wide doorways, walk-in showers, and close to the care network you need. We know which neighborhoods and floor plans fit the next chapter.",
  },
  {
    title: "Coordinating a sell-and-buy",
    body: "Selling the family home and buying something that fits your life now. Staging both timelines, managing contingencies, and keeping both closings on track.",
  },
  {
    title: "Relocating to be closer to family",
    body: "Moving to Pierce or South King County from out of the area. Which towns fit your pace, your budget, and the medical or community access you need.",
  },
  {
    title: "First-time buyer with questions",
    body: "Every question gets answered. The same patient, education-first approach that guides our senior clients applies to every buyer, regardless of experience.",
  },
];

const SYSTEM = [
  {
    title: "Patient, education-first process",
    body: "No pressure timeline. We move at your pace, answer every question, and make sure you understand each step before we take it.",
  },
  {
    title: "Aging-in-place evaluation",
    body: "We assess every home for accessibility: single-level living, grab bar potential, doorway widths, proximity to medical care and community resources.",
  },
  {
    title: "Full contract protection",
    body: "Twelve years of contract negotiations. We know which contingencies protect you and what to push for on every deal.",
  },
  {
    title: "Trusted vendor network",
    body: "Inspectors, lenders, insurance, elder law attorneys, contractors, movers. A vetted network for everything before, during, and after closing.",
  },
];

export default function BuyersPage() {
  return (
    <>
      <ServiceSchema name="Buyer representation" serviceType="Real estate buyer's agent" />

      <section className="relative overflow-hidden bg-[var(--color-surface)]">
        <Container className="pt-16 pb-12 lg:pt-24 lg:pb-20">
          <div className="grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow">For buyers</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Finding the house is the easy part.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                The next forty seven days is where deals fall apart. Inspections,
                appraisals, contract clauses, financing surprises. A good buyer
                agent is your representation through all of it.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/buyers/questionnaire" className="btn-primary">
                  Take the Buyer Questionnaire
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Book a buyer consultation
                </Link>
              </div>
            </FadeIn>
            <FadeIn scaleIn className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-xl">
                <Image
                  src={tenant.media.lifestyle[0] ?? tenant.media.heroPrimary}
                  alt="Home exterior"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="Common scenarios"
            title="Real situations we help buyers navigate."
          >
            <p>
              Every move is different. Here are a few paths we walk with clients
              across {tenant.market.primaryArea}.
            </p>
          </SectionIntro>
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {SCENARIOS.map((s, i) => (
              <FadeIn key={s.title}>
                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-7">
                  <p className="font-mono text-xs tracking-widest text-[var(--color-secondary)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {s.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <section className="surface-warm py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="The system"
            title="How we keep your deal together."
          />
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SYSTEM.map((card) => (
              <FadeIn key={card.title}>
                <div className="rounded-2xl border border-black/5 bg-white p-7">
                  <h3 className="font-display text-lg font-semibold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {card.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Ready to start?</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              The Buyer Questionnaire
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Tell us what you are looking for. Timeline, budget, must-haves, and
              deal-breakers. We will come back with a plan and a short list.
            </p>
            <div className="mt-8">
              <Link href="/buyers/questionnaire" className="btn-primary">
                Start the questionnaire
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Ready to find your home?">
        <p>
          A short conversation about what you are looking for, and where the
          market actually sits today.
        </p>
      </ContactBlock>
    </>
  );
}
