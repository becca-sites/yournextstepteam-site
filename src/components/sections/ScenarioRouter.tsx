import Link from "next/link";

export interface Scenario {
  title: string;
  description: string;
  href: string;
}

export function ScenarioRouter({
  scenarios,
  eyebrow = "Find your next step",
  heading = "Any of these sound familiar?",
  subhead,
}: {
  scenarios: Scenario[];
  eyebrow?: string;
  heading?: string;
  subhead?: string;
}) {
  if (!scenarios?.length) return null;
  return (
    <section className="surface-warm py-20 md:py-24">
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

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario, i) => (
            <Link
              key={scenario.title}
              href={scenario.href}
              className="group relative flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-lg"
            >
              <p className="font-mono text-xs tracking-widest text-[color:var(--color-secondary)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-heading text-xl font-semibold">
                {scenario.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {scenario.description}
              </p>
              <p className="mt-6 text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                Start here →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
