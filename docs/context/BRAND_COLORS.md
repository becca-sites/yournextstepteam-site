# YNSH Brand Colors & Typography

**Related Drive doc:** Google Drive folder "Your Next Step Team - Becca Context"
(`1N12pmm_RQs-DS8_VoLaRbcmQPwVEaW0P`), doc named **brand-colors**. Drive was not
accessible from the session that created this file; the palette below was supplied
directly by Becca and is canonical. Pull the Drive doc for any additional tints/usage
notes and reconcile.

## Canonical SITE palette - same as BBCH (Burien Best Care Home)

YNSH intentionally uses the **same site palette as BBCH** to create a visual family
between the two sites. Use these tokens for the site UI.

| Token | Hex | Usage |
|---|---|---|
| --color-ink | #1A2028 | Headings, primary text |
| --color-ink-soft | #4A5560 | Body text |
| --color-slate | #2D3E4A | Primary dark |
| --color-slate-soft | #3A4D5A | Eyebrow labels |
| --color-moss | #5A6E58 | Brand green |
| --color-bone | #FDFBF7 | Card backgrounds |
| --color-sunshine | #F3B94D | CTA buttons, accents |
| --color-sunshine-deep | #D99A2B | CTA hover |
| --color-clay | #B8876B | Warm accent (minimal) |
| --color-fog | #E8ECE6 | Section wash |

## Logo-only colors (NOT the site palette)

The logo uses its own dedicated colors. Keep these for the logo/wordmark only; do
**not** use them as the site UI palette.

Sampled from Becca's supplied artwork on 2026-08-21, replacing the forest/sage/navy
values that were previously recorded here. Those described a placeholder SVG that had
been drawn from a written description rather than from the real mark, and they were
wrong on all three counts.

| Color | Hex | Usage |
|---|---|---|
| Olive Green | #7F9A3D | Logo house and path mark |
| Warm Grey | #868686 | Logo wordmark |

Assets:
- `public/images/brand/logo-primary.png` - two-colour lockup, transparent, for light backgrounds
- `public/images/brand/logo-white.png` - white knockout, for dark backgrounds
- `public/images/brand/logo-green.png` / `logo-grey.png` - single-colour variants
- `docs/brand-assets/logo-*-source.*` - the untouched originals these were trimmed from

The wordmark reads **"Your Next Step"** with no suffix. That is correct and intentional:
the business is Your Next Step Team, and the logo does not carry the last word.

## Canonical typography - same as BBCH
YNSH uses the **same fonts as BBCH** so the two sites read as siblings.
- **Headlines:** DM Serif Display.
- **Body:** Inter, 16px+ minimum.
- Both loaded via Google Fonts.

*Logo exception:* the logo wordmark is set in its own serif, which is baked into the
artwork and is not a webfont the site loads. That is logo-only; the **site UI headings
use DM Serif Display**.

## Correction history
- Earlier task briefings and the first sync draft listed a **gold/ink** token set
  (`--color-gold #D4A843`, `--color-ink #1A2028`, etc.).
- A subsequent note pulled a **forest/sage/navy** "site" palette from the Drive
  `brand-colors` doc.
- **Both were wrong for the site UI.** Final decision: the **site uses the BBCH palette**
  above; **forest/sage/navy are logo-only**. Fonts match BBCH: **DM Serif Display**
  headlines + **Inter** body (site UI). The logo wordmark keeps Playfair Display.

See `_DRIVE_PLACEHOLDERS_README.md`.
