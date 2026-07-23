import type { Metadata } from "next";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

export const metadata: Metadata = {
  title: "Buyer Questionnaire",
  description: `Tell ${tenant.agent.firstName} what you are looking for. Timeline, budget, must-haves, and deal-breakers.`,
  alternates: { canonical: "/buyers/questionnaire" },
};

const QUESTIONS = [
  {
    id: "timeline",
    label: "When are you hoping to move?",
    type: "select" as const,
    options: [
      "As soon as possible",
      "Within 3 months",
      "3 to 6 months",
      "6 to 12 months",
      "Just exploring",
    ],
  },
  {
    id: "budget",
    label: "What is your comfortable price range?",
    type: "select" as const,
    options: [
      "Under $350,000",
      "$350,000 to $500,000",
      "$500,000 to $700,000",
      "$700,000 to $1,000,000",
      "Over $1,000,000",
      "Not sure yet",
    ],
  },
  {
    id: "situation",
    label: "Which best describes your situation?",
    type: "select" as const,
    options: [
      "Downsizing from a larger home",
      "Relocating to be closer to family",
      "First-time home buyer",
      "Looking for an aging-in-place home",
      "Buying as part of a sell-and-buy",
      "Other",
    ],
  },
  {
    id: "single-level",
    label: "Do you need a single-level home?",
    type: "select" as const,
    options: [
      "Yes, single-level only",
      "Prefer single-level, but open to options",
      "No preference",
    ],
  },
  {
    id: "areas",
    label: "Which areas interest you?",
    type: "text" as const,
    placeholder: "e.g. Bonney Lake, Puyallup, Tacoma, open to suggestions",
  },
  {
    id: "must-haves",
    label: "Must-haves (things you will not compromise on)",
    type: "textarea" as const,
    placeholder: "e.g. attached garage, walk-in shower, close to medical care",
  },
  {
    id: "deal-breakers",
    label: "Deal-breakers (things that would rule a home out)",
    type: "textarea" as const,
    placeholder: "e.g. steep driveway, far from grocery stores, HOA restrictions",
  },
  {
    id: "pre-approved",
    label: "Are you pre-approved for a mortgage?",
    type: "select" as const,
    options: [
      "Yes, I am pre-approved",
      "Working on it",
      "No, I need a lender recommendation",
      "Paying cash",
    ],
  },
  {
    id: "name",
    label: "Your name",
    type: "text" as const,
    placeholder: "Full name",
  },
  {
    id: "email",
    label: "Email",
    type: "text" as const,
    placeholder: "you@example.com",
  },
  {
    id: "phone",
    label: "Phone (optional)",
    type: "text" as const,
    placeholder: "(555) 555-0100",
  },
  {
    id: "notes",
    label: "Anything else we should know?",
    type: "textarea" as const,
    placeholder: "Tell us about your situation, timeline, or questions.",
  },
];

export default function BuyerQuestionnairePage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Buyers", url: "/buyers" },
          { name: "Buyer Questionnaire", url: "/buyers/questionnaire" },
        ]}
      />
      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <Container>
          <FadeIn>
            <p className="eyebrow">For buyers</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Buyer Questionnaire
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-neutral-600 md:text-xl">
              Tell us what you are looking for. Timeline, budget, must-haves,
              and deal-breakers. {tenant.agent.firstName} reviews every
              submission personally and comes back with a plan.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <FadeIn className="mx-auto max-w-2xl">
            <form className="space-y-8">
              {QUESTIONS.map((q) => (
                <div key={q.id}>
                  <label
                    htmlFor={q.id}
                    className="block font-display text-base font-semibold text-neutral-950"
                  >
                    {q.label}
                  </label>
                  {q.type === "select" && (
                    <select
                      id={q.id}
                      name={q.id}
                      className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 transition focus:border-[var(--color-moss)] focus:ring-2 focus:ring-[var(--color-moss)]/20 focus:outline-none"
                    >
                      <option value="">Select one</option>
                      {q.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                  {q.type === "text" && (
                    <input
                      type={q.id === "email" ? "email" : q.id === "phone" ? "tel" : "text"}
                      id={q.id}
                      name={q.id}
                      placeholder={q.placeholder}
                      className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-[var(--color-moss)] focus:ring-2 focus:ring-[var(--color-moss)]/20 focus:outline-none"
                    />
                  )}
                  {q.type === "textarea" && (
                    <textarea
                      id={q.id}
                      name={q.id}
                      rows={3}
                      placeholder={q.placeholder}
                      className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-[var(--color-moss)] focus:ring-2 focus:ring-[var(--color-moss)]/20 focus:outline-none"
                    />
                  )}
                </div>
              ))}

              <div className="pt-4">
                <button type="submit" className="btn-primary w-full text-center">
                  Submit questionnaire
                </button>
                <p className="mt-4 text-center text-sm text-neutral-500">
                  {tenant.agent.firstName} reviews every submission personally.
                  You will hear back within one business day.
                </p>
              </div>
            </form>

            <div className="mt-12 rounded-2xl border border-black/5 bg-[var(--color-surface)] p-6 text-sm text-neutral-600">
              <p className="font-semibold text-neutral-950">
                Prefer to talk instead?
              </p>
              <p className="mt-2">
                Call{" "}
                <a
                  href={`tel:${tenant.agent.phone}`}
                  className="font-medium text-[var(--color-moss)] hover:underline"
                >
                  {tenant.agent.phone}
                </a>{" "}
                or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[var(--color-moss)] hover:underline"
                >
                  book a consultation
                </Link>
                .
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
