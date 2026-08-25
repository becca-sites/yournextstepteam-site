import Image from "next/image";
import { tenant } from "@/config/tenant";

/**
 * ComplianceMarks
 *
 * The regulatory furniture a licensed agent's site has to carry: the brokerage
 * identification, the REALTOR® block R, the MLS notice, and the Equal Housing
 * Opportunity mark.
 *
 * The three trade marks below are drawn as inline SVG in `currentColor`, so one
 * component reads correctly on the ink compliance strip and on any light
 * surface, and there is no image request in the critical path for four small
 * marks. They inherit the surrounding colour rather than carrying their own.
 *
 * The eXp Realty logo is the exception and is deliberately NOT drawn here. eXp's
 * brand guidelines are explicit that the logo must never be recreated or
 * typeset, and that only the official artwork may be used. Until those files are
 * pulled from the eXp brand toolkit and dropped into `public/images/brand`, the
 * lockup renders the brokerage as plain text set in the site's own type, which
 * is a brokerage identification line and not an imitation of the mark. Point
 * `tenant.agent.brokerageLogo` / `brokerageLogoLight` at the real files and the
 * lockup switches to the artwork with no other change. The guidelines also set a
 * 60px floor on the logo's width, which `BROKERAGE_LOGO_MIN_WIDTH` enforces.
 */

/** eXp brand guidelines: the logo is never rendered below 60px wide. */
const BROKERAGE_LOGO_MIN_WIDTH = 60;

type Tone = "light" | "dark";

/**
 * REALTOR® block R. A bordered square holding the letterform, so it holds up
 * as a single-colour mark on either tone.
 */
export function RealtorMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect
        x="0.9"
        y="0.9"
        width="22.2"
        height="22.2"
        rx="2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7 5h7.2a4.3 4.3 0 0 1 0 8.6h-.6L18.2 19H14l-3.3-5.4h-.3V19H7V5zm3.4 3.4v2.8H14a1.4 1.4 0 0 0 0-2.8h-3.6z"
      />
    </svg>
  );
}

/** MLS mark. A bordered chip, which is how the notice reads in print. */
export function MlsMark({ className = "h-5 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 24" className={className} aria-hidden="true" focusable="false">
      <rect
        x="0.9"
        y="0.9"
        width="36.2"
        height="22.2"
        rx="2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <text
        x="19"
        y="16.4"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.6"
        fontFamily="inherit"
      >
        MLS
      </text>
    </svg>
  );
}

/**
 * Equal Housing Opportunity mark: the house with the equal sign knocked out of
 * it. One path with `fillRule="evenodd"`, so the two bars punch through to
 * whatever sits behind the mark instead of being painted a fixed colour.
 */
export function EqualHousingMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 3.2 31 15.9h-4.6V28.4H5.6V15.9H1L16 3.2zM10 17.4h12v2.7H10v-2.7zm0 4.9h12V25H10v-2.7z"
      />
    </svg>
  );
}

/**
 * One mark plus its notice. Keeps the row on a single rhythm no matter how wide
 * the individual marks are.
 */
export function ComplianceBadge({
  mark,
  label,
  detail,
}: {
  mark: React.ReactNode;
  label: string;
  detail?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="shrink-0">{mark}</span>
      <span className="text-[11px] font-medium uppercase leading-tight tracking-[0.12em]">
        {label}
        {detail && (
          <span className="block font-normal normal-case tracking-normal opacity-70">
            {detail}
          </span>
        )}
      </span>
    </div>
  );
}

/**
 * Brokerage identification. eXp requires this above the fold, so it renders in
 * the header as well as the footer.
 *
 * `tone` picks the artwork and the type colour: "light" for the ink compliance
 * strip, "dark" for the white header bar.
 */
export function BrokeredBy({
  tone = "light",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const { agent } = tenant;
  const logo = tone === "light" ? agent.brokerageLogoLight : agent.brokerageLogo;
  const logoWidth = agent.brokerageLogoWidth ?? 0;
  const logoHeight = agent.brokerageLogoHeight ?? 0;
  const hasLogo = Boolean(logo && logoWidth && logoHeight);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={
          tone === "light"
            ? "text-[11px] font-medium uppercase leading-tight tracking-[0.14em] text-white/60"
            : "text-[11px] font-medium uppercase leading-tight tracking-[0.14em] text-[var(--color-ink-soft)]"
        }
      >
        Brokered by
      </span>
      {hasLogo ? (
        <Image
          src={logo as string}
          alt={agent.brokerage}
          width={logoWidth}
          height={logoHeight}
          // Never below the 60px floor in eXp's guidelines, and never recoloured:
          // the light and dark files are their own two approved lockups.
          sizes={`${BROKERAGE_LOGO_MIN_WIDTH * 2}px`}
          style={{ minWidth: BROKERAGE_LOGO_MIN_WIDTH }}
          className="h-6 w-auto"
        />
      ) : (
        <span
          className={
            tone === "light"
              ? "text-base font-bold leading-none tracking-tight text-white"
              : "text-base font-bold leading-none tracking-tight text-[var(--color-ink)]"
          }
        >
          {agent.brokerage}
        </span>
      )}
    </div>
  );
}
