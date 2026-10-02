import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { FadeIn } from "@/components/FadeIn";
import {
  BrokeredBy,
  ComplianceBadge,
  EqualHousingMark,
  RealtorMark,
} from "@/components/global/ComplianceMarks";

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
  { href: "/areas", label: "Areas I serve" },
  { href: "/about", label: "About Becca" },
  { href: tenant.sibling.url, label: tenant.sibling.name, external: true },
  { href: "/contact", label: "Contact" },
];

const POLICY_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/consumer-health-data", label: "Consumer Health Data Privacy" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/fair-housing", label: "Fair Housing" },
];

type NavItem = { href: string; label: string; external?: boolean };

function FooterNav({ heading, items }: { heading: string; items: NavItem[] }) {
  return (
    <nav aria-label={heading}>
      <h2 className="eyebrow text-white/80">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) =>
          item.external ? (
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
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(tenant.social).filter(([, v]) => v);

  return (
    <footer className="border-t border-black/5 bg-[var(--color-slate)] text-white/80">
      <FadeIn>
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link
                href="/"
                aria-label={`${tenant.brand.name} home`}
                className="inline-flex min-h-[44px] items-center"
              >
                {/* White knockout, because the footer sits on slate. */}
                <Image
                  src={tenant.brand.logoLight}
                  alt={tenant.brand.name}
                  width={tenant.brand.logoWidth}
                  height={tenant.brand.logoHeight}
                  sizes="110px"
                  className="h-12 w-auto"
                />
              </Link>
              {/* Brokerage identification lives in the compliance strip at the
                  very bottom, not here. */}
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/80">
                {tenant.market.positioning}
              </p>
            </div>

            <FooterNav heading="Working with Becca" items={NAV_WORKING} />
            <FooterNav heading="Learn more" items={NAV_LEARN} />

            <div>
              <h2 className="eyebrow text-white/80">
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
                  <a
                    href={`mailto:${tenant.agent.email}`}
                    className="inline-flex min-h-[44px] items-center break-all transition hover:text-white"
                  >
                    {tenant.agent.email}
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
              {/* Mailing address, which is the firm-identification detail a
                  licensed agent's site is expected to publish. */}
              <address className="mt-4 max-w-[16rem] text-sm not-italic leading-6 text-white/80">
                {tenant.agent.address}
              </address>
              {socials.length > 0 && (
                <ul className="mt-4 flex gap-4 text-sm">
                  {socials.map(([k, v]) => (
                    <li key={k}>
                      <a
                        href={String(v)}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="inline-flex min-h-[44px] items-center capitalize text-white/80 transition hover:text-white"
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
            <h2 className="eyebrow text-white/80">
              Part of the family
            </h2>
            <p className="mt-2 text-sm text-white/80">
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
        </div>
      </FadeIn>

      {/*
        Compliance strip.

        Deliberately outside the FadeIn. Everything above it is decoration and
        can afford to wait on a viewport observer; brokerage identification, the
        trade marks, and the licensing statement are the one part of this page
        that has to render whatever the browser does with the animation.

        It drops to ink so it reads as a legal band rather than more footer.
      */}
      <div className="bg-[var(--color-ink)] text-white/80">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <BrokeredBy tone="light" />

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-white/80">
              <ComplianceBadge mark={<RealtorMark />} label="REALTOR®" />
              {/* No MLS badge. The site displays no MLS listing data, so an
                  MLS mark and number here could mislead a reader (RCW
                  18.85.361(2), (3)). Removed 2026-10-02. */}
              <Link
                href="/fair-housing"
                className="inline-flex min-h-[44px] items-center rounded transition hover:text-white"
              >
                <ComplianceBadge
                  mark={<EqualHousingMark />}
                  label="Equal Housing"
                  detail="Opportunity"
                />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 text-xs leading-5 text-white/80 lg:grid-cols-2">
            <div className="space-y-2">
              <p>
                {tenant.agent.name}, {tenant.agent.title}. Washington broker
                license {tenant.agent.license}.
              </p>
              <p>{tenant.agent.brokerageDisclosure}</p>
              {/* WAC 308-124B-210(2): the team name in conjunction with the
                  licensed firm name, and not a separate entity. */}
              <p>{tenant.agent.teamDisclosure}</p>
              <p>
                Equal Housing Opportunity. I do business in accordance with
                the federal Fair Housing Act and the Washington Law Against
                Discrimination.{" "}
                <Link
                  href="/fair-housing"
                  className="underline underline-offset-2 hover:text-white"
                >
                  Read my fair housing statement
                </Link>
                .
              </p>
            </div>
            <div className="space-y-2 lg:text-right">
              <p>{tenant.agent.opinionDisclaimer}</p>
              <p>
                REALTOR&reg; is a registered collective membership mark that
                identifies real estate professionals who are members of the
                National Association of REALTORS&reg; and subscribe to its Code
                of Ethics.
              </p>
              <p>
                Serving {tenant.market.neighborhoods.slice(0, 6).join(", ")}
                {tenant.market.neighborhoods.length > 6
                  ? ", and surrounding areas."
                  : "."}
              </p>
              <p className="text-white/80">
                &copy; {year} {tenant.brand.name}. All rights reserved.
              </p>
            </div>
          </div>

          {/*
            Policy links. Consumer Health Data is its own link, next to and
            not nested under the general privacy policy: Washington's My Health
            My Data Act requires it to be separately and prominently linked
            from the homepage, and this footer renders on the homepage.
          */}
          <nav aria-label="Policies" className="mt-6 border-t border-white/10 pt-4">
            <ul className="flex flex-wrap gap-x-6 text-sm">
              {POLICY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
