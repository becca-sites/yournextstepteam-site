import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "@/lib/content";

/**
 * Area pages: the hub-and-spoke "Areas" section.
 *
 * Content lives in content/areas/<slug>.json, one file per city, so the
 * build-time overlap check (scripts/check-area-overlap.mjs) reads exactly what
 * the pages render. Field names follow the eight-block model in the SEO plan.
 *
 * THE CONTENT GATE. An area page exists on the site only if it clears every
 * check in areaGateFailures(): marked published, at least one real case study
 * that is a published post in content/blog, and a first-hand "what I know"
 * block of at least 300 words. A page that fails is not rendered (404), not in
 * the hub, not in the nav, not in the sitemap, and not linked from anywhere.
 * That is deliberate. Thin city pages are the doorway pattern, and the penalty
 * lands on the whole cluster. Never pad a page to get it through the gate; the
 * gate exists because case studies supply local knowledge that cannot be
 * researched.
 */

export interface AreaCaseStudy {
  /** Slug of a published post in content/blog. */
  slug: string;
  /** One line, at most about 120 characters. */
  situation: string;
  /** One line, at most about 120 characters. */
  outcome: string;
}

export interface AreaFaq {
  question: string;
  /** 40 to 80 words, direct answer in the first sentence. */
  answer: string;
}

export interface AreaSubArea {
  name: string;
  note: string;
  href?: string;
}

export interface AreaLink {
  href: string;
  label: string;
  note: string;
}

export interface AreaMarketSnapshot {
  /** "Month Year". Required: undated numbers do not ship. */
  asOf: string;
  source: string;
  figures: { label: string; value: string }[];
}

export interface Area {
  slug: string;
  city: string;
  county: string;
  published: boolean;
  /** Internal only, never rendered. Why a held page is held. */
  heldReason?: string;
  title: string;
  metaDescription: string;
  h1: string;
  /** Block 1: 75 to 150 words, with at least one specific, checkable fact. */
  orientation: string;
  /** Block 2: first-hand experience, 300 words minimum. */
  experienceHeading: string;
  experience: string[];
  /** Block 3: senior and care-transition practicalities. */
  seniorHeading: string;
  senior: string[];
  /** Block 4: at least one, or the page does not ship. */
  caseStudies: AreaCaseStudy[];
  /** Block 5: omitted unless it can be dated, sourced, and kept current. */
  marketSnapshot: AreaMarketSnapshot | null;
  /** Block 6. */
  faqs: AreaFaq[];
  /** Block 7. */
  subAreas: AreaSubArea[];
  /** Guides, blog posts, and the rare genuinely related sibling area. */
  related: AreaLink[];
  ogImage?: { url: string; width: number; height: number; alt: string };
  datePublished: string;
  dateModified: string;
}

const AREAS_DIR = path.join(process.cwd(), "content", "areas");

export const EXPERIENCE_MIN_WORDS = 300;

export function wordCount(paragraphs: string[]): number {
  return paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
}

function readAll(): Area[] {
  if (!fs.existsSync(AREAS_DIR)) return [];
  return fs
    .readdirSync(AREAS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(AREAS_DIR, f), "utf8")) as Area)
    .sort((a, b) => a.city.localeCompare(b.city));
}

/** Every reason this area may not be published. Empty means it clears. */
export function areaGateFailures(area: Area): string[] {
  const failures: string[] = [];
  if (!area.published) failures.push("not marked published");
  if (area.caseStudies.length < 1) failures.push("no case study");
  const caseStudyPosts = new Set(
    getAllPosts()
      .filter((p) => p.category === "Case Studies")
      .map((p) => p.slug),
  );
  for (const cs of area.caseStudies) {
    if (!caseStudyPosts.has(cs.slug)) {
      failures.push(`case study "${cs.slug}" is not a published case-study post`);
    }
  }
  const words = wordCount(area.experience);
  if (words < EXPERIENCE_MIN_WORDS) {
    failures.push(`experience block is ${words} words, under ${EXPERIENCE_MIN_WORDS}`);
  }
  if (!area.orientation.trim()) failures.push("no orientation paragraph");
  if (area.marketSnapshot && !area.marketSnapshot.asOf) {
    failures.push("market snapshot has no as-of date");
  }
  return failures;
}

/** Areas that clear the gate. The only ones the site renders or links. */
export function getPublishedAreas(): Area[] {
  return readAll().filter((a) => areaGateFailures(a).length === 0);
}

export function getPublishedArea(slug: string): Area | undefined {
  return getPublishedAreas().find((a) => a.slug === slug);
}

/** Every area file, published or held. For the build check and reporting. */
export function getAllAreasIncludingHeld(): Area[] {
  return readAll();
}
