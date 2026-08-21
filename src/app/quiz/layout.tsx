import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate IQ Quiz",
  description:
    "Six real scenarios from Bonney Lake, Puyallup, North Tacoma, and Eatonville transactions. See how you would handle pricing, inspections, and negotiation.",
  alternates: { canonical: "/quiz" },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
