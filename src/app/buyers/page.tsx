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
  title: "Buy a home in Pierce, King, and the surrounding counties",
  description:
    "Buyer representation across the Puget Sound region from Becca Pitts: 270 closings, 15+ years in real estate in Washington, and street-by-street knowledge of Pierce, King, and the surrounding counties.",
  alternates: { canonical: "/buyers" },
};

/*
 * Plain-text credential line. This used to render as rounded pill badges, which
 * read as buttons to anyone scanning the page and were not clickable. Anything
 * shaped like a button on this site is now an actual button or link.
 */
const CREDENTIALS = [
  "SRES® Certified",
  "15+ years in real estate in Washington",
  "270 closings",
  "eXp Icon Agent, 2022",
];

const ZILLOW_GAPS = [
  {
    title: "Negotiate your offer",
    body: "An algorithm reads a spreadsheet. I read the other agent, the seller's motivation, and how much room is actually in the deal, then I structure an escalation clause that holds up when three other buyers want the same house.",
  },
  {
    title: "Read the contract",
    body: "Twenty-one pages of legal language. Contingency deadlines, earnest money terms, title exceptions. I go through the pages that will cost you money and I tell you what each one does before you initial it.",
  },
  {
    title: "Spot inspection red flags",
    body: "A cracked foundation, knob-and-tube wiring, a failing septic system on a rural acre. Listing photos are taken to sell the house. I walk it looking for what the photos left out.",
  },
  {
    title: "Coordinate the closing",
    body: "Lender, title company, inspector, appraiser, insurance, HOA docs. Seventeen moving pieces that all have to land inside the same two-week window, and I am the one keeping the calendar.",
  },
];

const SCENARIOS = [
  {
    title: "Buying land to build on",
    body: "Land is a different animal. Higher down payments, different loan programs, construction timelines layered on top. On acreage anywhere in Pierce, King, and the surrounding counties I look at the parcel, the septic feasibility, and the setbacks first, so when you sit down with a lender you already know what you are walking into.",
    link: "/contact",
  },
  {
    title: "Selling one home to buy the next",
    body: "Bridge loans, contingency timelines, two closings that have to land in the same window. I manage the moving pieces and hold the lender and the other agent to your timeline, so you move once and you move on your schedule.",
    link: "/contact",
  },
  {
    title: "Relocating to the Puget Sound",
    body: "Moving to Pierce, King, or one of the surrounding counties from somewhere else entirely. I match you to the right neighborhoods, run tours on video, and give you the honest version of the commute. If you need to sell where you are now, I have agents in other states I have checked out myself.",
    link: "/contact",
  },
  {
    title: "First-time buyer with a lot of questions",
    body: "Good. Ask all of them. Long answers are kind of my thing, because I would rather you understand the whole picture. We move at your pace, and every question gets a real answer.",
    link: tenant.listings.buyerQuestionnaireUrl,
  },
];

const PILLARS = [
  {
    title: "Education first, every time",
    body: "We move at your pace and you understand each step before we take it. I would rather give you too much information than leave you guessing, and you can always tell me to get to the point.",
  },
  {
    title: "I know these neighborhoods street by street",
    body: "Which streets flood, what a school district boundary really does to resale, why two blocks a quarter mile apart price differently. Fifteen years across Pierce, King, and the surrounding counties means I can tell you before you write the offer.",
  },
  {
    title: "I catch what other people miss",
    body: "Plumbing fixtures marked NA on an inspection when they should have been flagged. A showing system left on auto-accept when it should be manual. Details decide deals, and fifteen years of contract work taught me where to look.",
  },
  {
    title: "A network I have actually vetted",
    body: "Lenders, inspectors, contractors, attorneys. I check in with them first, confirm they are still active and still good, and then I make the introduction. If something is outside my lane, I know exactly who to hand you to.",
  },
];

const BUYER_FAQS = [
  {
    question: "Do I have to pay for buyer representation?",
    answer:
      "In Washington State, buyer agent compensation is negotiated as part of the transaction. I walk you through exactly how it works before you sign anything. In most cases the seller covers the buyer agent's commission, and recent industry changes make this worth a clear conversation up front.",
  },
  {
    question: "How well do you know the Puget Sound market?",
    answer:
      "Well enough to talk you out of a house. I grew up here, I am based here, and 270 closings across Pierce, King, and the surrounding counties means I have walked these neighborhoods through every market the region has had in fifteen years. I can tell you which pockets hold value, what an HOA actually covers, and how far a dollar goes from one town to the next.",
  },
  {
    question: "What happens if the appraisal comes in low?",
    answer:
      "A low appraisal leaves you several paths: renegotiate the price, cover an appraisal gap, or send additional comparable sales to the lender for a reconsideration of value. I plan for the possibility before the report lands, because by the time you are reading it you are already behind.",
  },
  {
    question: "Can you help if I am relocating from out of state?",
    answer:
      "Absolutely. I work with relocating buyers constantly: military families at JBLM, people coming up from California, folks moving back from the East Coast. Video tours, neighborhood research, compressed timelines. And if you need to sell where you are now, I have agents I trust in other states. I check in with them, make the introduction, and follow up to be sure it is working.",
  },
  {
    question: "How long does it take to find the right home?",
    answer:
      "It depends on your criteria and the market. Some buyers find it in two weeks, some take three months, and both are fine. Keep the faith; all you need is one, as long as it is the right one. On average my buyers are under contract within 45 days of starting their search.",
  },
  {
    question: "What if I need to sell and buy at the same time?",
    answer:
      "It is one of the most complex transactions in residential real estate: bridge loans, contingency timelines, two agents, two closings. I manage the lender relationship, hold the other agent to your timeline, and coordinate both sides. I have done this enough times to know the three places it usually breaks, and I plan around them.",
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
              <p className="eyebrow">For buyers in the Puget Sound</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Finding the house might be easy...
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                ...but I know how to get you from finding the house to closing
                on it. Inspections, appraisals, contracts, financing. After 270
                closings across Pierce, King, and the surrounding counties, I
                have seen it all and I know how to keep your deal together.
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
                  Let&apos;s talk
                </Link>
              </div>
              <p className="mt-6 text-sm text-neutral-500">
                {CREDENTIALS.join(" · ")}
              </p>
            </FadeIn>
            <FadeIn scaleIn className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-xl">
                <Image
                  src={tenant.media.lifestyle[0] ?? tenant.media.heroPrimary}
                  alt="Home exterior in the Puget Sound region of Washington"
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
              Every listing is online. Here is what happens after that.
            </h2>
            <p className="mt-6 text-lg text-white/80">
              You can find the house yourself, and most of my buyers do. So,
              honestly, the search is about five percent of this. The other
              ninety-five happens between mutual acceptance and the day you get
              keys, and that is the part I am here for.
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
            title="Real situations I walk buyers through."
          >
            <p>
              Every move is different. Here are four paths I run regularly across
              Pierce, King, and the surrounding counties.
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
            eyebrow="How I work"
            title="Four things that keep your deal together."
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
            <p className="eyebrow">Start wherever you like</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Still in the research phase? Perfect.
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Take the Real Estate IQ Quiz. Six real scenarios out of the Puget
              Sound market, and you will see how you would handle pricing,
              inspections, and negotiation. It takes about four minutes.
            </p>
            <div className="mt-8">
              <Link href="/quiz" className="btn-ghost min-h-[44px]">
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
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-moss)]">
                  Client story
                </p>
                <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                  A young couple wanted to buy raw land in Graham and build on
                  it. Different loan, different down payment, different timeline.
                  Before I connected them with a lender, I researched the
                  programs myself: what the down payment would run, how a
                  construction loan layers on top, whether a family
                  member&apos;s veteran status could help. Then I was straight
                  with them about the piece I did not know and sent them to
                  someone who did. Getting you a real answer from the right
                  person is the whole job.
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
              Questions buyers ask me first.
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
          Tell me what you are looking for and where you want to be. I will tell
          you what that market is actually doing this month, anywhere in Pierce,
          King, and the surrounding counties. Let&apos;s talk.
        </p>
      </ContactBlock>
    </>
  );
}
