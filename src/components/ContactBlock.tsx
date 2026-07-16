import Link from "next/link";
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
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl text-balance">
                {heading}
              </h2>
              <div className="mt-6 text-xl text-neutral-300">{children}</div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-sunshine)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-sunshine-deep)]"
                >
                  Book a consultation
                </Link>
                <a
                  href={`tel:${tenant.agent.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
                >
                  Call {tenant.agent.firstName}
                </a>
              </div>
            </div>

            <FadeIn scaleIn className="hidden lg:block lg:justify-self-end">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full ring-2 ring-white/15">
                <Image
                  src={tenant.agent.headshot}
                  alt={tenant.agent.name}
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
                  Email
                </dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${tenant.agent.email}`}
                    className="text-white hover:text-[var(--color-accent)]"
                  >
                    {tenant.agent.email}
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
        </div>
      </FadeIn>
    </Container>
  );
}
