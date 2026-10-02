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

  /*
   * Column count follows the number of stats so a three-stat bar does not
   * render an empty fourth cell. Written as whole class strings because
   * Tailwind scans for literals and would drop a name built by interpolation.
   */
  const columns =
    stats.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <section
      aria-label={heading || "By the numbers"}
      className={
        isDark
          ? "bg-[var(--color-primary)] text-white"
          : "border-y border-black/5 surface-warm text-ink"
      }
    >
      <div className="section-y mx-auto max-w-7xl px-4 lg:px-8">
        {(heading || eyebrow) && (
          <div className="mb-10 max-w-2xl">
            {eyebrow && (
              <p
                className={
                  isDark
                    ? "eyebrow text-white/80"
                    : "eyebrow"
                }
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={`mt-4 font-display text-3xl md:text-4xl ${
                  isDark ? "text-white" : ""
                }`}
              >
                {heading}
              </h2>
            )}
          </div>
        )}

        <dl
          className={`grid ${columns} gap-px overflow-hidden rounded-2xl bg-black/5`}
        >
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
                  className={`mt-2 text-sm ${
                    isDark ? "text-white/80" : "text-muted"
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
