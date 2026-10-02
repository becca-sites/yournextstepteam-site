import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/metadata";
import { tenant } from "@/config/tenant";
import { LegalPage } from "@/components/LegalPage";
import { EqualHousingMark } from "@/components/global/ComplianceMarks";

export const metadata: Metadata = {
  title: "Fair Housing",
  description:
    "My commitment to equal housing opportunity under the federal Fair Housing Act and the Washington Law Against Discrimination, and where to file a complaint.",
  alternates: { canonical: "/fair-housing" },
  openGraph: {
    ...baseOpenGraph,
    title: "Fair Housing",
    description: "My commitment to equal housing opportunity under the federal Fair Housing Act and the Washington Law Against Discrimination, and where to file a complaint.",
    url: "/fair-housing",
  },
};

/*
 * The protected classes below are Washington's actual statutory list from RCW
 * 49.60.222(1), with the definitional expansions from RCW 49.60.040. Two items
 * that circulate in industry lists are deliberately absent because they are not
 * real estate protected classes under that statute: source of income (RCW
 * 59.18.255, rentals only) and HIV or hepatitis C status (RCW 49.60.172,
 * employment only). Do not add them here. See the footer requirements report.
 */
export default function FairHousingPage() {
  const { agent } = tenant;
  return (
    <LegalPage
      title="Fair Housing"
      path="/fair-housing"
      updated="October 2, 2026"
      intro={
        <div className="flex items-start gap-4">
          <EqualHousingMark className="mt-1 h-10 w-10 shrink-0 text-ink" />
          <p>
            Equal Housing Opportunity. I am committed to the letter and the
            spirit of U.S. policy for the achievement of equal housing
            opportunity throughout the nation.
          </p>
        </div>
      }
    >
      <p>
        I do business in accordance with the federal Fair Housing Act and the
        Washington Law Against Discrimination. Everyone I work with gets the
        same service, the same information, and the same access to homes.
      </p>

      <h2>Federal law</h2>
      <p>
        The federal Fair Housing Act prohibits discrimination in housing because
        of race, color, religion, sex, national origin, familial status, or
        disability.
      </p>

      <h2>Washington law</h2>
      <p>
        Washington&apos;s Law Against Discrimination (RCW 49.60.222) goes
        further. It prohibits discrimination in real estate transactions because
        of:
      </p>
      <ul>
        <li>sex</li>
        <li>marital status</li>
        <li>
          sexual orientation, which under Washington law includes gender
          expression and gender identity
        </li>
        <li>
          race, including traits historically associated with race such as hair
          texture and protective hairstyles
        </li>
        <li>creed</li>
        <li>color</li>
        <li>national origin</li>
        <li>citizenship or immigration status</li>
        <li>
          families with children status, which includes anyone who is pregnant
          or in the process of securing legal custody of a child
        </li>
        <li>honorably discharged veteran or military status</li>
        <li>
          the presence of any sensory, mental, or physical disability, whether
          actual, a matter of record, or perceived
        </li>
        <li>
          the use of a trained dog guide or service animal by a person with a
          disability
        </li>
      </ul>
      <p>
        If you have a disability and need a reasonable accommodation in how I
        work with you, tell me and I will make it.
      </p>

      <h2>Local protections</h2>
      <p>
        City and county ordinances in the communities I serve may provide
        additional protections beyond state and federal law.
      </p>

      <h2>If you believe you have experienced discrimination</h2>
      <p>You can file a complaint with either agency:</p>
      <ul>
        <li>
          <strong>Washington State Human Rights Commission</strong>,{" "}
          <a href="https://www.hum.wa.gov/">hum.wa.gov</a>, 1-800-233-3247. A
          complaint must generally be filed within one year of the
          discrimination.
        </li>
        <li>
          <strong>U.S. Department of Housing and Urban Development</strong>,{" "}
          <a href="https://www.hud.gov/fairhousing">hud.gov/fairhousing</a>,
          1-800-669-9777.
        </li>
      </ul>
      <p>
        You are also welcome to raise a concern with me directly: call or text{" "}
        {agent.phone} or email {agent.email}.
      </p>
    </LegalPage>
  );
}
