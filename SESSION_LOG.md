# SESSION_LOG

Running decision log for the yournextstepteam.com site repo.

Note: the Google Drive **SESSION_LOG** doc is the more current master. See
`docs/context/SESSION_LOG_DRIVE.md`. This file logs work done directly in the repo.

---

## 2026-08-27 - Home page geography widens to Pierce, King, and surrounding counties

**Deliverables:** `src/app/page.tsx`, `src/config/tenant.ts`.

### Direction

From a home page review Becca and Brett did together: stop isolating the copy
to Bonney Lake, Puyallup, North Tacoma, and Eatonville. Main page sections
speak in counties and regions. Town names belong in blog posts and on
neighborhood pages, where the town is the subject.

### What changed

- **Hero subhead** opened on the four-town list. It now reads "Hi, I'm Becca
  Pitts. Pierce, King, and the surrounding counties."
- **`brand.eyebrow`**, the first line on the page, went from
  "Bonney Lake / Puyallup / North Tacoma / Eatonville" to
  "Pierce County / King County / Surrounding Areas". Same dot-separated shape,
  county scope.
- **Scenarios section intro** now reads "across the Puget Sound region."
- **`tenant.scenarios`**: "Buying your first home in Pierce County" became
  "in the Puget Sound"; "Relocating to Pierce County" became "Relocating to
  Western Washington"; and the commute line stopped naming Bonney Lake.
- **`agent.storyLong`** dropped "which means I know these neighborhoods street
  by street" in favour of "well." Becca has asked for that phrase to go twice
  now. Her biography keeps its real town names: growing up in Eatonville is
  personal history, not a service-area claim.

### Decisions worth keeping

- **`market.primaryArea` was left as "Pierce County" on purpose.** It
  interpolates into about a dozen pages and section components, so widening it
  is a one-line change with a sitewide blast radius. It wants its own review,
  not a ride-along on a home page pass. `/sellers` and `tenant.faqs` are in the
  same bucket.
- **The open question logged in LIVING_NOTES on 2026-08-25 is now closed** for
  the home page: the widening is genuine and sitewide, not scoped to the H1.

### Note for whoever picks this up next

This session was also asked to revise four sections that turned out to live on
`/buyers` rather than the home page: the scenario cards, the "four things that
keep your deal together" pillars, the dark "truth about online listings" band,
and the client story. A parallel session deleted all four in `c5e768f` while
this work was in flight. That conflict went back to Becca rather than being
resolved here, because re-adding the sections would have reverted a pushed
decision.

`npm run build` clean, all 26 routes.

---

## 2026-08-25 - Buyers page stripped down to face, trust, and one CTA

**Deliverables:** `src/app/buyers/page.tsx`, rewritten.

### Direction

The page had too much invented copywriting. The real conversion drivers are
Becca's face, the reviews, and a clear path to the buyer questionnaire, so
everything that was not one of those three came out.

### What the page is now

1. **Hero.** Becca's headshot (was a stock house exterior), the ellipsis
   headline, one paragraph on the five percent / ninety-five percent reality,
   and the questionnaire button.
2. **Senior transitions.** Its own band with the gold border and gold badge,
   sitting directly under the hero instead of buried inside a scenario grid.
3. **Testimonials.** Three buyer-side reviews pulled from `tenant.testimonials`
   by name, so the quotes stay verbatim and stay in sync with the review set.
4. **Quiz.** The soft funnel for anyone not ready to fill out a form.
5. **Neighborhoods.** One line and a link to `/neighborhoods`.
6. **ContactBlock.** The fallback CTA.

### What came out

- The "truth about online listings" myth-busting grid (four cards inventing how
  Becca negotiates, reads contracts, and spots inspection issues).
- The four scenario cards and the four "how I work" pillars, both of which
  described a system nobody had confirmed.
- The Graham raw-land client story and the six-question buyer FAQ, along with
  its `FAQSchema`. `ServiceSchema` stayed.
- The section that used to render on the dark primary token before it was
  patched to grey. It is gone rather than recoloured.

### Copy and geography

- Sales figures now read "12 sales in the last 12 months across the Puget Sound
  region" and "270 career total across Western Washington" in the hero
  credential line.
- No individual town names anywhere on the page. Counties and "the Puget Sound
  region" only. Town names belong on the neighborhood pages and the blog.
- Testimonial cards deliberately drop the reviewer's city for the same reason,
  even though `tenant.testimonials` carries it.

### Still open

- `tenant.resultsStats` still labels the review stat "Zillow rating". The
  wording should become "online reviews" wherever that row renders, which is
  not this page, so it was left for a pass that owns those pages.

## 2026-08-25 - Buyers page broadens from Pierce County to the Puget Sound

**Deliverables:** `src/app/buyers/page.tsx`. Commit `f05d0f7`, pushed to main.

### What changed

- **Eyebrow** went from "For buyers in Pierce County" to "For buyers in the
  Puget Sound."
- **H1 ends on an ellipsis now:** "Finding the house might be easy..." The
  ellipsis is the hook. The subhead picks it up mid-sentence with "...but I
  know how to get you from finding the house to closing on it," then lands on
  "I have seen it all and I know how to keep your deal together." The old
  version closed on "not much surprises me anymore," which is a softer promise
  and does not name the thing buyers are actually buying, which is a deal that
  holds together.
- **Every geographic reference on the page moved off the four-town list.**
  "Bonney Lake, Puyallup, North Tacoma, and Eatonville" now reads "Pierce,
  King, and the surrounding counties" or "the Puget Sound region," depending on
  the sentence. Touched: page metadata title and description, the hero image
  alt, the escalation-clause and inspection cards, the land and relocation
  scenario cards, the neighborhoods pillar, the market-knowledge FAQ, the quiz
  CTA, the FAQ section heading, and the closing contact block.

### Decisions worth keeping

- **The town list was reading as a service-area boundary.** Naming four small
  towns four separate times on one page tells a King County or Thurston County
  buyer that they are out of range. Becca closes across a much wider area than
  the copy implied, so the list was costing leads rather than earning trust.
- **Specific local detail still earns its place; only the boundary claims got
  broadened.** The neighborhoods pillar keeps its street-level specifics
  ("which streets flood," "why two blocks a quarter mile apart price
  differently") without pinning them to named towns. The Graham client story
  stays exactly as written: it is one anecdote, not a claim about where she
  works, and stripping the town name would only make it vaguer.
- **`src/config/tenant.ts` was left alone.** The buyers page pulls only
  `listings.buyerQuestionnaireUrl` and `media` from tenant. All of its
  geographic prose is local to `page.tsx`. Tenant's town lists
  (`market.areasServed`, `market.description`, `hero.eyebrow`, `stats`,
  `scenarios`, `faqs`, `neighborhoods`) feed the home page, the neighborhoods
  pages, and schema, so editing them would have been a sitewide change that
  nobody asked for. **If the same broadening is wanted sitewide, that is a
  separate pass and it should be deliberate.**

`npm run build` clean, all 26 routes.

---

## 2026-08-25 - Hero and stat cards fit above the fold at 1280x800

**Deliverables:** `src/app/page.tsx`.

### What changed

- **Stat cards are landscape panes now.** The icon chip above each number is
  gone, the number sits beside its label instead of over it, and the per-stat
  `detail` line is not rendered in the hero. A card is 288x58 at 1280, down
  from roughly 288x150.
- **The fold closes.** Measured at 1280x800: header ends at 61px, the headline
  at 324, the subhead at 514, and the stat row runs 707 to 765. Everything
  Becca asked to see is visible without scrolling, with the cards pinned to the
  bottom of the hero. The hero itself went from `min-h-[85vh]` to `90vh` so the
  video still fills the fold rather than stopping 60px short of it.
- **Padding came down to buy that room:** the text block from `py-14 lg:py-20`
  to `py-10 lg:py-12`, the CTA gap from `mt-10` to `mt-7`, the quiz link from
  `mt-4` to `mt-3`, and the stat row from `pb-8 lg:pb-12` to `pb-6 lg:pb-10`.
- **H1 is "Puget Sound / Real Estate Expert"** with a hard `<br />`, at
  `md:text-6xl` rather than `7xl`. "Real Estate Expert" does not fit the 672px
  text column at 72px, so it would have wrapped to three ragged lines.
- **Subhead opens on "Hi, I'm Becca Pitts."** and keeps all four town names.
  It also went a step darker, `neutral-600` to `neutral-700`, with
  `text-shadow: 0 1px 3px rgba(0,0,0,0.3)` as the safety net for darker video
  frames.
- **The frosted glass is untouched:** same white gradient, fog border, 12px
  blur, and two-part shadow. `tsc --noEmit` clean, `next lint` clean.

### Breakpoints, and why the grid moved to lg

"SRES®" is much wider than "15+", "270", or "Icon", so it is the value that
decides whether a number can sit beside its label. Below `sm` a card is about
166px and the pair does not fit, so the two stack inside the card there. Four
across used to start at `md`, which gives each card about 168px; measured, the
"Senior Real Estate Specialist" label overflowed its pane by 57px. The
four-column grid now starts at `lg`, so tablets get a 2x2 of full-width
landscape cards instead. Verified at 375, 640, 768, 1024, and 1280: no
horizontal overflow at any of them.

### Note for whoever reads this next

This session ran alongside the compliance-branding session below it, in the
same working tree. Only `src/app/page.tsx` and these two log entries were
committed here; `Header.tsx`, `Footer.tsx`, `tenant.ts`, and
`ComplianceMarks.tsx` were left uncommitted for that session.

### Still pending

1. The Puget Sound versus Pierce County positioning question in LIVING_NOTES is
   still open, and the new H1 sharpens it rather than settling it.
2. At 1024 the "Senior Real Estate Specialist" label lands flush against its
   card's right padding, within a pixel. It does not clip, but it is the one
   width with no slack, so watch it if that label or the type scale changes.

---

## 2026-08-25 - eXp Realty compliance branding in the header and footer

**Deliverables:** `src/components/global/ComplianceMarks.tsx` (new),
`src/components/global/Header.tsx`, `src/components/global/Footer.tsx`,
`src/config/tenant.ts`.

### What changed

- **Header carries the brokerage above the fold.** A two-line "Brokered by /
  eXp Realty" block sits beside the logo behind a hairline divider, at 9px on
  narrow screens and 10px from `sm` up. It clears 24px against the 32px logo,
  so Becca's own branding stays larger than the brokered-by line, which is what
  eXp's policy asks for. Measured at 320, 375, and 1280: no horizontal overflow
  at any of them.
- **New compliance strip at the bottom of the footer**, on `--color-ink` rather
  than the slate the rest of the footer uses, so it reads as a legal band and
  not as more footer. It carries the brokerage lockup, the REALTOR block R, the
  MLS notice with Becca's MLS ID, and the Equal Housing Opportunity mark, then
  the licensing statement, the personal-opinion disclaimer, the NAR collective
  mark notice, the service area, and the copyright.
- **The strip renders outside the `FadeIn`.** Everything above it is decoration
  and can wait on a viewport observer. Brokerage identification and the
  licensing statement cannot, so they are not behind an animation gate.
- **Footer columns tightened.** Four columns on `lg` (brand, Working with
  Becca, Learn more, Get in touch), two on `md`. Contact gained the email
  address and the mailing address, which were missing. The two nav blocks were
  identical apart from their data, so they collapsed into one `FooterNav`.
- **Marks are inline SVG in `currentColor`**, drawn here rather than shipped as
  four image requests, so one component reads correctly on ink and on any light
  surface.
- **`tenant.agent` gained `opinionDisclaimer`** plus four optional
  `brokerageLogo*` fields. `tsc --noEmit` clean, `next lint` clean.

### The eXp logo is deliberately not in this commit

eXp's brand guidelines say the logo must never be recreated or typeset and that
only official artwork may be used. The files are behind a login on the eXp
brand toolkit and Canva brand kits, so nothing here approximates the mark: the
lockup renders "eXp Realty" as a plain identification line in the site's own
type. Drop the official light and dark PNGs into `public/images/brand`, fill in
`brokerageLogo`, `brokerageLogoLight`, `brokerageLogoWidth`, and
`brokerageLogoHeight` together, and `BrokeredBy` switches to the artwork with
no other change. It already pins a 60px minimum width, which is the floor in
the guidelines.

### Still pending

1. Drop in the official eXp logo files, per the section above.
2. Confirm the exact WA DOL and NWMLS firm-identification wording before
   launch. The old Footer TODO said this and it is still open.
3. Everything under the following sessions' "Still pending" remains open.

---

## 2026-08-25 - Desktop header nav right-justified

**Deliverable:** `src/components/global/Header.tsx`. The five desktop nav items
(Home, Buyers, Sellers, Neighborhoods, About Becca) now sit against the Contact
button on the right instead of centering in the bar.

### What changed

- One class: `lg:ml-auto` on the `<nav>`. The auto left margin absorbs the row's
  free space, so the nav and the Contact group cluster on the right and the logo
  keeps the left edge.
- The row's `justify-between` stayed. Below `lg` the nav is `display: none`, and
  `justify-between` is what still pushes the hamburger group to the right edge
  there. An auto margin on a hidden element does nothing, so the two rules do
  not conflict.
- The mobile sheet is a separate stacked layout and was not touched.
- `tsc --noEmit` clean.

### Still pending

1. Everything under the following sessions' "Still pending" remains open.

---

## 2026-08-22 - Hero H1 broadened from Pierce County to Puget Sound

**Deliverable:** `src/app/page.tsx`. The hero headline changes from "I know
Pierce County street by street." to "Your Puget Sound expert."

### What changed

- The H1 was hardcoded in `page.tsx`, not pulled from `tenant.ts`. Two other
  "street by street" strings exist in the repo and were deliberately left
  alone: `tenant.agent.storyLong` (prose) and the Bonney Lake neighborhood
  tagline (`tenant.neighborhoods`). Neither is the hero.
- The manual `<br />` came out with it. The old headline needed a forced break
  to balance across two lines; the new one fits on one line at every breakpoint
  and a hard break would split it awkwardly.

### Still pending

1. **The hero subhead still reads as Pierce County copy:** "Bonney Lake,
   Puyallup, North Tacoma, Eatonville. Fifteen years in real estate in
   Washington and 270 closings behind me..." Those are all Pierce County towns
   sitting directly under a Puget Sound headline. Not changed here because the
   ask was scoped to the H1, but the two now claim different territory and the
   subhead should probably widen to match.
2. **The geographic H1 was a deliberate SEO decision** logged earlier in this
   file ("Homepage H1 is now geographic"). Reversing it trades the Pierce County
   keyword for a broader regional one. Flagged, not re-litigated.
3. Everything under the following sessions' "Still pending" remains open.

---

## 2026-08-22 - Scroll crossfade on the homepage portrait

**Deliverable:** `src/components/ScrollCrossfadePortrait.tsx`, wired into the
about preview on `src/app/page.tsx`, plus a new optional
`tenant.agent.headshotAlt`.

Two portraits stacked in the same 4:5 frame, crossfading as the about section
travels up the viewport. Reference was the Russ Lagan site.

### What drives it

One number: a 0 to 1 progress value written to a `--crossfade` custom property
on the wrapper. The top photo reads `calc(1 - var(--crossfade))` for opacity,
the bottom reads `var(--crossfade)`, and both take a 4% scale off the same
value so the swap reads as a slow push rather than a light switch.

Progress is measured from the portrait's center expressed in viewport heights:
the fade opens when the center reaches 0.78vh from the top of the screen and
closes at 0.34vh, with a smoothstep across the gap. Fractions of the viewport
rather than pixels, so a phone and a desktop get the same pacing relative to
what the reader can actually see.

### Why it is built this way and not with framer-motion's useScroll

Three constraints, and the hand-rolled version hits all three:

1. **No React render during the scroll.** The progress value goes straight to
   the DOM node's style, so there is no reconciliation on any frame.
2. **Opacity and transform only.** Neither triggers layout or paint, so the
   compositor owns the whole animation.
3. **The listener only exists while the photo is on screen.** An
   IntersectionObserver with a 20% margin attaches the passive scroll and
   resize handlers on entry and tears them down on exit, so scrolling the other
   24,000 pixels of the homepage costs nothing. The rect read happens once per
   animation frame and is never interleaved with a style write, which is what
   keeps this off the layout thrashing path.

Reduced motion gets the first photo, held still, and no listeners at all.

### The second photo

`becca-headshot-alt.webp` was already in `public/photos/headshots/` and unused:
the denim dress and hat frame, laughing. It is now referenced through
`tenant.agent.headshotAlt`. That field is optional, and the homepage falls back
to running `tenant.agent.headshot` in both slots when it is unset, so the
mechanism keeps working if the alt is ever pulled.

The second image is `alt=""` and `aria-hidden`. It is the same person as the
photo above it, and announcing the portrait twice is noise.

### Verified

Measured in Chrome against the dev server, not eyeballed. At a center fraction
of 0.559 the property read 0.5030 with the two images at 0.497 and 0.503
opacity, which is the expected midpoint. At 0.80 the seated portrait was clean
at full opacity. Production build passes.

**Next:** nothing outstanding. Swap `headshotAlt` if Becca prefers a different
second frame.

---

## 2026-08-22 - Hero stat cards restyled to the Living In tile recipe

**Deliverable:** `src/app/page.tsx`. The stat cards from the pass earlier today
are rebuilt against a design reference Brett pointed at: the category tiles in
the hero of livingin-platform.vercel.app.

### The recipe, read off the live page

Not eyeballed. `.category-tile` resolves to:

```css
background: linear-gradient(#fff6 0%, #ffffff8c 45%, #ffffffd9 100%);
border: 1px solid var(--border);   /* rgb(230,227,220), opaque */
box-shadow: 0 1px 2px #00000029, 0 8px 18px #00000038;
border-radius: 16px;
```

Three things about that were not what "glassmorphic" usually means, and all
three matter:

1. **It is a gradient, not a flat alpha.** 0.40 at the top opening to 0.85 at
   the bottom. That is what makes it read as frosted glass rather than as a grey
   film, and it puts the type on the most opaque part of the card.
2. **There is no `backdrop-filter` at all.** The frosted impression is entirely
   the gradient.
3. **The text is dark**, `rgb(25,42,44)`, not white. Their hero has no scrim
   under the tiles either. The tiles carry themselves.

### What that changed here

The earlier pass had `bg-white/15` with white type and a black scrim across the
bottom 45% of the hero. All of that inverted. Cards now use the gradient above
with ink type, and the scrim came out: light cards with dark text do not need
it, and a dark band would have fought both the cards and the hero's own
left-to-right white wash.

Two deliberate departures from the reference, both because this sits on moving
video rather than a still photo:

- **`backdrop-blur-[12px]` was added.** The reference does not have it and does
  not need it on a fixed image. Footage that cuts between frames does.
- **The shadow stays.** It is what separates a light card from a frame that
  happens to be white.

### Icon chips

Icon over label is the structural half of the reference, so each card now leads
with a 40px/48px rounded chip in a brand color with a white stroke glyph, and
the stat number sits between the chip and the label at display weight. The
reference tiles carry an icon and one label; the number is the reason this row
exists, so it keeps the size.

Icons are keyed by the stat's label in `tenant.stats` rather than by index, so
reordering the stats moves the right icon with the right number, and an unknown
label falls through to the star instead of leaving a hole.

The gold chip takes an ink glyph instead of white. White on `#D99A2B` is about
2.2:1, which is thin even for decoration; dark on gold is roughly 8:1 and reads
as a badge on purpose.

### One trap worth remembering

The detail line was first written as `text-[11px]`. That is wrong on this site:
`globals.css` redefines `--text-xs` to `0.875rem` and calls it "the floor for
anything on this site". An arbitrary px value walks straight under a documented
type floor without tripping anything. The line is `text-xs` now, and it
separates from the label by case and color rather than by size.

### Measurements

375: 2x2, 166px wide, 233px tall, no horizontal overflow.
1280: four 288px columns, 250px tall, equal height via `h-full`.

Open item: the cards are 250px tall now against 174px before, so the hero
measures about 1066px at 1280 wide and the row sits below the fold on an 800px
viewport. The cause is upstream of the cards. The `md:text-7xl` headline is
229px and the subhead another 170px, so roughly 270px would have to come out of
the copy or the type scale to lift the row above the fold. Not a card problem
and not changed here.

---

## 2026-08-22 - Homepage: the stats move onto the hero video as glass cards

**Deliverable:** `src/app/page.tsx`. The standalone "By the numbers" section is
deleted; `tenant.stats` now renders as a glassmorphic row pinned to the bottom
of the hero, over the video. `AboutPreviewSection` is the first thing under the
fold.

### What was cut, not moved

Two pieces of copy came out entirely rather than following the numbers up into
the hero: the "By the numbers" eyebrow and the "Becca Pitts: 270 closings across
Western Washington" heading. A label that says "here are some numbers" above
four numbers is not carrying meaning, and the heading restated a stat sitting
two inches below it in 40px type. The hero headline is the only heading the top
of the page needs.

### The hero is a flex column now

It was `min-h-[85vh]` with a single stacked content div. It is now
`flex min-h-[85vh] flex-col`, with the text block in a `flex-1` wrapper that
centers it in whatever space is left and the stat row as the last child. The
cards sit on the bottom edge at any hero height instead of being positioned
against it.

### The white wash and the white cards fight, so there is a scrim

`HeroVideo` paints a left-to-right white gradient, up to 0.90 opacity on the far
left, so the dark-ink headline reads over the footage. White glass cards with
white type in that same wash would be invisible, and the footage also cuts to
bright frames (sky, siding) where they would vanish anyway.

So the hero paints its own scrim: `absolute inset-x-0 bottom-0 h-[45%]`,
`bg-gradient-to-t from-black/60 via-black/25 to-transparent`, at `z-[5]`. That
is above the video and its wash (`z-0`) and below the content column (`z-10`).
It is fully transparent by 45% up, well clear of the headline and subhead, which
still want the light wash under them. Card type also carries
`text-shadow: 0 1px 12px rgba(0,0,0,0.45)` for the same reason. Tailwind has no
text-shadow utility, so that one is an inline style.

### Card recipe

`rounded-2xl`, `border border-white/25`, `bg-white/15`, `backdrop-blur-[12px]`,
`shadow-lg`, white type, detail line at `text-white/80`. Four separate panes
rather than one wide bar, so the mobile grid reads as deliberate.

`grid-cols-2` on phones and `md:grid-cols-4` above. Measured at 375 x 812 and
1280 x 720: clean 2x2 at 166px per card on mobile, four 288px cards on desktop,
no horizontal overflow at either.

### Hero padding came down

`py-24 lg:py-32` to `py-14 lg:py-20`. Padding above the stat row is now padding
that pushes the cards toward the fold, so it had to pay for itself.

Known tradeoff: the hero measures about 990px tall at 1280 wide, because the
`md:text-7xl` headline is 229px on its own and the subhead another 170px. On a
short laptop viewport the cards land just at or below the fold. Shrinking the
headline would fix it and was out of scope for this pass.

### StatCardRow stays

The component is still imported by `/about` and `/sellers`. Only the homepage's
use of it was removed, along with the now-unused import.

---

## 2026-08-22 - Header: demo ribbon out, bar tightened, nav cut to five

**Deliverable:** `src/components/global/Header.tsx` rewritten around a
five-item nav, `DemoRibbon` deleted, `tenant.demo.ribbon` retired.

### The demo ribbon is gone, the noindex guard is not

`DemoRibbon` painted a "Demo site" pill fixed to the top right corner of every
page. It was a reminder, never a protection. The protection is `isNoIndex()` in
`src/lib/placeholder.ts`, which ORs `tenant.demo.noIndex` with
`PLACEHOLDER_MODE`, and feeds the meta robots tag, the `X-Robots-Tag` header in
`next.config.ts`, and `/robots.txt`. None of that was touched. The site is still
walled off from crawlers; it just no longer says so in the corner.

`tenant.demo.ribbon` had exactly one reader, so the flag came out of the
`Tenant` interface with the component. `demo` is now `{ noIndex: boolean }`.

### The bar was 80px of mostly nothing, now 61px

Measured in the browser, not eyeballed. What moved:

| | Before | After |
| --- | --- | --- |
| Header height (desktop) | 80px | 61px |
| Logo | `h-11 md:h-12` | `h-8 md:h-9` |
| Row padding | `py-4` | `py-2` |
| Nav pills | `px-4 py-3`, `min-h-[44px]` | `px-3 py-2` |
| Top-right CTA | `.btn-primary`, 48px tall | 92 x 42 |

The CTA needed its own class rather than a couple of override utilities on
`.btn-primary`. That class lives in `globals.css` outside any `@layer`, and
unlayered CSS beats layered utilities regardless of what Tailwind emits, so
`px-4 py-2` on the element does nothing. It is also correctly sized for the
in-page CTAs everywhere else on the site, so editing it in place was not an
option either. `CTA_CLASS` at the top of `Header.tsx` is the header's own copy.

Touch targets held: mobile nav rows measure 55px and the mobile CTA keeps
`min-h-[44px]`. The desktop pills dropped below 44px on purpose, since that
nav is `hidden lg:block` and only ever sees a pointer.

### Five items, and Contact is the button

Home, Buyers, Sellers, Neighborhoods, About Becca. Blog, Quiz, Podcast, and
Listings are out of the header. Every one of those pages still exists, still
builds, and is still reachable from the footer and from body copy; they are
just no longer competing for space in the top bar. "Contact" replaces "Let's
talk" as the button, which also means the word no longer appears twice in the
header.

Home is a new kind of entry for this component, and the old active check would
have broken on it: `pathname.startsWith(href + "/")` with `href` of `/` tests
for `//`, so Home would never have lit up, while every other rule stayed fine.
`isActive()` now special-cases `/` as exact-match and keeps the prefix rule for
the rest, so `/neighborhoods/tacoma` still marks Neighborhoods as current.
Desktop nav and the mobile sheet both read `NAV_ITEMS`, so they cannot drift.

### Files touched

- `src/components/global/Header.tsx` - nav list, `isActive`, `CTA_CLASS`, sizing
- `src/components/global/DemoRibbon.tsx` - deleted
- `src/app/layout.tsx` - `DemoRibbon` import and render removed
- `src/config/tenant.ts` - `demo.ribbon` dropped from the type and the value

### Verified

`tsc --noEmit` clean, `next build` clean, `next lint` clean apart from two
pre-existing `no-img-element` warnings in files not touched here. Header
rendered and measured at 1280px and at 375px with the mobile sheet open.

### Note for whoever picks this up

`src/app/page.tsx` had uncommitted hero and stat-row changes sitting in the
working tree during this session, from other work in progress. They were left
alone and are not part of this commit.

---

## 2026-08-22 - Hero gradient raised from 0.40 to 0.90 on the left

**Deliverable:** one style change in `src/components/HeroVideo.tsx`. The
left-to-right white wash over the hero video now runs:

`rgba(255,255,255,0.90) 0%, 0.80 20%, 0.60 35%, 0.30 50%, 0 62%`

It was `0.40 0%, 0.37 35%, 0.28 55%, 0.10 78%, 0 100%`.

**Why:** the dark hero text was not popping against the footage. The old ramp
was both too weak at its peak and too long in its tail, so it spread a faint
haze across the whole frame instead of putting real density where the text
sits. The new ramp is stronger where it matters and gone entirely by 62%.

**This closes the open WCAG AA item in LIVING_NOTES.** That note put roughly
0.70 as the point where the h1 (2.34 against a 3.0 threshold) and the subhead
(2.52 against 4.5) both clear. 0.90 is past it.

**Deliberately unchanged:** no bottom fade was reintroduced, the text stays
dark, and no copy was touched. The hero text is left-justified, so the gradient
only needs to be dense on the left.

**Note for the next session:** the working tree had unrelated in-progress edits
during this session (`layout.tsx`, `page.tsx`, `Header.tsx`, `tenant.ts`, and a
deleted `DemoRibbon.tsx`). Those were left uncommitted on purpose. Only
`HeroVideo.tsx` went into commit `f3b1208`.

---

## 2026-08-22 - Google reviews merged into testimonials, em dash sweep

**Deliverable:** `tenant.testimonials` goes from 46 entries to 57. All 46 Zillow
reviews stay, plus the 11 Google reviews that are not already on Zillow. The
carousel design is untouched; only the data and one null guard changed.

**Dedup rule used: match on review text, not on name.** Ten of the 21 Google
reviews are the same review the person also left on Zillow, in some cases word
for word. Those are dropped from the Google side and the Zillow entry is kept,
because the Zillow text is usually the longer one (Jan Pauw's Zillow review runs
three sentences past the Google version) and the Zillow entry carries the
transaction summary and city that Google does not publish.

**Nine Zillow entries got their real names.** Zillow published them under
screen names; the matching Google review had the person's actual name. These
now read as people instead of usernames and keep `source: "Zillow"`:

| Was (Zillow screen name) | Now |
| --- | --- |
| `cleochatra3` | Jamie Van Eaton |
| `janpauw` | Jan Pauw |
| `BryannaRaiche` | Bryanna Michele |
| `Seappudoray` | Sara Appudoray |
| `HALLALICIAE` | Alicia Torrez |
| `brendan dudley` | Brendan Dudley |
| `jcyust` | Julie |
| `bethie schmidt` | Bethany Schmidt |
| `Patricia albuquerque` | Patricia Albuquerque |

Four of those nine were not on the brief. They were found by comparing review
text: Bethany Schmidt, Jan Pauw, Brendan Dudley, and Julie all matched a Zillow
entry closely enough to be the same review, so adding the Google copy would have
printed the same testimonial twice under two different names.

**`context` and `location` are now optional.** Google publishes neither a
transaction summary nor a city. The alternative was inventing a city for eleven
real clients, which is not a thing to do on a page whose whole job is being
verifiable. `TestimonialCarousel` drops the separator and the location line when
they are missing, so a Google card reads "Tory Shelton" over "November 2024"
with no dangling middot.

**Still open: the Facebook reviews.** The brief named Emily Whipple Ellis and
Katy Peterson but did not include their review text, and a fifth Facebook review
was never named. Nothing was added for them, because the only way to add a
testimonial without its text is to write one, and a made-up testimonial is worse
than a missing one. Two of the five Facebook reviews are already handled: TW
Shelton is Tasha Shelton (in as Google) and Jamie Saal VanEaton is Jamie Van
Eaton (in as Zillow). Paste the text for the other three and they go in.

**Em dash sweep.** 23 tracked files carried em dashes, all in docs and notes
rather than site copy. Every one is now a regular dash. The site source was
already clean apart from two in a `src/lib/placeholder.ts` comment.

### Two same-person pairs left as two entries, on purpose

- **`tashat9` (Zillow, 2016) and Tasha Shelton (Google, 2024).** Different
  reviews eight years apart, so both are real and both are in.
- **`wineboy1` (Zillow) and Carl (Google), both 2022-08-06.** Same day, entirely
  different text. Probably the same seller writing twice on two platforms.

Neither is a duplicate under the text rule, so neither was merged. Worth a look
if seeing the same client twice under two names bothers anyone.

### Files touched

- `src/config/tenant.ts` - `testimonials`, `TenantTestimonial`, header comment
- `src/components/sections/TestimonialCarousel.tsx` - location null guard
- 23 files - em dash replacement

`stats` still reads "5.0 Zillow rating / 46 verified reviews". That is still
true, since it is labelled as the Zillow number specifically. If it should count
Google too, the honest combined figure is 67 reviews across the two platforms,
57 of them distinct.

`npm run typecheck` and `npm run build` both clean.

---

## 2026-08-22 - About copy: transaction team, and the drive is "hours"

**Deliverable:** two sentences in the second About paragraph rewritten. Commits
`ebe908d` and the follow-up.

Was: "You get me, not an assistant, not a transaction team."
Now: "You get me, plus my transaction team keeping every deadline and detail on
track behind the scenes."

Was: "I've driven an hour and a half to track down a signature..."
Now: "I've driven hours to track down a signature..."

Two problems with the old line. It was X-not-Y framing, which this file already
rules out, and it disclaimed a transaction team Becca actually has and relies on.
The replacement is additive: it credits the support without moving her out of the
client's seat, and it keeps the sentence's job in the paragraph, which is to land
right before "And I will give you a real answer to every question."

On the drive time: "an hour and a half" undersold it. Becca has put in as much as
eight hours in a single day chasing signatures, so the specific number was both
low and the smallest version of the story. "Hours" is open-ended and keeps the
parallel with the sentence before it ("I've sat in driveways at 9 PM... I've
driven hours..."). The eight-hour figure is on the table if a future pass wants
the harder number instead.

### Files touched

- `src/config/tenant.ts` - `agent.storyLong`, second paragraph

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

## 2026-08-21 - Fix: the edge-fade mask was clipping the expanded card

**Deliverable:** the hover expansion now actually clears its row. Reported as
"only expands a little bit and the full review text gets cut off by the panel
below it." Commit `c0ac1b4`.

### The cause was the mask, not the overflow

The row's `mask-image` was doing the clipping. A mask paints only inside its
clip box, the border box by default, so every pixel of an open card hanging
below the row was masked away to nothing. `mask-clip: no-clip` was meant to
lift that and does in Chrome, which is why this shipped looking fine.

**Forcing `mask-clip: border-box` in Chrome reproduces the reported symptom
exactly** - the card opens a little way and stops dead at the row's bottom edge,
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
  `z-index: 20`, below the sticky header's `z-40` - a review painting over the
  navigation would be a worse bug than one tucking under it.
- **The quote cap is a flat 400px** rather than `min(30rem, 44vh)`. The vh term
  resolved to roughly 360px on a laptop and made the opening look timid.

### Lesson for this file

A CSS property with no fallback path is a liability, not a nicety. `no-clip`,
`overflow-x: clip`, and `:has()` are all in here; the first one broke, and the
tell was that it worked perfectly in the browser it was developed in. Anything
load-bearing needs a "what if this does nothing" answer.

---

## 2026-08-21 - Testimonial cards expand on hover

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

## 2026-08-21 - All 46 Zillow reviews into `tenant.testimonials`

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

The reviews were described as all 5.0. **45 are five stars; one is four** -
`user7088909`, 4/2/2015, the reviewer who mentions being Becca's sister.
`rating` records each reviewer's own score, so that entry reads `rating: 4`.
Zillow itself still publishes the profile average as 5.0, so the
`resultsStats` tile ("5.0 Zillow rating, 46 verified reviews") is still what
Zillow shows and was left alone.

### Locations

Zillow's transaction summaries are inconsistent, so `location` was normalised:

- Neighbourhood prefixes dropped - "West end, Tacoma, WA" became "Tacoma, WA".
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

## 2026-08-21 - Testimonial section redesign: two-row auto-scrolling marquee

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

## 2026-08-21 - Rebrand to Your Next Step Team, real logo, hero tuning

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

## 2026-08-21 - Full site copy rewrite (geographic expert positioning)

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

- `src/config/tenant.ts` - bio, storyLong, title, positioning, eyebrow,
  neighborhood priority, stats, all six scenarios, all six FAQs
- `src/app/page.tsx`, `buyers/`, `sellers/`, `about/`, `contact/`, `quiz/`
- `src/app/home-value/`, `videos/`, `neighborhoods/[slug]/`,
  `buyers/questionnaire/` - CTA language and stray "no pressure" lines
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

## 2026-08-21 - Homepage redesign (Becca and Brett review session)

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

- `src/config/tenant.ts` - scenario rewrite, `articleSlug` field, positioning copy
- `src/app/page.tsx` - section order, hero CTAs, video comment, card markup
- `src/components/sections/TestimonialCarousel.tsx` - client component, auto-scroll, aligned attribution
- `src/components/ContactBlock.tsx` - matching questionnaire buttons (affects every page using it)
- `src/components/global/Footer.tsx` - sibling link, address removal, disclosure placement

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

## 2026-08-21 (later) - Hero layout alignment + real neighborhood market data

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

- `src/app/page.tsx` - hero wrapper swapped off `Container`
- `src/components/HeroVideo.tsx` - bottom gradient removed
- `src/components/HeroMosaic.tsx` - bottom gradient removed from the fallback
- `src/config/tenant.ts` - nine neighborhood entries filled in, `Roy` added

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
