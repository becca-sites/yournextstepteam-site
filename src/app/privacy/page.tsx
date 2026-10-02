import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import Link from "next/link";
import { tenant } from "@/config/tenant";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information this site collects, why, who it is shared with, and how to ask me to see, correct, or delete it.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    ...baseOpenGraph,
    title: "Privacy Policy",
    description: "What information this site collects, why, who it is shared with, and how to ask me to see, correct, or delete it.",
    url: "/privacy",
  },
};

/*
 * This describes what the site actually does as of the date below, checked
 * against the code and the live pages, not a template:
 *
 * - On-site forms (contact, quiz, home value) post to a Google Apps Script
 *   endpoint that writes to Google Sheets, and leads may be entered in the
 *   BoldTrail CRM.
 * - The buyer and seller questionnaires are hosted by Jotform.
 * - Hosting is Vercel. No analytics, advertising pixel, or session recording
 *   loads on the live site today (GA4/GTM IDs are unset placeholders; no Meta
 *   Pixel; no Clarity).
 *
 * If any of that changes, in particular if an analytics tag, a Meta Pixel, or
 * session recording is switched on, this page has to be updated BEFORE the tag
 * goes live, and the cookies section rewritten. A pixel next to the
 * questionnaires is the combination the My Health My Data Act cares about.
 */
export default function PrivacyPage() {
  const { agent } = tenant;
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="October 2, 2026"
      intro={
        <p>
          This policy explains what information {tenant.brand.name} collects
          through this website, why, and what I do with it. It is written to
          be read, not skimmed past.
        </p>
      }
    >
      <h2>Who I am</h2>
      <p>
        {tenant.brand.name} is the real estate practice of {agent.name}, a
        licensed Washington real estate broker with {agent.brokerage}. When
        this policy says &ldquo;I&rdquo; or &ldquo;me,&rdquo; it means Becca
        and the people who work with her on your transaction.
      </p>

      <h2>What I collect</h2>
      <p>
        <strong>What you give me.</strong> When you fill in a form on this site
        or on a questionnaire I link to, I collect what you type: usually your
        name, email address, and phone number, and whatever you tell me about
        the home you want to buy or sell, your timeline, your budget, and your
        situation. If you take the Real Estate IQ Quiz, I collect your first
        name, email, and quiz answers. If you request a home value, I collect
        the address.
      </p>
      <p>
        <strong>What your browser sends.</strong> Like every website, the
        servers that host this site receive technical information with each
        visit: your IP address, browser and device type, the pages you
        requested, and the time. This is used to run and secure the site.
      </p>
      <p>
        I do not currently use analytics, advertising pixels, or session
        recording on this site. If I add any, I will update this policy
        first.
      </p>

      <h2>Why I use it</h2>
      <ul>
        <li>To answer your questions and follow up on your request.</li>
        <li>
          To provide real estate services you ask for, such as preparing a
          market analysis or setting up a home search.
        </li>
        <li>
          To send you information you asked to receive. You can stop it at any
          time.
        </li>
        <li>To keep the site secure and working.</li>
        <li>
          To keep the records Washington law requires a real estate broker to
          keep.
        </li>
      </ul>

      <h2>Text messages and calls</h2>
      <p>
        I only text you if you agreed to it, for example by checking the box
        on the contact form. Consent is not a condition of working with me.
        Message frequency varies, and message and data rates may apply. Reply
        STOP to any text to opt out, or HELP for help. I honor opt-outs
        however you send them.
      </p>

      <h2>Who I share it with</h2>
      <p>I do not sell your personal information. I share it only:</p>
      <ul>
        <li>
          <strong>With service providers</strong> who help me run the practice
          and only for that purpose: Google (Google Workspace email, and Google
          Apps Script and Google Sheets, which receive this site&apos;s form
          submissions), Jotform (which hosts my buyer and seller
          questionnaires), BoldTrail (my client relationship software), and
          Vercel (which hosts this website).
        </li>
        <li>
          <strong>With {agent.brokerage}</strong>, the licensed firm Becca
          works under, which is required to supervise and keep records of
          transactions.
        </li>
        <li>
          <strong>With people involved in your transaction</strong>, such as a
          lender, escrow company, inspector, or the other party&apos;s broker,
          only when you are working with me and it is needed for your
          transaction or you ask me to.
        </li>
        <li>
          <strong>When the law requires it</strong>, or to protect someone&apos;s
          safety.
        </li>
      </ul>
      <p>
        I also co-own Burien Best Care Home, an adult family home. I do
        not share your information with it unless you ask me to.
      </p>

      <h2>Third-party sites</h2>
      <p>
        My questionnaires are on Jotform, some videos are embedded from
        YouTube, and property search happens on the eXp Realty LLC agent site. Those
        services have their own privacy policies, which apply when you use
        them. YouTube may set cookies when you play a video.
      </p>

      <h2>Cookies</h2>
      <p>
        This site does not set advertising or tracking cookies. Embedded
        services such as YouTube may set their own when you use them.
      </p>

      <h2>How long I keep it</h2>
      <p>
        I keep inquiries for as long as I am in touch with you about real
        estate, and transaction records for as long as Washington law requires
        a broker to keep them. After that I delete them.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask me to tell you what information I have about you, to
        correct it, or to delete it, and you can ask me to stop contacting you.
        Contact me using any of the ways below. I will respond within 30 days,
        and I may need to keep some records the law requires me to keep.
      </p>

      <h2>Health information</h2>
      <p>
        Washington&apos;s My Health My Data Act has its own rules for
        information about health. How I handle it is described in my
        separate{" "}
        <Link href="/consumer-health-data">Consumer Health Data Privacy Policy</Link>.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed to children under 13, and I do not knowingly
        collect information from them.
      </p>

      <h2>Security</h2>
      <p>
        I use reputable service providers and limit who can see your
        information. No system is perfectly secure, so please do not send
        account numbers or Social Security numbers through a website form.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If I change how I handle information, I will update this page and
        the date at the top.
      </p>

      <h2>Contact</h2>
      <p>
        {agent.name}, {tenant.brand.name}
        <br />
        Call or text {agent.phone}
        <br />
        Email {agent.email}
        <br />
        {agent.address}
      </p>
    </LegalPage>
  );
}
