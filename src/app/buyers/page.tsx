import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { ContactBlock } from "@/components/ContactBlock";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { FAQSchema } from "@/components/schema/FAQSchema";

export const metadata: Metadata = {
  title: `Buy a home in ${tenant.market.city}`,
  description: `Senior-focused buyer representation across the ${tenant.market.primaryArea}. Single-level homes, aging-in-place features, and patient guidance for every step.`,
  alternates: { canonical: "/buyers" },
};

const CREDENTIALS = [
  "SRES Certified",
  "15+ Years in WA",
  "150+ Closings",
  "Senior Care Background",
];

const ZILLOW_GAPS = [
  {
    title: "Negotiate your offer",
    body: "An algorithm cannot read the other agent, gauge the seller's motivation, or structure an escalation clause that actually protects you.",
  },
  {
    title: "Read the contract",
    body: "Twenty-one pages of legal language. Contingency deadlines, earnest money terms, and title exceptions that Zillow will never explain.",
  },
  {
    title: "Spot inspection red flags",
    body: "A cracked foundation, knob-and-tube wiring, a failing septic system. The listing photos will not show you what matters most.",
  },
  {
    title: "Coordinate the closing",
    body: "Lender, title company, inspector, appraiser, insurance, HOA docs. Seventeen moving pieces that all need to land in the same two-week window.",
  },
];

const SCENARIOS = [
  {
    title: "Finding the right single-level home",
    body: "No stairs, wide doorways, walk-in showers, and close to the care network you need. We know which neighborhoods and floor plans fit the next chapter.",
    link: "/contact",
  },
  {
    title: "Coordinating a sell-and-buy",
    body: "Selling the family home and buying something that fits your life now. Staging both timelines, managing contingencies, and keeping both closings on track.",
    link: "/contact",
  },
  {
    title: "Relocating to be closer to family",
    body: "Moving to Pierce or South King County from out of the area. Which towns fit your pace, your budget, and the medical or community access you need.",
    link: "/contact",
  },
  {
    title: "First-time buyer with questions",
    body: "Every question gets answered. The same patient, education-first approach that guides our senior clients applies to every buyer, regardless of experience.",
    link: "/buyers/questionnaire",
  },
];

const PILLARS = [
  {
    title: "Education before everything",
    body: "No pressure timeline. We move at your pace, answer every question, and make sure you understand each step before we take it. Over 150 closings taught us that informed buyers make better decisions.",
  },
  {
    title: "Accessibility-first evaluation",
    body: "We assess every home for accessibility: single-level living, grab bar potential, doorway widths, proximity to medical care and community resources. If the home does not fit your life in five years, we keep looking.",
  },
  {
    title: "Contract-level protection",
    body: "Fifteen years of contract negotiations. We know which contingencies protect you, what to push for on every deal, and when to walk away. Your interests are the only ones at the table.",
  },
  {
    title: "A network that has your back",
    body: "Inspectors, lenders, insurance, elder law attorneys, contractors, movers. A vetted network for everything before, during, and after closing. One call gets you the right person.",
  },
];

const BUYER_FAQS = [
  {
    question: "Do I have to pay for buyer representation?",
    answer:
      "In Washington State, buyer agent compensation is negotiated as part of the transaction. We will walk you through exactly how it works before you sign anything. In most cases, the seller covers the buyer agent's commission, but recent industry changes mean this is always worth a clear conversation upfront.",
  },
  {
    question: "What happens if the appraisal comes in low?",
    answer:
      "A low appraisal does not kill the deal. There are multiple paths forward: renegotiate the price with the seller, ask the buyer to cover an appraisal gap, or provide additional comparable sales to the lender for a reconsideration of value. We prepare for this possibility before it happens.",
  },
  {
    question: "Can you help if I am relocating from out of state?",
    answer:
      "Absolutely. We work with relocating buyers regularly, especially military families from JBLM and professionals moving from California, Oregon, and the East Coast. We handle virtual tours, neighborhood research, and can coordinate a compressed timeline when you are buying sight-unseen or on a tight schedule.",
  },
  {
    question: "How long does it take to find the right home?",
    answer:
      "It depends on your criteria and the market. Some buyers find the right home in two weeks. Others take three months. We do not rush the process. The goal is the right home, not the fastest close. On average, our buyers are under contract within 45 days of starting their search.",
  },
  {
    question: "What if I need to sell and buy at the same time?",
    answer:
      "This is one of the most complex transactions in residential real estate, and one we handle regularly. We stage the timeline, manage contingencies on both contracts, and coordinate both closings so you are not stuck between two transactions or carrying two mortgages.",
  },
];

export default function BuyersPage() {
  return (
    <>
      <ServiceSchema name="Buyer representation" serviceType="Real estate buyer's agent" />
      <FAQSchema items={BUYER_FAQS} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-surface)]">
        <Container className="pt-16 pb-12 lg:pt-24 lg:pb-20">
          <div className="grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow">For buyers</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Finding the house is the easy part. Keeping the deal together is
                ours.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                The next forty-seven days is where deals fall apart. Inspections,
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
              <div className="mt-6 flex flex-wrap gap-2">
                {CREDENTIALS.map((cred) => (
                  <span
                    key={cred}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-moss)]/20 bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-moss)]"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                    {cred}
                  </span>
                ))}
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

      {/* Myth-Busting */}
      <section className="bg-[var(--color-primary)] py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              The truth about online listings
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              Busting the Zillow myth.
            </h2>
            <p className="mt-6 text-lg text-white/80">
              Every listing is online now. That is not the question. The question
              is what happens after you find the house. The search is five
              percent of the process. The other ninety-five percent is where
              buyers need real representation.
            </p>
            <FadeInStagger className="mt-10 grid gap-6 sm:grid-cols-2">
              {ZILLOW_GAPS.map((gap) => (
                <FadeIn key={gap.title}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {gap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {gap.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </FadeInStagger>
          </FadeIn>
        </Container>
      </section>

      {/* Scenario Cards */}
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
                <Link
                  href={s.link}
                  className="group flex h-full flex-col rounded-2xl border border-black/5 bg-[var(--color-surface)] p-7 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-xl"
                >
                  <p className="font-mono text-xs tracking-widest text-[var(--color-moss)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {s.body}
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

      {/* YNSH System Pillars */}
      <section className="surface-warm py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="The YNSH system"
            title="How we keep your deal together."
          />
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((card, i) => (
              <FadeIn key={card.title}>
                <div className="rounded-2xl border border-black/5 bg-white p-7">
                  <p className="font-mono text-xs tracking-widest text-[var(--color-moss)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold">
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

      {/* Quiz Soft CTA */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">No pressure</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Not ready to talk yet? That is fine.
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Take the Real Estate IQ Quiz instead. Six real scenarios from the{" "}
              {tenant.market.primaryArea} market. See how you would handle
              pricing, inspections, and negotiations. No contact required.
            </p>
            <div className="mt-8">
              <Link
                href="/quiz"
                className="btn-ghost min-h-[44px]"
              >
                Take the quiz
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Signature Story */}
      <section className="surface-warm py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-black/5 bg-white p-8 md:p-10">
              <div className="border-l-4 border-[var(--color-moss)] pl-6">
                <p className="inline-block rounded-full bg-[var(--color-moss)]/10 px-3 py-1 text-xs font-medium text-[var(--color-moss)]">
                  Client story
                </p>
                <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                  A JBLM military family making their first purchase in
                  Washington. They needed a single-level home near base with
                  accessible features for a family member, on a VA loan timeline.
                  We identified the right neighborhoods, coordinated with their
                  lender on VA-specific requirements, and found a home that
                  checked every box. Closed in 34 days.
                </p>
                <p className="mt-4 text-sm text-neutral-400">
                  Names and details changed for privacy.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Buyer FAQ */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="eyebrow">Buyer FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Questions buyers ask first.
            </h2>
            <div className="mt-10 divide-y divide-black/10 rounded-2xl border border-black/5 bg-[var(--color-surface)]">
              {BUYER_FAQS.map((faq) => (
                <details key={faq.question} className="group px-6 py-5">
                  <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-3 text-left font-display text-lg font-semibold">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="text-2xl text-neutral-600 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
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
