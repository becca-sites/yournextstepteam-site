import Link from "next/link";
import Image from "next/image";

/**
 * PersonaGrid
 *
 * Six self-select cards on the homepage. The playbook's first-class component:
 * one funnel, multiple doors. Each card is a route into the persona-specific
 * page (Buyers, Sellers, Neighborhoods, Valuation, Contact).
 *
 * Data shape is the same as TenantScenario plus an optional `image`. Falls back
 * to a rotating image from tenant.media.lifestyle when no image is set.
 *
 * Designed to replace ScenarioRouter on the homepage. ScenarioRouter stays
 * available for interior pages that want the text-only treatment.
 */
export interface PersonaCard {
  title: string;
  description: string;
  href: string;
  image?: string;
}

interface Props {
  cards: PersonaCard[];
  fallbackImages?: string[];
  eyebrow?: string;
  heading?: string;
  subhead?: string;
}

export function PersonaGrid({
  cards,
  fallbackImages = [],
  eyebrow = "Find your next step",
  heading = "Where in the move are you?",
  subhead,
}: Props) {
  if (!cards?.length) return null;
  return (
    <section className="surface-warm py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
            {heading}
          </h2>
          {subhead && (
            <p className="mt-4 text-base text-[color:var(--color-muted)] md:text-lg">
              {subhead}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const img =
              card.image ?? fallbackImages[i % Math.max(fallbackImages.length, 1)];
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-xl"
              >
                {img && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-mono text-xs tracking-widest text-[color:var(--color-secondary)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {card.description}
                  </p>
                  <p className="mt-auto pt-6 text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                    Start here →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
