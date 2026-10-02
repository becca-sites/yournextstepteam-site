#!/usr/bin/env node
/**
 * Area page uniqueness check. Runs before every build and in CI.
 *
 * Fails the build if any two area pages share more than 30% of their
 * non-boilerplate text, or if a page marked published does not clear the
 * content gate. Thin, near-identical city pages are the doorway pattern, and
 * Google applies that penalty to the whole cluster, so a templated page has to
 * be caught before it ships rather than after.
 *
 * What is compared: only the text each page owns, read from
 * content/areas/<slug>.json (orientation, experience, senior section, case
 * study lines, FAQs, sub-areas). The header, footer, call to action and
 * section headings come from the shared template and are not page content, so
 * they are not compared.
 *
 * How: each page's own city and county names are replaced with a placeholder
 * token first, so a template with only the place names swapped still scores as
 * identical. The text is then broken into overlapping five-word shingles, and
 * overlap is the share of the smaller page's shingles that also appear in the
 * other page. Containment, not Jaccard, so a short page cannot hide inside a
 * long one.
 *
 * Usage:
 *   node scripts/check-area-overlap.mjs              check content/areas
 *   node scripts/check-area-overlap.mjs --self-test  prove it catches a clone
 *
 * Plain Node, no dependencies, so CI can run it without installing anything.
 */
import fs from "node:fs";
import path from "node:path";

export const THRESHOLD = 0.3;
const SHINGLE = 5;
const MIN_EXPERIENCE_WORDS = 300;
const AREAS_DIR = path.resolve("content/areas");
const BLOG_DIR = path.resolve("content/blog");

function pageText(area) {
  const parts = [
    area.orientation,
    ...(area.experience ?? []),
    ...(area.senior ?? []),
    ...(area.caseStudies ?? []).flatMap((c) => [c.situation, c.outcome]),
    ...(area.faqs ?? []).flatMap((f) => [f.question, f.answer]),
    ...(area.subAreas ?? []).flatMap((s) => [s.name, s.note]),
  ];
  let text = parts.filter(Boolean).join(" ").toLowerCase();
  for (const name of [area.city, area.county].filter(Boolean)) {
    text = text.split(name.toLowerCase()).join(" placetoken ");
  }
  return text.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function shingles(words) {
  const set = new Set();
  for (let i = 0; i + SHINGLE <= words.length; i++) {
    set.add(words.slice(i, i + SHINGLE).join(" "));
  }
  return set;
}

export function overlap(a, b) {
  const A = shingles(pageText(a));
  const B = shingles(pageText(b));
  if (!A.size || !B.size) return 0;
  let shared = 0;
  const [small, big] = A.size <= B.size ? [A, B] : [B, A];
  for (const s of small) if (big.has(s)) shared++;
  return shared / small.size;
}

function caseStudySlugs() {
  if (!fs.existsSync(BLOG_DIR)) return new Set();
  const slugs = new Set();
  for (const f of fs.readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(f)) continue;
    // Normalise line endings: files checked out on Windows carry CRLF.
    const src = fs.readFileSync(path.join(BLOG_DIR, f), "utf8").replace(/\r\n/g, "\n");
    const fm = src.match(/^---\n([\s\S]*?)\n---/);
    if (fm && /^category:\s*"?Case Studies"?\s*$/m.test(fm[1])) {
      slugs.add(f.replace(/\.mdx?$/, ""));
    }
  }
  return slugs;
}

function gateFailures(area, published) {
  const out = [];
  if (!area.caseStudies?.length) out.push("no case study");
  for (const c of area.caseStudies ?? []) {
    if (!published.has(c.slug)) out.push(`case study "${c.slug}" is not a published case-study post`);
  }
  const words = (area.experience ?? []).join(" ").split(/\s+/).filter(Boolean).length;
  if (words < MIN_EXPERIENCE_WORDS) out.push(`experience block ${words} words, under ${MIN_EXPERIENCE_WORDS}`);
  return out;
}

export function check(areas, published = caseStudySlugs()) {
  const errors = [];
  for (const a of areas.filter((x) => x.published)) {
    for (const f of gateFailures(a, published)) errors.push(`${a.slug}: marked published but fails the gate: ${f}`);
  }
  const withContent = areas.filter((a) => pageText(a).length >= SHINGLE);
  const report = [];
  for (let i = 0; i < withContent.length; i++) {
    for (let j = i + 1; j < withContent.length; j++) {
      const score = overlap(withContent[i], withContent[j]);
      report.push(`${withContent[i].slug} vs ${withContent[j].slug}: ${(score * 100).toFixed(1)}%`);
      if (score > THRESHOLD) {
        errors.push(
          `${withContent[i].slug} and ${withContent[j].slug} share ${(score * 100).toFixed(1)}% of their text (limit ${THRESHOLD * 100}%)`,
        );
      }
    }
  }
  return { errors, report, compared: withContent.map((a) => a.slug) };
}

function loadAreas() {
  if (!fs.existsSync(AREAS_DIR)) return [];
  return fs
    .readdirSync(AREAS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(AREAS_DIR, f), "utf8")));
}

function selfTest() {
  const areas = loadAreas().filter((a) => pageText(a).length >= SHINGLE);
  if (!areas.length) {
    console.log("self-test skipped: no area with content to clone");
    return;
  }
  const original = areas[0];
  // The doorway pattern: same page, place names swapped.
  const clone = JSON.parse(
    JSON.stringify(original)
      .split(original.city).join("Faketown")
      .split(original.county).join("Fake County"),
  );
  clone.slug = "faketown";
  clone.city = "Faketown";
  clone.county = "Fake County";
  const cloned = check([original, clone], new Set(original.caseStudies.map((c) => c.slug)));
  if (!cloned.errors.some((e) => e.includes("faketown"))) {
    console.error("SELF-TEST FAILED: a city-swapped clone was not caught");
    process.exit(1);
  }
  // And a genuinely different page passes.
  const different = { ...clone, orientation: "", experience: [], senior: [], caseStudies: [], faqs: [], subAreas: [] };
  different.experience = [Array.from({ length: 320 }, (_, k) => `distinct${k}`).join(" ")];
  const fine = check([original, different], new Set());
  if (fine.errors.some((e) => e.includes("share"))) {
    console.error("SELF-TEST FAILED: distinct text was flagged");
    process.exit(1);
  }
  console.log(`self-test passed: clone caught (${cloned.report.join("; ")}), distinct page allowed`);
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const areas = loadAreas();
  const { errors, report, compared } = check(areas);
  const held = areas.filter((a) => !a.published).map((a) => a.slug);
  console.log(
    `area overlap check: ${areas.length} area files, published ${areas.filter((a) => a.published).map((a) => a.slug).join(", ") || "none"}, held ${held.join(", ") || "none"}`,
  );
  console.log(`compared: ${compared.join(", ") || "none"}${report.length ? "; " + report.join("; ") : ""}`);
  if (errors.length) {
    console.error("AREA CHECK FAILED:\n  " + errors.join("\n  "));
    process.exit(1);
  }
  console.log("area check passed");
}
