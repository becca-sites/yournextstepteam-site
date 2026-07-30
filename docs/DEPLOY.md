# Deployment notes

## The 404-on-every-route incident (2026-07-30)

Symptom: Vercel build succeeded, "Deployment completed", and every route on both
the custom domain and the deployment-specific URL returned a plain-text 404 with
`x-vercel-error: NOT_FOUND`.

Cause: the Vercel project carried an **Output Directory override of `.`** in
Build & Output Settings, left over from the old static `yournextstephome.com`
site. Next.js built correctly into `.next`, then Vercel discarded it and
published the repository root as a static site. There is no `index.html` at the
repo root, so `/` and every other route 404'd. Proof at the time: `/README.md`,
`/next.config.ts`, `/src/app/page.tsx` and `/public/images/brand/logo.svg` all
returned 200 with raw file contents, while `/images/brand/logo.svg` (the path
Next.js would serve) returned 404.

Fix: `vercel.json` at the repo root now pins `framework`, `buildCommand`,
`installCommand` and `outputDirectory`. Settings declared in `vercel.json` take
precedence over the dashboard, so the deployment no longer depends on anyone
having access to the Vercel project settings UI.

Do not delete `vercel.json`. If it is removed, the dashboard override takes over
again and the site goes back to serving its own source code.

## Going live

`PLACEHOLDER_MODE` only controls indexability, never availability. The site
serves normally with `PLACEHOLDER_MODE=true`. To go public, set
`PLACEHOLDER_MODE=false` on Production **and** flip `tenant.demo.noIndex` to
false in `src/config/tenant.ts`. Both must agree.
