import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant, type TenantTestimonial } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { ContactBlock } from "@/components/ContactBlock";
import { ServiceSchema } from "@/components/schema/ServiceSchema";

export const metadata: Metadata = {
  title: "Buy a home in the Puget Sound region",
  description:
    "Buyer representation across Pierce, King, and the surrounding counties from Becca Pitts: 270 closings, 15+ years in real estate in Washington, and SRES certification for senior moves.",
  alternates: { canonical: "/buyers" },
};

/*
 * LEAN PASS (2026-08-25). This page carried four invented systems: a
 * myth-busting grid, a scenario matrix, a four-pillar "how I work" band, a
 * signature story, and a six-question FAQ. Most of it described a way of
 * working nobody had confirmed, and the dark band rendered near-invisible type.
 * The page is now the three things that actually convert: Becca's face, the
 * reviews, and one clear questionnaire button. Everything else was cut.
 * Resist re-adding sections here; scenarios belong on the blog and the
 * neighbourhood pages.
 */

/*
 * Plain-text credential line rather than pill badges, which read as buttons to
 * anyone scanning and were not clickable. Sales figures use the agreed wording:
 * the twelve-month number is regional, the career number is Western Washington.
 */
const CREDENTIALS = [
  "SRES® Certified",
  "15+ years in real estate in Washington",
  "12 sales in the last 12 months across the Puget Sound region",
  "270 career total across Western Washington",
];

/*
 * Selected by name rather than pasted, so the quotes stay verbatim and stay in
 * sync with the review set in tenant.ts. All three are buyer-side reviews under
 * the reviewer's real name: a first-time buyer, a move-up buyer, and a short
 * one that reads fast. The card deliberately drops `location`, because this
 * page names counties and regions and never individual towns.
 */
const BUYER_REVIEW_NAMES = ["Bryanna Michele", "Rebecca McKee", "Brendan Dudley"];

const BUYER_REVIEWS = BUYER_REVIEW_NAMES.map((name) =>
  tenant.testimonials.find((t) => t.name === name),
).filter((t): t is TenantTestimonial => Boolean(t));

export default function BuyersPage() {
  return (
    <>
      <ServiceSchema name="Buyer representation" serviceType="Real estate buyer's agent" />

      {/* Hero. Becca's face, the hook headline, one paragraph, one button. */}
      <section className="bg-[var(--color-surface)]">
        <Container className="pt-16 pb-16 lg:pt-24 lg:pb-24">
          <div className="grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow">For buyers in the Puget Sound</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Finding the house might be easy...
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600 md:text-xl">
                ...and honestly, the search is about five percent of this. Most
                of my buyers find the house themselves. The other ninety-five
                percent happens between mutual acceptance and the day you get
                keys: inspections, appraisals, contracts, financing, and a
                dozen moving pieces that all have to land inside the same two
                weeks. That part is why you hire me. After 270 closings across
                Western Washington, I know where a deal breaks and how to keep
                yours together.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={tenant.listings.buyerQuestionnaireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Take the Buyer Questionnaire
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <Link href="/contact" className="btn-ghost">
                  Let&apos;s talk
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

      {/* Senior transitions. Becca's specialty, so it gets its own band, a gold
          border, and a soft gold wash. The badge is filled rather than gold
          type: the deep gold is too light to read at eyebrow size, so the
          colour lives in the border and the fill and the words stay dark. */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="rounded-2xl border-2 border-[var(--color-sunshine)] bg-[#FEF9EF] p-8 shadow-[0_2px_18px_rgba(217,154,43,0.18)] md:p-12">
              <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-sunshine)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]">
                Where I specialize
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
                Senior transitions
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700 md:text-lg">
                Should we age in place, or is it time to move to a smaller house
                or an adult living facility? It is one of the hardest
                conversations a family has, and it usually shows up with a
                deadline attached. I am SRES certified, and this is the work I
                care about most. I will lay out what each option really costs
                and really takes, bring in the people who handle the pieces I do
                not, and give your whole family the room to make a decision this
                big.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Talk through the options
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonials. Balanced with CSS columns so a long review and a short
          one can sit side by side without stretching a grid row. */}
      <section className="surface-warm py-16 md:py-20">
        <Container>
          <FadeIn className="max-w-2xl">
            <p className="eyebrow">What buyers say</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              The reviews are the pitch.
            </h2>
          </FadeIn>

          <FadeInStagger className="mt-10 gap-6 md:columns-2 lg:columns-3">
            {BUYER_REVIEWS.map((t) => (
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

      {/* Quiz. The soft funnel for anyone who is not ready to fill out a form. */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Not ready to fill out a questionnaire?
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

      {/* Neighborhoods. One line and a link. Town names live over there. */}
      <section className="surface-warm py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-2xl border border-black/5 bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Browse the area
              </h2>
              <p className="mt-2 text-base text-neutral-600">
                Guides to the towns and communities across Pierce, King, and the
                surrounding counties.
              </p>
            </div>
            <Link href="/neighborhoods" className="btn-ghost shrink-0">
              See neighborhoods
            </Link>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Ready to find your home?">
        <p>
          Tell me what you are looking for and where you want to be. I will tell
          you what that market is actually doing this month, anywhere in Pierce,
          King, and the surrounding counties.
        </p>
      </ContactBlock>
    </>
  );
}
