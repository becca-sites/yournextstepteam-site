# SYNC REPORT: Becca Pitts — Three Business Website Build
*For Brett's build sprint. All context needed to build cold.*
*Generated: April 22, 2026*

---

## WHO IS BECCA PITTS

Licensed real estate agent in Washington state (Inside Real Estate / BoldTrail). Runs three businesses. Building a micro-influencer personal brand across all three. Not a developer. 20+ years senior care experience.

**Voice:** Warm, authentic, occasionally sassy, always honest. "Hey girl, let's figure this out together" energy. Relatable first, professional second. Never corporate, never salesy.

**Catchphrases:** "Your next step starts here" / "Let's make this happen" / "I've got you"

**Photos available:** Two professional headshots uploaded. Fun/energetic (hat, big laugh) for real estate. Professional/warm (seated, soft smile) for about sections and senior content.

**The origin story:** Becca is building the type of care she wishes she had for her own parents. This is the emotional truth driving everything, not a marketing angle.

---

## SHARED DESIGN SYSTEM (All Three Sites)

### Visual Aesthetic (from Brett's creative direction)
- **Apple-level polish** with warmth and personality
- **Glassmorphism:** Frosted glass panels (CSS backdrop-filter: blur, semi-translucent backgrounds)
- **Cinematic scroll:** Parallax backgrounds, Intersection Observer scroll-triggered reveals, smooth section transitions
- **Opening experience:** Each site gets a brief, elegant load screen with a signature phrase that fades into the hero
- **Photography-forward:** Real photos and Unsplash stock. Candid moments, NOT posed, NOT looking at camera
- **Mobile-first responsive** (phone, tablet, desktop breakpoints)

### Typography
- Headlines: DM Serif Display (warm, editorial) or Playfair Display
- Body: Inter or Nunito (clean, readable)
- Minimum 16px body for all sites, 18px+ for senior-facing content

### Technical Stack
- **Framework:** Next.js with App Router (Brett's preference for the rebuild)
- **Styling:** Tailwind CSS with custom theme per site
- **Animations:** Framer Motion for scroll animations
- **Images:** next/image for optimization
- **Deployment:** Vercel (GitHub auto-deploy)
- **GitHub account:** YourNextStepTeam (github.com/YourNextStepTeam)
- Repos: yournextstepteam-site, yourbestseason-site, burienbestcarehome-site

### Content Rules (ALL sites)
- NEVER use em dashes anywhere (commas, periods, semicolons, colons, parentheses only). This is non-negotiable. Em dashes are an AI content giveaway.
- Pain-Agitate-Solution on every hero section
- StoryBrand SB7: family is the hero, business is the guide
- Hormozi value equation: frame outcomes not features
- Question-based H2s for AEO/GEO optimization
- Author byline "By Becca Pitts" on all blog content
- JSON-LD structured data on every page
- WCAG AA accessibility compliance

### Copywriting Framework (Kennedy + Hormozi + StoryBrand)
- **Dan Kennedy:** Pain-Agitate-Solution, urgency without sleaze, message-to-market match
- **Alex Hormozi:** Value equation (Dream Outcome x Likelihood / Time x Effort), hook-retain-reward for content
- **Donald Miller StoryBrand:** Customer is hero, business is guide. 7-part arc: Character > Problem > Guide > Plan > CTA > Failure stakes > Success

---

## SITE 1: BURIEN BEST CARE HOME (Priority Build)

### Business Details
- **URL:** burienbestcarehome.com
- **Redirect:** burienadultfamilyhome.com -> burienbestcarehome.com
- **Tagline:** "Where Compassion Meets Quality Care"
- **Positioning:** "New to the Neighborhood, Not New to Care" (20+ years experience)
- **Type:** Adult family home (6-bed residential care facility)
- **Location:** Burien, WA (King County). Hyperlocal.
- **GitHub:** github.com/YourNextStepTeam/burienbestcarehome-site
- **Current Vercel:** burienbestcarehome-site.vercel.app (v1 HTML, needs Next.js rebuild)

### Color Palette
- Sage green: #7D9B76
- Warm cream: #FFF5EB
- Soft terracotta: #C4856A
- Deep forest accent: #2D4A3E

### Voice
Compassionate, trustworthy, professional but deeply human. Families are in crisis or emotional strain. Conveys safety, warmth, competence. More formal than real estate brand but still warm. Wellness brand aesthetic, NOT clinical.

### Services
1. Long-Term Residential Care
2. Memory & Dementia Care
3. Short-Term & Respite Care
4. Adult Day Care
5. Post-Hospital Recovery

### Differentiators
- Private care suites (single-occupancy rooms)
- Semi-private bathrooms (shared with only one other resident)
- Home-like atmosphere (not institutional)
- Experienced and compassionate staff
- Personalized care plans
- Family-centered approach
- Medicaid accepted
- 1:3 staff-to-resident ratio (vs 1:10+ at large facilities)
- 30-50% less expensive than large assisted living

### ICPs (Target Audience)
**Primary: Adult Daughters (38-55)**
- ~66% of eldercare decisions made by women
- Emotional driver: guilt, worry, exhaustion
- Searching at 11pm after a scare
- Needs to feel like choosing care is love, not abandonment
- Often juggling own kids + career + aging parent (sandwich generation)

**Secondary: Adult Sons (38-55)**
- Financial/logistics driver
- Wants clear costs, Medicaid info, ROI framing
- Responds to authority signals and credentials

**Tertiary:**
- Hospital discharge planners and social workers (referral pipeline)
- Families of current/prospective residents
- Elder law attorneys and financial advisors

### Geographic Focus
Burien, WA (King County). Neighborhoods: Gregory Heights, Boulevard Park, Three Tree Point, Seahurst, 1st Avenue South. Also serves: White Center, Normandy Park, South King County.

### Direct Competitors
1. **Three Tree Living** (threetreeliving.com) — Burien/Normandy Park. "Brand new" positioning. Staff bios. Multi-directory listings.
2. **BetterLiving AFH** (betterlivingafh.com) — Multi-facility Burien. Mission-focused.
- 21 total licensed AFHs in Burien per DSHS data

### SEO Keywords (Prioritized)
**Tier 1 (win first):** "6-bed memory care home Burien WA," "affordable adult family home Burien," "family-run adult family home Burien 98166," "Medicaid adult family home Burien"
**Tier 2 (win next):** "adult family home Burien," "memory care Burien WA," "dementia care Burien," "senior care Burien"
**Tier 3 (long-term):** "adult family home King County," "senior care King County WA"

### Citation Network (Critical for SEO)
Must get listed on: WA State DSHS AFH Locator, Adult Family Home Council, Caring.com, A Place for Mom, MyAFH, CareListings, SeniorAdvisor, BBB Burien, Burien Chamber of Commerce

### Schema Markup
LocalBusiness, HealthAndBeautyBusiness, FAQPage, BreadcrumbList

### Pages to Build
1. **Home** — Load screen ("Where family feels like home"), PAS hero, facility highlights, services overview, open house RSVP, team/staff bios, testimonials, FAQ, schedule-a-visit CTA
2. **Services** — Memory Care, Daily Living, Respite Care, Post-Hospital Recovery detail cards
3. **Contact** — Schedule a visit form, "What to Expect on Your Visit" (anxiety reducer), map, phone/email
4. **About** — Becca's story, "New to Neighborhood, Not New to Care," staff bios, values
5. **Blog** — 12 articles already written (daily automated content engine running). Blog index page needed.

### Blog Content Already Written (12 articles, ~44,000 words)
1. Sundowning as staffing problem (memory care)
2. Sole caregiver when siblings won't help
3. When parent won't talk about care
4. How families pay for senior care (cost/Medicaid)
5. First weeks after placement (adjustment)
6. What to look for touring an AFH
7. Signs it's time for residential care
8. Day in the life at an AFH
9. Visiting your parent (goodbyes and guilt)
10. Hospital discharge crisis (48-hour decision)
11. Medicare plateau letter (SNF discharge)
12. COPES/Medicaid application walkthrough

### Open House
An in-person community open house is planned (date TBD). Site needs RSVP section. Flyer copy already written. Canva designs exist (1080x1080 and 1200x628).

### Cross-Links
- Links to yourbestseason.com for senior transitions education
- Links to yournextstepteam.com for home sales (families selling parent's home)
- Pipeline: education -> home sale -> care placement

### Unsplash Photos for This Site
- Hero: https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200
- Garden: https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200
- Living room: https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200
- Family: https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800
- Senior outdoors: https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?w=800

### Accessibility (HIGHEST PRIORITY for this site)
- 48px+ touch targets
- 4.5:1 contrast ratios minimum for ALL text
- 18px+ body font
- Proper heading hierarchy, no skips
- prefers-reduced-motion respected
- Skip-to-content link
- All form labels explicitly associated
- Keyboard fully navigable with visible focus states

---

## SITE 2: YOUR BEST SEASON

### Business Details
- **URL:** yourbestseason.com
- **Also owns:** downsizewashington.com (redirect TBD)
- **Type:** Senior transitions education platform
- **Focus:** Interviewing leaders in senior services, educational content for families navigating transitions
- **GitHub:** github.com/YourNextStepTeam/yourbestseason-site
- **Current Vercel:** yourbestseason-site.vercel.app (v1 HTML deployed)

### Color Palette
- Warm blue: #3E6F8F
- Soft sage green: #8FAE7E
- Cream: #FFF8F0
- Dusty rose: #C4917B

### Voice
Warmer, more patient, more empathetic than the real estate brand. Like a trusted friend who has helped many families through this. Gentle CTAs, not pushy.

### ICPs
- Seniors/downsizers (60+, boomers) — Facebook, YouTube, email
- Adult children (38-55, Gen X/elder millennials) — doing research for parents. Instagram, LinkedIn, Facebook.
- THIS IS BECCA'S PRIMARY DIFFERENTIATING ICP. Most agents ignore this segment.

### Geographic Focus
Washington state broadly. Pierce County and King County primary.

### Keyword Opportunities (UNCONTESTED in WA)
- "How to downsize for retirement" (AEO/featured snippet)
- "Senior relocation help [city]"
- "Downsizing checklist for seniors"
- "Help my elderly parent move"
- "Should I downsize my home"
- "How much does senior downsizing cost"
- NO dominant player exists for senior transitions education in Washington state.

### Pages to Build
1. **Home** — Load screen ("Your Best Season starts now"), PAS hero addressing the overwhelm of life transitions, "What We Do" (education, interviews, resources), featured articles, lead magnet CTA, testimonials, cross-links, contact
2. **Resources** — Downloadable guides, checklists, worksheets. Categories: Downsizing, Financial Planning, Emotional Readiness, Family Conversations
3. **About** — Becca's story, why she started Your Best Season, connection to senior transitions

### Blog Content Already Written (3 SEO articles)
1. "How to Downsize Your Home in Washington State" (2,021 words)
2. "Should I Downsize My Home? 7 Signs It's Time" (1,916 words)
3. "How Much Does Downsizing Cost? Real Numbers for WA Families" (2,344 words)

### Schema Markup
Organization, FAQPage, BreadcrumbList

### Cross-Links
- Links to yournextstepteam.com when discussing selling the family home
- Links to burienbestcarehome.com when discussing care placement options

### Unsplash Photos
- Hero: https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200
- Home interior: https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200
- Keys: https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800
- Family: https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800
- Planning: https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800

### Accessibility
- WCAG AA (senior audience)
- 18px+ base font
- High contrast
- prefers-reduced-motion
- 44px+ touch targets

---

## SITE 3: YOUR NEXT STEP TEAM

### Business Details
- **URL:** yournextstepteam.com
- **Redirect:** yournextsteprealty.com -> yournextstepteam.com
- **Tagline:** "Your next step starts here"
- **Type:** Real estate hub for Pierce County WA
- **Brokerage:** Inside Real Estate / BoldTrail
- **GitHub:** github.com/YourNextStepTeam/yournextstepteam-site
- **Current Vercel:** yournextstepteam-site.vercel.app (v1 HTML deployed)

### Color Palette
- Forest green: #2D5016
- Warm gold: #D4A843
- Soft cream/white backgrounds

### Voice
Warm, bright, charismatic. Becca's playful personality comes through. "Hey girl, let's figure this out together." Should reflect her bubbly, funny side while still being sharp on real estate.

### ICPs
1. **First-time buyers** (millennials/Gen Z, 25-38) — Instagram, TikTok, YouTube Shorts
2. **Move-up buyers** (Gen X/elder millennials, 35-55) — LinkedIn, YouTube, Instagram
3. **Sellers** (all ages) — Facebook, LinkedIn, email, YouTube
4. **Real estate investors** — cross-channel
5. **Seniors/downsizers** (crossover with Your Best Season)

### Geographic Focus
Pierce County (Tacoma, Bonney Lake, Graham, Puyallup, Eatonville), South King, Thurston, Kitsap counties.

### Content Pillars
1. Market Intelligence (local data, trends)
2. Transaction Decoded (step-by-step buying/selling education)
3. Lifestyle and Community (neighborhood guides, local business spotlights)
4. Investment and Wealth Building (equity, ROI, tax)
5. Behind the Curtain (personal brand, day-in-life, transparent industry takes)

### 80/20 Content Split
- 80% relatable/personal/community content
- 20% professional/CTA content
- People follow people, not brands

### Pages to Build
1. **Home** — Load screen ("Your next step starts here"), PAS hero (50/50 split: copy + Becca's photo), services (buying, selling, investing), testimonials, neighborhood highlights, assessment CTA, contact
2. **Assessment** — 12-question interactive quiz, scoring (Hot 80-100, Warm 50-79, Future <50), lead capture, webhook POST to Make.com
3. **Vendors** — Preferred vendor directory with category filtering, vendor application form
4. **Neighborhood Guides** — Tacoma, Bonney Lake (built), Graham, Puyallup, Eatonville (needed)

### ManyChat Keywords (for CTA references)
MARKET, KEYS, CHECKLIST, NEIGHBORHOOD, INVEST, DREAM

### Schema Markup
RealEstateAgent, LocalBusiness, FAQPage, BreadcrumbList

### Cross-Links
- Links to yourbestseason.com for senior transition content
- Links to burienbestcarehome.com for AFH referrals

### Unsplash Photos
- Hero/landscape: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200
- Home exterior: https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200
- Keys: https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800
- House: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200
- Neighborhood: https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200
- Interior: https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200

---

## THE STRATEGIC MOAT (Why Three Sites, Not One)

Becca's three-business structure creates a keyword moat no competitor has:
- Kirk Vaux does downsizing real estate but has no AFH
- Caring Transitions does senior transitions but no real estate
- Three Tree Living does AFH but no transitions platform
- Becca is the ONLY one who can cross-link all three and capture the full lifecycle:
  **Education (Your Best Season) -> Home Sale (Your Next Step Team) -> Care Placement (Burien Best Care Home)**

Each site builds independent topical authority. Strategic cross-linking passes authority between all three. This is the competitive advantage.

---

## AUTOMATED CONTENT ENGINE (Already Running)

Two scheduled tasks running daily:
1. **burien-blog-writer** (5am daily): Searches Reddit/AgingCare/AARP for real community conversations, writes 2,000-3,000 word article, saves to project folder
2. **burien-social-media-daily** (6am daily): Creates 6 platform pieces (Facebook, Instagram Carousel, Instagram Reel, LinkedIn, Micro-moments, Twitter/X) complementing that day's blog

12 days of output so far: 12 articles (~44,000 words), 72 social pieces. All community-sourced, first-principles-grounded, Becca-voiced, zero em dashes.

---

## ACCOUNTS AND ACCESS

- **GitHub:** YourNextStepTeam (authenticated via gh CLI on Becca's PC)
- **Vercel:** yournextstepteam's projects (hobby plan, connected to GitHub)
- **Domains purchased:** yournextstepteam.com, yournextsteprealty.com, yourbestseason.com, downsizewashington.com, burienbestcarehome.com, burienadultfamilyhome.com
- **Google:** beccapitts14@gmail.com
- **BoldTrail CRM:** existing plan
- **Becca's email:** beccapitts14@gmail.com
