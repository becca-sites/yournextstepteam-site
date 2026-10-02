import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

export const metadata: Metadata = {
  title: "Real Estate IQ Quiz",
  description:
    "Six real scenarios out of Pierce and King County transactions. See how you would handle pricing, inspections, and negotiation. About four minutes, and nothing to fill out at the end.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    ...baseOpenGraph,
    title: "Real Estate IQ Quiz",
    description: "Six real scenarios out of Pierce and King County transactions. See how you would handle pricing, inspections, and negotiation. About four minutes, and nothing to fill out at the end.",
    url: "/quiz",
  },
};

/*
 * The breadcrumb JSON-LD lives here rather than in page.tsx because the quiz
 * page is a client component. Every schema component gates on
 * isPlaceholderMode(), which reads a server-only env var, so rendering one from
 * a client component would suppress it permanently. This layout is a server
 * component, so the guard works as intended.
 */
export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Real Estate IQ Quiz", url: "/quiz" },
        ]}
      />
      {children}
    </>
  );
}
