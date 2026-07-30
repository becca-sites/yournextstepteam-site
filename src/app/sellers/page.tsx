import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";
import { SectionIntro } from "@/components/SectionIntro";
import { ContactBlock } from "@/components/ContactBlock";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { StatCardRow } from "@/components/sections/StatCardRow";

export const metadata: Metadata = {
  title: `Sell a home in ${tenant.market.city}`,
  description: `Senior downsizing, estate transitions, and aging-in-place evaluations with ${tenant.agent.name} across the ${tenant.market.primaryArea}.`,
  alternates: { canonical: "/sellers" },
};

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
    body: "Twelve years of contract negotiations. The edge is communication and rapport with the other agent, plus the discipline to know when to push and when to hold.",
  },
];

const FAQS = tenant.faqs;

export default function SellersPage() {
  return (
    <>
      <ServiceSchema name="Seller representation" serviceType="Real estate seller's agent" />

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

      <StatCardRow
        stats={tenant.resultsStats}
        eyebrow="The receipts"
        heading={`What ${tenant.agent.yearsOfExperience} years in the ${tenant.market.state} market looks like.`}
      />

      <section className="bg-white py-20 md:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-4xl">
            <p className="eyebrow">What sellers are really thinking about</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
              This is not just about the house.
            </h2>
            <div className="mt-6 space-y-5 text-lg text-neutral-600">
              <p>
                It is about the dining room where every Thanksgiving happened.
                The marks on the door frame from the kids growing up. The garden
                your spouse planted the year you moved in.
              </p>
              <p>
                Selling a home with decades of life in it takes someone who
                understands that the logistics and the emotions are not separate
                things. They are the same thing. And the process needs to honor
                both.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="surface-warm py-20 md:py-24">
        <Container>
          <SectionIntro
            eyebrow="What you get"
            title="The full system, included."
          />
          <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <FadeIn className="mx-auto max-w-4xl">
            <p className="eyebrow">Seller FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Questions sellers ask first.
            </h2>
            <div className="mt-10 divide-y divide-black/10 rounded-2xl border border-black/5 bg-[var(--color-surface)]">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group px-6 py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-display text-lg font-semibold">
                    {faq.question}
                    <span aria-hidden="true" className="text-2xl text-neutral-600 transition group-open:rotate-45">
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
