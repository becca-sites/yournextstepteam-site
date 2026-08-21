# LIVING_NOTES

Running log of design preferences, brand decisions, creative direction, and feedback
for yournextstephome.com.

Note: the Google Drive **LIVING_NOTES** doc is the more current master. See
`docs/context/LIVING_NOTES_DRIVE.md`. This file captures direction that came out of
work done directly in the repo.

---

## Voice and copy

- **Level 2 by default** for anything a visitor reads: polished professional with
  personality. See the `my-writing-style` skill.
- **No em dashes anywhere in visitor-facing copy.** Commas, colons, semicolons,
  parentheses instead.
- **Becca is a solo agent.** Always "I" and "me," never "we," "us," or "our team."
  The one exception is "we" meaning you and I together, as in "whatever we need to
  talk about."
- **No raw text-message fragments in website copy.** Becca's texting voice is the
  source material, not the finished product. Homepage traffic is cold: these people
  have never met her, so copy has to stand on its own without her delivery.
- **"Let's talk" beats "Book a consultation."** Lower friction, sounds like a person.
- **Time framing on the CTA:** "Five minutes or an hour. Whatever we need to talk
  about to figure out your next step." Replaced the old "fifteen minutes, no
  pressure, no sales pitch" line, which read as a script.

## Credentials, and one to watch

- Becca's real estate credentials are **15 years in real estate, 270 closings, SRES
  designation, eXp Icon Agent (2022)**.
- **The "twenty years in senior care" line is Daniela's, not Becca's.** It made it
  into site copy at least twice. If it appears again, it is wrong. Becca's senior
  expertise is the SRES designation and the work itself.

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
- **Testimonial attribution aligns across cards** regardless of quote length, with a
  reserved-height caption block.
- **Carousels auto-advance** but always pause on hover, focus, and touch, and always
  honor `prefers-reduced-motion`.
- **eXp branding stays small and stays at the bottom.** Brokerage disclosure belongs
  in footer small print, which is standard practice. It should not compete with
  Becca's own brand anywhere above the fold.

## Structural conventions

- **Every scenario card earns a long-form article.** Cards are entry points into real
  content, not just routers to hub pages. Cards fall back to the hub page until the
  article file exists, so unwritten content can never ship a broken link.
- **Physical address does not go on the site.** It is a PMB.
- **Service area language:** "Pierce, King, and surrounding counties."
- **`PLACEHOLDER_MODE` stays `true`** until launch is a deliberate decision.
