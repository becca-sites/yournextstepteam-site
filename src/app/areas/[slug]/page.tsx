import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { AreaSchema } from "@/components/schema/AreaSchema";
import { getPublishedArea, getPublishedAreas } from "@/lib/areas";
import { getAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

/*
 * Only areas that clear the content gate (src/lib/areas.ts) are generated.
 * Anything else, including a held city typed straight into the address bar,
 * is a 404: dynamicParams is off, so a held page cannot render on demand.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedAreas().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPublishedArea(slug);
  if (!area) return { title: "Area not found" };
  return pageMetadata({
    title: area.title,
    description: area.metaDescription,
    path: `/areas/${area.slug}`,
    image: area.ogImage,
  });
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPublishedArea(slug);
  if (!area) notFound();

  const posts = new Map(getAllPosts().map((p) => [p.slug, p]));

  return (
    <>
      <AreaSchema area={area} />

      {/* Block 1: orientation */}
      <section className="section-y bg-white">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="inline-flex min-h-[44px] items-center underline underline-offset-4">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/areas" className="inline-flex min-h-[44px] items-center underline underline-offset-4">
                  Areas
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {area.city}
              </li>
            </ol>
          </nav>
          <p className="eyebrow mt-6">
            {area.city}, {area.county}
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">{area.h1}</h1>
          <p className="mt-6 text-lg text-ink">{area.orientation}</p>
        </Container>
      </section>

      {/* Block 2: first-hand experience. This is the page. */}
      <section className="section-y surface-warm">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">{area.experienceHeading}</h2>
          <div className="mt-8 space-y-6 text-base text-muted">
            {area.experience.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Block 4: case studies, the hub-and-spoke join. */}
      <section className="section-y bg-white">
        <Container>
          <p className="eyebrow">Real {area.city} transactions</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl">
            Stories from my {area.city} clients
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {area.caseStudies.map((cs) => {
              const post = posts.get(cs.slug);
              return (
                <li key={cs.slug}>
                  <Link
                    href={`/blog/${cs.slug}`}
                    className="group flex h-full flex-col rounded-2xl shadow-card border border-black/5 bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <h3 className="text-xl font-semibold">{post?.title ?? cs.slug}</h3>
                    <p className="mt-4 text-base text-muted">
                      <span className="font-semibold text-ink">The situation: </span>
                      {cs.situation}
                    </p>
                    <p className="mt-2 text-base text-muted">
                      <span className="font-semibold text-ink">How it turned out: </span>
                      {cs.outcome}
                    </p>
                    <p className="mt-auto pt-6 text-sm font-medium text-ink group-hover:underline">
                      Read the whole story &rarr;
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Block 3: senior and care transitions */}
      <section className="section-y surface-warm">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">{area.seniorHeading}</h2>
          <div className="mt-8 space-y-6 text-base text-muted">
            {area.senior.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Block 5: market snapshot. Only rendered with a date and a source. */}
      {area.marketSnapshot && (
        <section className="section-y bg-white">
          <Container>
            <h2 className="font-display text-3xl md:text-4xl">
              {area.city} by the numbers
            </h2>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {area.marketSnapshot.figures.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="display-num mt-2 text-3xl">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">
              As of {area.marketSnapshot.asOf}. Source: {area.marketSnapshot.source}.
            </p>
          </Container>
        </section>
      )}

      {/* Block 6: FAQ */}
      <section className="section-y bg-white">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">
            Questions I get about {area.city}
          </h2>
          <div className="mt-8 space-y-10">
            {area.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-xl font-semibold">{f.question}</h3>
                <p className="mt-3 text-base text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Block 7: sub-areas, plain text and the odd link, never a page each */}
      <section className="section-y surface-warm">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">Parts of {area.city}</h2>
          <ul className="mt-8 space-y-6">
            {area.subAreas.map((s) => (
              <li key={s.name}>
                <p className="text-xl font-semibold text-ink">
                  {s.href ? (
                    <Link href={s.href} className="underline underline-offset-4">
                      {s.name}
                    </Link>
                  ) : (
                    s.name
                  )}
                </p>
                <p className="mt-1 text-base text-muted">{s.note}</p>
              </li>
            ))}
          </ul>

          {area.related.length > 0 && (
            <>
              <h2 className="mt-16 text-xl font-semibold">Keep reading</h2>
              <ul className="mt-4 space-y-3">
                {area.related.map((r) => (
                  <li key={r.href} className="text-base text-muted">
                    <Link
                      href={r.href}
                      className="font-medium text-ink underline underline-offset-4"
                    >
                      {r.label}
                    </Link>
                    : {r.note}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </section>

      {/* Block 8: one call to action */}
      <section className="section-y bg-white">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">
            Thinking about a move in {area.city}?
          </h2>
          <p className="mt-6 text-lg text-muted">
            Tell me what you&apos;re working with. Fifteen minutes, no pitch, no
            pressure.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Let&apos;s have a conversation
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
