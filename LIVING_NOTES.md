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
- **Resolved 2026-08-22: the scrim wins on the left, the footage wins on the
  right.** The 0.40 peak was raised to 0.90 because the text was not popping
  against the clip. The wash now runs 0.90 at the far left, 0.60 at 35%, and is
  fully clear by 62%, so the dark ink sits on near-white where it is read and
  the right side of the frame is untouched. This closes the open WCAG AA tension
  logged below, since 0.90 clears the 0.70 threshold both stops needed.
- **The trade is deliberate.** The text column is left-justified, so density on
  the left costs nothing visually; only a full-width wash read as "a white page
  with a video hiding behind it," and that is what stays cut.
- **Superseded tension (kept for history):** at 0.40 the hero headline and
  subhead failed WCAG AA against the current clip (2.34 and 2.52 against
  thresholds of 3.0 and 4.5). Roughly 0.70 was the point where both cleared.
  Readability wins over atmosphere on this site, whose visitors skew older.

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
- **2026-08-22: the homepage H1 widened to "Your Puget Sound expert."** It was
  "I know Pierce County street by street." Becca asked for the swap directly.
  This is logged as an open tension, not a resolved repositioning: the rest of
  this section still says Pierce County leads, and the hero subhead directly
  under the new H1 still names four Pierce County towns. If the intent is a
  genuine widening to the Puget Sound region, the subhead, the featured areas,
  and the "geographic authority leads" rule above all need a second pass. If
  the intent was only a punchier headline, the narrower county-level language
  everywhere else is still correct and this note can be closed as scoped to the
  H1 alone. Ask before assuming either reading.

## Voice and copy

- **Level 2 by default** for anything a visitor reads: polished professional with
  personality. See the `my-writing-style` skill.
- **Never say what something is not.** No "advocate, not a salesperson," no
  "no pressure, no sales pitch," no "this isn't a listing appointment." X-not-Y
  framing plants the negative in the reader's head; the denial is what sticks.
  State the positive and stop. This is non-negotiable and it applies to headings,
  body, CTAs, and alt text alike.
- **No em dashes anywhere in the repo,** not just visitor-facing copy. Commas,
  colons, semicolons, parentheses, or a plain hyphen instead. This covers docs,
  notes, code comments, and synced Drive copies as well as site copy, so nothing
  gets pasted forward from a file that was assumed to be out of scope. Verify
  with a search for the character itself, not by reading; it is easy to miss
  next to a hyphen.
- **Becca is a solo agent.** Always "I" and "me," never "we," "us," or "our team."
  The one exception is "we" meaning you and I together, as in "whatever we need to
  talk about."
- **The transaction team is an addition, not a disclaimer.** Becca works with a
  transaction coordinator, and the About copy now credits that support instead of
  denying it ("You get me, plus my transaction team..."). Keep the possessive: it
  is "my transaction team" behind her, never "we" or "our team" doing the work.
  Becca is still the person the client deals with.
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

## Header conventions

- **The header is a bar, not a shelf.** 61px on desktop. Vertical padding on
  the row is `py-2`, the logo runs `h-8 md:h-9`, and nav pills sit at
  `px-3 py-2`. Anything that pushes the bar back toward 80px is a regression:
  it is a sticky element, so every pixel is charged against every page.
- **Five nav items, and that is the ceiling.** Home, Buyers, Sellers,
  Neighborhoods, About Becca, with Contact as the button on the right. Blog,
  Quiz, Podcast, and Listings live in the footer and in body copy. A new page
  does not get a header slot by default; it has to displace one of the five.
- **The nav button says "Contact," not "Let's talk."** The warmer phrasing is
  right for in-page CTAs and wrong for a nav control, where the job is to name
  a destination. "Let's talk" also collided with the CTA in the about section.
- **`.btn-primary` is for in-page CTAs, never the header.** It is 48px tall by
  design and it is declared outside any `@layer` in `globals.css`, so unlayered
  precedence means Tailwind utilities on the element cannot shrink it. The
  header keeps its own `CTA_CLASS` constant. Same rule applies anywhere else
  that needs a smaller button: write a local class, do not fight the global one.
- **Desktop nav is right-justified, not centered.** The links flow toward the
  Contact button so the bar reads logo left, everything else right. `lg:ml-auto`
  on the `<nav>` is what does it: the auto margin eats the free space to the
  nav's left, which makes the row's `justify-between` a no-op on desktop. Do not
  swap that for a spacer div or for `justify-end` on the row, since the row
  still needs `justify-between` at the breakpoints where the nav is hidden.
- **Desktop nav may go under 44px, mobile may not.** The `lg:` nav is
  pointer-only, so the touch-target floor does not apply to it. The mobile sheet
  and its CTA stay at 44px and up.
- **Logo and Home are both home links, on purpose.** The logo is the habitual
  target and Home is the explicit one. Keep `aria-label` on the logo link so the
  two do not read as a duplicate to a screen reader.
- **Nav active state: `/` is exact-match, everything else matches its children.**
  `isActive()` in `Header.tsx` owns this. A bare prefix rule silently breaks on
  the Home entry, since `"/" + "/"` never matches anything.
- **No demo ribbon.** The site being pre-launch is not something the page needs
  to announce. `isNoIndex()` is the real guard and it is untouchable from the
  UI layer.

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

## Review and testimonial conventions

- **Every review Becca has goes on the site, not a flattering subset.** All 46
  Zillow reviews and all 11 Google reviews that are not already on Zillow live
  in `tenant.testimonials`, 57 in total. Cherry-picking five reads like
  marketing; the full set reads like a record.
- **Deduplicate on review text, never on name.** People post the same review to
  Zillow and Google, sometimes word for word, sometimes trimmed. When two
  entries are the same review, keep the Zillow one: it is usually the longer
  text and it carries the transaction summary and city that Google does not
  publish. Matching on name alone would have missed four pairs whose Zillow
  entry was a screen name, and would have wrongly merged two pairs that are the
  same person writing genuinely different reviews years apart.
- **Review text is verbatim.** Typos, run-ons, and all - "Beeca", "usa house",
  "propmtness" are in the source and stay. Whitespace is collapsed and nothing
  else is touched. Anything that would be a rewrite belongs in a separate
  field, never edited into `quote`.
- **`rating` is the reviewer's own score, not the platform average.** One of the
  46 is four stars. Zillow rounds its profile badge to 5.0 and the stats tile
  quotes Zillow, but the individual entry keeps the four. Rounding a real score
  up in the data is the kind of small dishonesty that costs a licence.
- **A screen name is only replaced by a real name the same person published
  elsewhere.** Nine Zillow entries now read as people instead of usernames,
  because the identical review turned up on Google under the reviewer's actual
  name. That is evidence, not tidying. `vdn4yf8ct2` and
  `zuser20150105142216044` stay exactly as they are, because nothing outside
  Zillow says who they are, and inventing a name for a real client is off the
  table. Every renamed entry keeps `source: "Zillow"` so a reader can still go
  verify it.
- **Locations get normalised to a city, and the raw Zillow wording is kept.**
  Neighborhood prefixes come off the display string and ZIP-only entries resolve
  to their city, but the original transaction summary stays in `context` so the
  source is never lost. Where Zillow gives no place, the entry says
  "Washington" rather than guessing one.
- **A field with no source is left empty, not filled in.** Google and Facebook
  publish no city and no transaction summary, so Google entries omit `location`
  and `context` and the card drops those lines. Both fields are optional on
  `TenantTestimonial` for exactly this reason. Putting a plausible city on
  eleven real clients to keep the layout tidy would be inventing facts on the
  one page whose whole value is that a reader can go check it.
- **No testimonial goes in without its text.** If a reviewer's name is known but
  the review is not, the entry waits. There is no version of writing the quote
  yourself that is acceptable.
- **Reviews are sorted newest first** and the count is stamped in the comment
  above the array, so a stale scrape is obvious.
- **Hover opens a card, nothing else does.** No click, no modal, no close
  button. The row pauses on hover already, so the card is standing still by the
  time it opens, and moving the pointer away is the whole close interaction.
- **Opening a card must never move the page.** The card that grows is a
  positioned panel inside a fixed-size slot, so it paints over its neighbours.
  A hovered card that reflows the row shoves every section below it down the
  page, which is worse than any amount of overlap.
- **Row heights are measured in `lh`, not rem.** The quote's leading is not what
  its utility classes imply, so any "four lines" number written in rem will
  slice the fourth line in half the next time the type scale moves.
- **Hover behaviour lives behind `@media (hover: hover)`.** On a touch screen
  `:hover` sticks after a tap, and a card that opens on tap with no close
  affordance is a trap.
- **Fade edges with an overlay, never with `mask-image`.** A mask paints only
  inside its clip box, so it erases anything that grows outside the element -
  which is exactly what broke the hover expansion once. Two gradient
  pseudo-elements give the identical look, sit on top rather than subtracting,
  and have no opinion about content that escapes the box.
- **A CSS property with no fallback path is a liability.** `mask-clip: no-clip`
  worked perfectly in the browser it was written in and silently did nothing
  elsewhere, so the feature looked broken rather than degraded. Before leaning
  on anything newish, answer "what does this look like if it does nothing?" - if
  the answer is "broken", find another way.
- **Nothing on the page outranks the header.** It is sticky at `z-40`. Hover
  and overlay effects stay at 20 or below, because content painting over the
  navigation is worse than content tucking under it.

## Homepage hero conventions

- **The hero carries the proof, not a separate strip.** The four stats live on
  the video at the bottom of the hero. There is no "By the numbers" section on
  the homepage any more, and the about section is the first thing below the fold.
- **Never label a stat row.** An eyebrow reading "By the numbers" above four
  numbers, or a heading that restates a stat already rendered at 40px underneath
  it, is filler. The numbers introduce themselves.
- **White glass over the hero video needs a dark scrim under it.** `HeroVideo`
  washes the left side white up to 0.90 so the dark headline reads. Anything
  white-on-white placed over that footage has to bring its own darkening, kept
  low enough in the frame that it never reaches the headline.
- **Glass recipe for this site:** `bg-white/15`, `backdrop-blur-[12px]`,
  `border border-white/25`, `rounded-2xl`, white type with a soft text-shadow.
  Reuse these values rather than inventing a second glass treatment.
- **Stat rows go two up on phones, four across from md.** Values like "SRES" with
  the registered mark wrap badly in a four-across grid at 375px.

## Glassmorphism, as this site does it

Reference: the category tiles in the livingin-platform.vercel.app hero. Brett
pointed at these; the values below are read off the live page, not approximated.

- **Frosted glass here is a vertical white gradient, not a flat alpha.**
  `linear-gradient(rgba(255,255,255,.40) 0%, rgba(255,255,255,.55) 45%,
  rgba(255,255,255,.85) 100%)`. A single flat `bg-white/15` reads as a grey
  film. The gradient reads as glass and lands the type on the opaque end.
- **Frosted glass carries dark text, not white.** Ink on the card, and then the
  background behind it needs no scrim. Reach for white type only when the panel
  is genuinely dark.
- **Pair it with:** `rounded-2xl`, a 1px opaque light border, and
  `box-shadow: 0 1px 2px rgba(0,0,0,.16), 0 8px 18px rgba(0,0,0,.22)`. The
  shadow is not optional over imagery; it is what separates the card from a
  white frame.
- **Add `backdrop-blur-[12px]` over video, skip it over a photo.** The reference
  has no backdrop filter because a still image does not need one.
- **Icon chip over label is the structure.** 40px on phones, 48px up, a solid
  brand color, white stroke glyph at 1.6. On the gold chip use an ink glyph:
  white on `#D99A2B` is about 2.2:1.

## Type floor

- **`--text-xs` is 14px on this site, and it is a floor.** Never reach for an
  arbitrary `text-[11px]` or `text-[13px]` to make something fit. Arbitrary px
  values slide under the floor silently; the utility classes respect it. If a
  label needs to recede, change case, weight, or color instead of size.

## Scroll-driven motion

- **Scroll effects are opacity and transform, never anything else.** The
  homepage portrait crossfade (`ScrollCrossfadePortrait`) is the pattern to
  copy: a single 0 to 1 progress value written to a CSS custom property, read
  back by `calc()` in the images' inline styles. Nothing that touches layout,
  nothing that forces paint.
- **Never re-render React on a scroll frame.** Write the value to the DOM node
  directly. `useState` inside a scroll handler is the wrong shape for this.
- **Attach scroll listeners through an IntersectionObserver, not on mount.**
  The homepage is roughly 25,000px tall. A listener that runs for the whole
  page to animate one 460px box is waste. Observe, attach on entry, detach on
  exit.
- **Pace scroll effects in viewport fractions, not pixels.** The crossfade runs
  from the portrait's center at 0.78vh to 0.34vh. Pixel thresholds tuned on a
  desktop feel wrong on a phone; fractions do not.
- **Reduced motion means the effect does not run at all.** Not a faster
  version, not a shorter one. First frame, held still, no listeners.
- **Becca liked the Russ Lagan real estate site's photo crossfade.** That is
  the reference for this kind of transition: slow, elegant, driven by scroll
  position rather than by a timer.
