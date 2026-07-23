import type { Metadata } from "next";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Client Stories",
  description: `Real transitions from real families across the ${tenant.market.primaryArea}. Senior downsizing, estate sales, aging-in-place evaluations, and first-time purchases.`,
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <Container>
          <FadeIn className="max-w-3xl">
            <p className="eyebrow">Client stories</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Real transitions from real families.
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl">
              Every move has a story. These are some of the families we have
              helped navigate downsizing, estate transitions, aging-in-place
              decisions, and first-time purchases across the{" "}
              {tenant.market.primaryArea}.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-[var(--color-surface)] px-8 py-16">
              <p className="font-display text-2xl font-semibold text-neutral-950">
                Client success stories coming soon.
              </p>
              <p className="mt-4 text-base text-neutral-600">
                We are documenting the real transitions we have helped families
                navigate. Leave your email and we will let you know when the
                first stories are published.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Get notified when stories go live
                </Link>
                <Link href="/podcast" className="btn-ghost">
                  Listen to the podcast
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <ContactBlock heading="Want to hear about a specific situation?">
        <p>
          If you are working through something similar to what you see here, or
          want to know how we have handled a situation like yours, let us talk.
        </p>
      </ContactBlock>
    </>
  );
}
