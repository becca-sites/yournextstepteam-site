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
    title: "Buying land to build on",
    body: "Land is a different animal. Higher down payments, different loan programs, construction timelines that layer on top. I do my homework before I send you to a lender — so when you sit down with them, you already know what you are walking into.",
    link: "/contact",
  },
  {
    title: "Selling one home to buy the next",
    body: "This is not a short answer situation. Bridge loans, contingency timelines, two closings that need to land in the same window. I manage the moving pieces and keep the lender and the other agent from pushing you before you are ready.",
    link: "/contact",
  },
  {
    title: "Relocating from out of state",
    body: "Moving to Pierce or South King County from somewhere else entirely. I will match you with the right neighborhoods, coordinate virtual tours, and if I can not sell where you are now, I know agents in other states who can. I check them out first.",
    link: "/contact",
  },
  {
    title: "First-time buyer with a lot of questions",
    body: "Good. Ask all of them. Sorry, long answer, just trying to give you all the information: that is how I work. No pressure timeline. We move at your pace, and every question gets a real answer, not a sales pitch.",
    link: tenant.listings.buyerQuestionnaireUrl,
  },
];

const PILLARS = [
  {
    title: "Education before everything",
    body: "No pressure timeline. We move at your pace, answer every question, and make sure you understand each step before we take it. I would rather give you too much information than not enough — you can always ask me to get to the point.",
  },
  {
    title: "Accessibility-first evaluation",
    body: "We assess every home for accessibility: single-level living, grab bar potential, doorway widths, proximity to medical care and community resources. If the home does not fit your life in five years, we keep looking.",
  },
  {
    title: "I catch the things other people miss",
    body: "Plumbing fixtures marked NA on the inspection when they should not be. A showing system left on auto-accept when it should be manual. The details matter, and fifteen years of contract work means I know where to look.",
  },
  {
    title: "A network I have actually vetted",
    body: "Lenders, inspectors, contractors, attorneys — I do not just hand you a name. I check in with them first, make sure they are still active and still good, and then I introduce you. If I can not help you directly, I know who can.",
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
      "A low appraisal does not kill the deal. There are multiple paths forward — renegotiate the price, cover an appraisal gap, or provide additional comparable sales to the lender for a reconsideration of value. I prepare for this possibility before it happens, because if you are only thinking about it when the report lands, you are already behind.",
  },
  {
    question: "Can you help if I am relocating from out of state?",
    answer:
      "Absolutely. I work with relocating buyers regularly — military families from JBLM, professionals moving from California, Oregon, and the East Coast. Virtual tours, neighborhood research, compressed timelines. And if you need to sell where you are now, I have agents I trust in other states. I do not just hand you a name — I check in with them first, make the introduction, and follow up to make sure it is actually working.",
  },
  {
    question: "How long does it take to find the right home?",
    answer:
      "It depends on your criteria and the market. Some buyers find the right home in two weeks. Others take three months. I do not rush the process. Keep the faith — all you need is one, as long as it is the right one. On average, my buyers are under contract within 45 days of starting their search.",
  },
  {
    question: "What if I need to sell and buy at the same time?",
    answer:
      "This is not a short answer situation. It is one of the most complex transactions in residential real estate — bridge loans, contingency timelines, two agents, two closings. I manage the lender relationship, keep the other agent from pushing you before you are ready, and coordinate both sides so you are not stuck between two transactions. I have done this enough times to know where it breaks down, and I plan around those points.",
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
                appraisals, contract clauses, financing surprises. Your agent
                should be your advocate, not your salesperson. That is the
                difference.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={tenant.listings.buyerQuestionnaireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Take the Buyer Questionnaire
                </a>
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
              percent of the process. The other ninety-five is where things get
              real — and where some agents these days prove this career is not
              for them.
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
                  {...(s.link.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
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
                  A young couple wanted to buy land and build. Not a house — land.
                  That is a different loan, a different down payment, a different
                  timeline. Before I even connected them with a lender, I
                  researched the programs myself: what the down payment would look
                  like, how construction loans layer on top, whether a family
                  member&apos;s veteran status could help. I was honest about what
                  I did not know and sent them to someone who could answer the rest.
                  That is not passing the buck — that is making sure you get real
                  answers from the right person.
                </p>
                <p className="mt-4 text-sm text-neutral-400">
                  Details changed for privacy.
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
