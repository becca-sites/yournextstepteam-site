import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { FadeIn } from "@/components/FadeIn";

const NAV_WORKING = [
  { href: "/buyers", label: "For buyers" },
  { href: "/sellers", label: "For sellers" },
  { href: "/listings", label: "Current listings" },
  { href: tenant.listings.buyerQuestionnaireUrl, label: "Buyer Questionnaire", external: true },
  { href: tenant.listings.sellerQuestionnaireUrl, label: "Seller Questionnaire", external: true },
  { href: "/quiz", label: "Real Estate IQ Quiz" },
];

const NAV_LEARN = [
  { href: "/podcast", label: "Next Step Conversations" },
  { href: "/your-best-season", label: "Your Best Season" },
  { href: "/about", label: "About Becca" },
  { href: tenant.sibling.url, label: tenant.sibling.name, external: true },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(tenant.social).filter(([, v]) => v);

  return (
    <footer className="border-t border-black/5 bg-[var(--color-slate)] text-white/85">
      <FadeIn>
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <Link
                href="/"
                aria-label="Your Next Step Home"
                className="inline-flex min-h-[44px] items-center"
              >
                <Image
                  src={tenant.brand.logo}
                  alt=""
                  width={160}
                  height={36}
                />
              </Link>
              {/* Brokerage identification lives in the compliance strip at the
                  very bottom, not here. */}
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/70">
                {tenant.market.positioning}
              </p>
            </div>

            <nav aria-label="Working with Becca">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Working with Becca
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {NAV_WORKING.map((item) =>
                  "external" in item && item.external ? (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center transition hover:text-white"
                      >
                        {item.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-[44px] items-center transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <nav aria-label="Learn more">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Learn more
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {NAV_LEARN.map((item) =>
                  "external" in item && item.external ? (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center transition hover:text-white"
                      >
                        {item.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-[44px] items-center transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Get in touch
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`tel:${tenant.agent.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex min-h-[44px] items-center transition hover:text-white"
                  >
                    {tenant.agent.phone}
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[44px] items-center transition hover:text-white"
                  >
                    Send a message
                  </Link>
                </li>
              </ul>
              {socials.length > 0 && (
                <ul className="mt-6 flex gap-4 text-sm">
                  {socials.map(([k, v]) => (
                    <li key={k}>
                      <a
                        href={String(v)}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="inline-flex min-h-[44px] items-center capitalize text-white/70 transition hover:text-white"
                      >
                        {k}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-white/10 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Part of the family
            </h2>
            <p className="mt-2 text-sm text-white/70">
              <a
                href={tenant.sibling.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline underline-offset-2 transition hover:text-white"
              >
                {tenant.sibling.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              : {tenant.sibling.description}
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/60">
            <p>
              Equal Housing Opportunity. Serving{" "}
              {tenant.market.neighborhoods.slice(0, 6).join(", ")}
              {tenant.market.neighborhoods.length > 6
                ? ", and surrounding areas."
                : "."}
            </p>
            <p className="mt-2">
              &copy; {year} {tenant.agent.name}. All rights reserved.
            </p>
          </div>

          {/*
            Brokerage disclosure sits last, in small print, which is the
            standard placement. TODO: confirm the exact WA DOL / NWMLS
            firm-identification and logo requirements before launch.
          */}
          <p className="mt-6 text-[11px] leading-5 text-white/45">
            {tenant.agent.brokerageDisclosure}
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
