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
      "Your Zestimate on your Bonney Lake house says $420K. A nearly identical home two streets over closed at $455K last month. Which number do you trust?",
    choices: [
      { label: "A", text: "The Zestimate; it updates daily" },
      { label: "B", text: "A CMA built from local closed sales" },
      { label: "C", text: "Split the difference and list at $437K" },
    ],
    correctIndex: 1,
    explanation:
      "Zestimates run 5 to 15 percent off, and they get worse on acreage, view lots, and anything unusual. I build a CMA from actual closed sales near you, adjusted for condition, layout, and what is moving this month.",
  },
  {
    scenario:
      "Your inspector finds a cracked foundation. The seller offers a $5,000 credit. What do you do?",
    choices: [
      { label: "A", text: "Take the credit; it covers the repair" },
      { label: "B", text: "Get a structural engineer's scope first" },
      { label: "C", text: "Walk away immediately" },
    ],
    correctIndex: 1,
    explanation:
      "Foundation work runs $8K to $30K and up. Until a structural engineer writes the scope, $5,000 is a guess. Get the real number, then go back to the table with it.",
  },
  {
    scenario:
      "Your Puyallup listing draws three offers on day one. One carries an escalation clause. What is your next move?",
    choices: [
      { label: "A", text: "Take the highest number on the table" },
      { label: "B", text: "Counter the escalation clause buyer" },
      {
        label: "C",
        text: "Set a deadline and ask all three for best and final",
      },
    ],
    correctIndex: 2,
    explanation:
      "Escalation clauses cap out. Best and final makes every buyer put their strongest number forward, and in this market you often land above where that cap would have stopped you.",
  },
  {
    scenario:
      "The appraisal comes in $25K under your accepted offer. What are your options?",
    choices: [
      { label: "A", text: "The deal is dead; start over" },
      {
        label: "B",
        text: "Renegotiate the price, add a seller concession, or cover the gap",
      },
      { label: "C", text: "Challenge the appraiser's license" },
    ],
    correctIndex: 1,
    explanation:
      "Low appraisals are routine in a fast market. You can renegotiate the price, ask the buyer to cover the gap, or send fresh comps to the lender for a reconsideration of value. I plan for this before the report ever lands.",
  },
  {
    scenario:
      "You are relocating to Pierce County from California. The listing agent on a North Tacoma house offers to represent you too. Do you take it?",
    choices: [
      { label: "A", text: "Yes, fewer people means less confusion" },
      {
        label: "B",
        text: "Get your own buyer's agent in the destination market",
      },
      { label: "C", text: "Only if they discount the commission" },
    ],
    correctIndex: 1,
    explanation:
      "That is dual agency: one agent working both sides. Moving into a market you have never lived in, you want someone whose only job is you, and who knows which Pierce County streets flood, where the school boundaries actually fall, and which contractors show up.",
  },
  {
    scenario:
      "Your Eatonville home needs roughly $15K of work before listing. Your agent says skip it. What is the right call?",
    choices: [
      { label: "A", text: "Fix everything before listing, always" },
      { label: "B", text: "Skip it all; buyers expect to negotiate" },
      {
        label: "C",
        text: "Fix what the comps say will return more than it costs",
      },
    ],
    correctIndex: 2,
    explanation:
      "Repairs earn their money back at wildly different rates. Paint and carpet can return three times the spend. A kitchen remodel right before listing often returns sixty cents on the dollar. I run the numbers room by room and tell you where the money goes.",
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
      await fetch(
        "https://script.google.com/macros/s/AKfycbzAfpXoCywT6p7YKOl3S0Uy50zbroCq3HErEp_U6t70kpBQmckXX-4j6z6C91quzBy4/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, email, source: "quiz" }),
        }
      );
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
      return "You know your stuff. Imagine that instinct with 270 closings behind it.";
    }
    if (score >= 3) {
      return "Solid footing. A couple of these trip up buyers and sellers who have done this twice already.";
    }
    return "These are exactly the moments where having the right agent changes the number on the closing statement.";
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
              Test your real estate IQ
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Six scenarios pulled straight out of Bonney Lake, Puyallup, North
              Tacoma, and Eatonville transactions. See how you would handle them.
              About four minutes.
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
                  Your score comes to me and nowhere else. I just want to know
                  who aced it.
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
                {firstName ? `Nice work, ${firstName}. ` : ""}Every one of these
                came out of a real Pierce County transaction I worked. The gap
                between a good outcome and a great one usually comes down to the
                agent standing next to you.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="btn-primary min-h-[44px]">
                  Let&apos;s have a conversation
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
