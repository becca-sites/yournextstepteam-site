"use client";

import { useState } from "react";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";

interface QuizQuestion {
  scenario: string;
  choices: { label: string; text: string }[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    scenario:
      "Your Zestimate says $420K. A nearly identical home two streets over just sold for $455K. What should you trust?",
    choices: [
      { label: "A", text: "Go with the Zestimate — it updates daily" },
      { label: "B", text: "Ask for a CMA from a local agent" },
      { label: "C", text: "Split the difference and list at $437K" },
    ],
    correctIndex: 1,
    explanation:
      "Zestimates can be off by 5-15%. A CMA uses actual comparable sales, adjustments for condition, and current market momentum.",
  },
  {
    scenario:
      "Your inspector finds a cracked foundation. The seller is offering a $5,000 credit. What do you do?",
    choices: [
      { label: "A", text: "Take the credit — it covers the repair" },
      { label: "B", text: "Get a structural engineer's estimate first" },
      { label: "C", text: "Walk away immediately" },
    ],
    correctIndex: 1,
    explanation:
      "Foundation repairs can run $8K to $30K+. Without a structural engineer's scope, $5K is a guess. Get the real number, then negotiate.",
  },
  {
    scenario:
      "You get three offers on day one. One has an escalation clause. What is your next move?",
    choices: [
      { label: "A", text: "Take the highest number" },
      { label: "B", text: "Counter the escalation clause buyer" },
      {
        label: "C",
        text: "Set a deadline and ask all three for best and final",
      },
    ],
    correctIndex: 2,
    explanation:
      "Escalation clauses cap out. Best-and-final lets every buyer put their strongest number forward. You often end up higher than the escalation cap.",
  },
  {
    scenario:
      "The appraisal comes in $25K below your accepted offer. What can you do?",
    choices: [
      { label: "A", text: "The deal is dead — start over" },
      {
        label: "B",
        text: "Negotiate a price reduction, seller concession, or appraisal gap coverage",
      },
      { label: "C", text: "Sue the appraiser" },
    ],
    correctIndex: 1,
    explanation:
      "Low appraisals happen in fast-moving markets. There are multiple paths forward: renegotiate the price, ask the buyer to cover the gap, or provide additional comps to the lender for a reconsideration of value.",
  },
  {
    scenario:
      "You are relocating from California. An agent there offers to handle both sides of the deal. Should you accept?",
    choices: [
      { label: "A", text: "Yes — fewer people means less confusion" },
      {
        label: "B",
        text: "No — get your own buyer's agent in the destination market",
      },
      { label: "C", text: "Only if they discount the commission" },
    ],
    correctIndex: 1,
    explanation:
      "Dual agency means one agent represents both sides. In Washington State, you want your own advocate who knows Pierce County neighborhoods, school districts, flood zones, and local contractors.",
  },
  {
    scenario:
      "Your home needs about $15K in repairs before listing. Your agent says to skip them. What is the right call?",
    choices: [
      { label: "A", text: "Always fix everything before listing" },
      { label: "B", text: "Skip repairs — buyers expect to negotiate" },
      {
        label: "C",
        text: "Fix what the CMA says will return more than it costs",
      },
    ],
    correctIndex: 2,
    explanation:
      "Not every repair earns its money back. A smart agent runs the numbers: paint and carpet might return 3x, but a kitchen remodel might only return 60 cents on the dollar.",
  },
];

type Phase = "gate" | "quiz" | "results";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("gate");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("https://hook.us2.make.com/placeholder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, source: "quiz" }),
      });
    } catch {
      // Proceed even if webhook fails
    }
    setSubmitting(false);
    setPhase("quiz");
  }

  function handleAnswer(index: number) {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === QUESTIONS[currentQ].correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setPhase("results");
    }
  }

  function getResultMessage() {
    if (score >= 5) {
      return "You know your stuff. Imagine having that instinct working for you.";
    }
    if (score >= 3) {
      return "Solid foundation. A few of these scenarios trip up even experienced buyers and sellers.";
    }
    return "These are the situations where the right agent makes all the difference.";
  }

  const progressPercent =
    phase === "results"
      ? 100
      : phase === "quiz"
        ? ((currentQ + (showExplanation ? 1 : 0)) / QUESTIONS.length) * 100
        : 0;

  return (
    <>
      {/* Hero bar */}
      <section className="bg-[var(--color-surface)] py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-moss)]">
              Real Estate IQ Quiz
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Test Your Real Estate IQ
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Six real scenarios from the Pierce County market. See how you
              would handle them.
            </p>
          </div>
        </Container>
      </section>

      {/* Progress bar */}
      {phase !== "gate" && (
        <div className="h-1 bg-neutral-200">
          <div
            className="h-1 bg-[var(--color-moss)] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Lead Gate */}
      {phase === "gate" && (
        <section className="bg-white py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-md">
              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="quiz-first-name"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    First name
                  </label>
                  <input
                    id="quiz-first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-black/10 bg-[var(--color-surface)] px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-[var(--color-moss)] focus:ring-2 focus:ring-[var(--color-moss)]/20"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quiz-email"
                    className="block text-sm font-medium text-neutral-700"
                  >
                    Email
                  </label>
                  <input
                    id="quiz-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 block w-full min-h-[44px] rounded-xl border border-black/10 bg-[var(--color-surface)] px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-[var(--color-moss)] focus:ring-2 focus:ring-[var(--color-moss)]/20"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full min-h-[44px] disabled:opacity-60"
                >
                  {submitting ? "Starting..." : "Start the quiz"}
                </button>
                <p className="text-center text-xs text-neutral-400">
                  No spam. We just want to know who aced it.
                </p>
              </form>
            </div>
          </Container>
        </section>
      )}

      {/* Quiz */}
      {phase === "quiz" && (
        <section className="bg-white py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-2xl">
              <p className="font-mono text-xs tracking-widest text-[var(--color-moss)]">
                Question {currentQ + 1} of {QUESTIONS.length}
              </p>
              <h2 className="mt-4 font-display text-xl font-semibold leading-snug md:text-2xl">
                {QUESTIONS[currentQ].scenario}
              </h2>
              <div className="mt-8 space-y-3">
                {QUESTIONS[currentQ].choices.map((choice, idx) => {
                  const isCorrect =
                    idx === QUESTIONS[currentQ].correctIndex;
                  const isSelected = idx === selectedAnswer;

                  let choiceClasses =
                    "flex min-h-[44px] w-full cursor-pointer items-start gap-3 rounded-xl border p-4 text-left text-base transition";

                  if (showExplanation) {
                    if (isCorrect) {
                      choiceClasses +=
                        " border-[var(--color-moss)] bg-[var(--color-moss)]/10 text-neutral-900";
                    } else if (isSelected && !isCorrect) {
                      choiceClasses +=
                        " border-red-300 bg-red-50 text-neutral-900";
                    } else {
                      choiceClasses +=
                        " border-black/5 bg-neutral-50 text-neutral-400";
                    }
                  } else {
                    choiceClasses +=
                      " border-black/10 bg-[var(--color-surface)] hover:border-[var(--color-moss)] hover:bg-[var(--color-moss)]/5";
                  }

                  return (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => handleAnswer(idx)}
                      disabled={showExplanation}
                      className={choiceClasses}
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                        {choice.label}
                      </span>
                      <span>{choice.text}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="mt-6 rounded-2xl border border-[var(--color-moss)]/20 bg-[var(--color-moss)]/5 p-6">
                  <p className="text-sm font-semibold text-[var(--color-moss)]">
                    {selectedAnswer === QUESTIONS[currentQ].correctIndex
                      ? "Correct."
                      : "Not quite."}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {QUESTIONS[currentQ].explanation}
                  </p>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary mt-5 min-h-[44px]"
                  >
                    {currentQ < QUESTIONS.length - 1
                      ? "Next question"
                      : "See your results"}
                  </button>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Results */}
      {phase === "results" && (
        <section className="bg-white py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="display-num text-6xl font-bold text-[var(--color-moss)] md:text-8xl">
                {score}/{QUESTIONS.length}
              </p>
              <h2 className="mt-6 font-display text-2xl font-semibold md:text-3xl">
                {getResultMessage()}
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                {firstName ? `Nice work, ${firstName}. ` : ""}Every one of
                these scenarios comes from a real transaction in Pierce County.
                The difference between a good outcome and a great one is often
                the agent standing next to you.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="btn-primary min-h-[44px]">
                  Ready for a real conversation?
                </Link>
                <a
                  href={tenant.listings.buyerQuestionnaireUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost min-h-[44px]"
                >
                  Take the Buyer Questionnaire
                </a>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
