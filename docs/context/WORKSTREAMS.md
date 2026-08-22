# Becca Pitts Marketing Engine - Workstream Status & Context

*Updated: March 31, 2026*
*Migrated from claude.ai project to Claude desktop app (Cowork)*

---

## Workstream 1: Content Engine

**Status:** ACTIVE - Week 1 COMPLETE, Week 2 batch COMPLETE

**Scope:** Content calendar, social posts, blog articles, video scripts, podcast planning, email newsletter

**What's been done:**
- 90-day content calendar created
- Content Strategy Playbook created
- Week 1 content produced: 2 blog articles, 5 Instagram posts, 5 Facebook posts, 1 email newsletter
- Week 2 content batch produced (full .docx deliverable on claude.ai):
  - 2 blog articles (Market Intelligence + Behind the Curtain pillars)
  - 5 Instagram posts (4 relatable/community, 1 Hormozi video)
  - 5 Facebook posts (story-driven, senior-focused Thursday post)
  - 3 Hormozi video scripts (KEYS, MARKET, DOWNSIZE keywords)
  - Wednesday email newsletter
  - Daily Stories cadence
  - 1-to-10 repurposing map for Market Intelligence anchor

**Content split:** 80% relatable/community, 20% professional/CTA

**Content pillars:** Behind the Curtain, Market Intelligence, Transaction Decoded, Community Roots, Future Vision

**Channels and cadence:**
- Instagram: 5x/week + daily Stories (first-time buyers)
- Facebook: 5x/week native content (seniors/boomers/Gen X)
- Email: 1x/week Wednesday
- Blog: 2x/week Tue/Thu

**Next up:** Week 3 content production. Also need downsizewashington.com content stream (separate from main site content).

**Dependencies:** The Thursday Facebook senior transition post and DOWNSIZE video script reference a free guide at downsizewashington.com that needs to exist first.

---

## Workstream 2: Website & SEO Strategy

**Status:** HTML FILES BUILT, DOMAINS PURCHASED, AWAITING DEPLOYMENT

**Three-Website Architecture (CONFIRMED):**
1. **yournextstepteam.com** (PURCHASED) - Primary real estate hub, all ICPs
   - Redirect: yournextsteprealty.com → yournextstepteam.com (301)
2. **downsizewashington.com** (PURCHASED) - Standalone senior transitions hub (uncontested keyword space)
3. **burienbestcarehome.com** (PURCHASED) - Adult family home business
   - Redirect: burienadultfamilyhome.com → burienbestcarehome.com (301)

**What's been built:**
- index.html - Landing page for yournextstepteam.com
- assessment.html - 12-question interactive quiz with scoring logic and webhook integration
- vendors.html - Preferred vendors directory with vendor application form
- Full SEO/AEO/GEO strategy designed (schema markup, keyword strategy by ICP, internal linking architecture)
- Assessment scoring: Hot (80-100), Warm (50-79), Future (<50)
- Assessment reduced from 40 to 20-25 questions (strategic recommendation accepted)

**Key decisions:**
- Domain: yournextstepteam.com (brand tagline: "Your next step starts here")
- Burien AFH on separate domain (topical authority separation)
- Assessment: Audit first, expand strategically (not padding to 40 questions)

**Schema markup planned:** RealEstateAgent, LocalBusiness, Person, SoftwareApplication, FAQPage, Place, ItemList

**Geographic focus:** Pierce County (Tacoma, Bonney Lake, Graham, Puyallup, Eatonville), South King, Thurston, Kitsap counties

**Next priorities:**
1. Update existing HTML files to use yournextstepteam.com branding and deploy
2. Build 5 neighborhood guide pages (Pierce County areas)
3. Add full SEO schema markup
4. Design and build downsizewashington.com
5. Design and build burienbestcarehome.com
6. Set up 301 redirects

**NOTE:** The HTML files were built in a previous Cowork session and should be on Becca's local machine. Need to locate them.

---

## Workstream 3: Data Infrastructure & Automation

**Status:** ARCHITECTURE DESIGNED, SHEETS SCHEMA BUILT, MAKE.COM BLUEPRINTS BUILT

**What's been done:**
- Google Sheets workbook designed and built (.xlsx with 1,767 formulas, zero errors)
  - Tabs: Instagram, Facebook, YouTube, TikTok, GMB metrics, Assessment responses, ManyChat interactions, Content performance tracker
  - Includes engagement rate, growth rate, conversion rate formulas
- Make.com scenario blueprints documented (495 paragraphs):
  - Scenario 1: Weekly Metricool Pull (Sundays, ~40 ops/month)
  - Scenario 2: Unified Webhook Receiver (assessment + ManyChat data, ~3 ops/event)

**Webhook formats defined:**
- Assessment webhook: POST JSON with timestamp, source, contactInfo, answers, scoring (total 0-100, tier hot/warm/future), seniorBranch flag, UTM params
- ManyChat webhook: POST JSON with timestamp, source, keyword, platform, userData, qualifyingAnswers

**Tech decisions:**
- Make.com free tier (1,000 ops/month, 2 active scenarios)
- Upgrade trigger: ~160+ assessment + ManyChat events/month → Core tier ($10.59/mo)
- BoldTrail: Email sequences only, no API integration needed for Make.com
- Google account: beccapitts14@gmail.com for Sheets and Looker Studio

**Next priorities:**
1. Import Sheets workbook to Google Sheets
2. Build Make.com Scenario 1 (Metricool weekly pull)
3. Build Make.com Scenario 2 (Unified webhook receiver)
4. Connect Looker Studio to Sheets
5. Add Metricool pixel to all website pages

---

## Workstream 4: CRM & Email Sequences

**Status:** ALL FLOWS AND SEQUENCES DESIGNED, FULL COPY WRITTEN

**What's been done:**
- All 8 ManyChat keyword flows designed with exact DM copy in Becca's voice:
  - MARKET, KEYS, CHECKLIST, NEIGHBORHOOD, INVEST, DREAM → route to yournextstepteam.com
  - DOWNSIZE, VALUE → route to downsizewashington.com
- 4 BoldTrail email sequences with full copy:
  - HOT (80-100): 5 emails / 7 days - consultation-focused
  - WARM (50-79): 8 emails / 30 days - educational nurture
  - FUTURE (<50): 12 emails / 90 days - long-term drip
  - SENIOR CARE: 5 emails / 14 days - Burien AFH inquiries
- Full .docx deliverable created on claude.ai

**Becca's voice notes:**
- Warm, approachable, "hey girl, let's figure this out together" energy
- Catchphrases: "Your next step starts here," "let's make this happen," "I've got you"
- Emojis: Moderate use. House, sparkles, pointing hand
- Home value estimate (VALUE keyword): Personal CMA through BoldTrail, NOT a Zestimate

**Open items needing Becca's input:**
1. Email 8 in FUTURE sequence: Needs Becca's personal story (why she got into real estate) - 3-4 sentences
2. Burien AFH emails: Who signs them? Becca or someone else on the care home team?
3. WARM Email 5: Needs preferred lender name for vendor recommendation
4. Review DOWNSIZE flow tone for the senior ICP

**Next priorities:**
1. Becca provides personal story and lender name
2. Set up ManyChat flows (account needs to be connected to IG and FB)
3. Build BoldTrail email sequences
4. Test end-to-end: comment keyword → DM flow → assessment → webhook → Sheets → BoldTrail

---

## Deliverable Files on claude.ai (Need to Download)

These .docx files were generated in the claude.ai workstream chats and should be downloaded and saved locally:

1. **Content Strategy Playbook** - from Content Engine chat
2. **90-Day Content Calendar** (.xlsx) - from Content Engine chat
3. **Week 2 Content Batch** (.docx) - from Content Engine chat
4. **CRM Email Sequences v1** (.docx) - from CRM chat
5. **Google Sheets Data Structure** (.xlsx) - from Automation chat
6. **Make.com Scenario Blueprints** (.docx) - from Automation chat

---

## Cross-Workstream Dependencies

```
Website (assessment build) ──→ Automation (webhook format)
                           ──→ CRM (scoring logic → email routing)
Content (ManyChat CTAs)    ──→ CRM (keyword flows must be live)
CRM (ManyChat flows)       ──→ Website (assessment link in CTAs)
Automation (Sheets schema) ──→ Automation (Looker Studio dashboards)
```

## Priority: Build the converter first, then the traffic.
1. Deploy website (yournextstepteam.com)
2. Wire up automation (Make.com + Sheets)
3. Activate CRM sequences (BoldTrail + ManyChat)
4. Scale content engine (already has calendar + Week 1-2 done)
