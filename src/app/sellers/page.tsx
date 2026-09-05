import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant, type TenantTestimonial } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { ContactBlock } from "@/components/ContactBlock";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";
import { StatCardRow } from "@/components/sections/StatCardRow";

export const metadata: Metadata = {
  title: "Sell your home in the Puget Sound region",
  description:
    "Your home can sell exactly the way it sits today. Price, positioning, and marketing are what move a house. Becca Pitts: licensed in Washington since 2010, 270 closings across Western Washington, SRES® certified.",
  alternates: { canonical: "/sellers" },
};

/*
 * LEAN PASS (2026-08-27, Brett and Becca). This page had accumulated four
 * invented structures: a seller fear list, an "old way versus how I list"
 * comparison, numbered system steps, a prep-spectrum grid, two case studies,
 * and an eight-question FAQ. All of it is gone.
 *
 * The fear list went for being false on its face. It claimed nobody says those
 * worries out loud (sellers say them constantly), that every seller thinks
 * them (they do not), and that each one has an answer (some of these decisions
 * are emotional and do not have one). The comparison grid went because most of
 * the "old way" column was a strawman and the other column described a way of
 * working nobody had confirmed. It was also X-not-Y framing, which Becca does
 * not use.
 *
 * What is left is the path to conversion and nothing else: see Becca, read the
 * message, see the numbers, see the specialty, read the reviews, fill out the
 * questionnaire. Resist re-adding sections here.
 *
 * Geography stays at region and county level. No town names on this page.
 */

/*
 * Plain-text credential line rather than pill badges, which read as buttons to
 * anyone scanning and were not clickable. Same wording as the buyers page: the
 * twelve-month number is regional, the career number is Western Washington.
 */
const CREDENTIALS = [
  "SRES® Certified",
  "Licensed in Washington since 2010",
  "12 sales in the last 12 months across Puget Sound",
  "270 career total across Western Washington",
];

/*
 * Selected by name rather than pasted, so the quotes stay verbatim and stay in
 * sync with the review set in tenant.ts. All four are seller-side. "Liw2" is a
 * Zillow handle rather than a real name and stays anyway, because that review
 * is the clearest proof on the site of what pricing to move actually does. The
 * card drops `location`, because this page names regions and never towns.
 */
const SELLER_REVIEW_NAMES = ["Liw2", "Jen Schumacher", "Carl", "Autumn Starr"];

const SELLER_REVIEWS = SELLER_REVIEW_NAMES.map((name) =>
  tenant.testimonials.find((t) => t.name === name),
).filter((t): t is TenantTestimonial => Boolean(t));

export default function SellersPage() {
  return (
    <>
      <ServiceSchema
        name="Seller representation"
        serviceType="Real estate seller's agent"
        description="Listing and seller representation across Pierce, King, and the surrounding Washington counties. Pricing, positioning, marketing, and negotiation from an agent licensed since 2010 with 270 closings and SRES® certification for senior and estate sales."
      />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Sellers", url: "/sellers" },
        ]}
      />

      {/* Hero. Becca's face, the message, one paragraph, the questionnaire. */}
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
                and both of them sold. What moves a house is price, positioning,
                and marketing: the right number, aimed at the right buyer, told
                the right way. Improvements are a choice you get to make based on
                what you can actually spend, and I&apos;ll be honest with you
                about which ones earn their money back. That&apos;s the whole
                first conversation, and it costs you nothing.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={tenant.listings.sellerQuestionnaireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Take the Seller Questionnaire
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <Link href="/contact" className="btn-ghost">
                  Let&apos;s have a conversation
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

      {/* Stats. Three of them, kept short so every line holds. */}
      <StatCardRow stats={tenant.resultsStats} eyebrow="The receipts" />

      {/* Senior transitions. Becca's specialty, so it gets its own band, a gold
          border, and a soft gold wash. The label is plain uppercase text on the
          wash rather than a filled rounded badge: site-wide rule, a rounded
          filled container around a label reads as a button and nothing that is
          not a control should look like one. Gold ranks exactly one thing per
          page, and this is it. */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="rounded-2xl border-2 border-[var(--color-sunshine)] bg-[#FEF9EF] p-8 shadow-[0_2px_18px_rgba(217,154,43,0.18)] md:p-12">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]">
                Where I specialize
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold md:text-4xl">
                Senior transitions
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700 md:text-lg">
                Should Mom stay in the house, or is it time for something
                smaller, or time for care? It is one of the hardest
                conversations a family has, and it almost always shows up with a
                deadline attached. I am SRES® certified, and this is the work I
                care about most, for reasons that go back to my own family. I
                will tell you what each option really costs and really takes,
                tell you honestly what the house would bring today and what it
                would bring with work, bring in the people who handle the pieces
                I do not, and give everybody at the table the room to make a
                decision this big.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Let&apos;s have a conversation
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
            <p className="eyebrow">What sellers say</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              The reviews are the pitch.
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

      {/* Quiz. The soft funnel for anyone who is not ready to fill out a form. */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Not ready to fill out a questionnaire?
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Take the Real Estate IQ Quiz and see where you stand. Six real
              scenarios out of this market, and you will see how you would handle
              pricing, inspections, and negotiation. It takes about four minutes.
            </p>
            <div className="mt-8">
              <Link href="/quiz" className="btn-ghost min-h-[44px]">
                Take the quiz
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Let's have a conversation.">
        <p>
          Twenty minutes on the phone and I&apos;ll walk you through your comps,
          your timeline, and what it would take to sell this house in the shape
          it&apos;s in today. Nothing to fix before that call, and nothing to
          sign at the end of it.
        </p>
      </ContactBlock>
    </>
  );
}
