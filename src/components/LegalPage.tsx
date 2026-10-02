import Link from "next/link";
import { Container } from "@/components/Container";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

/**
 * Shared shell for the legal and policy pages: privacy, consumer health data,
 * accessibility, terms, and fair housing.
 *
 * Deliberately plain. These pages are read by people checking what they agreed
 * to, and by older readers who may be using a screen reader or large text, so
 * they get the site's article typography (.prose, capped at about 66
 * characters), a visible last-updated date, a visible breadcrumb that matches
 * the BreadcrumbList markup, and nothing that moves.
 */
export function LegalPage({
  title,
  path,
  updated,
  intro,
  children,
}: {
  title: string;
  /** Route path, e.g. "/privacy". Used for the breadcrumb. */
  path: string;
  /** Human date, e.g. "October 2, 2026". */
  updated: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: title, url: path },
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
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
          {intro && <div className="mt-6 text-lg text-ink">{intro}</div>}
          <div className="prose mt-12">{children}</div>
        </Container>
      </section>
    </>
  );
}
