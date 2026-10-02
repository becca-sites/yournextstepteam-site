import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { tenant } from "@/config/tenant";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How this site is built to be usable by everyone, the standard I work to, its known limitations, and how to reach me for help another way.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    ...baseOpenGraph,
    title: "Accessibility",
    description: "How this site is built to be usable by everyone, the standard I work to, its known limitations, and how to reach me for help another way.",
    url: "/accessibility",
  },
};

/*
 * Wording follows the footer requirements report: "I strive to conform", never
 * "fully compliant" or "ADA compliant", known limitations stated plainly, and
 * an explicit alternative means of access, which is the part that matters most
 * for a brokerage. Update the "Last reviewed" date whenever the site is
 * actually re-checked, not on every deploy.
 */
export default function AccessibilityPage() {
  const { agent } = tenant;
  return (
    <LegalPage
      title="Accessibility"
      path="/accessibility"
      updated="October 2, 2026"
      intro={
        <p>
          I want every visitor to be able to use this site, and I know that
          matters especially to the clients I serve most often.
        </p>
      }
    >
      <h2>The standard I work to</h2>
      <p>
        I work to conform to the Web Content Accessibility Guidelines (WCAG)
        2.2 at Level AA, and I hold text contrast to the stricter Level AAA
        standard. I review the site when it changes and test it at desktop and
        phone sizes. I do not claim the site is perfect.
      </p>

      <h2>What I have built in</h2>
      <ul>
        <li>
          Body text is 18 pixels, and nothing you read as a sentence is smaller
          than 16 pixels.
        </li>
        <li>
          Text meets a contrast ratio of at least 7 to 1 against its
          background, so it stays readable on a dim screen or in bright light.
        </li>
        <li>
          Lines of text are kept to a comfortable length, about 66 characters.
        </li>
        <li>
          Buttons and links you tap are at least 44 pixels tall wherever they
          stand on their own.
        </li>
        <li>
          Everything can be reached with a keyboard, and the item you are on is
          always marked with a clearly visible outline.
        </li>
        <li>
          If your device is set to reduce motion, moving sections stop moving
          and show their content as plain text instead.
        </li>
        <li>
          The site works with browser zoom and with screen readers, and images
          that carry meaning have text descriptions.
        </li>
      </ul>

      <h2>Known limitations</h2>
      <p>Some things are not fully under my control or are not yet fixed:</p>
      <ul>
        <li>
          The buyer and seller questionnaires are hosted by Jotform, embedded
          videos by YouTube, and the property search on the eXp Realty agent
          site. These may not fully conform. I raise accessibility with those
          providers.
        </li>
        <li>
          The &ldquo;Brokered by&rdquo; identification line at the top of each
          page is set in small type. The same information appears in larger
          type at the bottom of every page.
        </li>
      </ul>

      <h2>Get help another way</h2>
      <p>
        If any part of this site is difficult or impossible for you to use,
        please tell me and I will get you the information another way.
      </p>
      <ul>
        <li>
          Call or text <strong>{agent.phone}</strong>
        </li>
        <li>
          Email <strong>{agent.email}</strong>
        </li>
        <li>
          Write to <strong>{agent.address}</strong>
        </li>
      </ul>
      <p>I will respond within one business day.</p>
      <p>
        I am glad to walk you through any listing over the phone, send
        property details in a format that works for you, read documents aloud,
        arrange a showing by phone, or meet in person instead. You never have
        to use this website to work with me.
      </p>
      <p>Washington Relay Service: dial 711.</p>

      <p>Last reviewed: October 2, 2026.</p>
    </LegalPage>
  );
}
