import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { FinalCtaBlock } from "@/components/sections/FinalCtaBlock";
import { ValuationWidget } from "@/components/valuation/ValuationWidget";

export const metadata: Metadata = {
  title: "What is my home worth",
  description:
    "Instant home value estimate for Bonney Lake, Puyallup, North Tacoma, Eatonville, and the rest of Pierce County, refined by hand into a real CMA within 24 hours.",
  alternates: { canonical: "/home-value" },
};

const STEPS = [
  {
    title: "Enter your address",
    body: "One field, and you are done. The instant estimate comes from public records, recent comparable sales, and current market data.",
  },
  {
    title: "Get a personalized CMA",
    body: "I review the estimate myself, run a true comparative market analysis against closed sales near you, and send a refined number within 24 hours.",
  },
  {
    title: "Decide what comes next",
    body: "Some sellers list within a month, some plan a year out, and some just wanted the number. It is yours to use however you like.",
  },
];

export default function HomeValuePage() {
  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-12 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pt-24 lg:pb-20">
          <div className="lg:col-span-7">
            <p className="eyebrow">Home valuation</p>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              What is your home worth right now?
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--color-muted)] md:text-xl">
              Start with an instant estimate from public data, then I refine it
              by hand against your actual Pierce County comps and send you the
              real number within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#valuation" className="btn-primary">
                Get my estimate
              </Link>
              <Link href="/contact" className="btn-ghost">
                Let&apos;s talk first
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-white shadow-xl">
              <Image
                src={tenant.media.heroSecondary}
                alt={`${tenant.market.primaryArea} landscape`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="valuation" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <ValuationWidget />
        </div>
      </section>

      <section className="surface-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
              Three steps from address to answer.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <article
                key={step.title}
                className="rounded-2xl border border-black/5 bg-white p-7"
              >
                <p className="font-mono text-xs tracking-widest text-[color:var(--color-secondary)]">
                  STEP {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaBlock />
    </>
  );
}
