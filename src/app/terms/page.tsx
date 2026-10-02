import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms for using this website, including that using it does not create a brokerage relationship and that property information should be independently verified.",
  alternates: { canonical: "/terms" },
  openGraph: {
    ...baseOpenGraph,
    title: "Terms of Use",
    description: "The terms for using this website, including that using it does not create a brokerage relationship and that property information should be independently verified.",
    url: "/terms",
  },
};

export default function TermsPage() {
  const { agent } = tenant;
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      updated="October 2, 2026"
      intro={
        <p>
          By using this website you agree to these terms. If you do not agree,
          please do not use the site.
        </p>
      }
    >
      <h2>Who runs this site</h2>
      <p>
        This site is run by {agent.name}, a licensed Washington real estate
        broker with {agent.brokerage}. {agent.teamDisclosure}
      </p>

      <h2>Using this site does not make me your broker</h2>
      <p>
        Browsing this site, taking the quiz, or sending a message does not
        create an agency relationship or a brokerage relationship between you
        and me or {agent.brokerage}. A brokerage relationship begins only when
        I agree to it in writing. Washington law requires that I give you the
        pamphlet &ldquo;Real Estate Brokerage in Washington&rdquo; and get your
        acknowledgment before you sign a services agreement, and I will.
      </p>

      <h2>Information on this site</h2>
      <p>
        I work to keep what is on this site accurate and current, but it is
        provided for general information only. Market figures, school
        information, taxes, and property details change, and they are not
        guaranteed. Please verify anything that matters to a decision
        independently. Nothing on this site is legal, tax, or financial advice;
        for those, talk to a qualified attorney, tax professional, or lender.
      </p>
      <p>
        This site does not display listings from a multiple listing service.
        Property search links to the eXp Realty agent site, which has its own
        terms.
      </p>

      <h2>Opinions</h2>
      <p>{agent.opinionDisclaimer}</p>

      <h2>Content ownership</h2>
      <p>
        The writing, photographs, and design on this site belong to{" "}
        {tenant.brand.name} or are used with permission. You are welcome to
        share links to any page. Please do not copy or republish the content
        without asking.
      </p>

      <h2>Links to other sites</h2>
      <p>
        I link to other websites, such as questionnaires on Jotform, videos on
        YouTube, and public agencies. I do not control those sites and am not
        responsible for their content or practices.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please do not try to disrupt the site, access parts of it that are not
        public, or use automated tools to collect its content or anyone&apos;s
        contact details.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent the law allows, this site is provided as is, and I am
        not liable for losses that come from using it or relying on its general
        information. This does not limit any duty I owe you as your broker
        once a brokerage relationship exists.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Washington. Any
        dispute about them will be handled in the courts of Pierce County,
        Washington.
      </p>

      <h2>Privacy and accessibility</h2>
      <p>
        How I handle your information is in my{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/consumer-health-data">
          Consumer Health Data Privacy Policy
        </Link>
        . If anything on the site is hard to use, see my{" "}
        <Link href="/accessibility">Accessibility</Link> page for other ways to
        reach me.
      </p>

      <h2>Changes</h2>
      <p>
        I may update these terms. The date at the top shows when they last
        changed.
      </p>

      <h2>Contact</h2>
      <p>
        Call or text {agent.phone}, email {agent.email}, or write to{" "}
        {agent.address}.
      </p>
    </LegalPage>
  );
}
