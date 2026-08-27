import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant, type TenantTestimonial } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { ContactBlock } from "@/components/ContactBlock";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { FAQSchema } from "@/components/schema/FAQSchema";
import { StatCardRow } from "@/components/sections/StatCardRow";

export const metadata: Metadata = {
  title: "Sell your home in the Puget Sound region",
  description:
    "Every home can sell, whatever shape it is in. Becca Pitts prices and positions listings across Pierce, King, and the surrounding counties: 270 closings and 15+ years in real estate in Washington.",
  alternates: { canonical: "/sellers" },
};

/*
 * MESSAGE REWRITE (2026-08-27). The old page ran on invented process: a
 * five-item fear list, an "old way versus my way" comparison grid, and six
 * numbered system cards nobody had confirmed. All of it is gone.
 *
 * The page now says one thing: every home can sell whatever condition it is
 * in, because price and positioning are what move a house. Prep is a spectrum
 * a seller picks their spot on, sized to budget, time, and bandwidth. Keep
 * that the spine. If a new section does not serve it, it does not belong.
 *
 * Geography stays broad here: "the Puget Sound region" or "Pierce, King, and
 * the surrounding counties." Town names belong on the neighborhood pages.
 */

/*
 * Plain-text credential line, matching the buyers page wording exactly. The
 * twelve-month number is regional, the career number is Western Washington.
 */
const CREDENTIALS = [
  "SRES® Certified",
  "15+ years in real estate in Washington",
  "12 sales in the last 12 months across the Puget Sound region",
  "270 career total across Western Washington",
];

/*
 * The three constraints that decide how much prep a seller takes on. Becca's
 * own framing, so it stays in her words.
 */
const CONSTRAINTS = [
  {
    title: "Budget",
    body: "Some sellers have cash to put in ahead of listing. Plenty do not, and that is completely okay. I have sold homes where the whole prep budget was a gallon of paint and a rented pressure washer.",
  },
  {
    title: "Time",
    body: "A remodel takes months. A job transfer, a closing date on the next house, or a family situation can take that runway away. Tell me the deadline and I will build the plan backward from it.",
  },
  {
    title: "Bandwidth",
    body: "Sometimes you have the money and the time and you are still carrying too much right now to manage contractors. That is a real constraint, and I would rather hear it up front than watch a project stall in week three.",
  },
];

/*
 * How Becca actually works a listing, in her words. Four steps, no invented
 * proprietary system.
 */
const APPROACH = [
  {
    title: "I walk the home before we talk about a number",
    body: "I want to see it as it sits. Not staged, not cleaned up for me. I will tell you what a buyer notices in the first thirty seconds and what they walk right past, and that walk-through is where the whole plan starts.",
  },
  {
    title: "We put your real constraints on the table",
    body: "Budget, time, bandwidth. I build around what you actually have, so you never end up holding a plan that needs money you were never going to spend or a Saturday you were never going to get back.",
  },
  {
    title: "I only recommend what earns its money back",
    body: "There is a short list of improvements that reliably return more than they cost, and a much longer list that quietly does not. After 270 closings I know which is which. Part of my job is helping you decide how many worms to let out of the can, because some projects open three more behind them.",
  },
  {
    title: "Then I price it and position it",
    body: "The number comes from closed sales near you, adjusted for condition, layout, and lot. The marketing gets built for the buyer most likely to want this specific house in this specific condition. That is the part that sells it.",
  },
];

/*
 * Selected by name rather than pasted, so the quotes stay verbatim and stay in
 * sync with the review set in tenant.ts. All four are seller-side. "Liw2" is a
 * Zillow handle rather than a real name, and it stays because that review is
 * the clearest proof on the site of what pricing to move actually does.
 */
const SELLER_REVIEW_NAMES = ["Liw2", "Jen Schumacher", "Carl", "Autumn Starr"];

const SELLER_REVIEWS = SELLER_REVIEW_NAMES.map((name) =>
  tenant.testimonials.find((t) => t.name === name),
).filter((t): t is TenantTestimonial => Boolean(t));

/*
 * Two real listings. Locations are described rather than named, same rule as
 * the rest of this page.
 */
const CASE_STUDIES = [
  {
    tag: "Positioning: a first home ringed by green belt",
    situation:
      "A young couple selling their first home, a property with green belt on every side. Nothing but green out every window. That is rare this close in, and buyers needed to feel it rather than read about it.",
    approach:
      "I shot the listing video myself. Missed the fenced backyard in the first cut and re-shot it, because that detail sells this house. We priced off neighborhood comps and had two showings in the first week. When a buyer came back with their spouse for a second look, I knew we had real interest. Offer came in, we went mutual, and I caught an inspection error the other agent missed: plumbing fixtures marked NA when they should have been flagged.",
    result:
      "Under contract with a contractor credit negotiated, appraisal ordered, clean close. The sellers texted me that I was amazing, and I meant it when I said it right back.",
  },
  {
    tag: "The most challenging client I have ever had",
    situation:
      "A seller who needed daily communication, last-minute changes, and a lot of patience. The kind of client some agents hand off. I am not some agents.",
    approach:
      "We talked almost every day. I set expectations on closing timelines down to the hour, as early as 9 AM or as late as 5 PM, and explained exactly when proceeds would hit her account. After closing I went back to the house to help load furniture, retrieve forgotten items from the new owners, spray the carpets, and coordinate storage. My fee for that part was one chocolate.",
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

      {/* Hero. Becca's face, the promise, one paragraph, two buttons. */}
      <section className="bg-[var(--color-surface)]">
        <Container className="pt-16 pb-16 lg:pt-24 lg:pb-24">
          <div className="grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow">For sellers in the Puget Sound</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Your home can sell exactly the way it sits today.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                So let&apos;s start there, because I think it&apos;s the part
                nobody tells sellers. I&apos;ve listed homes fresh off a full
                remodel and homes that hadn&apos;t been touched in forty years,
                and both of them sold. What moves a house is price and
                positioning: the right number, aimed at the right buyer, told
                the right way. Everything else is a choice you get to make based
                on what you can actually spend.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Let&apos;s talk
                </Link>
                <Link href="/home-value" className="btn-ghost">
                  Get your home value
                </Link>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-500">
                {CREDENTIALS.join(" · ")}
              </p>
            </FadeIn>

            <FadeIn scaleIn className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-neutral-200 shadow-xl lg:max-w-none">
                <Image
                  src={tenant.agent.headshot}
                  alt={`${tenant.agent.name}, ${tenant.agent.title}`}
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
        heading="270 closings across Western Washington"
      />

      {/* The core message. Gold band, because this is the one thing on the page
          worth ranking above everything else. Same treatment senior transitions
          gets on the buyers page: gold border, gold badge fill, dark type. */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="rounded-2xl border-2 border-[var(--color-sunshine)] bg-[#FEF9EF] p-8 shadow-[0_2px_18px_rgba(217,154,43,0.18)] md:p-12">
              <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-sunshine)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]">
                Where the magic is
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
                Price and positioning
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700 md:text-lg">
                This is what actually sells a house. Price tells the market how
                to read your home before anyone walks through the door, and
                positioning decides who shows up at all. Get those two right and
                condition becomes something buyers work around. Get them wrong
                and the prettiest house on the block sits for six weeks while
                everybody wonders why. Honestly, this is where fifteen years of
                doing this earns its keep, and it&apos;s the part of the job I
                love most.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Talk through your options
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Prep is a spectrum */}
      <section className="surface-warm py-16 md:py-20">
        <Container>
          <FadeIn>
            <SectionIntro
              eyebrow="Getting ready to list"
              title="Prep is a spectrum, and you pick where you land on it."
            >
              <p>
                On one end it&apos;s fresh paint on the front door and a good
                pressure wash. On the other it&apos;s a full remodel. Most
                sellers land somewhere in between, and where you land comes down
                to three things.
              </p>
            </SectionIntro>
          </FadeIn>

          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-3">
            {CONSTRAINTS.map((item) => (
              <FadeIn key={item.title}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-7">
                  <h3 className="font-display text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>

          <FadeIn className="mx-auto mt-10 max-w-3xl rounded-2xl border border-black/5 bg-white p-8">
            <p className="text-lg font-medium text-neutral-950">
              Every one of those is workable, and none of them is a reason to
              wait.
            </p>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              Tell me which one you&apos;re up against and I&apos;ll size the
              plan to fit it. If the answer is that you want to list it as it
              sits and go, I can absolutely do that, and I&apos;ll price and
              market it so that decision works in your favor.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* How I work it */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn>
            <SectionIntro
              eyebrow="How I work a listing"
              title="Assess it, size it to you, spend only where it pays."
            />
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
            {APPROACH.map((card, i) => (
              <FadeIn key={card.title}>
                <div className="h-full rounded-2xl border border-black/5 bg-[var(--color-surface)] p-7">
                  <p className="font-mono text-xs tracking-widest text-[var(--color-moss)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    {card.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
          <FadeIn className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-base leading-relaxed text-neutral-600">
              I can&apos;t promise you that selling a home is easy. Some of them
              are really, really hard. What I can promise is that I&apos;ll be
              strategic about it and honest with you about what matters and what
              is just going to cost you money.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonials. CSS columns so a long review and a short one can sit
          side by side without stretching a grid row. */}
      <section className="surface-warm py-16 md:py-20">
        <Container>
          <FadeIn className="max-w-2xl">
            <p className="eyebrow">What sellers say</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Ask the people whose houses I sold.
            </h2>
          </FadeIn>

          <FadeInStagger className="mt-10 gap-6 md:columns-2 lg:columns-3">
            {SELLER_REVIEWS.map((t) => (
              <FadeIn key={t.name} className="mb-6 break-inside-avoid">
                <figure className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm">
                  <blockquote className="text-base leading-relaxed text-neutral-700">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-black/10 pt-4 text-sm">
                    <span className="font-semibold text-neutral-950">
                      {t.name}
                    </span>
                    {t.source && (
                      <span className="text-neutral-500">
                        {" "}
                        &middot; {t.source} review
                      </span>
                    )}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="bg-white py-16 md:py-20">
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

      {/* Quiz. The soft funnel for anyone who is not ready to call yet. */}
      <section className="surface-warm py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Start wherever you like</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
              Still thinking it over? Perfect.
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Take the Real Estate IQ Quiz. Six real scenarios out of this
              market, and you will see how you would handle pricing,
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
      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="eyebrow">Seller FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Questions sellers ask me first.
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
          Twenty minutes on the phone and I&apos;ll walk you through your comps,
          your timeline, and what it would take to sell this house in the shape
          it&apos;s in today. Nothing to fix before that call.
        </p>
      </ContactBlock>
    </>
  );
}
