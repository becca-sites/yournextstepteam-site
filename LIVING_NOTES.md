# LIVING_NOTES

Running log of design preferences, brand decisions, creative direction, and feedback
for yournextstepteam.com.

Note: the Google Drive **LIVING_NOTES** doc is the more current master. See
`docs/context/LIVING_NOTES_DRIVE.md`. This file captures direction that came out of
work done directly in the repo.

---

## Becca's story, and how it gets told (from her interview, 2026-09-04)

- **Eatonville is the hook, and it is allowed to lead.** One blinking light, a
  town founded by the Van Eaton family, Dr. Tom Van Eaton delivered her, and her
  childhood best friend Gloria Van Eaton is now Dr. Gloria Low practising in that
  same town. The point Becca draws from it is that in a town that small your
  reputation is the whole thing, and everybody knows how you treated the last
  person. That is the thesis of the About page. Do not bury it under
  credentials.
- **The geography is a list and the list is the credential.** Eatonville, then
  Western Washington University in Bellingham (BA, Business Administration), then
  Puyallup, then Tacoma in Westgate for about ten years, a short stretch in
  Renton, and Bonney Lake since 2017. She has lived in Pierce, King, and Whatcom
  counties. She is on her second Bonney Lake house and bought this one because it
  has an ADU her mom lives in. Naming the actual places is what separates her
  from an agent who says "I know the area."
- **Broad geography still holds.** Towns belong on the About page and the
  neighbourhood pages, where they are the subject. Conversion pages stay at the
  county and region level so a King or Thurston County reader does not feel out
  of range. She has closed from Everett to Morton and Grays Harbor to Roslyn.
- **The licence year is 2010. Becca confirmed it on 2026-09-05.** It shipped as
  2008 for one day and that was wrong. She was not licensed at the bottom of the
  market; she was laid off in the Great Recession and was **recruited** into real
  estate in 2010, in the aftermath. Do not write "I got my license in 2008" or
  any version of "at the absolute bottom of the market" again.
- **The recruitment is the credibility story, not a liability.** Eight years in
  event production, laid off in the Great Recession, recruited into real estate
  in 2010, and the work that was actually there in 2010 was short sales,
  foreclosures, and REOs. The line to keep making: she learned the business on
  the hardest files it produces, so an ordinary transaction does not rattle her.
  Steve Hiatt at Keller Williams gave her the start, then Best Choice, then eXp
  for the last six years. Steve is not who recruited her, as far as the interview
  says, so do not merge those two beats.
- **State the licence year, not a year count.** "15+ years" was rounded down and
  went stale. Everything in the app now says "licensed since 2010", which is
  precise, carries the story, and never needs editing. The year is a literal in
  exactly one place, `tenant.agent.licensedSince`; everything else interpolates
  it or spells it in prose. The blog posts still say 15+, which stays true; align
  them when they are next touched.
- **"It's a conversation, not a script" is the line.** No listing presentation
  run at anybody. This is the one place the site is allowed to use X-not-Y
  framing, because it is Becca's own phrase about her own process rather than a
  comparison to other agents. The general no-X-not-Y rule still applies
  everywhere else.
- **The questionnaire asks about snacks and toast drinks, and that detail earns
  its place on the site.** It is the clearest proof of the way she works: she is
  going to be in your life for a few months, sometimes on a hard day, and she
  wants to show up with the right coffee. Do not cut it for being unserious.
- **The hard conversation happens in week one.** Price, roof, timeline, whatever
  it is. Her framing: it is so much easier in week one than in week six, while
  there is still room to do something about it.
- **Plan A, Plan B, usually Plan C.** Her words. The client does not have to
  carry all three plans; they just need to know somebody has them. This is what
  270 closings buys.
- **Other agents call her for advice, and she takes those calls.** Partly because
  it is how she would want to be treated, partly because the agent she helps this
  week is the one reading her client's offer next spring.
- **Tequila and Sour Patch Kids is the closing gift.** Sour, then sweet, worth it
  at the end. It stays on the About page. It is the kind of specific that no
  competitor's site can copy without looking like they copied it.
- **Allbree Warner is introduced by name, never absorbed into a "we".** Becca's
  line, kept verbatim: "When you hear from Allbree, you're hearing from me." The
  About page gives her a portrait frame and her own section. The site voice stays
  first person for Becca; Allbree is a named person the client will actually deal
  with, not a reason to switch to "our team".
- **"Your Next Step Team" is the business name and "I" is the voice.** Those are
  not in conflict. The brand names the business, Becca speaks as herself, and
  Allbree is introduced as a person.
- **The Alzheimer's story is Becca's to write.** Her dad had Alzheimer's and it
  is where the SRES certification came from. The About page names it in one short
  paragraph, connects it to the certification, and says outright that the full
  story is coming. Nobody else expands that section. There is a comment in
  `src/app/about/page.tsx` saying so.
- **"Let's have a conversation" is the CTA, sitewide.** It replaced "Let's talk".
  It is the same promise as the first-meeting line, and it says what actually
  happens next, which is a conversation and not a pitch. Three ContactBlock
  headings repeat it on purpose.
- **The no-pill rule is now fully applied.** The last three came off on
  2026-09-04: the filled gold "Where I specialize" eyebrow on buyers and sellers,
  and the `FeaturedListings` status badge. Nothing that is not a control looks
  like one anywhere on the site.
- **ADU, never "mother-in-law suite", even when Becca says it that way about her
  own house.** Fair housing rule, applied to public copy regardless of whose
  house is being described.

---

## The closing crawl (home page)

- **Humor is allowed to be big here, and it is the only place on the site that
  is.** The crawl is a straight Star Wars parody: gold #FFE81F on near-black,
  justified copy, tilted away from the reader, "Episode 270: The Closing". The
  bet is that the five percent / ninety-five percent argument does not land as a
  paragraph and does land as something you have to sit through.
- **Star Wars gold is crawl-only.** #FFE81F does not enter the site palette.
  Everything outside the crawl stays on Ink/Moss/Bone/Sunshine. The blue
  #4BD5EE came out with the title card on 2026-09-02 and is no longer in use.
- **Longer is the point. Becca's call, 2026-09-02.** The list roughly doubled to
  35 lines, and the instruction was explicit that more is better: the volume is
  what makes the job look epic rather than tidy. Do not trim the crawl for
  length. New material gets woven through the middle, in transaction order, not
  stacked on the end.
- **No preamble, no Skip. Becca's call, 2026-09-02.** The section opens straight
  on the crawl. The eyebrow, the "you might find the house yourself" headline,
  the 5%/95% setup, and the blue "A long time ago in a housing market not so far
  away..." title card all came out, along with the Skip button. The argument now
  lands only at the end, on "THIS is the other 95%." Reverting any of it is a
  `git revert` away if it reads thin on the live site.
- **Justified text is allowed only inside the crawl.** It is most of what makes
  the thing read as a crawl rather than as a dark section with yellow text. This
  site otherwise avoids justification, because it is hard on older readers.
- **Reduced motion is now the only way out of the crawl, and it has to keep
  working.** With Skip gone it is the sole escape hatch, so it stays wired in two
  places on purpose: the component flips to the flat list when it detects the
  preference, and globals.css carries the same flattening as a media query so it
  holds with JavaScript off. Anything animated added later still ships a way out;
  the crawl is the exception Becca chose, not the new rule.
  - Worth knowing: WCAG 2.2.2 wants an in-page pause for motion that starts on
    its own and runs past five seconds, and without Skip there is not one. This
    is a deliberate, informed trade, not an oversight. If it ever needs undoing,
    the smallest fix is a pause control rather than the full Skip.
- **Effects must not eat the content.** The crawl is real HTML that Google can
  read, not a video. If a future effect can only be done as a video or a canvas,
  the words have to exist somewhere else on the page too.
- **There is a live easter egg in the copy.** "the sarlacc pit has better
  escrow", texted to Becca, wins a coffee or a $25 gift card, first person each
  month. It is deliberately styled a half step smaller and a shade warmer so it
  blends into the task list. Do not "fix" that contrast, and do not remove the
  line without telling Becca, because people may be playing.

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
- **2026-08-25: the H1 is now "Puget Sound / Real Estate Expert",** broken onto
  two lines with a hard `<br />` rather than left to wrap. Becca asked for it
  directly and for that exact break. It reads as a title rather than a claim,
  which sharpens the tension logged in the note above instead of resolving it:
  the page still says Puget Sound in the headline and Bonney Lake, Puyallup,
  North Tacoma, and Eatonville in the line under it. That question is still
  open. The subhead now opens on "Hi, I'm Becca Pitts." so the H1 can stay a
  title and the introduction happens in the sentence below it.
- **2026-08-25: the tension above resolves toward widening, and the buyers page
  is the first page to land on the wide side.** Becca asked directly for the
  buyers page to stop isolating to Pierce County or to specific small towns,
  because she works a much wider area than the copy implied. Every geographic
  reference on `/buyers` now reads **"Pierce, King, and the surrounding
  counties"** or **"the Puget Sound region."** The four-town list is gone from
  that page entirely.
  - **Why:** naming four small towns repeatedly on one page reads as a service
    area boundary. A King County or Thurston County buyer concludes they are
    out of range and leaves. The list was costing leads rather than earning
    trust.
  - **What survives the widening:** street-level specificity. The rule two
    bullets up still holds, minus the town name. "Which streets flood" and "why
    two blocks a quarter mile apart price differently" still beat "deep local
    knowledge." Prove the ground-level knowledge without drawing a boundary
    around it.
  - **Client stories keep their real place names.** The Graham land story on
    `/buyers` is an anecdote, not a service-area claim, and stripping the town
    would only make it vaguer.
  - **Still open, and it is a deliberate next pass, not an oversight:**
    `tenant.ts` was not touched. `market.areasServed`, `market.description`,
    `hero.eyebrow`, `stats`, `scenarios`, `faqs`, and `neighborhoods` still
    carry the four-town framing, and they feed the home page, the neighborhood
    pages, and schema. **The home page and `/sellers` therefore still read
    narrower than `/buyers` does.** Ask Becca whether to run the same
    broadening sitewide before doing it.
- **2026-08-27: asked and answered. The broadening is sitewide, and the home
  page has now landed on the wide side too.** Becca and Brett reviewed the home
  page together and gave the rule directly: stop isolating to Bonney Lake,
  Puyallup, North Tacoma, and Eatonville. Main page sections use **"Pierce,
  King, and surrounding counties"** or **"the Puget Sound region."** Specific
  town names belong in blog posts and on neighborhood pages, where the town is
  the subject, and nowhere else.
  - **What moved:** the home page hero subhead, the scenarios section intro,
    `brand.eyebrow` (now "Pierce County / King County / Surrounding Areas"),
    and two `tenant.scenarios` titles: "Buying your first home in Pierce
    County" became "in the Puget Sound," and "Relocating to Pierce County"
    became "Relocating to Western Washington."
  - **"Street by street" is retired as a phrase.** It came out of
    `agent.storyLong`, which renders on both the home page and About. Becca has
    now asked for it to go twice, so treat it as dead rather than as a phrasing
    preference.
  - **Still narrower on purpose, and still worth a pass:** `market.primaryArea`
    is the string "Pierce County" and it interpolates into roughly a dozen
    pages (`/blog`, `/case-studies`, `/listings`, `/neighborhoods`, `/stories`,
    `/search`, and several section components). Widening it is a one-line
    change with a sitewide blast radius, so it wants its own review rather than
    riding along on a home page pass. `/sellers` and `tenant.faqs` also still
    carry the four-town framing.

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
- **The whole hero clears an 800px-tall desktop viewport.** Header, headline,
  subhead, both CTAs, the quiz link, and all four stat cards are visible at
  1280x800 without scrolling. That is the constraint any future hero edit has to
  hold: adding a line of copy or a taller card puts the proof points below the
  fold, which is where they stop working.
- **Hero stat cards are landscape panes, not portrait tiles.** Number on the
  left at display weight, label beside it, roughly 288x58 at 1280. No icon chip
  above the number; it was decoration that cost vertical space the fold could
  not spare. The per-stat `detail` line is not rendered in the hero either. The
  About page still shows all four stats with their details.
- **The frosted glass recipe stays.** White vertical gradient (0.40 to 0.85),
  hairline fog border, 12px backdrop blur, contact shadow plus soft lift,
  matched to the Living In Duvall category tiles. Compacting the cards changed
  their shape, not their surface. Do not flatten it to a single alpha.
- **"SRES®" is what sizes that row.** It is far wider than the other three
  values, so it decides when the number can sit beside its label. Below `sm`
  the two stack inside the card, and the four-across grid starts at `lg`, not
  `md`: at `md` each card is about 168px, which is too narrow for the pair.
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
- **The header carries the brokerage, above the fold, on every page.** "Brokered
  by / eXp Realty" sits beside the logo behind a hairline divider, two lines at
  9px, 10px from `sm` up. This is a compliance requirement, not a design choice,
  so it does not get dropped at a breakpoint and it does not get hidden behind a
  menu. It survived the 61px bar: the block clears 24px against a 32px logo.
- **Becca's branding is always at least as large as the brokered-by line.** eXp
  requires it, and the whole point of the small type is that the site is hers
  and the brokerage is the qualifier. If the header logo ever shrinks, that line
  shrinks with it.
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

## Compliance furniture (source of truth)

- **The eXp Realty logo is never drawn, traced, or typeset.** eXp's guidelines
  say only official artwork may be used and that the mark must never be
  recreated. So the site does not ship an approximation of it. Until the real
  files land, `BrokeredBy` renders "eXp Realty" as a plain identification line
  in Azo Sans, which is a brokerage disclosure and not a fake logo. Anyone
  tempted to "just make an SVG of it" should stop.
- **How to drop the real logo in.** Put the full-colour and white-knockout files
  in `public/images/brand`, then fill `brokerageLogo`, `brokerageLogoLight`,
  `brokerageLogoWidth`, and `brokerageLogoHeight` in `tenant.agent` together.
  The component only switches to artwork when it has a path and both intrinsic
  dimensions, so a half-filled config keeps the text fallback instead of
  rendering a broken image. The 60px minimum width from the guidelines is
  already enforced in the component; do not remove it.
- **Never recolour the eXp logo.** The light and dark files are two separate
  approved lockups. That is why the component picks a file by `tone` rather than
  filtering or inverting one file.
- **The other three marks are ours to draw.** REALTOR block R, the MLS chip, and
  the Equal Housing Opportunity house are inline SVG in `currentColor` in
  `ComplianceMarks.tsx`. They inherit the surrounding colour, which is what lets
  one component sit on the ink strip and on a light surface without a second
  asset. The equal sign is knocked out with `fillRule="evenodd"` rather than
  painted, for the same reason.
- **The compliance strip is ink, the footer above it is slate.** Two tones, so
  the legal band reads as a legal band. It is the one place on the site where
  `--color-ink` is used as a large background.
- **Compliance content renders outside `FadeIn`.** Decoration can wait on a
  viewport observer. Brokerage identification and the licensing statement
  cannot. Do not wrap the strip to "make it consistent" with the rest.
- **Two disclosure fields, two jobs.** `brokerageDisclosure` is the licensing
  statement. `opinionDisclaimer` is "Opinions expressed are my own and not the
  views of eXp Realty." They stay separate because the
  disclaimer belongs on this site specifically, as an agent-run site under a
  brokerage. Both live in `tenant.agent`, typed once, never retyped into a page.

## Home page structure

- **2026-08-27: the sections Becca and Brett reviewed live on the home page,
  not on `/buyers`.** Their review named four sections that were physically on
  the buyers page at the time. `/buyers` has since been stripped to face,
  trust, and one CTA and Becca confirmed that is final, so the review items
  were built on the home page instead. When she says "the home page," check
  which file the section is actually in before editing.
- **The lean rule above is a conversion-page rule, not a sitewide one.** The
  buyers page earns its way with Becca's face, the reviews, and one CTA. The
  home page is allowed to carry the longer argument: who she is, what the job
  actually involves, how she works, and one story.
- **"Do not invent how Becca works" still holds, and this is how these
  sections clear it.** The four items in "How to keep your deal together" are
  the four Becca named in the review, in her words: Education and
  Communication, I Know These Neighborhoods, A Network I've Personally Vetted,
  and the tenacity to figure out a deal others would walk away from. The five
  scenario labels are hers too. They are on the page because she said them,
  which is the whole test.
- **Senior transitions gets the gold treatment on the home page as well**: full
  width above the scenario grid, 2px `--color-sunshine` border, `#FEF9EF` wash,
  and a filled gold badge with dark type. **The badge is filled rather than set
  in gold type on purpose.** `--color-sunshine-deep` on a cream ground is about
  2.4:1, which fails at eyebrow size, so the colour lives in the border and the
  badge fill and the words stay ink. Gold still ranks exactly one thing per
  page.
- **The senior card absorbed "Helping a parent move" and "Ready to downsize or
  right-size."** Two doors into the same conversation, and splitting them
  buried the specialty in a grid of equals.
- **One card per page may set `featured` on `TenantScenario`.** That flag is
  what lifts a scenario out of the grid; it is not a styling hook to reuse.
- **Card headings are title case, section H2s are sentence case.** The scenario
  and pillar names came from the review as labels, so they read as names. The
  H2 above them is still a sentence.
- **Equal-height cards with two-line headlines is a recipe, not a coincidence.**
  `h-full` on the card against the grid's default stretch, `min-h-[2.75em]` on
  the h3 at `leading-snug` to reserve two lines at every breakpoint, and
  `text-balance` so the two lines split evenly. A title longer than about four
  short words per line pushes a card to three lines and breaks the row.
- **Static cards hover at `scale-[1.02]`, links do not.** The pillar cards are
  not clickable, so the lift acknowledges the cursor rather than promising a
  click. Always pair it with `motion-reduce:hover:scale-100`; the global
  reduced-motion block kills the duration but not the transform.
- **No "details changed for privacy" on client stories.** It reads as a hedge
  on a true story and undercuts the story. Removed from the Graham land story.
- **There is deliberately no second "truth about online listings" section.**
  `ClosingCrawl` already carries the five percent / ninety-five percent
  argument in Becca's framing. One page, one version of that point. **Open
  question:** the crawl is a black band with white type, and the review
  complained about type disappearing into a dark background. If that complaint
  was about the crawl rather than the old buyers band, it has not been
  addressed.

## Page structure: keep the conversion pages lean

- **Three things convert on a service page: Becca's face, the reviews, and one
  clear CTA.** The buyers page was rebuilt around exactly that on 2026-08-25.
  Hero with the headshot and the questionnaire button, the senior transitions
  callout, buyer testimonials, the quiz as a soft funnel, a neighborhoods link,
  and the contact block. Nothing else.
- **Do not invent how Becca works.** Numbered systems, "old way versus new way"
  comparisons, pillar grids, and detailed scenario breakdowns were all written
  without her confirming any of it, and they read as filler. If a claim about
  her process did not come from her, it does not go on the page.
- **A hero image on a page about Becca should be Becca.** The buyers hero was a
  stock house exterior. The headshot is the asset that builds trust.
- **Senior transitions gets its own band, not a slot in a grid.** It is the
  specialty, so it sits directly under the hero with the gold border, the gold
  badge fill, and dark type. Gold is used for ranking exactly one thing per
  page, and this is it.
- **Testimonials get selected by name from `tenant.testimonials`.** Never paste
  a review into a page file. Selecting by name keeps the quote verbatim and
  keeps one review set as the source of truth.
- **No town names on the buyers page.** Geography there is "the Puget Sound
  region" or "Pierce, King, and the surrounding counties." Individual towns are
  the subject of the neighborhood pages and blog posts, so that is where they
  earn their keep. This includes the reviewer cities on testimonial cards.
- **Standing numbers.** "12 sales in the last 12 months across the Puget Sound
  region" and "270 career total across Western Washington," one line each. Say
  "online reviews" rather than "Zillow ratings" wherever the review count is
  quoted as a stat.
- **If a section only works after being recoloured to stay readable, cut it.**
  The dark myth-busting band on the buyers page was patched to grey once and
  then deleted, because the patch was keeping a section nobody needed.
- **No town names on the sellers page either,** same rule as buyers, confirmed
  on 2026-08-27. Counties and the Puget Sound region only, in the metadata and
  the case study tags as well as the body copy.

## Seller messaging (source of truth)

- **Every home can sell, whatever condition it is in.** This is the spine of the
  sellers page and it outranks everything else on it. A seller who cannot afford
  to fix anything should finish the hero paragraph feeling like calling is a
  reasonable thing to do.
- **Price, positioning, and marketing sell a house.** Improvements are optional;
  those are not. Say it plainly, in the hero paragraph, in one paragraph. It does
  not need its own section. Gold on the sellers page belongs to senior
  transitions, same as the buyers page.
- **Prep is a spectrum, and the seller picks the spot.** One end is paint on the
  front door and a pressure wash. The other end is a full remodel. Where someone
  lands depends on three things and only three things: **budget, time, and
  bandwidth.** Use those three words; they are Becca's. This belongs in
  conversation, in a blog post, or in a questionnaire follow-up. It had its own
  three-card section on the sellers page for about an hour on 2026-08-27 and was
  cut for length.
- **Never imply a seller should have done more.** Not everyone has cash to put
  into a house before listing it, and the copy treats that as normal rather than
  as a problem to apologise for.
- **Only recommend what returns more than it costs.** Becca's value here is
  knowing which improvements move the needle and which quietly waste money, and
  helping a seller decide **how many worms to let out of the can.** That phrase
  is hers and it is worth keeping in the copy.
- **Promise strategy and honesty, never ease.** "I can't promise selling a home
  is easy. Some of them are really, really hard." That is closer to how she
  actually talks than any reassurance about a smooth process would be.
- **No X-not-Y framing anywhere in her voice.** This is why the "old way versus
  the way I list a home" grid was deleted rather than rewritten. State the thing
  that is true; do not set it against a strawman.
- **Seller proof comes from seller reviews.** Pick them by name out of
  `tenant.testimonials`, never paste. Liw2's review is the one that proves the
  pricing claim, so it holds its spot even though the Zillow handle is not a real
  name.
- **`tenant.faqs` renders nowhere right now.** It was the sellers page FAQ until
  that accordion was cut on 2026-08-27. The copy is seller questions end to end
  and is kept for reuse. Putting it back on a page also puts FAQ structured data
  back on that page, which is the main thing lost by removing it.
- **The seller fear list is the standing example of copy to never write again.**
  It claimed nobody says those worries out loud (sellers say them constantly),
  that every seller thinks them (they do not), and that each one has an answer
  (some of these decisions are emotional and do not have one). Dramatic framing
  that overstates its case reads as false, and Becca will catch it.

## The sellers page is six sections, and that is the whole page

Set with Brett and Becca on 2026-08-27, after two passes in one day.

1. **Hero** with the headshot, a headline about selling, one paragraph on price
   and positioning, and the JotForm **seller questionnaire** as the primary
   button. `tenant.listings.sellerQuestionnaireUrl`, which existed in config and
   had never been linked from anywhere.
2. **Stat bar**, small, three stats.
3. **Senior transitions** in the gold band.
4. **Seller testimonials.**
5. **Quiz** as the soft funnel for anyone not ready to fill out a form.
6. **Contact block.**

- **The goal is the questionnaire.** See Becca, build trust through the reviews,
  fill out the form. A section that does not serve that path is fluff sitting in
  front of the conversion, however good the writing is.
- **This is the same shape as the buyers page,** deliberately. Hero with the face
  and the questionnaire, the gold specialty band, reviews, quiz, contact. Two
  service pages, one pattern.
- **Numbered steps are the tell.** Every version of this page that got too long
  did it by adding a numbered process grid under a new name: "the system", then
  "how I work a listing". If a new section has 01 / 02 / 03 in it, that section
  is coming back.

## Standing numbers (2026-08-27)

- **"12 sales in the last 12 months across Puget Sound."** Not "Pierce and South
  King County", which was inaccurate.
- **"5.0 online reviews", never "Zillow rating".** There are Google and Facebook
  reviews now too. A single testimonial card can still name its own source,
  because that is a fact about that one review.
- **"270 career total across Western Washington."**
- **The $516K average sale price stat is retired.** It invited a price comparison
  that does nothing for a seller reading the page.
- **`StatCardRow` sizes its grid from `stats.length`.** Three stats render as
  three columns, four as four. Keep every label and detail short enough to hold
  one line.

## No pill boxes, anywhere (2026-09-02)

**Site-wide rule, not a page-level preference.** No eyebrow, label, badge, tag,
or chip gets a rounded filled container around it. A pill reads as a button.
Users try to click it, nothing happens, and they lose a little trust in the rest
of the page. Only actual controls get to look like controls.

- **What an eyebrow looks like instead:** plain text. Uppercase, small,
  letterspaced, coloured is all still fine. What comes off is the background
  fill, the padding, and the border radius. The `.eyebrow` utility in
  `globals.css` is already the correct pattern and always was.
- **`rounded-full` is not banned outright.** It is correct on circular photos
  (the `ContactBlock` headshot) and on real interactive elements (header nav
  links, the skip link). The rule is about **non-interactive text** wearing a
  filled rounded container.
- **The senior transitions card was the last one on the home page.** Its eyebrow
  was a filled gold pill. It is now plain uppercase ink text on the same gold
  card. The gold still ranks the card, through the border and the wash, which is
  where the colour already did the work.
- **If gold type looks too light at eyebrow size, do not reach for a gold fill.**
  Darken the type to ink and let the border carry the colour.

## Senior transitions eyebrow says the credential (2026-09-02)

The home page senior transitions card is labelled **"Senior Real Estate
Specialist"**, which is Becca's actual SRES certification title. It replaced
"Where I specialize".

- **It states a credential rather than a boundary.** "Where I specialize" implies
  senior work is the thing she does, which undersells a business built on
  first-time buyers, move-up buyers, and sellers. The certification name is a
  qualification she holds, sitting alongside everything else.
- **It matches the hero stat row,** which already carries `SRES®` with "Senior
  Real Estate Specialist" as its label. Same words in both places.
