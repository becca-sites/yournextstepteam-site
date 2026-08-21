import Image from "next/image";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Border } from "@/components/Border";

type Props = {
  heading: string;
  children: React.ReactNode;
};

export function ContactBlock({ heading, children }: Props) {
  return (
    <section className="mt-24 bg-[var(--color-moss)] py-20 sm:mt-32 sm:py-24 lg:mt-40">
      <Container>
        <FadeIn className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl text-balance">
                {heading}
              </h2>
              <div className="mt-6 text-xl text-white/85">{children}</div>
              {/* Buyers and sellers get the same treatment, so both
                  questionnaire buttons share one style. */}
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={tenant.listings.buyerQuestionnaireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-on-dark"
                >
                  Buyer Questionnaire
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={tenant.listings.sellerQuestionnaireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-on-dark"
                >
                  Seller Questionnaire
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>

            <FadeIn scaleIn className="hidden lg:block lg:justify-self-end">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full ring-2 ring-white/25">
                <Image
                  src={tenant.agent.headshot}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </FadeIn>
          </div>

          <Border className="mt-16 pt-10" invert>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 text-sm">
              <div>
                <dt className="font-display font-semibold uppercase tracking-wider text-white/70">
                  Direct line
                </dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${tenant.agent.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex min-h-[44px] items-center text-white underline underline-offset-4 hover:text-[var(--color-accent)]"
                  >
                    {tenant.agent.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display font-semibold uppercase tracking-wider text-white/70">
                  Based in
                </dt>
                <dd className="mt-3 text-white">
                  {tenant.market.city}, {tenant.market.stateAbbreviation}
                </dd>
              </div>
            </dl>
          </Border>
        </FadeIn>
      </Container>
    </section>
  );
}
