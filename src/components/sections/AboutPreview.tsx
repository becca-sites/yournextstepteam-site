import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";

export function AboutPreview() {
  return (
    <section className="surface-warm py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <p className="eyebrow">Nice to meet you</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight md:text-4xl">
            A {tenant.agent.yearsOfExperience}-year career built on local
            relationships and a clear process.
          </h2>
          <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">
            {tenant.agent.storyLong}
          </p>
          <p className="mt-4 text-base text-[color:var(--color-muted)] md:text-lg">
            Based in {tenant.market.city}, working across the {tenant.market.primaryArea}
            {" "}and the Eastside. {tenant.market.commuteToHub} from {tenant.market.hubCity},
            close enough to commute and far enough to feel like a different pace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="btn-primary">
              Read the full story
            </Link>
            <Link href="/contact" className="btn-ghost">
              Book a consultation
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl">
            <Image
              src={tenant.agent.headshot}
              alt={`${tenant.agent.name} portrait`}
              fill
              sizes="(min-width: 1024px) 33vw, 80vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-center text-sm text-[color:var(--color-muted)]">
            {tenant.agent.name} &middot; {tenant.agent.brokerage} &middot;{" "}
            {tenant.agent.yearsOfExperience} years in {tenant.market.stateAbbreviation}
          </p>
        </div>
      </div>
    </section>
  );
}
