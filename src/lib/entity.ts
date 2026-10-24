import shared from "@/data/becca-pitts.entity.json";

/**
 * The cross-site entity ids, and the one Person node for Becca.
 *
 * src/data/becca-pitts.entity.json is byte-identical in this repo and in
 * burienbestcarehome-site. Both sites emit the same Person under the same @id,
 * so search engines see one person who runs both businesses rather than two
 * people who share a name. Edit the file in both repos together, then compare
 * checksums (sha256sum src/data/becca-pitts.entity.json) before shipping.
 *
 * The ids are absolute on the www host on purpose, not built from
 * resolveSiteUrl(): an entity id has to be the same string on every deploy and
 * on the other site, including previews.
 */
export const PERSON_ID = "https://www.yournextstepteam.com/#becca-pitts";
export const TEAM_ID = "https://www.yournextstepteam.com/#team";
export const BROKERAGE_ID = "https://www.yournextstepteam.com/#exp-realty";
export const WEBSITE_ID = "https://www.yournextstepteam.com/#website";
export const CARE_HOME_ID = "https://www.burienbestcarehome.com/#organization";
export const DANIELA_ID = "https://www.burienbestcarehome.com/#daniela-torkelson";

export const PERSON_NODE = shared.person;
export const BROKERAGE_NODE = shared.brokerage;

/**
 * The counties Becca actually works, named as administrative areas alongside
 * the town list, so a King or Thurston County searcher is not told they are
 * out of range.
 */
export const SERVICE_COUNTIES = [
  "Pierce County, Washington",
  "King County, Washington",
  "Thurston County, Washington",
  "Kitsap County, Washington",
  "Mason County, Washington",
  "Lewis County, Washington",
];
