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
import { StatCardRow } from "@/components/sections/StatCardRow";

export const metadata: Metadata = {
  title: `Sell a home in ${tenant.market.city}`,
  description: `Senior downsizing, estate transitions, and aging-in-place evaluations with ${tenant.agent.name} across the ${tenant.market.primaryArea}.`,
  alternates: { canonical: "/sellers" },
};

const CREDENTIALS = [
  "SRES Certified",
  "15+ Years in WA",
  "270 Closings",
  "Senior Care Background",
];

const FEARS = [
  "Pricing the home wrong and leaving tens of thousands on the table",
  "Trusting the wrong agent and getting stuck in a six-month listing",
  "Accepting the first offer without knowing what the market will actually bear",
  "Watching the house sit for weeks while neighbors sell in days",
  "Letting emotional attachment cloud the decisions that matter most",
];

const OLD_WAY = [
  "Zestimate as a pricing strategy",
  "30 photos from the agent's phone",
  "Sign in the yard and hope",
  "Generic open house with no follow-up",
  "Settlement at the first offer",
];

const YNSH_SYSTEM = [
  "Full CMA with neighborhood-level data",
  "Professional photography, video, and twilight exteriors",
  "Targeted digital and network marketing",
  "Qualified buyer previews before showing day",
  "Negotiation strategy for every offer",
];

const SYSTEM = [
  {
    title: "A real walk-through, before we talk price",
    body: "Pricing starts with seeing the home. We walk every room together, note what is working and what is holding the home back, and build a clear path from where you are now to listing day.",
  },
  {
    title: "Aging-in-place or sell evaluation",
    body: "Not sure whether to stay or go? We walk the home with the family, price out modifications versus selling, and lay both paths side by side. No pressure toward either outcome.",
  },
  {
    title: "Estate and trust coordination",
    body: "Estate sales, trust sales, and transitions after a loss all involve legal coordination. We work directly with the family's attorney to keep the real estate timeline aligned.",
  },
  {
    title: "Prep and light staging",
    body: "Most homes need somewhere between a deep clean and a few weeks of light styling. We make the calls together and bring in trusted partners only when the math earns the spend.",
  },
  {
    title: "Real photography and video",
    body: "Cinematic stills, twilight exteriors when the home earns them, drone for the right lots, and a walkthrough video that buyers actually watch.",
  },
  {
    title: "Negotiation that holds the line",
    body: "Fifteen years of contract negotiations. The edge is communication and rapport with the other agent, plus the discipline to know when to push and when to hold.",
  },
];

const CASE_STUDIES = [
  {
    tag: "Tacoma green belt listing",
    situation:
      "A young couple selling their first home — a property in Tacoma surrounded by green belt on all sides. Nothing but green out every window. That is a rare thing in the city, and we needed to make sure buyers felt it, not just read about it.",
    approach:
      "I shot a custom listing video myself. Missed the fenced backyard in the first cut and re-shot it because that detail matters. We priced using neighborhood comps and got two showings in the first week. When a buyer came back with their spouse for a second look, we knew we had real interest. Offer came in, we went mutual, and I caught an inspection error the other agent missed — plumbing fixtures marked NA when they should not have been.",
    result:
      "Under contract with a contractor credit negotiated. Appraisal ordered and on track for a clean close. The sellers texted me 'You ARE amazing!!!' — and I meant it when I said it right back.",
  },
  {
    tag: "The most challenging client I have ever had",
    situation:
      "A seller in the Tehaleh area who needed constant communication, last-minute changes, and a lot of patience. The kind of client some agents would have walked away from. I am not some agents.",
    approach:
      "We talked almost daily. I set expectations on closing timelines down to the hour — 'could happen as early as 9 AM or as late as 5 PM' — and explained when proceeds would hit. After closing, I went back to the house to help load furniture, retrieve forgotten items from the new owners, spray the carpets, and coordinate storage. For the fee of one chocolate.",
    result:
      "Home sold and closed. She went from my most challenging client to one of my most loyal. We still text. She sends me memes. That is what happens when you do not give up on people.",
  },
];

const FAQS = tenant.faqs;

export default function SellersPage() {
  return (
    <>
      <ServiceSchema name="Seller representation" serviceType="Real estate seller's agent" />
      <FAQSchema items={FAQS} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-surface)]">
        <Container className="pt-16 pb-12 lg:pt-24 lg:pb-20">
          <div className="grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow">For sellers</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Selling a home you have lived in for decades is not just a
                transaction.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                It is a family decision. Downsizing, estate transitions, and
                aging-in-place evaluations handled with patience, a clear plan,
                and someone who has done this before.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Book a listing consultation
                </Link>
                <Link href="/your-best-season/the-downsizing-decision" className="btn-ghost">
                  Watch: The Downsizing Decision
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
                  src={tenant.media.lifestyle[1] ?? tenant.media.heroPrimary}
                  alt={`${tenant.market.city} home`}
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

      {/* Stats */}
      <StatCardRow
        stats={tenant.resultsStats}
        eyebrow="The receipts"
        heading={`What ${tenant.agent.yearsOfExperience} years in the ${tenant.market.state} market looks like.`}
      />

      {/* PAS Fear Copy */}
      <section className="bg-[var(--color-primary)] py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              The real conversation
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              What sellers are really afraid of.
            </h2>
            <p className="mt-6 text-lg text-white/80">
              Nobody says these things out loud in the first meeting. But every
              seller thinks them. And pretending they do not exist is how deals
              go sideways.
            </p>
            <div className="mt-10 space-y-4">
              {FEARS.map((fear) => (
                <div key={fear} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="mt-1 h-4 w-4 shrink-0 text-red-400"
                    aria-hidden="true"
                  >
                    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                  <p className="text-base text-white/90">{fear}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-7">
              <p className="text-lg font-medium text-white">
                That is what experience is for. Not a speech. A system.
              </p>
              <p className="mt-3 text-base text-white/70">
                Fifteen years of navigating these exact fears across{" "}
                {tenant.market.primaryArea}. Every one of them has a process
                behind it. That is what you are hiring.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Old Way vs YNSH System */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn>
            <SectionIntro
              eyebrow="Side by side"
              title="The old way versus the YNSH system."
            />
          </FadeIn>
          <FadeIn className="mt-12 mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-red-200/60 bg-red-50/30 p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-800/60">
                  The old way
                </p>
                <div className="mt-5 space-y-4">
                  {OLD_WAY.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                        aria-hidden="true"
                      >
                        <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
                      </svg>
                      <p className="text-sm text-neutral-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--color-moss)]/20 bg-[var(--color-moss)]/5 p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-moss)]">
                  The YNSH system
                </p>
                <div className="mt-5 space-y-4">
                  {YNSH_SYSTEM.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-moss)]"
                        aria-hidden="true"
                      >
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                      </svg>
                      <p className="text-sm text-neutral-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Numbered Service Blocks */}
      <section className="surface-warm py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="What you get"
            title="The full system, included."
          />
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEM.map((card, i) => (
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

      {/* Case Studies */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn>
            <p className="eyebrow">From the field</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              Real results from real transitions.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-8 md:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <FadeIn key={study.tag}>
                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-7">
                  <p className="inline-block rounded-full bg-[var(--color-moss)]/10 px-3 py-1 text-xs font-medium text-[var(--color-moss)]">
                    {study.tag}
                  </p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                        Situation
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                        {study.situation}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                        Approach
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                        {study.approach}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                        Result
                      </p>
                      <p className="mt-1.5 text-sm font-medium leading-relaxed text-neutral-800">
                        {study.result}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
          <p className="mt-6 text-center text-xs text-neutral-400">
            Names and details changed for privacy.
          </p>
        </Container>
      </section>

      {/* Quiz Soft CTA */}
      <section className="surface-warm py-20 md:py-24">
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

      {/* FAQ */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="eyebrow">Seller FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Questions sellers ask first.
            </h2>
            <div className="mt-10 divide-y divide-black/10 rounded-2xl border border-black/5 bg-[var(--color-surface)]">
              {FAQS.map((faq) => (
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

      <ContactBlock heading="Ready to talk through what your home is worth?">
        <p>
          Twenty minutes on the phone, no pressure. A real conversation about
          your home, your timeline, and what the next step looks like.
        </p>
      </ContactBlock>
    </>
  );
}
