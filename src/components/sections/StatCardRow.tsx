export interface Stat {
  value: string;
  label: string;
  detail?: string;
}

interface Props {
  stats: Stat[];
  heading?: string;
  eyebrow?: string;
  variant?: "light" | "dark";
}

export function StatCardRow({
  stats,
  heading,
  eyebrow,
  variant = "light",
}: Props) {
  if (!stats?.length) return null;

  const isDark = variant === "dark";

  return (
    <section
      aria-label={heading || "By the numbers"}
      className={
        isDark
          ? "bg-[var(--color-primary)] text-white"
          : "border-y border-black/5 surface-warm text-[color:var(--color-ink)]"
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
        {(heading || eyebrow) && (
          <div className="mb-10 max-w-2xl">
            {eyebrow && (
              <p
                className={
                  isDark
                    ? "text-[11px] font-semibold uppercase tracking-widest text-white/60"
                    : "eyebrow"
                }
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={`mt-3 font-heading text-3xl font-semibold md:text-4xl ${
                  isDark ? "text-white" : ""
                }`}
              >
                {heading}
              </h2>
            )}
          </div>
        )}

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/5 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={
                isDark
                  ? "bg-[var(--color-primary)] px-6 py-10"
                  : "bg-white px-6 py-10"
              }
            >
              <dt className="display-num text-4xl md:text-5xl">{s.value}</dt>
              <dd className="mt-3 text-sm font-medium uppercase tracking-wide">
                {s.label}
              </dd>
              {s.detail && (
                <p
                  className={`mt-2 text-xs ${
                    isDark ? "text-white/60" : "text-[color:var(--color-muted)]"
                  }`}
                >
                  {s.detail}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
