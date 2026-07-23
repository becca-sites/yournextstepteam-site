import { tenant } from "@/config/tenant";

export type TestimonialBehavior = boolean | "team-backed";

export function TestimonialCarousel({
  show = true,
  heading,
  eyebrow = "Real clients, real results",
}: {
  show?: TestimonialBehavior;
  heading?: string;
  eyebrow?: string;
}) {
  if (show === false) return null;
  const list = tenant.testimonials ?? [];
  if (list.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
            {heading || `What ${tenant.market.primaryArea} clients are saying.`}
          </h2>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
          {list.map((t, idx) => (
            <figure
              key={`${t.name}-${idx}`}
              className="min-w-[300px] max-w-md snap-start rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8 md:min-w-[420px]"
            >
              <p className="font-heading text-3xl text-[var(--color-secondary)]">“</p>
              <blockquote className="mt-2 text-lg leading-relaxed text-[color:var(--color-ink)]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-black/5 pt-4 text-sm">
                <p className="font-semibold">{t.name}</p>
                <p className="text-[color:var(--color-muted)]">
                  {t.context} &middot; {t.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
