# Google Drive Context Files — Placeholders

The following files are **placeholders**. They were requested from the Google Drive
folder **"Your Next Step Home — Becca Context"**
(folder ID: `1N12pmm_RQs-DS8_VoLaRbcmQPwVEaW0P`), but the session that generated this
commit had **no Google Drive access** (no Drive MCP connector was available), so the
live document contents could not be pulled programmatically.

Each placeholder below contains:
- The source Drive doc name and the target filename it maps to.
- Any concrete facts that were supplied out-of-band (by Becca) and are known to be current.
- An instruction for Brett to pull the full doc from Drive when he has access.

**These placeholders are NOT the full Drive documents.** Where a placeholder lists
facts, those came from Becca's hand-off notes, not from parsing the Drive doc itself.
Treat the Drive originals as canonical and replace each placeholder once pulled.

| Placeholder file | Drive doc | Status |
|---|---|---|
| `CLAUDE_DRIVE.md` | CLAUDE (Google Doc) | Placeholder — pull from Drive |
| `LIVING_NOTES_DRIVE.md` | LIVING_NOTES (Google Doc) | Placeholder — pull from Drive |
| `SESSION_LOG_DRIVE.md` | SESSION_LOG (Google Doc) | Placeholder — pull from Drive |
| `BECCA_BIO.md` | bio (Google Doc) | Placeholder — pull from Drive |
| `SERVICE_AREAS.md` | service-areas (Google Doc) | Placeholder + known facts |
| `BRAND_COLORS.md` | brand-colors (Google Doc) | Placeholder + known canonical palette/type |
| `SITE_REFERENCE_BUDDYBUCK.md` | site-reference-buddybuck (Google Doc) | Placeholder — pull from Drive |
| `../brand-assets/ynsh-logo-primary.svg` | ynsh-logo-primary.svg | **Local on-disk copy included** (see note) |

## Note on the logo SVG
`docs/brand-assets/ynsh-logo-primary.svg` is **NOT** the Drive file. It is the copy
found on Becca's local disk at
`Your Next Step Home/Your Next Step Home/YNSH-Logo-Assets/ynsh-logo-primary.svg`.
It already uses the canonical colors and type (Forest #2D5016 house, Navy #1A2845
Playfair Display wordmark, Sage #4A7D2E subtitle), so it is likely current, but it has
**not** been diffed against the Drive version. Confirm against Drive before treating as final.

Individual Drive file IDs were not provided — only the parent folder ID above. Brett can
open the folder and export each Doc as Markdown/plain text.
