import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";

/**
 * Big editorial hero. Full-bleed photo on the right, headline + CTAs on the
 * left, with a thin eyebrow and a stat strip pinned to the bottom.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-12 md:pt-24 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-28 lg:pb-20">
        <div className="lg:col-span-6 lg:pr-6">
          <p className="eyebrow">{tenant.brand.eyebrow}</p>
          {/* TODO Becca-approved headline: placeholder senior-focused headline below. */}
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Senior real estate for every next step.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[color:var(--color-muted)] md:text-xl">
            {tenant.agent.bio}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Book a consultation
            </Link>
            <Link href="/listings" className="btn-ghost">
              See current listings
            </Link>
          </div>
          <p className="mt-6 text-sm text-[color:var(--color-muted)]">
            {tenant.market.city}, {tenant.market.stateAbbreviation} &middot;{" "}
            {tenant.market.commuteToHub} to {tenant.market.hubCity}
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-xl">
            <Image
              src={tenant.media.heroPrimary}
              alt={`${tenant.market.primaryArea} landscape`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
