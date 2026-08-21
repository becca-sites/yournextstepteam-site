import { tenant, type TenantTestimonial } from "@/config/tenant";

export type TestimonialBehavior = boolean | "team-backed";

/**
 * Cards a row needs before it is wide enough to cover a large desktop viewport.
 * Short review sets get repeated up to this count so the loop never shows a gap.
 */
const MIN_CARDS_PER_LOOP = 6;

/**
 * Seconds of travel per card. Holding the pace constant rather than the loop
 * time keeps the reading speed the same whether the array carries five reviews
 * or fifty; at the current count a row completes in roughly 36 seconds.
 */
const SECONDS_PER_CARD = 6;

/** Repeat a short list until it holds at least `minCount` entries. */
function repeatToFill<T>(items: T[], minCount: number): T[] {
  if (items.length === 0) return [];
  const copies = Math.max(1, Math.ceil(minCount / items.length));
  return Array.from({ length: copies }, () => items).flat();
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * "2024-06-24" to "June 2024".
 *
 * Split rather than `new Date`, because a bare ISO date parses as UTC midnight
 * and would render as the previous month for anyone west of Greenwich, which
 * on a server-rendered card means a hydration mismatch as well as a wrong date.
 */
function formatReviewDate(iso: string | undefined): string | null {
  if (!iso) return null;
  const [year, month] = iso.split("-");
  const name = MONTHS[Number(month) - 1];
  return name && year ? `${name} ${year}` : null;
}

function TestimonialCard({ t }: { t: TenantTestimonial }) {
  const date = formatReviewDate(t.date);
  const detail = [t.context, date].filter(Boolean).join(" · ");

  return (
    /*
      The figure holds the card's place in the row and never changes size. The
      panel inside it is what grows on hover, and it is positioned so that
      growing paints over the neighbouring cards instead of reflowing the row
      and shoving the rest of the page down. See `.testimonial-card` in
      globals.css for the hover behaviour itself.
    */
    <figure className="testimonial-card relative mr-5 h-[208px] w-[320px] shrink-0 md:w-[340px]">
      <div className="testimonial-card__panel absolute inset-x-0 top-0 flex min-h-[208px] flex-col rounded-xl border border-[color:var(--color-moss)]/20 bg-[var(--color-bone)] p-5 shadow-[0_1px_3px_rgba(26,32,40,0.07)]">
        {/*
          The clamp plus the card's fixed height is what keeps every attribution
          block on the same line across the row, however long the quote runs.
        */}
        <blockquote className="testimonial-card__quote line-clamp-4 text-sm leading-relaxed text-[color:var(--color-slate)]">
          {t.quote}
        </blockquote>
        {/* Eats the slack under a short quote so the attribution stays pinned
            to the bottom edge while the card is collapsed, and collapses to
            nothing once the expanded quote fills the card. */}
        <div className="flex-1" aria-hidden="true" />
        <figcaption className="mt-4 border-t border-[color:var(--color-moss)]/20 pt-3 text-xs">
          <div className="flex items-baseline gap-1.5">
            <span className="min-w-0 truncate font-semibold text-[color:var(--color-slate)]">
              {t.name}
            </span>
            <span
              className="shrink-0 text-[color:var(--color-moss)]"
              aria-hidden="true"
            >
              &middot;
            </span>
            <span className="shrink-0 whitespace-nowrap text-[color:var(--color-muted)]">
              {t.location}
            </span>
          </div>
          {detail && (
            <p className="testimonial-card__meta text-[color:var(--color-muted)]">
              {detail}
            </p>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

function MarqueeRow({
  items,
  direction,
  expand = "down",
  className = "",
}: {
  items: TenantTestimonial[];
  direction: "rtl" | "ltr";
  /**
   * Which way a hovered card grows. The lower row opens upward so that its
   * expanded cards stay on screen: a row sitting two thirds of the way down the
   * viewport has nowhere to grow downward, and the reader cannot scroll after
   * it without moving the pointer off the card and closing it.
   */
  expand?: "down" | "up";
  className?: string;
}) {
  const half = repeatToFill(items, MIN_CARDS_PER_LOOP);
  if (half.length === 0) return null;

  return (
    <div
      className={[
        "marquee py-2",
        expand === "up" && "marquee--expand-up",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={`marquee-track ${
          direction === "rtl" ? "marquee-track--rtl" : "marquee-track--ltr"
        }`}
        style={{ animationDuration: `${half.length * SECONDS_PER_CARD}s` }}
      >
        <div className="flex shrink-0">
          {half.map((t, idx) => (
            <TestimonialCard key={`${t.name}-${idx}`} t={t} />
          ))}
        </div>
        {/* Second copy is decorative: it exists to close the loop, not to be read. */}
        <div className="flex shrink-0" aria-hidden="true">
          {half.map((t, idx) => (
            <TestimonialCard key={`dup-${t.name}-${idx}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialCarousel({
  show = true,
  heading,
  eyebrow = "Real clients, real results",
}: {
  show?: TestimonialBehavior;
  heading?: string;
  eyebrow?: string;
}) {
  const list = tenant.testimonials ?? [];

  if (show === false) return null;
  if (list.length === 0) return null;

  const split = Math.ceil(list.length / 2);
  const topRow = list.slice(0, split);
  const bottomRow = list.slice(split);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
            {heading || "What clients are saying"}
          </h2>
        </div>
      </div>

      {/*
        Rows run full bleed rather than inside the page container, so cards keep
        travelling past the gutter instead of appearing to start mid-page.
      */}
      <div className="mt-10 space-y-1">
        {/* Below md everything rides one row, so nothing gets dropped. */}
        <MarqueeRow items={list} direction="rtl" className="md:hidden" />

        <div className="hidden space-y-1 md:block">
          <MarqueeRow items={topRow} direction="rtl" />
          {bottomRow.length > 0 && (
            <MarqueeRow items={bottomRow} direction="ltr" expand="up" />
          )}
        </div>
      </div>
    </section>
  );
}
