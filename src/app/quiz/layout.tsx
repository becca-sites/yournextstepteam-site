import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate IQ Quiz",
  description:
    "Six real scenarios from the Pierce County market. See how you would handle pricing, inspections, and negotiations.",
  alternates: { canonical: "/quiz" },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
