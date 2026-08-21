# Your Next Step Team — Parallel Task Briefings
*Copy each section below as the opening prompt for a new project conversation.*
*All tasks should run with Opus 4.7, extended thinking ON.*

---

## TASK 1: Foundation & Design System

You are building the foundation for yournextstepteam.com, a real estate website for Becca Pitts, a licensed WA real estate agent serving Pierce County (Tacoma, Bonney Lake, Graham, Puyallup, Eatonville), South King, Thurston, and Kitsap counties.

### Your Job
Set up the complete Next.js project from scratch, establish the design system, build all shared components, and deploy the skeleton to Vercel.

### Tech Stack
- Next.js (App Router), TypeScript, static export
- Tailwind CSS v4 with `@theme` directive in globals.css
- Framer Motion for scroll-reveal animations (respects `prefers-reduced-motion`)
- Google Fonts via `<link>` tag: DM Serif Display (headlines), Inter (body, 16px+ min)
- Deployment: Vercel auto-deploy from GitHub
- GitHub org: becca-sites (repo: yournextstepteam-site, branch: main)

### Color Palette (define as CSS custom properties in globals.css)
| Token | Hex | Usage |
|---|---|---|
| `--color-forest` | `#2D5016` | Primary dark green, headings |
| `--color-forest-soft` | `#3A6B1E` | Eyebrow labels, secondary text |
| `--color-gold` | `#D4A843` | Pop accent, CTA buttons, accent bars |
| `--color-gold-deep` | `#B8892E` | CTA hover, italic accents |
| `--color-ink` | `#1A2028` | Primary text |
| `--color-ink-soft` | `#4A5560` | Body text |
| `--color-bone` | `#FDFBF7` | Warm off-white, card backgrounds |
| `--color-fog` | `#F0F2EE` | Cool section wash |

### Shared Components to Build
1. **Navigation** — Sticky header, logo, nav links (Home, Neighborhoods, Assessment, Vendors, Blog, Contact), mobile hamburger menu with slide-out drawer. CTA button in nav: "Take the Assessment"
2. **Footer** — Logo, nav links, contact info (253.678.7089, becca@yournextstepteam.com), social icons, cross-links to yourbestseason.com and burienbestcarehome.com, copyright
3. **GlassCard** — Two variants: `solid` (bone bg, hairline border, soft shadow) and `glass` (frosted, hero only). Same pattern as the BBCH site.
4. **ScrollReveal** — Framer Motion wrapper for fade-up-on-scroll. Respects prefers-reduced-motion.
5. **LoadingScreen** — Brief elegant load screen with "Your next step starts here" that fades into hero. 1.5s max.
6. **ScheduleCallButton** — Gold filled button with ink text. Primary CTA component.
7. **SectionWrapper** — Consistent padding, max-width, responsive margins for all page sections.

### Layout Setup
- `layout.tsx`: metadata (title, description, Open Graph), font loading, Navigation + Footer wrapping all pages
- `globals.css`: CSS custom properties, Tailwind theme, body background gradient (subtle warm), selection color, scrollbar styling
- `loading.tsx`: Loading screen component

### Design Principles
- Apple-level polish with warmth and personality
- Glassmorphism: frosted glass panels (CSS backdrop-filter: blur, semi-translucent backgrounds)
- Cinematic scroll: Intersection Observer scroll-triggered reveals, smooth section transitions
- Photography-forward: Unsplash stock for now (real photos later)
- Mobile-first responsive (phone, tablet, desktop breakpoints)
- WCAG AA: 4.5:1 contrast, 44px+ touch targets, keyboard navigable, skip-to-content

### Content Rules
- NEVER use em dashes anywhere. Use commas, periods, semicolons, colons, or parentheses.
- Voice: Warm, bright, charismatic. "Hey girl, let's figure this out together" energy. Relatable first, professional second.

### Deliverables
1. Complete Next.js project with all shared components
2. Deployed to Vercel (even if just a skeleton with navigation + footer + empty homepage)
3. All color tokens and typography working
4. Mobile responsive navigation
5. LoadingScreen functional

### Living Documentation
Before starting, check for existing SESSION_LOG.md and LIVING_NOTES.md in the project folder. If they don't exist, create them. Update SESSION_LOG.md at the end with all decisions made and next steps.

### GitHub
- Org: becca-sites
- Repo name: yournextstepteam-site
- Branch: main
- Push and deploy when ready

---

## TASK 2: Homepage Build

You are building the homepage for yournextstepteam.com, Becca Pitts' real estate website serving Pierce County and surrounding WA counties.

### Your Job
Build the complete homepage using StoryBrand SB7 framework, Dan Kennedy's Pain-Agitate-Solution approach, and Alex Hormozi's value equation. The page should convert visitors into assessment-takers.

### Context
- Becca is a licensed WA real estate agent, warm/charismatic personal brand
- Tagline: "Your next step starts here"
- Primary CTA: Take the Assessment (interactive quiz that scores readiness)
- Transitional CTA: Download a guide (lead magnet)
- ICPs: First-time buyers (25-38), move-up buyers (35-55), sellers (all ages), seniors/downsizers (60+, THIS IS HER DIFFERENTIATOR)
- Geographic focus: Pierce County (Tacoma, Bonney Lake, Graham, Puyallup, Eatonville)
- 80/20 content split: 80% relatable/personal/community, 20% professional/CTA

### Homepage Sections (in order)

1. **Loading Screen** — "Your next step starts here" fades in, then fades into hero (1.5s max)

2. **Hero Section** — 50/50 split layout
   - Left: PAS headline addressing the overwhelm of buying/selling. Something like "Buying or selling a home shouldn't feel like solving a puzzle blindfolded." Subhead addressing the emotional pain. CTA button: "Find Out Where You Stand" (links to /assessment)
   - Right: Becca's professional photo (use placeholder Unsplash for now: https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800)
   - Glass panel overlay effect on the photo side

3. **Trust Bar** — Subtle logos/badges row: "Licensed WA Real Estate Agent", "SRES Certified", "Pierce County Specialist", years of experience

4. **"How I Help" Section** — Three cards (GlassCard solid variant):
   - Buying: "From pre-approval to keys in hand, I walk you through every step"
   - Selling: "Strategic pricing, staging guidance, and marketing that actually works"
   - Investing: "Build wealth through real estate with data-driven strategy"
   Each card has a gold accent bar at top and a "Learn More" link

5. **The Process (StoryBrand Plan)** — Three steps:
   - Step 1: "Take the Assessment" (5 minutes, tells you exactly where you stand)
   - Step 2: "Get Your Custom Roadmap" (personalized next steps based on your score)
   - Step 3: "Move Forward with Confidence" (whether that's in 2 weeks or 2 years)

6. **Neighborhood Highlights** — Grid of 4-5 featured neighborhoods with photos, name, and a one-line hook. Links to /neighborhoods/[slug]. Use Unsplash placeholders.

7. **Testimonials** — Carousel or marquee of 3-5 testimonials (write realistic placeholder testimonials that match Becca's voice and market)

8. **"Not Your Typical Agent" Section** — Personal brand differentiator. What makes Becca different: senior transitions expertise, three-business ecosystem, real talk not sales talk. Should feel authentic, not braggy.

9. **Blog Preview** — Latest 3 blog posts (placeholder cards for now)

10. **Final CTA Section** — Dual CTA:
    - Direct: "Take the Free Assessment" (gold button)
    - Transitional: "Download the First-Time Buyer's Guide" (outlined button, lead magnet)

11. **Footer** (shared component)

### Design System (use these tokens)
- Headings: `text-[color:var(--color-forest)]` or `text-[color:var(--color-ink)]`
- Eyebrows: `text-[color:var(--color-forest-soft)]` uppercase, small
- Body: `text-[color:var(--color-ink-soft)]`
- CTA buttons: `bg-[color:var(--color-gold)]` with `text-[color:var(--color-ink)]`
- Accent bars on cards: `bg-[color:var(--color-gold)]`
- Hero italic accents: `text-[color:var(--color-gold)] italic`
- Cards: GlassCard with `variant="solid"` (bone bg, hairline border)
- All sections: `bg-transparent` so body gradient shows through

### Unsplash Placeholders
- Hero/landscape: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200
- Home exterior: https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200
- Keys: https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800
- House: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200
- Neighborhood: https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200
- Interior: https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200
- Becca placeholder: https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800

### Content Rules
- NEVER use em dashes. Use commas, periods, semicolons, colons, or parentheses only.
- Voice: Warm, bright, charismatic, occasionally sassy. Relatable first, professional second.
- StoryBrand: Becca is the GUIDE, the homebuyer/seller is the HERO
- Hormozi: Frame outcomes not features. "Peace of mind" not "comprehensive service"
- Kennedy: Pain-Agitate-Solution in the hero and every major section

### Deliverables
1. Complete homepage (`src/app/page.tsx`) with all sections
2. Any page-specific components needed
3. Responsive across all breakpoints
4. All animations using ScrollReveal/Framer Motion

### Living Documentation
Check for existing SESSION_LOG.md and LIVING_NOTES.md. Create if missing. Update at end.

---

## TASK 3: Assessment Quiz

You are building an interactive real estate readiness assessment for yournextstepteam.com. This is the PRIMARY conversion tool for Becca Pitts' real estate business. It replaces the traditional "schedule a call" CTA with a value-first approach.

### Your Job
Build a multi-step interactive assessment quiz at `/assessment` that scores a visitor's readiness to buy, sell, or invest, captures their contact info, and routes them into the appropriate follow-up sequence.

### Strategic Context
- This is the CONVERTER. The funnel principle: build the converter first, then the traffic.
- ManyChat mini-assessment (3-5 Qs in DMs) feeds INTO this full website assessment
- Score determines CRM routing: Hot (80-100), Warm (50-79), Future (below 50)
- The assessment should feel like getting genuine value, NOT like filling out a lead form
- Becca's differentiator: she serves first-time buyers, move-up buyers, sellers, investors, AND seniors/downsizers

### Question Design Philosophy
- Questions should feel conversational, not clinical
- Use Becca's voice: warm, relatable, slightly playful
- Each question should make the user feel SEEN and understood
- Auto-advance on single-select answers (no "Next" button needed for those)
- Show a "Continue" button only for multi-select questions
- Back button always visible (except on Q1)
- Progress bar at top
- Framer Motion transitions between questions (slide left/right based on direction)

### Assessment Structure (20-25 Questions)

**Section 1: Where Are You? (Situation)**
1. "What's on your mind right now?" — Single select: Buying my first home / Selling my current home / Both (buying and selling) / Investing in property / Downsizing or transitioning / Just exploring
2. "How soon are you looking to make a move?" — Single select: ASAP (within 30 days) / 1-3 months / 3-6 months / 6-12 months / Just starting to think about it
3. "Have you worked with a real estate agent before?" — Single select: Yes, loved them / Yes, it was just okay / Yes, bad experience / No, this is my first time

**Section 2: Readiness Factors**
4. "Where are you financially?" (for buyers) — Single select: Pre-approved and ready / Talked to a lender but not pre-approved yet / Haven't started the financial piece / Paying cash
5. "What's your budget range?" — Single select with ranges appropriate to Pierce County market ($250K-$350K / $350K-$450K / $450K-$600K / $600K-$800K / $800K+ / Not sure yet)
6. "Do you have a home to sell first?" — Single select: Yes, need to sell before buying / Yes, but I can buy without selling first / No, I'm a first-time buyer / I'm only selling
7. (For sellers) "How would you describe your home's condition?" — Single select: Move-in ready, just needs cleaning / Needs some cosmetic updates / Needs significant work / I'm not sure what it needs
8. (For sellers) "Do you know what your home is worth?" — Single select: Yes, I've had it appraised recently / I have a rough idea / No clue, that's why I'm here

**Section 3: Emotional Readiness**
9. "What's your biggest concern right now?" — Multi-select: Not knowing where to start / The financial commitment / Finding the right neighborhood / Timing the market / Selling for the right price / The whole process feeling overwhelming / Making a mistake / Nothing specific, just want guidance
10. "How are you feeling about this decision?" — Single select: Excited and ready / Cautiously optimistic / Anxious but determined / Overwhelmed / Just gathering info for now

**Section 4: Preferences & Fit**
11. "Which areas interest you?" — Multi-select: Tacoma / Bonney Lake / Graham / Puyallup / Eatonville / University Place / Lakewood / Other Pierce County / South King County / I'm open to suggestions
12. "What matters most to you in an agent?" — Multi-select: Someone who explains everything clearly / Quick responses / Market expertise / Negotiation skills / Patience (I ask a lot of questions) / Honest, even when it's not what I want to hear / Creative problem-solving / Senior transition experience
13. "How do you prefer to communicate?" — Single select: Text / Phone call / Email / Video chat / Mix of everything

**Section 5: Wrap-Up**
14. "On a scale of 1-10, how ready do you feel to take your next step?" — Slider or number select 1-10
15. "Anything else you want me to know?" — Optional text input (textarea, not required)

**Lead Capture (after questions, before results)**
- First name (required)
- Email (required)
- Phone (required)
- "How did you hear about me?" (optional dropdown: Social media / Google search / Referral from a friend / Your Best Season / Burien Best Care Home / Other)

### Scoring Logic
Each answer has a point value (0-5 scale per question). Categories:
- **Timeline urgency** (Q2): ASAP = 5, 1-3mo = 4, 3-6mo = 3, 6-12mo = 2, exploring = 1
- **Financial readiness** (Q4): Pre-approved = 5, talked to lender = 3, haven't started = 1, cash = 5
- **Self-assessed readiness** (Q14): Direct score mapping
- **Engagement signals**: Answering more optional questions = higher score

Total possible: ~135 points. Scoring buckets:
- **Hot (80-135):** Ready to move. Immediate follow-up within 24 hours.
- **Warm (50-79):** Getting close. Nurture sequence, check in weekly.
- **Future (below 50):** Early stage. Monthly value emails, no pressure.

### Results Page (shown after submission)
Based on score, show one of three result screens:
- **Hot:** "You're ready! Here's what happens next..." (schedule a call CTA, expect outreach within 24hrs)
- **Warm:** "You're closer than you think..." (here are 3 things to do this week, downloadable checklist, Becca will be in touch)
- **Future:** "Great news: you have time to prepare..." (downloadable guide, subscribe to market updates, no pressure)

All three should feel positive and valuable. Nobody should feel "scored low."

### Technical Requirements
- Route: `/assessment`
- State management: React useState or useReducer (NO localStorage)
- Conditional logic: Skip seller questions if they selected "buying first home," skip buyer questions if only selling
- Form submission: POST to webhook (use environment variable NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL)
- Payload: all answers + computed score + score category + timestamp
- After submission: show results page with appropriate messaging
- Mobile-first: must work perfectly on phone (most users will come from Instagram/social)
- Animations: Framer Motion slide transitions, progress bar animation
- Accessibility: keyboard navigable, proper ARIA labels, focus management between questions

### Design Tokens
- Background: `bg-transparent` (inherits body gradient)
- Cards/question containers: GlassCard solid variant
- Progress bar: gold fill on fog background
- Selected answers: gold border/highlight
- CTA buttons: gold filled
- Back button: subtle, text-only with arrow

### Content Rules
- NEVER use em dashes
- Voice: conversational, warm, Becca's personality
- Questions should feel like chatting with a friend, not filling out a government form

### Deliverables
1. Complete assessment page at `/assessment`
2. All question components with conditional logic
3. Scoring engine
4. Results display (3 variants)
5. Form submission to webhook
6. Fully responsive and accessible
7. Framer Motion animations working

### Living Documentation
Check for SESSION_LOG.md and LIVING_NOTES.md. Create if missing. Update at end.

---

## TASK 4: Neighborhood Guides + Vendor Directory

You are building two sections of yournextstepteam.com: geo-specific neighborhood guide pages and a vendor directory page.

### Your Job
Build 5 neighborhood guide pages and 1 vendor directory page with vendor application form.

### Context
Becca Pitts is a WA real estate agent focused on Pierce County. Her differentiator is deep local knowledge across these communities. The neighborhood guides serve dual purposes: (1) help buyers find the right community, and (2) rank for local SEO terms like "homes for sale in [city]" and "what's it like to live in [city]."

### Neighborhood Guides

**Route structure:** `/neighborhoods/[slug]`
**Index page:** `/neighborhoods` (grid of all neighborhoods with photo, name, tagline)

**5 Pages to Build:**

1. **Tacoma** (`/neighborhoods/tacoma`)
   - Tagline: "Grit and grace in the City of Destiny"
   - Vibe: Art scene, food scene, waterfront, diverse neighborhoods, more affordable than Seattle
   - Key neighborhoods to mention: Stadium District, Proctor, North End, 6th Ave, Hilltop (revitalizing), Ruston
   - Median home price: ~$450K (research current, use approximate)
   - Good for: First-time buyers, investors, creative professionals

2. **Bonney Lake** (`/neighborhoods/bonney-lake`)
   - Tagline: "Small-town heart with big-family space"
   - Vibe: Family-oriented, newer construction, good schools, outdoor recreation, growing
   - Key areas: Lake Tapps, Sumner-Bonney Lake School District
   - Median home price: ~$550K
   - Good for: Move-up buyers, families with kids, people wanting newer homes

3. **Graham** (`/neighborhoods/graham`)
   - Tagline: "Room to breathe, land to love"
   - Vibe: Rural-suburban, larger lots, equestrian properties, peaceful, value for money
   - Key features: Acreage available, Bethel School District, close to Mt. Rainier access
   - Median home price: ~$500K
   - Good for: Families wanting space, hobby farmers, people escaping density

4. **Puyallup** (`/neighborhoods/puyallup`)
   - Tagline: "Where community runs deep and the fair never gets old"
   - Vibe: Charming downtown, historic, family-friendly, good transit access, established neighborhoods
   - Key areas: South Hill, downtown Puyallup, Van Lierop Park area
   - Median home price: ~$500K
   - Good for: Families, commuters, people who want walkable downtown + suburban comfort

5. **Eatonville** (`/neighborhoods/eatonville`)
   - Tagline: "Gateway to the mountain, rooted in community"
   - Vibe: Small town, gateway to Mt. Rainier, tight-knit, affordable, rural
   - Key features: Eatonville School District, access to Elbe/Ashford, Northwest Trek nearby
   - Median home price: ~$425K
   - Good for: Outdoor enthusiasts, families wanting small-town life, budget-conscious buyers

### Each Neighborhood Page Should Include:

1. **Hero** — Full-width photo with neighborhood name and tagline overlay (glass panel)
2. **Quick Stats** — Median price, school district, population, commute to Tacoma/Seattle, vibe keywords
3. **"What It's Like to Live Here"** — 2-3 paragraphs of genuine, opinionated copy (Becca's voice). Not generic. Should read like a friend telling you about the neighborhood.
4. **Who This Neighborhood is For** — 3-4 bullet cards matching ICP types
5. **Things to Know** — 3-5 insider tips (the stuff a Zillow listing won't tell you)
6. **Current Market Snapshot** — Placeholder section for dynamic data later. For now, static text with approximate numbers.
7. **Featured Listings** — Placeholder grid (3 cards) for future MLS integration. Static for now.
8. **CTA Section** — "Curious about [City]? Take the assessment to see if it's the right fit." Gold button to /assessment.

### Unsplash Photos (use as placeholders)
- Tacoma: https://images.unsplash.com/photo-1582571352032-448f7928eca3?w=1200 (or similar PNW city)
- Bonney Lake: https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200 (suburban homes)
- Graham: https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200 (rural landscape)
- Puyallup: https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200 (charming home)
- Eatonville: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200 (mountain landscape)

### Vendor Directory

**Route:** `/vendors`

This is a curated list of Becca's trusted service providers. It serves as a resource for clients AND builds referral relationships with local businesses.

### Vendor Page Structure:

1. **Hero** — "Becca's Trusted Vendors" / "The people I trust with my clients"
2. **Category Filter** — Horizontal pill buttons to filter: All, Lenders, Inspectors, Contractors, Movers, Cleaners, Stagers, Photographers, Attorneys, Insurance, Other
3. **Vendor Grid** — Cards with: Business name, category tag, one-line description, phone, website link, "Why Becca recommends them" (1 sentence)
4. **Vendor Application Section** — "Want to be on this list?" form for vendors to apply:
   - Business name (required)
   - Contact name (required)
   - Category (required, dropdown matching filter categories)
   - Phone (required)
   - Website (optional)
   - "Why should Becca's clients trust you?" (required, textarea)
   - Submit button

### Placeholder Vendors (create 8-10 realistic but fictional entries across categories)

### Technical Notes
- Vendor data can be a static JSON/TypeScript array for now (future: Google Sheet or CMS)
- Category filter: client-side filtering, no page reload
- Vendor application form: POST to webhook (NEXT_PUBLIC_VENDOR_FORM_WEBHOOK_URL env var)
- All pages need JSON-LD schema (LocalBusiness for vendors, Place + RealEstateListing for neighborhoods)
- Neighborhood pages need BreadcrumbList schema

### SEO for Neighborhood Pages
- Title format: "[City] Real Estate | Homes for Sale | Your Next Step Team"
- Meta description: Unique per page, include city name, mention Pierce County
- H1: City name
- H2s: Question-based where possible ("What's it like to live in [City]?", "Who is [City] perfect for?")
- Internal links: Cross-link between neighborhoods ("If you like Graham's space but want more amenities, check out Bonney Lake")

### Content Rules
- NEVER use em dashes
- Voice: Becca's warm, opinionated, insider perspective. These should NOT read like Zillow descriptions. They should read like a knowledgeable friend giving you the real talk.
- Be specific and opinionated. "The schools are great" is lazy. "Sumner-Bonney Lake SD consistently outperforms the county average, and the new elementary on 214th is gorgeous" is Becca.

### Deliverables
1. Neighborhood index page (`/neighborhoods`)
2. 5 individual neighborhood pages
3. Vendor directory page (`/vendors`) with category filtering
4. Vendor application form with webhook submission
5. JSON-LD schema on all pages
6. Responsive across all breakpoints

### Living Documentation
Check for SESSION_LOG.md and LIVING_NOTES.md. Create if missing. Update at end.

---

## TASK 5: Content, SEO & Blog Infrastructure

You are building the content layer, SEO infrastructure, and blog system for yournextstepteam.com.

### Your Job
Write all page copy using the Kennedy/Hormozi/StoryBrand frameworks, set up comprehensive SEO (schema, meta, sitemap), and build the blog routing system.

### Context
Becca Pitts is a WA real estate agent building a micro-influencer personal brand. Her voice is warm, authentic, occasionally sassy. "Hey girl, let's figure this out together" energy. She serves Pierce County (Tacoma, Bonney Lake, Graham, Puyallup, Eatonville) and surrounding areas.

### Copywriting Frameworks (apply to ALL copy)

**Dan Kennedy (Pain-Agitate-Solution):**
- Identify the specific pain your reader has RIGHT NOW
- Agitate it: make them feel the weight of inaction
- Present the solution: Becca as the guide who makes it simple

**Alex Hormozi (Value Equation):**
- Dream Outcome x Perceived Likelihood of Achievement / Time Delay x Effort & Sacrifice
- Frame outcomes not features: "Confidence that you're not overpaying" not "comparative market analysis"
- Make the value obvious and the risk feel low

**Donald Miller StoryBrand SB7:**
- Character (the buyer/seller) has a Problem (external, internal, philosophical)
- Meets a Guide (Becca) who has Empathy and Authority
- Gives them a Plan (assessment, roadmap, support)
- Calls them to Action (take the assessment)
- That helps them Avoid Failure (overpaying, underselling, getting stuck)
- And ends in Success (keys in hand, equity captured, peace of mind)

### Pages That Need Copy

**About Page** (`/about`)
- Becca's origin story: Started in real estate 15+ years ago. Built expertise in senior transitions because she wished she'd had better guidance when her own parents needed care. That experience led to Your Best Season (education) and Burien Best Care Home (care facility). She's not just an agent; she understands life transitions at a level most agents never will.
- SRES Certified (Seniors Real Estate Specialist)
- "Not Your Typical Agent" positioning: most agents specialize in a price bracket. Becca specializes in PEOPLE and the transitions they're navigating.
- Tone: vulnerable where appropriate, confident but not arrogant, funny/self-deprecating in places

**Contact Page** (`/contact`)
- Schedule a call form (name, email, phone, "What's on your mind?" textarea)
- Direct contact: 253.678.7089, becca@yournextstepteam.com
- Office hours or availability note
- "What to expect when we talk" section (anxiety reducer): "No pressure. No sales pitch. Just a conversation about where you are and where you want to be."
- Cross-links to other businesses where relevant

### SEO Infrastructure

**Schema Markup (JSON-LD on every page):**
- Homepage: RealEstateAgent + LocalBusiness + WebSite (with SearchAction)
- About: Person (Becca Pitts) with sameAs links to all properties
- Blog posts: BlogPosting with author, datePublished, image
- All pages: BreadcrumbList
- FAQ sections: FAQPage schema

**Meta Tags:**
- Unique title and description per page
- Title format: "[Page-specific] | Your Next Step Team | Pierce County Real Estate"
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter cards
- Canonical URLs

**Technical SEO:**
- `sitemap.xml` (auto-generated from pages)
- `robots.txt` (allow all, point to sitemap)
- Proper heading hierarchy (one H1 per page, no skips)
- Internal linking strategy between pages
- Image alt text on all images

**AEO/GEO Optimization:**
- Question-based H2s: "How much does it cost to buy a home in Pierce County?", "What's the first step to selling my home?", "How do I know if I'm ready to buy?"
- FAQ sections with proper FAQPage schema
- Direct, concise answers in the first paragraph under each H2 (featured snippet optimization)

### Blog System

**Routes:**
- `/blog` — Blog index with hero, paginated post list
- `/blog/[slug]` — Individual blog posts

**Blog Infrastructure:**
- MDX or markdown-based content (stored in `/content/blog/` directory)
- Frontmatter: title, slug, date, author, excerpt, image, tags, category
- Blog index: GlassCard grid layout, 6 posts per page, category filter
- Blog post: Clean reading layout, author byline "By Becca Pitts", share buttons, related posts at bottom
- BlogPosting + BreadcrumbList JSON-LD on each post
- RSS feed (`/feed.xml`)

**Content Pillars (for blog categorization):**
1. Market Intelligence — local data, trends
2. Transaction Decoded — step-by-step education
3. Lifestyle and Community — neighborhood spotlights
4. Investment and Wealth Building — equity, ROI
5. Behind the Curtain — personal brand, day-in-life

**Seed Posts (write 3 full blog posts to launch with):**

1. "5 Things Nobody Tells You About Buying Your First Home in Pierce County" (First-time buyer ICP, Transaction Decoded pillar, ~1,500 words)
2. "The Real Cost of Waiting: What Happens When You Keep Renting in Today's Market" (First-time buyer + investor ICP, Market Intelligence pillar, ~1,200 words)
3. "Selling Your Parents' Home: A Guide for Adult Children Navigating Senior Transitions" (Senior/downsizer ICP, Lifestyle pillar, ~1,800 words, cross-links to yourbestseason.com and burienbestcarehome.com)

### E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- Author entity: Becca Pitts on all content
- Author page with credentials, social links, cross-property authority
- Real experience signals: 15+ years, SRES certification, three-business ecosystem
- Cross-linking between all three domains builds topical authority

### Content Rules (NON-NEGOTIABLE)
- NEVER use em dashes anywhere. Commas, periods, semicolons, colons, or parentheses only.
- Voice: Warm, authentic, occasionally sassy. Relatable first, professional second.
- 80/20: Content should be 80% genuinely helpful, 20% CTA
- Question-based H2s wherever possible
- Author byline "By Becca Pitts" on all blog content
- Every blog post ends with a CTA (assessment link or lead magnet)

### Deliverables
1. About page copy + component (`/about/page.tsx`)
2. Contact page copy + component with form (`/contact/page.tsx`)
3. Blog index page (`/blog/page.tsx`)
4. Blog post template (`/blog/[slug]/page.tsx`)
5. 3 seed blog posts (full content)
6. JSON-LD schema on all pages
7. sitemap.xml and robots.txt
8. RSS feed
9. All meta tags and Open Graph

### Living Documentation
Check for SESSION_LOG.md and LIVING_NOTES.md. Create if missing. Update at end with all copy decisions, voice examples, and SEO choices made.

---

## NOTES FOR ALL TASKS

### Cross-Task Dependencies
- Tasks 2-5 all depend on Task 1's components (Navigation, Footer, GlassCard, etc.)
- If Task 1 isn't done yet, build your page components self-contained and import shared components once they exist
- Use consistent design tokens across all tasks (reference the color palette in Task 1)

### GitHub Workflow
- All tasks push to the same repo: `becca-sites/yournextstepteam-site`
- Coordinate branches if needed, or work on separate page directories to avoid conflicts
- Main branch = production (auto-deploys to Vercel)

### When In Doubt
- Voice: Would Becca say this to a friend over coffee? If not, rewrite it.
- Design: Does this look like an Apple product page with warmth? If not, simplify.
- Content: Would a stressed first-time buyer at 11pm find this genuinely helpful? If not, make it helpful first.
- CTA: Is this a value exchange (they get something) or just an ask? Make it a value exchange.
