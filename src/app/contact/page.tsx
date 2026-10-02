import type { Metadata } from "next";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { Border } from "@/components/Border";
import { ContactForm } from "@/components/forms/ContactForm";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

export const metadata: Metadata = {
  title: "Contact Becca Pitts",
  description:
    "Call, text, or email Becca Pitts directly. REALTOR® in Bonney Lake, WA, working Puyallup, North Tacoma, Eatonville, and the rest of Pierce County.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <section className="bg-[var(--color-surface)] section-y">
        <Container>
          <FadeIn>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 font-display text-4xl md:text-6xl">
              Let&apos;s have a conversation.
            </h1>
            <p className="mt-6 text-lg text-muted">
              Call the number below and I pick it up. Every message comes
              straight to me, or to Allbree, and one of us answers it. Buying,
              selling, or just wondering what your house would bring right now:
              ask all the questions, including the ones you think sound dumb.
              There&apos;s no presentation and nothing to sign.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-5">
              <p className="eyebrow">Direct</p>
              <h2 className="mt-2 font-display text-2xl">
                Reach me directly
              </h2>
              <dl className="mt-8 space-y-6 text-base">
                <div>
                  <dt className="eyebrow text-muted">
                    Phone
                  </dt>
                  <dd className="mt-1 font-medium">
                    <a
                      href={`tel:${tenant.agent.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-ink"
                    >
                      {tenant.agent.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">
                    Email
                  </dt>
                  <dd className="mt-1 font-medium">
                    <a
                      href={`mailto:${tenant.agent.email}`}
                      className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-ink"
                    >
                      {tenant.agent.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">
                    Office
                  </dt>
                  <dd className="mt-1">
                    {tenant.agent.brokerage}
                    <br />
                    {tenant.agent.address}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">
                    License
                  </dt>
                  <dd className="mt-1">{tenant.agent.license}</dd>
                </div>
              </dl>

              <div className="mt-10 rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm text-muted">
                <p className="font-semibold text-ink">Hours</p>
                <p className="mt-2">
                  Monday through Saturday, 8 AM to 7 PM Pacific. Sundays by
                  appointment. Texts and emails get an answer the same day, every
                  day.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm text-muted">
                <p className="font-semibold text-ink">
                  Looking to buy?
                </p>
                <p className="mt-2">
                  Start with the{" "}
                  <a
                    href={tenant.listings.buyerQuestionnaireUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink hover:underline"
                  >
                    Buyer Questionnaire
                  </a>{" "}
                  and I will show up to our first conversation with a plan and
                  the right neighborhoods already pulled.
                </p>
              </div>

              <Border className="mt-8 pt-6">
                <p className="text-sm text-muted">
                  {tenant.agent.brokerageDisclosure}
                </p>
              </Border>
            </FadeIn>

            <FadeIn className="lg:col-span-7">
              <ContactForm />
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
