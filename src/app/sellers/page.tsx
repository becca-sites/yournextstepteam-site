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
  title: "Sell your home in Bonney Lake, Puyallup, North Tacoma, or Eatonville",
  description:
    "List with Becca Pitts: 270 closings, 15+ years in real estate in Washington, and pricing built on Pierce County comps. Bonney Lake, Puyallup, North Tacoma, and Eatonville sellers.",
  alternates: { canonical: "/sellers" },
};

/*
 * Plain-text credential line. Formerly rounded pill badges, which looked like
 * buttons without being clickable.
 */
const CREDENTIALS = [
  "SRES® Certified",
  "15+ years in real estate in Washington",
  "270 closings",
  "eXp Icon Agent, 2022",
];

const FEARS = [
  "Pricing the home wrong and leaving tens of thousands on the table",
  "Trusting the wrong agent and getting stuck in a six-month listing",
  "Accepting the first offer while wondering what the market would have paid",
  "Watching the house sit for weeks while three neighbors sell in days",
  "Letting thirty years of memories drive a decision that needs a spreadsheet",
];

const OLD_WAY = [
  "A Zestimate used as a pricing strategy",
  "Thirty photos shot on the agent's phone",
  "A sign in the yard and a hope",
  "A generic open house with no follow-up",
  "Settling at the first offer that shows up",
];

const YNSH_SYSTEM = [
  "A full CMA built on comps within a mile of you",
  "Professional photography, video, and twilight exteriors",
  "Targeted digital marketing plus my Pierce County agent network",
  "Qualified buyer previews before showing day",
  "A negotiation strategy written for each offer that lands",
];

const SYSTEM = [
  {
    title: "A real walk-through, before we talk price",
    body: "Pricing starts with seeing the home. We walk every room together, I note what is working and what is holding the home back, and I build a clear path from where you are today to listing day.",
  },
  {
    title: "Pricing built from the comps on your block",
    body: "Bonney Lake, Puyallup, North Tacoma, and Eatonville price differently, and so do pockets inside each of them. I pull closed sales within a mile, adjust for condition, layout, and lot, and show you the reasoning behind the number.",
  },
  {
    title: "Stay-or-sell evaluation",
    body: "Weighing whether to modify the home or move? I walk it with the family, price out the modifications against what selling and relocating looks like, and lay both paths side by side so you can choose with real numbers in hand.",
  },
  {
    title: "Estate and trust coordination",
    body: "Estate sales, trust sales, and transitions after a loss all run on a legal timeline. I work directly with the family's attorney and keep the real estate side lined up with it.",
  },
  {
    title: "Prep, light staging, and real photography",
    body: "Most homes need somewhere between a deep clean and a few weeks of styling. We make those calls together, and I bring in trusted partners when the math earns the spend. Then: cinematic stills, twilight exteriors, drone for the right lots, and a walkthrough video buyers actually finish.",
  },
  {
    title: "Negotiation that holds the line",
    body: "Fifteen years of contract negotiations across Pierce County. The edge is rapport with the other agent plus the discipline to know when to push and when to sit still.",
  },
];

const CASE_STUDIES = [
  {
    tag: "Tacoma green belt listing",
    situation:
      "A young couple selling their first home, a Tacoma property ringed by green belt on all sides. Nothing but green out every window. That is rare inside the city, and buyers needed to feel it rather than read about it.",
    approach:
      "I shot the listing video myself. Missed the fenced backyard in the first cut and re-shot it, because that detail sells this house. We priced off neighborhood comps and had two showings in the first week. When a buyer came back with their spouse for a second look, I knew we had real interest. Offer came in, we went mutual, and I caught an inspection error the other agent missed: plumbing fixtures marked NA when they should have been flagged.",
    result:
      "Under contract with a contractor credit negotiated, appraisal ordered, clean close. The sellers texted me 'You ARE amazing!!!' and I meant it when I said it right back.",
  },
  {
    tag: "The most challenging client I have ever had",
    situation:
      "A seller in the Tehaleh area who needed daily communication, last-minute changes, and a lot of patience. The kind of client some agents hand off. I am not some agents.",
    approach:
      "We talked almost every day. I set expectations on closing timelines down to the hour ('could happen as early as 9 AM or as late as 5 PM') and explained exactly when proceeds would hit her account. After closing I went back to the house to help load furniture, retrieve forgotten items from the new owners, spray the carpets, and coordinate storage. My fee for that part was one chocolate.",
    result:
      "Home sold and closed. She went from my most challenging client to one of my most loyal. We still text. She sends me memes. That is what happens when you stay with people through the hard part.",
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
              <p className="eyebrow">For sellers in Pierce County</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Your house is worth what this block says it is worth.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                So I price it off closed sales within a mile of you. Bonney
                Lake, Puyallup, North Tacoma, Eatonville: 270 closings across
                Pierce County means I know what your street is doing this month,
                and I can tell you which repairs earn their money back before we
                photograph a thing.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Let&apos;s talk
                </Link>
                <Link href="/home-value" className="btn-ghost">
                  Get your home value
                </Link>
              </div>
              <p className="mt-6 text-sm text-neutral-500">
                {CREDENTIALS.join(" · ")}
              </p>
            </FadeIn>
            <FadeIn scaleIn className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-xl">
                <Image
                  src={tenant.media.lifestyle[1] ?? tenant.media.heroPrimary}
                  alt={`Home in ${tenant.market.city}, Washington`}
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
        heading="Becca Pitts: 270 closings across Western Washington"
      />

      {/* PAS Fear Copy */}
      <section className="bg-[var(--color-primary)] py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              The real conversation
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              What sellers are actually worried about.
            </h2>
            <p className="mt-6 text-lg text-white/80">
              Nobody says these out loud at the first meeting. Every seller
              thinks them. So let&apos;s put them on the table, because each one
              has an answer.
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
                That is what experience buys you. A process for each one.
              </p>
              <p className="mt-3 text-base text-white/70">
                Fifteen years working these exact worries across Bonney Lake,
                Puyallup, North Tacoma, and Eatonville. Every one of them has a
                process behind it, and that process is what you are hiring.
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
              title="The old way versus the way I list a home."
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
                  How I do it
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
            title="The whole system, included in the listing."
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
              Two listings, start to finish.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-8 md:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <FadeIn key={study.tag}>
                <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-moss)]">
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
            <p className="eyebrow">Start wherever you like</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Still thinking it over? Perfect.
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Take the Real Estate IQ Quiz. Six real scenarios out of the Pierce
              County market, and you will see how you would handle pricing,
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

      {/* FAQ */}
      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="eyebrow">Seller FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Questions Pierce County sellers ask me first.
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

      <ContactBlock heading="Curious what your home would bring right now?">
        <p>
          Twenty minutes on the phone and I will walk you through your comps,
          your timeline, and what your street is actually doing. Let&apos;s talk.
        </p>
      </ContactBlock>
    </>
  );
}
