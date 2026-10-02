import Link from "next/link";
import { Container } from "@/components/Container";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";
import { getPublishedAreas } from "@/lib/areas";
import { pageMetadata } from "@/lib/metadata";
import { SERVICE_COUNTIES } from "@/components/schema/RealEstateAgentSchema";

export const metadata = pageMetadata({
  title: "Areas I Serve",
  description:
    "The parts of the Puget Sound region I work in, and an area page for each place where I have real local stories to tell, not a page for every town on a map.",
  path: "/areas",
});

/*
 * The hub. It links only to area pages that clear the content gate, each with
 * its own short blurb, and to the neighbourhood guides. Held cities are not
 * named or linked here: a list of towns with nothing behind them is exactly
 * the doorway pattern the gate exists to prevent.
 */
export default function AreasPage() {
  const areas = getPublishedAreas();
  const counties = SERVICE_COUNTIES.map((c) => c.replace(", Washington", ""));
  const countyList = `${counties.slice(0, -1).join(", ")}, and ${counties[counties.length - 1]}`;

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Areas", url: "/areas" },
        ]}
      />
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
              <li aria-current="page" className="text-ink">
                Areas
              </li>
            </ol>
          </nav>
          <p className="eyebrow mt-6">Where I work</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">Areas I serve</h1>
          <p className="mt-6 text-lg text-ink">
            I work across {countyList}.
            I only write an area page when I&apos;ve done real work there and
            have something to tell you that you couldn&apos;t look up. More are
            on the way as I write up the stories behind them.
          </p>
        </Container>
      </section>

      <section className="section-y surface-warm">
        <Container>
          <h2 className="font-display text-3xl md:text-4xl">Area guides</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl shadow-card border border-black/5 bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <p className="eyebrow">{a.county}</p>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl">{a.city}</h3>
                  <p className="mt-4 text-base text-muted">{a.metaDescription}</p>
                  <p className="mt-auto pt-6 text-sm font-medium text-ink group-hover:underline">
                    Read the {a.city} guide &rarr;
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-xl font-semibold">Neighborhood guides</h2>
          <p className="mt-3 text-base text-muted">
            Quick numbers and notes on the towns and neighborhoods I work most
            often are in my{" "}
            <Link href="/neighborhoods" className="font-medium text-ink underline underline-offset-4">
              neighborhood guides
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
