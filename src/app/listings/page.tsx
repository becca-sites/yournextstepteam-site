import type { Metadata } from "next";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Border } from "@/components/Border";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Listings",
  description: `Search homes across the ${tenant.market.primaryArea} on ${tenant.agent.firstName}'s agent site.`,
  alternates: { canonical: "/listings" },
};

export default function ListingsPage() {
  const { agentSiteUrl, searchAllHomesUrl } = tenant.listings;

  return (
    <>
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Search homes</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">
              The full home search lives on {tenant.agent.firstName}&apos;s
              agent site.
            </h1>
            <p className="mt-5 text-lg text-neutral-600 md:text-xl">
              Live MLS data across {tenant.market.primaryArea} (Pierce and South
              King County) is powered through {tenant.agent.firstName}&apos;s{" "}
              {tenant.agent.brokerage} agent site. Set filters, save searches,
              and get notified when new homes hit the market.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={searchAllHomesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Search all homes
              </a>
              <Link href="/buyers/questionnaire" className="btn-ghost">
                Take the Buyer Questionnaire
              </Link>
            </div>
            <p className="mt-8 text-sm text-neutral-500">
              Prefer to browse directly?{" "}
              <a
                href={agentSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-primary)] underline decoration-dotted underline-offset-4"
              >
                Open the agent site
              </a>
            </p>
          </FadeIn>
        </Container>
      </section>

      <Container>
        <FadeIn>
          <Border className="pb-12">
            <p className="text-xs text-neutral-500">
              {tenant.agent.brokerageDisclosure}
            </p>
          </Border>
        </FadeIn>
      </Container>

      <ContactBlock heading="Not sure where to start?">
        <p>
          Tell us what you are looking for and we will send you a short list
          that fits.
        </p>
      </ContactBlock>
    </>
  );
}
