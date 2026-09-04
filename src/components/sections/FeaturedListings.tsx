import Image from "next/image";
import Link from "next/link";
import { tenant } from "@/config/tenant";

/**
 * Showcase strip of recent or representative listings. Photos are pulled
 * from tenant.media.listingShowcase. The card metadata is placeholder; an
 * agent's real IDX feed would replace it.
 */
// TODO Becca content: placeholder cards for the demo. Replace tags/prices/lines
// with real representative homes (or wire in her IDX feed) before launch.
const PLACEHOLDER_CARDS = [
  { tag: "Recently sold", price: "$625,000", line: "[TODO Becca content] · 4 bd / 2.5 ba" },
  { tag: "Just listed", price: "$515,000", line: "[TODO Becca content] · 3 bd / 2 ba" },
  { tag: "Coming soon", price: "$700,000", line: "[TODO Becca content] · 4 bd / 3 ba" },
  { tag: "Sold over asking", price: "$450,000", line: "[TODO Becca content] · 3 bd / 2.5 ba" },
];

export function FeaturedListings() {
  const photos = tenant.media.listingShowcase ?? [];
  if (!photos.length) return null;

  const cards = PLACEHOLDER_CARDS.slice(0, Math.min(PLACEHOLDER_CARDS.length, photos.length));

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Recent work</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
              A look at recent listings.
            </h2>
            <p className="mt-4 text-base text-[color:var(--color-muted)] md:text-lg">
              Sample homes from the {tenant.market.primaryArea}. Photos and
              card copy below are placeholder data for the template demo.
            </p>
          </div>
          <Link
            href="/listings"
            className="text-sm font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
          >
            All current listings →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <article
              key={`${card.tag}-${i}`}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={photos[i]}
                  alt={card.line}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                {/* Squared label, not a pill. Site-wide rule: a rounded filled
                    container around a label reads as a button, and nothing
                    that is not a control should look like one. It keeps the
                    white plate, because this sits on a photograph and needs
                    the contrast to stay readable. */}
                <span className="absolute left-4 top-4 rounded-sm bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-ink)]">
                  {card.tag}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="font-heading text-xl font-semibold">{card.price}</p>
                <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                  {card.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
