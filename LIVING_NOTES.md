# LIVING_NOTES

Running log of design preferences, brand decisions, creative direction, and feedback
for yournextstepteam.com.

Note: the Google Drive **LIVING_NOTES** doc is the more current master. See
`docs/context/LIVING_NOTES_DRIVE.md`. This file captures direction that came out of
work done directly in the repo.

---

## Brand identity (source of truth)

- **The business is Your Next Step Team on yournextstepteam.com.** It was Your
  Next Step Home until 2026-08-21. Nothing in the repo should say "Home" any more.
- **The logo wordmark reads "Your Next Step" with no suffix.** That is not a bug
  and not a stale asset. The mark says three words, the business says four.
- **Logo colors are Olive Green #7F9A3D and Warm Grey #868686**, sampled from the
  real artwork. Any doc claiming Forest #2D5016 / Navy #1A2845 / Sage #4A7D2E in
  Playfair Display is describing a placeholder that has been deleted; those values
  were invented from a written description and are wrong.
- **The logo palette is not the site palette.** The site UI stays on the BBCH
  Ink/Moss/Bone/Sunshine tokens so it reads as a sibling of Burien Best Care Home.
- Define the brand name and domain once, in `tenant.brand.name` and
  `tenant.brand.domain`. Do not retype the string into a component, a title, or a
  schema block; the last rename had to touch 36 files because it was retyped.

## Hero treatment

- **Show the footage.** The white scrim over the hero video was cut from a 0.97
  peak to 0.40 because the near-solid wash was the whole complaint: it read as a
  white page with a video hiding behind it.
- **Video runs at 0.75x** for a slower, more cinematic drift.
- **Open tension:** at 0.40 the hero headline and subhead fail WCAG AA against
  the current clip (2.34 and 2.52 against thresholds of 3.0 and 4.5). Roughly
  0.70 is the point where both clear. Readability wins over atmosphere on this
  site, whose visitors skew older, so this needs a decision: raise the scrim, put
  a panel behind the text column, or shoot brighter footage. See SESSION_LOG.

## Positioning (source of truth)

- **Becca is the geographic expert for Pierce County and surrounding areas.**
  Geographic authority leads. Range of expertise comes second: first home, tenth
  home, upsize, downsize, right-size, invest, relocate, luxury.
- **Featured areas, named early and often:** Bonney Lake, Puyallup, North Tacoma,
  Eatonville. She grew up in Eatonville, which is the credential behind the claim.
- **Do not highlight Spanaway or Lakewood.** She still serves them; they just do
  not lead. Spanaway sits in the `extended` region in `tenant.neighborhoods`.
- **Secondary areas:** Graham, Roy, Gig Harbor, and the wider Pierce, King,
  Thurston, and Mason county market.
- **Senior transitions are one strength, not the identity.** The SRES designation
  is a tool in the box. When it becomes the headline, it shrinks the business to
  one client type and hides fifteen years of general Pierce County work. This is
  why `agent.title` is `REALTOR®, SRES®` rather than "Senior Real Estate
  Specialist": that field runs through the metadata title template on every page.
- **Weave the place names into H1s, H2s, body copy, and meta descriptions.** Not
  as a keyword dump; as the specific detail that proves she actually knows the
  ground. "Which Bonney Lake streets flood" beats "deep local knowledge."

## Voice and copy

- **Level 2 by default** for anything a visitor reads: polished professional with
  personality. See the `my-writing-style` skill.
- **Never say what something is not.** No "advocate, not a salesperson," no
  "no pressure, no sales pitch," no "this isn't a listing appointment." X-not-Y
  framing plants the negative in the reader's head; the denial is what sticks.
  State the positive and stop. This is non-negotiable and it applies to headings,
  body, CTAs, and alt text alike.
- **No em dashes anywhere in visitor-facing copy.** Commas, colons, semicolons,
  parentheses instead.
- **Becca is a solo agent.** Always "I" and "me," never "we," "us," or "our team."
  The one exception is "we" meaning you and I together, as in "whatever we need to
  talk about."
- **No raw text-message fragments in website copy.** Becca's texting voice is the
  source material, not the finished product. Homepage traffic is cold: these people
  have never met her, so copy has to stand on its own without her delivery.
- **"Let's talk" beats "Book a consultation."** Lower friction, sounds like a
  person. Applied everywhere, including the global header, which previously said
  "Book a call."
- **Time framing on the CTA:** "Five minutes or an hour, whatever it takes to
  figure out what your next step actually is." Replaced the old "fifteen minutes,
  no pressure, no sales pitch" line, which read as a script.

## Credentials, and one to watch

- Becca's real estate credentials are **15+ years in real estate, 270 closings,
  SRES certified, eXp Icon Agent (2022)**.
- **Write "15+ years in real estate in Washington,"** not "15+ years in WA." The
  short version reads as how long she has lived here.
- **The stats heading is a fixed string:** "Becca Pitts: 270 closings across
  Western Washington." Her name carries more than a generic credential label, and
  it is the same on the homepage, About, and Sellers.
- **The "twenty years in senior care" line is Daniela's, not Becca's.** It made it
  into site copy at least twice. If it appears again, it is wrong. Becca's senior
  expertise is the SRES designation and the work itself. Removed from the last
  live instance (the SRES FAQ answer) on 2026-08-21.

## Design direction

- **Buying and selling get equal visual weight.** Two matching primary buttons in
  the hero, not a primary and a ghost. Same rule for the buyer and seller
  questionnaire buttons in the CTA block.
- **No decorative numbering on the scenario cards.** The numbers implied a sequence
  that does not exist; these are six parallel doors, not six steps.
- **Meet Becca before the self-select.** About sits above the scenario cards so a
  stranger knows who is talking before being asked to pick a path.
- **Alternate section backgrounds.** Stats, About, and Scenarios were all warm and
  read as one long block. About is white now for separation.
- **Testimonials are a two-row marquee, not a stepped carousel.** Row one drifts
  right to left, row two left to right, continuously. Becca's note on the old
  build was that it wasted space and made her wait to read the next quote; a
  standing wall of moving proof reads as volume in a way one card at a time does
  not. Cards are compact and uniform: fixed 320px wide (340px at `md`), fixed
  height, 12px radius, bone fill, moss hairline, quote clamped to four lines.
- **No decorative quotation mark on a testimonial card.** It was pure vertical
  cost above the quote and said nothing a blockquote does not.
- **Testimonial attribution aligns across cards** regardless of quote length. The
  fixed card height is what guarantees it now; the old reserved-height caption
  block is gone. Name, moss middot, location, one line, bottom of the card.
- **Section heading is "What clients are saying"** with no market name in it. Do
  not reintroduce `tenant.market.primaryArea` there.
- **Motion is CSS, not a JS timer.** Marquee rows animate with keyframes and
  pause via `animation-play-state`, so they cost nothing in JS and the section
  stays a server component. Anything that auto-advances still pauses on hover
  and focus, and still honors `prefers-reduced-motion` (under reduce the rows
  become plain horizontal scrollers).
- **No pillbox or bubble elements.** Rounded pill badges that carry text but do
  nothing read as broken buttons; people try to click them. If it looks like a
  button, it has to be one. Static labels become plain text: a `·`-joined line for
  credential rows, a small uppercase eyebrow for tags. Decorative number circles
  and real nav links are fine, because those are either obviously ornamental or
  actually clickable.
- **eXp branding stays small and stays at the bottom.** Brokerage disclosure belongs
  in footer small print, which is standard practice. It should not compete with
  Becca's own brand anywhere above the fold.

## Structural conventions

- **Every scenario card earns a long-form article.** Cards are entry points into real
  content, not just routers to hub pages. Cards fall back to the hub page until the
  article file exists, so unwritten content can never ship a broken link.
- **Physical address does not go on the site.** It is a PMB.
- **Service area language:** lead with the four featured cities by name, then
  "and the rest of Pierce County," then King, Thurston, and Mason. The first four
  entries in `tenant.market.neighborhoods` feed the site-wide meta description, so
  that array is ordered by priority rather than alphabetically.
- **`PLACEHOLDER_MODE` stays `true`** until launch is a deliberate decision.

## Hero and layout conventions

- **The hero text sits on the same grid as every section under it.** Left edge of
  the eyebrow, H1, paragraph, and CTAs lines up with the "By the numbers" strip
  below. `<Container>` is the wrong wrapper for the hero: its inner
  `mx-auto max-w-2xl` centers the column below `lg` and breaks that line. Use
  `mx-auto max-w-7xl px-4 lg:px-8` there instead.
- **No bottom fade on the hero.** The video plays fully visible all the way to
  the bottom edge and meets the section below as a clean line. Only the
  left-to-right white wash stays, and only because it is what makes the headline
  readable over the footage. This applies to the mosaic fallback too.

## Market data conventions

- **Market numbers are Becca's, not invented.** Medians, days on market, and
  year-over-year moves come from her or from the NWMLS county report. An area
  with no number keeps its `TODO Becca verify` placeholder rather than getting a
  plausible-looking guess. A wrong median on a real estate site is worse than a
  visible blank.
- **Numbers get a date stamp.** There is a comment above `tenant.neighborhoods`
  recording when the figures were supplied, so a stale set is obvious.
- **Neighborhood slugs do not change once they ship.** When a display name needs
  to be corrected (Tacoma became North Tacoma), the name and ZIP change and the
  slug stays, so existing links and the sitemap survive.
- **Name the sub-market, not the city, when that is what she works.** The site
  says "North Tacoma" everywhere else, so the neighborhood entry does too.
