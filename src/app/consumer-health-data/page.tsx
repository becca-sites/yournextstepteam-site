import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { tenant } from "@/config/tenant";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Consumer Health Data Privacy Policy",
  description:
    "How I handle consumer health data under Washington's My Health My Data Act: what I collect, why, who it is shared with, and your rights.",
  alternates: { canonical: "/consumer-health-data" },
  openGraph: {
    ...baseOpenGraph,
    title: "Consumer Health Data Privacy Policy",
    description: "How I handle consumer health data under Washington's My Health My Data Act: what I collect, why, who it is shared with, and your rights.",
    url: "/consumer-health-data",
  },
};

/*
 * Washington My Health My Data Act, chapter 19.373 RCW.
 *
 * RCW 19.373.020 requires this policy, prominently linked from the homepage and
 * separate from the general privacy policy, and limits it to the disclosures
 * the Act asks for: categories collected and why, sources, categories shared,
 * the third parties and specific affiliates it is shared with, and how to
 * exercise the consumer's rights. Keep it to those. Do not fold it into
 * /privacy and do not add marketing to it.
 *
 * Accurate to the forms as of the date below. In particular both Jotform
 * questionnaires ask about food allergies, which is health information on its
 * face, and the on-site buyer questionnaire asks about single-level and
 * aging-in-place needs. The cleanest mitigation is to stop asking those in web
 * forms; if the questions change, change this page to match.
 *
 * Attorney review recommended before relying on this (footer requirements
 * report, attorney-review item 1).
 */
export default function ConsumerHealthDataPage() {
  const { agent } = tenant;
  return (
    <LegalPage
      title="Consumer Health Data Privacy Policy"
      path="/consumer-health-data"
      updated="October 2, 2026"
      intro={
        <p>
          This policy is required by Washington&apos;s My Health My Data Act
          and covers only consumer health data. My general{" "}
          <a href="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </a>{" "}
          covers everything else.
        </p>
      }
    >
      <h2>Consumer health data I collect, and why</h2>
      <p>
        I do not ask for medical records or diagnoses. Some of the questions I
        ask when you are buying or selling a home can reveal or suggest
        something about your health, and I treat those answers as consumer
        health data:
      </p>
      <ul>
        <li>
          <strong>Mobility and accessibility needs</strong>, such as whether you
          need a single-level home or are looking for a home suited to aging in
          place. I use this to find and show you homes that will work for you.
        </li>
        <li>
          <strong>Food allergies</strong>, which my buyer and seller
          questionnaires ask about so that any refreshments or thank-you gifts
          I give you are safe. I use this for nothing else.
        </li>
        <li>
          <strong>Anything you choose to tell me</strong> in an open text box,
          an email, or a conversation about health, care needs, or the reason
          for a move, such as a move into assisted living or an adult family
          home. I use it only to help with the move you asked for.
        </li>
      </ul>

      <h2>Where it comes from</h2>
      <ul>
        <li>Directly from you, through my forms, by email, phone, or text.</li>
        <li>
          From a family member or someone authorized to act for you, such as a
          person holding power of attorney, when they contact me on your behalf.
        </li>
      </ul>

      <h2>Consumer health data I share, and with whom</h2>
      <p>
        I do not sell consumer health data. The categories listed above may be
        shared with:
      </p>
      <ul>
        <li>
          <strong>Service providers that process it for me</strong>: Jotform
          (questionnaires), Google (email, and Google Apps Script and Google
          Sheets for form submissions), and BoldTrail (client records).
        </li>
        <li>
          <strong>{agent.brokerage}</strong>, the licensed firm Becca works
          under, as part of its required supervision and transaction records.
        </li>
        <li>
          <strong>People involved in your transaction</strong>, such as the
          other party&apos;s broker or an inspector, only when it is needed for
          what you asked me to do, for example to ask about a home&apos;s
          accessibility features.
        </li>
      </ul>
      <p>
        <strong>Affiliates.</strong> I co-own Burien Best Care Home, an
        adult family home. I do not share your consumer health data with it,
        or with any other affiliate, unless you ask me to.
      </p>

      <h2>Your rights</h2>
      <p>Under the My Health My Data Act you have the right to:</p>
      <ul>
        <li>
          confirm whether I collect, share, or sell your consumer health data,
          and get a copy of it along with a list of every third party and
          affiliate I have shared it with;
        </li>
        <li>withdraw your consent to my collecting and sharing it; and</li>
        <li>have it deleted.</li>
      </ul>
      <p>
        To use any of these rights, contact me by phone or text at{" "}
        {agent.phone}, by email at {agent.email}, or by mail at{" "}
        {agent.address}. I will
        respond within 45 days. If I decline your request, you can appeal by
        replying to my decision, and I will answer the appeal in writing. If
        you are not satisfied with the result of an appeal, you can contact the
        Washington State Attorney General at atg.wa.gov.
      </p>
    </LegalPage>
  );
}
