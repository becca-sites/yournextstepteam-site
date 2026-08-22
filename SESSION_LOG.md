# SESSION_LOG

Running decision log for the yournextstepteam.com site repo.

Note: the Google Drive **SESSION_LOG** doc is the more current master. See
`docs/context/SESSION_LOG_DRIVE.md`. This file logs work done directly in the repo.

---

## 2026-08-22 — About copy: "plus my transaction team" replaces the X-not-Y line

**Deliverable:** one sentence in the second About paragraph rewritten. Commit
`ebe908d`.

Was: "You get me, not an assistant, not a transaction team."
Now: "You get me, plus my transaction team keeping every deadline and detail on
track behind the scenes."

Two problems with the old line. It was X-not-Y framing, which this file already
rules out, and it disclaimed a transaction team Becca actually has and relies on.
The replacement is additive: it credits the support without moving her out of the
client's seat, and it keeps the sentence's job in the paragraph, which is to land
right before "And I will give you a real answer to every question."

### Files touched

- `src/config/tenant.ts` — `agent.storyLong`, second paragraph

`storyLong` is the single source for this copy. The homepage
(`src/app/page.tsx`), the About page (`src/app/about/page.tsx`), and
`AboutPreview.tsx` all read from it, so the one edit covers every surface.

### Still pending

1. **`content/blog/trusted-real-estate-agent-pierce-county.mdx:96` still has the
   old framing:** "every client gets me. Not an assistant, not a junior agent,
   not a 'team member' you've never met." Same X-not-Y pattern, and the same
   contradiction with the transaction team. Out of scope for this request, but it
   should get the same treatment.
2. Everything under the previous sessions' "Still pending" remains open.

---

## 2026-08-21 — Fix: the edge-fade mask was clipping the expanded card

**Deliverable:** the hover expansion now actually clears its row. Reported as
"only expands a little bit and the full review text gets cut off by the panel
below it." Commit `c0ac1b4`.

### The cause was the mask, not the overflow

The row's `mask-image` was doing the clipping. A mask paints only inside its
clip box, the border box by default, so every pixel of an open card hanging
below the row was masked away to nothing. `mask-clip: no-clip` was meant to
lift that and does in Chrome, which is why this shipped looking fine.

**Forcing `mask-clip: border-box` in Chrome reproduces the reported symptom
exactly** — the card opens a little way and stops dead at the row's bottom edge,
mid-sentence. That is the whole bug: `no-clip` is a property that silently does
nothing on an engine that has not shipped it, and when it does nothing there is
no fallback, only a feature that looks broken.

### What replaced it

The mask is gone. The same fade is now two pseudo-element gradient overlays,
painted on top of the row rather than subtracted from it, and only as tall as
the row, so they have no opinion about what hangs below it. They carry
`pointer-events: none` so they do not swallow hover on the cards beneath.

**Regression test worth keeping:** re-apply `mask-clip: border-box` and hover.
Before, the card was stuck at 208px. Now it measures 499px and clears its row by
283px, because there is no longer a mask for that property to affect.

### Also changed

- **The section lifts on hover, not just the row.** Belt and braces so the
  overhang lands on top of whatever follows the testimonials. Capped at
  `z-index: 20`, below the sticky header's `z-40` — a review painting over the
  navigation would be a worse bug than one tucking under it.
- **The quote cap is a flat 400px** rather than `min(30rem, 44vh)`. The vh term
  resolved to roughly 360px on a laptop and made the opening look timid.

### Lesson for this file

A CSS property with no fallback path is a liability, not a nicety. `no-clip`,
`overflow-x: clip`, and `:has()` are all in here; the first one broke, and the
tell was that it worked perfectly in the browser it was developed in. Anything
load-bearing needs a "what if this does nothing" answer.

---

## 2026-08-21 — Testimonial cards expand on hover

**Deliverable:** hovering a testimonial card opens it to the full review text
and collapses it again on mouse-out. Pure CSS, no click, no modal. Commit
`da4d003`.

### What changed

- **The quote's `max-height` is what animates**, not the card's. Growing the
  quote lets the attribution ride down with the text; growing the card instead
  clips the attribution away and snaps it back at the end of the transition.
- **The expanded card also shows the transaction type and month** ("Bought
  Single Family · July 2020"), which is hidden at rest.
- **A hovered card no longer reflows the row.** The card that grows is a panel
  positioned inside a fixed-size figure, so it paints over its neighbours
  instead of pushing the rest of the page down. Collapsed geometry is unchanged:
  every card still measures exactly 208px.
- **The lower row opens upward.** A row two thirds of the way down the viewport
  has nowhere to grow downward, and the reader cannot scroll after it without
  moving the pointer off the card and closing it.

### Three things that had to give way

1. **`.marquee` overflow.** `hidden` on one axis forces the other to `auto`, so
   the row would have grown a scrollbar. Now `clip` on x and `visible` on y.
2. **The edge-fade mask.** A mask paints only inside its clip box, which is the
   border box by default, so every pixel of an expanded card below the row was
   masked to nothing. Fixed with `mask-clip: no-clip`.
3. **The collapsed quote height.** `4lh`, not a rem value. The quote resolves to
   16px/27.2px, not the 14px/1.625 that `text-sm leading-relaxed` implies, so a
   hard-coded 5.6875rem cut the fourth line in half. Worth knowing if anyone
   touches the type scale: something in the cascade is beating `text-sm` here.

### Judgment calls

- **Expanded height is capped at `min(30rem, 44vh)`.** The reviews run from
  136px to 924px tall in this column, and an uncapped card opens taller than the
  viewport it sits in, which the reader cannot scroll to catch up with. Most of
  the set opens in full; the longest few scroll the last of their text inside
  the card, which the paused row allows.
- **`@media (hover: hover)` gates the whole thing.** On a touch screen `:hover`
  sticks after a tap and would leave cards jammed open with no way to close
  them. Touch users still get the four-line card.
- **A card can still overhang the fold** if the row happens to sit low in a
  short window. The wheel scrolls the card's own text in that case, so nothing
  is unreachable, but it is the known rough edge.

### Still pending

- Everything under the previous sessions' "Still pending" remains open.
- Touch users have no way to read a full review on the homepage. If that
  matters, it needs a separate affordance, not a change to this one.

---

## 2026-08-21 — All 46 Zillow reviews into `tenant.testimonials`

**Deliverable:** `tenant.testimonials` now carries every review on Becca's
Zillow agent profile, 46 of them, in place of the five hand-picked excerpts.
Commit `c090918`, pushed to `origin/main`.

### What changed

- **46 entries, newest first**, each with the verbatim review text, the Zillow
  screen name, the transaction summary, a city, an ISO date, and the reviewer's
  own star rating.
- **`quote` is now the full review, not an excerpt.** The card clamps at four
  lines (`line-clamp-4`), so long reviews trail off with an ellipsis rather than
  ending on a curated sentence. That is the trade for showing what people
  actually wrote.
- **No interface change and no component change.** `TenantTestimonial` already
  had `quote`, `name`, `context`, `location`, `rating`, `date`, and `source`.
  `TestimonialCarousel` splits 46 into 23 per marquee row, past the
  `MIN_CARDS_PER_LOOP` threshold, so no repeat padding kicks in. Rows run 138s
  each on desktop and 276s on the single mobile row.

### One correction to the brief

The reviews were described as all 5.0. **45 are five stars; one is four** —
`user7088909`, 4/2/2015, the reviewer who mentions being Becca's sister.
`rating` records each reviewer's own score, so that entry reads `rating: 4`.
Zillow itself still publishes the profile average as 5.0, so the
`resultsStats` tile ("5.0 Zillow rating, 46 verified reviews") is still what
Zillow shows and was left alone.

### Locations

Zillow's transaction summaries are inconsistent, so `location` was normalised:

- Neighbourhood prefixes dropped — "West end, Tacoma, WA" became "Tacoma, WA".
- ZIP-only summaries resolved to their city: 98409 / 98405 / 98466 to Tacoma,
  98374 Puyallup, 98387 Spanaway, 98056 Renton.
- Two reviews name no place at all and read "Washington".

The untouched Zillow wording survives in `context` on every entry, so the
original is recoverable.

### How the data was pulled

The profile only server-renders 10 reviews; the rest arrive from a `/graphql`
`Reviews` call as the modal is scrolled, and that call is bot-walled against
replay. The working route was scrolling the real browser and capturing the
app's own responses. All 46 quotes were then checksummed against the live page
before the file was written, so the text in the repo is byte-identical to
Zillow's.

### Still pending

- Everything under the previous sessions' "Still pending" remains open.
- If the clipped four-line cards read badly to Becca, the fix is a curated
  `quote` plus a separate full-text field, not a shorter clamp.

---

## 2026-08-21 — Testimonial section redesign: two-row auto-scrolling marquee

**Deliverable:** the homepage testimonial block is now a pair of continuously
scrolling marquee rows of compact cards instead of a single wide snap carousel.

### What changed

- **Heading** is `What clients are saying`, with no market name and no trailing
  period. The component default no longer interpolates
  `tenant.market.primaryArea`, so nothing here says Puget Sound.
- **Two rows, opposite directions.** Row one travels right to left, row two left
  to right. The list is split down the middle; with an odd count the top row
  takes the extra card.
- **Pure CSS animation.** The old build advanced the track with a
  `setInterval` and `scrollTo`. That is gone, along with the `"use client"`
  boundary and the `framer-motion` dependency in this file. The section renders
  as a server component now.
- **Pause on hover** (and on `:focus-within`, for keyboard readers) via
  `animation-play-state`.
- **Reduced motion** turns each row into an ordinary horizontal scroller the
  reader drives. `animation: none` clears the name so the global reduced-motion
  block's `!important` duration has nothing left to run.
- **Mobile** collapses to a single row carrying every review, so nothing is
  dropped below the `md` breakpoint.

### Card design

- Fixed 320px wide (340px at `md`) and fixed 208px tall, 12px radius, bone fill,
  moss-tinted hairline border, a 3px shadow.
- No decorative quotation mark, and the padding came in from `p-8` to `p-5`.
- Quote clamps to four lines with an ellipsis. Attribution is name, a moss
  middot, then location on one line, pinned to the same y-position in every card
  because the height is fixed. Measured at 1280px: caption top sits at 152px in
  every card in both rows.

### Implementation notes worth keeping

- Card spacing is a right **margin** on each card, not a flex `gap`. A gap adds
  one extra gap-width to the track, which puts the `-50%` hand-off half a gap
  out of register and makes the loop visibly jump.
- Each row renders its set twice; the second copy is `aria-hidden` because it
  exists to close the loop, not to be read.
- Short review sets are repeated up to `MIN_CARDS_PER_LOOP` (6) so a half-track
  is always wider than a large viewport. With today's five reviews that is six
  cards per half on desktop.
- Duration is `SECONDS_PER_CARD` (6) times the card count, set inline per row,
  so the **pace** stays constant as reviews are added rather than the loop time.
  At five reviews a desktop row completes in 36 seconds.

### Open item

- **Only 5 testimonials are in `tenant.testimonials`, not 46.** The brief
  assumed an earlier task had loaded the full Zillow set; it had not, and no 46
  review source exists anywhere in the repo. The carousel renders whatever the
  array holds, so dropping the other 41 in needs no component change. Once they
  land, the repeat-to-fill logic becomes a no-op and each row runs long.

---

## 2026-08-21 — Rebrand to Your Next Step Team, real logo, hero tuning

**Deliverable:** the business is now **Your Next Step Team** on
**yournextstepteam.com**, the real logo artwork is in the repo, and the hero
video treatment changed.

### Rebrand

- `Your Next Step Home` → `Your Next Step Team` and `yournextstephome` →
  `yournextstepteam` across every tracked text file: source, content, docs, and
  the historical sync reports. The GitHub repo was renamed to
  `becca-sites/yournextstepteam-site`; the local `origin` remote now points there.
- Blog `.mdx` files were included. Only the brand string and the brand domain
  moved; no article prose, testimonial, or stat was touched.
- `tenant.brand` gained `name` and `domain`, so the brand string is defined once
  instead of being retyped per surface. `brandUrl()` builds the https origin.
- `resolveSiteUrl()` now falls back to `brandUrl()` rather than `example.com`, so
  canonical URLs, the sitemap, `llms.txt`, and every JSON-LD `@id` resolve to the
  real host even if `NEXT_PUBLIC_SITE_URL` is missing on a deploy.

### Metadata and schema

- Title default and template lead with the brand; Open Graph carries
  `siteName`, `title`, and `url`.
- `LocalBusinessSchema` and `RealEstateAgentSchema` now name the **business** and
  carry the agent as `alternateName`. The Person node still names Becca.
- `ArticleSchema`'s publisher moved from the brokerage to the brand, and its logo
  path from the non-existent `/placeholders/logo.svg` to the real mark.

### Logo

Becca's real artwork arrived, sourced from OneDrive
`$ Your Next Step/Logos Pictures_moved/Current Logo/`. The wordmark reads
**"Your Next Step"** with no suffix; that is the logo as drawn and it is correct.

- Trimmed and emitted at 640px wide into `public/images/brand/`:
  `logo-primary.png` (two-colour, transparent), `logo-white.png` (knockout for
  the dark footer), `logo-green.png`, `logo-grey.png`.
- The two-colour source was a JPEG flattened onto white, so its alpha was rebuilt
  from `green_1.png`'s mask; all three files share one canvas and registration.
- Untouched originals kept in `docs/brand-assets/` as the source of truth.
- **Deleted** `public/images/brand/logo.svg` and
  `docs/brand-assets/ynsh-logo-primary.svg`. Those were drawn from a written
  description, not from the real mark, and every fact in them was wrong: Forest
  #2D5016 / Navy #1A2845 / Sage #4A7D2E in Playfair Display, versus the real
  Olive #7F9A3D and Warm Grey #868686. `docs/context/BRAND_COLORS.md` corrected.
- Header and footer size the logo by CSS height with `sizes` pinned, so the
  2.05:1 lockup is no longer squashed into the old 160×36 box.

### Hero

- Scrim peak dropped from 0.97 to **0.40** so the footage reads through the text
  column instead of sitting behind a near-solid white panel.
- Video plays at **0.75x** (`HERO_PLAYBACK_RATE`).

### Open issue: hero contrast

The 0.40 scrim **fails WCAG AA**. Measured against seven frames of `hero.mp4` at
1280×720, worst case over the text column:

| Scrim peak | H1 (needs 3.0) | Subhead (needs 4.5) |
|---|---|---|
| 0.30 | 1.76 | 1.84 |
| **0.40 (shipped)** | **2.34** | **2.52** |
| 0.55 | 3.52 | 3.96 |
| 0.70 | 5.15 | 5.98 |
| 0.97 (previous) | 9.30 | 11.20 |

The footage is mid-tone, so flipping the text to white does not rescue it either:
a *dark* scrim at 0.40 gives white text only 1.93 / 2.17.

Options, in order of preference:
1. Raise the peak to ~0.70. Clears AA on both, still much more video than 0.97.
2. Keep 0.40 and put an opaque panel behind the text column only.
3. Re-grade or replace the hero clip with brighter footage.

This matters more than usual here: the site deliberately targets older readers,
which is why the font pack ships no hairline weights.

---

## 2026-08-21 — Full site copy rewrite (geographic expert positioning)

**Deliverable:** every visitor-facing string on the site rewritten against a new
positioning brief. Commit `25a63c6`.

### Positioning locked

Becca is **the geographic expert for Pierce County and surrounding areas**.
Geographic authority first, range of expertise second (first home, tenth home,
upsize, downsize, right-size, invest, relocate, luxury). Senior transitions are
**one** strength, not the whole identity.

- **Featured areas, lead with these:** Bonney Lake, Puyallup, North Tacoma,
  Eatonville (where she grew up).
- **Do not highlight:** Spanaway, Lakewood. `spanaway` moved from `region:
  "primary"` to `"extended"` in `tenant.neighborhoods` and dropped off the
  `market.neighborhoods` priority list.
- **Serve but secondary:** Graham, Roy, Gig Harbor, wider Pierce/King/Thurston/
  Mason.

### Copy rules applied site-wide (treat as standing rules for this tenant)

1. **First person, always.** "I" and "me." Never third person about Becca, never
   "your agent should."
2. **No X-not-Y framing.** "Advocate, not salesperson" and every "no pressure,
   no sales pitch" construction is gone. Naming the negative plants it.
3. **No em dashes.** Commas, semicolons, colons, parentheses.
4. **Solo agent.** "We" survives only where it means *you and I together*
   ("we walk every room"), in verbatim client reviews, and in visitor-voiced FAQ
   questions.
5. **No pillbox/bubble elements.** Anything shaped like a button must *be* a
   button.
6. **No senior-care-background claims.** That is Daniela's history, not Becca's.
7. **Voice Level 2.** Discourse markers, contractions, short punchy sentences,
   named neighborhoods and real numbers.
8. **Geographic keywords** woven through H1s, H2s, body, and meta descriptions.
9. **Cold-traffic test.** Every page reads for someone who has never heard of her.

### Decisions made

- **Homepage H1 is now geographic:** "I know Pierce County street by street."
  The hero subhead is written inline rather than pulled from `tenant.agent.bio`,
  so the headline and the copy beneath it read as one thought. The bio still
  carries the About hero.
- **Stats heading is the specified string** on all three pages that render it:
  "Becca Pitts: 270 closings across Western Washington."
- **"15+ years in real estate in Washington"**, never the bare "15+ years in WA",
  which read as fifteen years of residency.
- **"Let's talk" replaced "Book a consultation" / "Book a call"** everywhere,
  including the global header, `FinalCtaBlock`, and the neighborhood pages.
- **Closed the open item from the homepage pass.** The "twenty years in senior
  care" claim in the SRES FAQ answer is gone. The tenant FAQ set was rebuilt
  around geography and pricing, with SRES framed as one tool in the box.
- **`agent.title` changed** to `REALTOR®, SRES®`. The old
  "Senior Real Estate Specialist" ran through the metadata title template on
  every page and made senior work look like the whole business.
- **Four pillbox offenders removed:** the buyer and seller credential badge rows
  (now a plain `·`-joined text line) and the "Client story" / case-study tag
  pills (now plain uppercase eyebrows). Audited the rest of the site: remaining
  `rounded-full` uses are real links, decorative number circles, the dev-only
  demo ribbon, or unused components.
- **Sellers hero re-angled to pricing**, which is the seller's actual first
  question, and the secondary CTA now points at `/home-value`.
- **Quiz scenarios localized.** All six now name a real market: a Bonney Lake
  Zestimate, a Puyallup multiple-offer, an Eatonville pre-list repair budget, a
  North Tacoma dual-agency trap.

### Files touched

- `src/config/tenant.ts` — bio, storyLong, title, positioning, eyebrow,
  neighborhood priority, stats, all six scenarios, all six FAQs
- `src/app/page.tsx`, `buyers/`, `sellers/`, `about/`, `contact/`, `quiz/`
- `src/app/home-value/`, `videos/`, `neighborhoods/[slug]/`,
  `buyers/questionnaire/` — CTA language and stray "no pressure" lines
- `src/components/global/Header.tsx`, `src/components/sections/FinalCtaBlock.tsx`

### Note on this commit

It also carries the hero video work (`HeroVideo.tsx`, `HeroVideoSchema.tsx`,
`public/videos/hero.mp4`, poster) that was in the tree from a parallel session.
`src/app/page.tsx` contains both changes, so splitting them would have pushed a
`page.tsx` importing components that were not in the commit. Item 2 under "Still
pending" below is therefore done.

### Still pending after this pass

- Neighborhood entries in `tenant.neighborhoods` are still `TODO Becca verify`
  (median, tagline, description, highlights). This pass did not invent them.
- The six blog articles are still unwritten; scenario cards still fall back to
  hub pages.
- `PLACEHOLDER_MODE` still `true`.

---

## 2026-08-21 — Homepage redesign (Becca and Brett review session)

**Deliverable:** full homepage pass off the Becca/Brett review notes.

### Decisions made

- **Hero CTAs carry equal weight.** Buying and selling both use `.btn-primary`.
  Selling is not a secondary action.
- **Quiz link is possessive:** "Or take YOUR Real Estate IQ Quiz."
- **Hero video is coming.** The photo mosaic stays for now. `src/app/page.tsx`
  carries a commented video block showing exactly where the file drops in.
- **Stats heading uses Becca's name:** "Becca Pitts: a 15-year track record
  across Western Washington." Name recognition over generic credentialing.
- **Section order changed** to Hero, Stats, About, Scenarios, Testimonials, CTA.
  Cold traffic meets Becca before it gets asked to self-select a path.
- **Corrected a factual error.** The "Helping a parent move" card claimed
  "twenty years in senior care." That is **Daniela's** background, not Becca's.
  Becca's credential is 15 years in real estate plus the SRES designation. The
  card now says so. See "Open item" below: the same claim survives elsewhere.
- **Scenario cards rewritten for cold traffic.** The old copy was lifted from
  raw text-message fragments. All six are now Level 2 voice, no em dashes,
  solo-agent framing.
- **Scenario cards point at long-form articles.** `TenantScenario` gained an
  `articleSlug`. The homepage links to `/blog/<articleSlug>` the moment that
  `.mdx` file exists and falls back to the hub page until then, so the cards
  can never ship a 404 while the articles are still being written.
- **Testimonials auto-advance** every 6 seconds, pausing on hover, focus, and
  touch, and holding still under `prefers-reduced-motion`.
- **Brokerage disclosure consolidated** into small print at the very bottom of
  the footer, which is standard placement. The standalone "eXp Realty" lines in
  the footer header and under the homepage headshot are gone.
- **Footer address removed.** It is a PMB, not an office.
- **Service area language:** "Pierce, King, and surrounding counties."

### Files touched

- `src/config/tenant.ts` — scenario rewrite, `articleSlug` field, positioning copy
- `src/app/page.tsx` — section order, hero CTAs, video comment, card markup
- `src/components/sections/TestimonialCarousel.tsx` — client component, auto-scroll, aligned attribution
- `src/components/ContactBlock.tsx` — matching questionnaire buttons (affects every page using it)
- `src/components/global/Footer.tsx` — sibling link, address removal, disclosure placement

### Still pending

1. **Six blog articles** need writing. Slugs are already wired:
   `first-time-home-buyer-guide-pierce-county`,
   `selling-and-buying-at-the-same-time-washington`,
   `helping-a-parent-move-senior-real-estate-washington`,
   `buying-land-to-build-pierce-county`,
   `relocating-to-pierce-county-from-out-of-state`,
   `downsizing-guide-pierce-county`.
2. **Hero video file** from Becca.
3. **Open item, needs a decision:** the "twenty years in senior care" claim is
   still live in the SRES answer in `tenant.faqs` (`src/config/tenant.ts`) and
   surfaces on the pages that render the FAQ block. It was out of scope for a
   homepage-only pass, but it is the same incorrect credential. Flagged for Becca.
4. **PMB address** still shows on `/contact`. Same call as the footer, left in
   place pending Becca's word.
5. **Brokerage compliance research.** The WA DOL and NWMLS firm-identification
   and logo requirements have not been verified. There is a TODO in the footer.
6. `PLACEHOLDER_MODE` deliberately left at `true`. Site stays walled off.


---

## 2026-08-21 (later) — Hero layout alignment + real neighborhood market data

**Deliverable:** homepage hero re-aligned to the grid used by the rest of the
page, and the neighborhood market numbers replaced with Becca's real figures.

### Hero layout

- **Hero text is left-justified on the same grid as the section below it.** The
  hero was using `<Container>`, whose inner `mx-auto max-w-2xl` centers the
  column below the `lg` breakpoint. That put the eyebrow, H1, paragraph, and
  CTAs out of line with the "By the numbers" strip underneath. The hero now
  uses `mx-auto max-w-7xl px-4 lg:px-8`, mirroring `StatCardRow`'s own wrapper.
  Verified: hero and stat-strip left edges match at 1440px, 1280px, and 820px.
- **Bottom gradient removed from the hero background.** The video now plays
  fully visible to the bottom edge of the section and meets the stat strip as a
  hard line. The left-to-right white wash stays, because that is what keeps the
  headline readable over the footage.
- The same bottom fade was removed from `HeroMosaicBackground`, which is the
  fallback that renders if `tenant.media.heroVideo` is ever unset. The two need
  to sit in the hero the same way.

### Neighborhood market data

Real medians, days on market, and year-over-year moves are in for eight areas.
Taglines and descriptions written in Level 2 voice, first person, no em dashes.

| Area | Median | Notes |
| --- | --- | --- |
| Bonney Lake | $640K | 22 DOM, flat YoY |
| Tehaleh | $665K | +2.8% YoY, new construction demand |
| Puyallup | $575K | 21 to 43 DOM, 17 min to Tacoma |
| North Tacoma | $630K | 7 DOM, $363/sqft, 88-91 compete |
| Eatonville | $550K | rural, gateway to Rainier |
| Graham | $570K | secondary area |
| Roy | $500K | most affordable entry point |
| Gig Harbor | $835K | priciest, +6.5% YoY |

- **`Roy` is a new entry.** It did not exist in `tenant.neighborhoods`. The
  drive time on it is an estimate and carries a TODO; everything else is
  Becca's data.
- **The `tacoma` entry is now named "North Tacoma."** The slug stays `tacoma`
  so `/neighborhoods/tacoma` and the sitemap keep working, but the display name
  and the ZIP (98406, not the 98402 downtown ZIP) now describe the sub-market
  Becca actually works and the name every other page on the site uses.
- **Puyallup's commute corrected** from 25 minutes to 17.

### Files touched

- `src/app/page.tsx` — hero wrapper swapped off `Container`
- `src/components/HeroVideo.tsx` — bottom gradient removed
- `src/components/HeroMosaic.tsx` — bottom gradient removed from the fallback
- `src/config/tenant.ts` — nine neighborhood entries filled in, `Roy` added

### Still pending

1. **Six neighborhoods still carry `TODO Becca verify`:** Milton / Edgewood,
   Sumner, Spanaway, Orting, Enumclaw, Auburn. No numbers were supplied for
   these, and market medians are not something to invent on a live site.
2. **Verify the Roy drive time.**
3. **Every neighborhood page prints `tenant.market.schoolDistrict`** ("Puyallup
   School District") as the primary district, which is wrong for Roy, Eatonville,
   Graham, and Gig Harbor. The district needs to move onto `TenantNeighborhood`
   as a per-area field. Pre-existing, not touched here.
4. Everything under the previous session's "Still pending" remains open.
