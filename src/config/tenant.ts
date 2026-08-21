/**
 * tenant.ts
 *
 * The single source of truth for everything that changes from one agent
 * deployment to the next.
 *
 * TENANT: Rebecca "Becca" Pitts (yournextstephome.com).
 *
 * COPY PASS (2026-08-21). Full first-person rewrite positioning Becca as the
 * geographic expert for Bonney Lake, Puyallup, North Tacoma, and Eatonville,
 * with range of expertise second and senior transitions as one strength rather
 * than the whole identity. Copy rules for this tenant: first person, no
 * X-not-Y framing, no em dashes, solo agent ("I", never "we" about Becca).
 *
 * V1 CONTENT PASS (2026-07-16). Pivoted to becca-sites/yournextstephome-site.
 * Palette locked to BBCH sibling brand (Ink/Moss/Bone/Sunshine). Real podcast
 * episodes with verified YouTube IDs. Stats and testimonials are real, sourced
 * from Becca's Zillow agent profile (2026-08-19). Neighborhood data is still
 * TODO, so the site remains walled off from search and AI indexing while
 * placeholder safeguards are active. See README "Placeholder Mode" and
 * `src/lib/placeholder.ts`.
 */

export interface TenantAgent {
  name: string;
  firstName: string;
  title: string;
  brokerage: string;
  brokerageDisclosure: string;
  headshot: string;
  bio: string;
  storyLong: string;
  license: string;
  mlsId: string;
  phone: string;
  email: string;
  brandEmail: string;
  address: string;
  yearsOfExperience: number;
  expProfileUrl: string;
}

export interface TenantMarket {
  city: string;
  state: string;
  stateAbbreviation: string;
  primaryArea: string;
  positioning: string;
  neighborhoods: string[];
  zip: string;
  schoolDistrict: string;
  commuteToHub: string;
  hubCity: string;
}

export interface TenantBrand {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  logo: string;
  tagline: string;
  eyebrow: string;
  headingFont: string;
  bodyFont: string;
}

export interface TenantSocial {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  zillow?: string;
}

export interface TenantListings {
  feedSource: "boldtrail" | "ihomefinder" | "showcaseidx" | "realgeeks" | "custom";
  iframeUrl: string;
  searchUrl: string;
  widgetScriptUrl?: string;
  leadWebhookUrl?: string;
  agentSiteUrl: string;
  searchAllHomesUrl: string;
  buyerQuestionnaireUrl: string;
  sellerQuestionnaireUrl: string;
}

export interface TenantVideos {
  channelUrl: string;
  featuredPlaylistId: string;
  featuredPlaylistUrl: string;
  seriesTitle: string;
  seriesDescription: string;
}

export interface TenantPodcast {
  name: string;
  description: string;
  transistorUrl: string;
  applePodcastsUrl: string;
  spotifyUrl: string;
  youtubePlaylistUrl: string;
}

export interface TenantHeroVideo {
  /** H.264 MP4. Universally supported, so it is the only encode we ship. */
  src: string;
  /** Still frame shown before playback, under reduced motion, and on failure. */
  poster: string;
  /**
   * What the footage actually shows. Used as the video's accessible
   * description and, when the site goes live, as the VideoObject name.
   */
  description: string;
  /** City and state the footage was shot in. */
  locality: string;
  region: string;
  /** Seconds. Used for the VideoObject duration. */
  durationSeconds: number;
}

export interface TenantMedia {
  heroPrimary: string;
  heroSecondary: string;
  heroTertiary: string;
  heroVideo?: TenantHeroVideo;
  agentHeadshot: string;
  agentEnvironment?: string;
  listingShowcase: string[];
  aerial: string[];
  lifestyle: string[];
}

export interface TenantTestimonial {
  quote: string;
  name: string;
  context: string;
  location: string;
  /** Star rating as left by the reviewer, out of 5. */
  rating?: number;
  /** Review date, ISO yyyy-mm-dd. */
  date?: string;
  /** Where the review was published. */
  source?: string;
}

export interface TenantStat {
  value: string;
  label: string;
  detail?: string;
}

export interface TenantScenario {
  title: string;
  description: string;
  /** Fallback destination used until the long-form article exists. */
  href: string;
  /**
   * Slug of the full blog article this card is meant to open
   * (content/blog/<articleSlug>.mdx). The homepage links here as soon as the
   * file exists and falls back to `href` until then, so the cards can never
   * point at a 404 while the articles are still being written.
   */
  articleSlug: string;
}

export interface TenantFaq {
  question: string;
  answer: string;
}

export interface TenantNeighborhood {
  slug: string;
  name: string;
  region: "primary" | "eastside" | "extended";
  median: string;
  zip: string;
  commute: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export interface TenantEpisode {
  slug: string;
  number: number;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
}

export interface TenantSibling {
  name: string;
  tagline: string;
  url: string;
  description: string;
}

export interface Tenant {
  agent: TenantAgent;
  market: TenantMarket;
  brand: TenantBrand;
  social: TenantSocial;
  listings: TenantListings;
  videos: TenantVideos;
  podcast: TenantPodcast;
  media: TenantMedia;
  testimonials: TenantTestimonial[];
  stats: TenantStat[];
  resultsStats: TenantStat[];
  scenarios: TenantScenario[];
  faqs: TenantFaq[];
  neighborhoods: TenantNeighborhood[];
  episodes: TenantEpisode[];
  sibling: TenantSibling;
  demo: { ribbon: boolean; noIndex: boolean };
}

export const tenant: Tenant = {
  agent: {
    name: 'Rebecca "Becca" Pitts',
    firstName: "Becca",
    title: "REALTOR®, SRES®",
    brokerage: "eXp Realty",
    brokerageDisclosure:
      "Rebecca Pitts is a licensed real estate broker in Washington State, affiliated with eXp Realty. MLS #87890. License #107351. eXp Realty is a licensed real estate brokerage. Equal Housing Opportunity.",
    headshot: "/photos/headshots/becca-headshot.webp",
    bio: "The search is about five percent of this. The other ninety-five is inspections, appraisals, contract clauses, and financing surprises, and that is where I earn my keep. Fifteen years in real estate in Washington, 270 closings across Bonney Lake, Puyallup, North Tacoma, and Eatonville.",
    storyLong:
      "Here is the thing about 270 closings: they teach you exactly where a deal breaks. So I move at your pace, I give you a real answer to every question, and I talk to the lender, the inspector, and the attorney myself before I ever hand you a name. I grew up in Eatonville and I have worked Pierce County for fifteen years, which means I know these neighborhoods street by street.",
    license: "WA #107351",
    mlsId: "87890",
    phone: "253.678.7089",
    email: "becca@yournextstepteam.com",
    brandEmail: "becca@yournextstephome.com",
    address: "1002 N Meridian St, PMB 165, Puyallup, WA 98371",
    yearsOfExperience: 15,
    expProfileUrl: "https://rebeccapitts.exprealty.com/",
  },

  market: {
    city: "Bonney Lake",
    state: "Washington",
    stateAbbreviation: "WA",
    primaryArea: "Pierce County",
    positioning:
      "Real estate across Bonney Lake, Puyallup, North Tacoma, and Eatonville, plus the wider Pierce, King, Thurston, and Mason County market. First home or tenth home, upsizing, downsizing, right-sizing, investing, relocating, luxury.",
    // Ordered by priority. The first four feed the site-wide meta description,
    // so the featured areas lead and the rest follow.
    neighborhoods: [
      "Bonney Lake",
      "Puyallup",
      "North Tacoma",
      "Eatonville",
      "Sumner",
      "Graham",
      "Orting",
      "Roy",
      "Gig Harbor",
      "Milton",
      "Edgewood",
      "Tehaleh",
      "Enumclaw",
      "Auburn",
    ],
    zip: "98371",
    schoolDistrict: "Puyallup School District",
    commuteToHub: "40 minutes",
    hubCity: "Tacoma",
  },

  brand: {
    primaryColor: "#1A2028",
    secondaryColor: "#5A6E58",
    accentColor: "#F3B94D",
    surfaceColor: "#FDFBF7",
    textColor: "#1A2028",
    logo: "/images/brand/logo.svg",
    tagline: "Your next step starts here.",
    eyebrow: "Bonney Lake · Puyallup · North Tacoma · Eatonville",
    headingFont: "DM Serif Display",
    bodyFont: "Inter",
  },

  social: {
    youtube: "https://www.youtube.com/@beccapitts",
    instagram: "",
    facebook: "",
    linkedin: "",
  },

  listings: {
    feedSource: "boldtrail",
    iframeUrl: "https://rebeccapitts.exprealty.com/",
    searchUrl: "https://rebeccapitts.exprealty.com/",
    widgetScriptUrl: "",
    leadWebhookUrl:
      "https://script.google.com/macros/s/AKfycbzAfpXoCywT6p7YKOl3S0Uy50zbroCq3HErEp_U6t70kpBQmckXX-4j6z6C91quzBy4/exec",
    agentSiteUrl: "https://rebeccapitts.exprealty.com/",
    searchAllHomesUrl: "https://rebeccapitts.exprealty.com/",
    buyerQuestionnaireUrl: "https://form.jotform.com/202806769439164",
    sellerQuestionnaireUrl: "https://form.jotform.com/202806282649157",
  },

  videos: {
    channelUrl: "https://www.youtube.com/@beccapitts",
    featuredPlaylistId: "PLG5NuTm0xBQ-fdh6W3hLMwJHV3x4793NY",
    featuredPlaylistUrl:
      "https://www.youtube.com/playlist?list=PLG5NuTm0xBQ-fdh6W3hLMwJHV3x4793NY",
    seriesTitle: "Your Best Season",
    seriesDescription:
      "A senior living education series on aging in place, downsizing, elder care, and making a confident move into the next chapter.",
  },

  podcast: {
    name: "Next Step Conversations",
    description:
      "Real conversations about the decisions that shape your next chapter. Hospice care, estate planning, senior moves, and the questions families are really asking.",
    transistorUrl: "https://nextstepconversations.transistor.fm",
    applePodcastsUrl: "",
    spotifyUrl: "",
    youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLG5NuTm0xBQ-fdh6W3hLMwJHV3x4793NY",
  },

  media: {
    heroPrimary: "/images/hero/valley-landscape.jpg",
    heroSecondary: "/images/hero/valley-hero-1.jpg",
    heroTertiary: "/images/hero/valley-hero-2.jpg",
    // Source was 2560x1440 HEVC at 30 MB. HEVC in MP4 does not play in Chrome
    // or Firefox, so it is re-encoded to 1080p H.264 (4.7 MB) for the web.
    heroVideo: {
      src: "/videos/hero.mp4",
      poster: "/images/hero/hero-poster.webp",
      description:
        "Aerial and walkthrough tour of a hillside home on acreage in Eatonville, Washington, opening over the property and the valley below, then moving through the terraced garden and water feature, the vaulted great room, and the primary bedroom.",
      locality: "Eatonville",
      region: "WA",
      durationSeconds: 24,
    },
    agentHeadshot: "/photos/headshots/becca-headshot.webp",
    listingShowcase: [
      "/images/listings/home-bellevue.jpg",
      "/images/listings/home-main-1.jpg",
      "/images/listings/home-detail-1.jpg",
      "/images/listings/home-classic.jpg",
      "/images/listings/mls-15.jpg",
      "/images/listings/mls-18.jpg",
      "/images/listings/mls-19.jpg",
      "/images/listings/mls-22.jpg",
    ],
    aerial: [
      "/images/aerial/aerial-1.jpg",
      "/images/aerial/aerial-2.jpg",
      "/images/aerial/aerial-3.jpg",
      "/images/aerial/aerial-valley-1.jpg",
      "/images/aerial/aerial-valley-2.jpg",
      "/images/aerial/aerial-valley-3.jpg",
      "/images/aerial/aerial-valley-4.jpg",
      "/images/aerial/aerial-valley-5.jpg",
      "/images/aerial/aerial-valley-6.jpg",
      "/images/aerial/aerial-valley-7.jpg",
      "/images/aerial/aerial-valley-8.jpg",
      "/images/aerial/aerial-valley-9.jpg",
    ],
    lifestyle: [
      "/images/lifestyle/string-lights.jpg",
      "/images/lifestyle/backyard-twilight.jpg",
      "/images/lifestyle/living-room-1.jpg",
      "/images/lifestyle/living-room-2.jpg",
    ],
  },

  // Verified reviews from Becca's Zillow agent profile. Reviewer names are the
  // Zillow screen names as published.
  testimonials: [
    {
      quote:
        "Becca was incredible every step of the process in selling our house. She was always there when we had a question as we were getting the house ready to put on the market. And she always offered easy to follow advice as it came time to list.",
      name: "coderunfun",
      context: "Sold Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2024-06-24",
      source: "Zillow",
    },
    {
      quote:
        "Becca has helped us buy four rental properties and sell one. We have found her to be knowledgeable, effective and tenacious in representing us. She is very familiar with the multiple listing contract forms and very efficient in tailoring contracts.",
      name: "janpauw",
      context: "Bought and sold Multiple Occupancy",
      location: "Sumner, WA",
      rating: 5,
      date: "2023-10-16",
      source: "Zillow",
    },
    {
      quote:
        "Becca is ridiculously smart and was able to navigate an extremely challenging purchase on a property we recently made. Her sense of humor and tenacity kept us laughing as we slowly rolled across the finish line. She had amazing knowledge of the area.",
      name: "cleochatra3",
      context: "Bought Vacant Land",
      location: "Fall City, WA",
      rating: 5,
      date: "2023-09-03",
      source: "Zillow",
    },
    {
      quote:
        "Becca is truly an outstanding real estate agent and I highly recommend her services without any hesitation. I'd give her 6 stars if that was an option. Professional, knowledgeable, thorough and simply got the job done!",
      name: "wineboy1",
      context: "Sold Single Family",
      location: "Spanaway, WA",
      rating: 5,
      date: "2022-08-06",
      source: "Zillow",
    },
    {
      quote:
        "This market is tough for a buyer, and especially so if you're like me, a first-time buyer with particular home requirements and a hard limit on resources. By the time Becca was recommended to me, I was tired of searching and feeling a bit under supported.",
      name: "BryannaRaiche",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2021-08-15",
      source: "Zillow",
    },
  ],

  stats: [
    { value: "15+", label: "Years in real estate", detail: "Licensed in Washington" },
    { value: "270", label: "Closings", detail: "Bonney Lake to Eatonville and beyond" },
    { value: "SRES®", label: "Senior Real Estate Specialist", detail: "Certified for 55+ moves" },
    { value: "Icon", label: "eXp Icon Agent", detail: "Awarded 2022" },
  ],

  resultsStats: [
    { value: "270", label: "Total closings", detail: "Career total across Western Washington" },
    { value: "$516K", label: "Average sale price", detail: "$165K to $1M price range" },
    { value: "5.0", label: "Zillow rating", detail: "46 verified reviews" },
    { value: "12", label: "Sales in the last 12 months", detail: "Pierce and South King County" },
  ],

  // Written for cold traffic: someone who found this page and has never met
  // Becca. Each card opens a full article once content/blog/<articleSlug>.mdx
  // lands; until then it falls back to `href`.
  scenarios: [
    {
      title: "Buying your first home in Pierce County",
      description:
        "Ask me anything, including the questions you think sound dumb. Those are usually the good ones. I'll walk you through financing, offers, and inspections at your pace, and you'll understand what you're signing before you sign it.",
      href: "/buyers",
      articleSlug: "first-time-home-buyer-guide-pierce-county",
    },
    {
      title: "Selling one home to buy the next",
      description:
        "Two transactions, one timeline, and a dozen moving pieces. I coordinate the sale, the purchase, and the financing in between so the two closings land where they should and you move once.",
      href: "/sellers",
      articleSlug: "selling-and-buying-at-the-same-time-washington",
    },
    {
      title: "Helping a parent move",
      description:
        "You're the adult child sorting out a move for mom or dad, and it's a lot to carry. I'm SRES certified, so I know how to work with the whole family, the timeline, and the attorney, and I give your parent the room to make a decision this big.",
      href: "/contact",
      articleSlug: "helping-a-parent-move-senior-real-estate-washington",
    },
    {
      title: "Buying land to build on",
      description:
        "Land works differently than houses. Bigger down payments, different loan programs, and a build timeline that has to line up with everything else. I do the homework on the parcel, the septic, and the setbacks before you fall in love with it.",
      href: "/buyers",
      articleSlug: "buying-land-to-build-pierce-county",
    },
    {
      title: "Relocating to Pierce County",
      description:
        "You're moving to Washington from somewhere else entirely, so you need someone standing on the ground here. I'll tour homes on video with you, tell you the truth about the commute out of Bonney Lake, and hand you off to an agent I trust to sell where you are now.",
      href: "/contact",
      articleSlug: "relocating-to-pierce-county-from-out-of-state",
    },
    {
      title: "Ready to downsize or right-size",
      description:
        "Decades in one house, and now it's more house than you need. I'll help you sell well and land somewhere that fits the life you have today, with all the time you need to say goodbye to a place full of memories.",
      href: "/sellers",
      articleSlug: "downsizing-guide-pierce-county",
    },
  ],

  faqs: [
    {
      question: "What areas do you actually work?",
      answer:
        "Bonney Lake, Puyallup, North Tacoma, and Eatonville are home turf. I grew up in Eatonville and I have worked this county for fifteen years. I also list and sell in Sumner, Graham, Orting, Roy, Gig Harbor, and out into King, Thurston, and Mason counties. If you are wondering whether your address is in my range, call and ask. It usually is.",
    },
    {
      question: "How do you decide what my home should list for?",
      answer:
        "I walk the home first, then I build a full CMA from closed sales within a mile or so of you, adjusted for condition, layout, lot, and what is moving right now. Bonney Lake and North Tacoma can behave like two different markets in the same month, so a countywide average tells you very little. You get the comps and the reasoning behind them, and then we pick the number together.",
    },
    {
      question: "What does SRES certified mean?",
      answer:
        "It is additional training for real estate involving older adults. Reverse mortgages, the tax side of selling a home you have lived in for thirty years, aging-in-place modifications, coordinating with elder law attorneys. It is one part of what I do, and it is the part families lean on hardest when the move involves a parent.",
    },
    {
      question: "Can you coordinate with our trust or estate attorney?",
      answer:
        "Yes, and I do it often. Estate sales, trust sales, and transitions after a loss all run on a legal timeline, and I keep the real estate side lined up with it. I talk to your attorney directly. If you do not have one yet, I have names I have already vetted.",
    },
    {
      question: "What if we need to sell and buy at the same time?",
      answer:
        "It is one of the most complex transactions in residential real estate: bridge loans, contingency timelines, two agents, two closings. I manage the lender relationship, hold the other agent to your timeline, and coordinate both sides so the two closings land where they should. I have done this enough times to know the three places it usually breaks, and I plan around them.",
    },
    {
      question: "Do you work with first-time buyers too?",
      answer:
        "Absolutely, and honestly it is some of my favorite work. Ask all the questions; that is how I work. We move at your pace, every question gets a real answer, and I would rather over-explain than leave you guessing. On average, my buyers are under contract within 45 days of starting their search.",
    },
  ],

  neighborhoods: [
    {
      slug: "bonney-lake",
      name: "Bonney Lake",
      region: "primary",
      median: "$TODO",
      zip: "98391",
      commute: "40 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Bonney Lake.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "puyallup",
      name: "Puyallup",
      region: "primary",
      median: "$TODO",
      zip: "98371",
      commute: "25 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Puyallup.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "tacoma",
      name: "Tacoma",
      region: "primary",
      median: "$TODO",
      zip: "98402",
      commute: "City center",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Tacoma.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "gig-harbor",
      name: "Gig Harbor",
      region: "primary",
      median: "$TODO",
      zip: "98335",
      commute: "20 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Gig Harbor.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "graham",
      name: "Graham",
      region: "primary",
      median: "$TODO",
      zip: "98338",
      commute: "30 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Graham.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "eatonville",
      name: "Eatonville",
      region: "primary",
      median: "$TODO",
      zip: "98328",
      commute: "50 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Eatonville.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "milton-edgewood",
      name: "Milton / Edgewood",
      region: "primary",
      median: "$TODO",
      zip: "98354",
      commute: "20 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Milton and Edgewood.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "sumner",
      name: "Sumner",
      region: "primary",
      median: "$TODO",
      zip: "98390",
      commute: "25 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Sumner.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "spanaway",
      name: "Spanaway",
      region: "extended",
      median: "$TODO",
      zip: "98387",
      commute: "15 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Spanaway.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "orting",
      name: "Orting",
      region: "primary",
      median: "$TODO",
      zip: "98360",
      commute: "35 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Orting.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "enumclaw",
      name: "Enumclaw",
      region: "extended",
      median: "$TODO",
      zip: "98022",
      commute: "50 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Enumclaw.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "auburn",
      name: "Auburn",
      region: "extended",
      median: "$TODO",
      zip: "98002",
      commute: "30 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Auburn.",
      highlights: ["TODO Becca verify"],
    },
    {
      slug: "tehaleh",
      name: "Tehaleh",
      region: "primary",
      median: "$TODO",
      zip: "98391",
      commute: "40 minutes to Tacoma",
      tagline: "TODO Becca verify",
      description: "TODO Becca verify: Neighborhood overview for Tehaleh.",
      highlights: ["TODO Becca verify"],
    },
  ],

  // Next Step Conversations podcast episodes (verified YouTube IDs).
  episodes: [
    {
      slug: "understanding-hospice-care",
      number: 1,
      title: "Understanding Hospice Care",
      description: "What hospice care really means, when to start the conversation, and how families can prepare for this stage of care.",
      youtubeId: "gC4-fz5IZUc",
      duration: "13:34",
    },
    {
      slug: "estate-planning-101",
      number: 2,
      title: "Estate Planning 101",
      description: "The basics of estate planning for homeowners. Wills, trusts, power of attorney, and how real estate fits into the bigger picture.",
      youtubeId: "Cpd3pZfKj1c",
      duration: "21:17",
    },
    {
      slug: "senior-move-management",
      number: 3,
      title: "Senior Move Management",
      description: "How professional senior move managers help families downsize, organize, and relocate without the overwhelm.",
      youtubeId: "FKhn1iLEjvY",
      duration: "16:55",
    },
  ],

  sibling: {
    name: "Burien Best Care Home",
    tagline: "Where Compassion Meets Quality Care",
    url: "https://burienbestcarehome.com",
    description: "A 6-bed adult family home in Burien, WA providing long-term residential care, memory care, and respite care.",
  },

  demo: { ribbon: true, noIndex: true },
};

export function resolveListings() {
  return {
    iframeUrl: process.env.NEXT_PUBLIC_BOLDTRAIL_IFRAME_URL || tenant.listings.iframeUrl,
    searchUrl: process.env.NEXT_PUBLIC_BOLDTRAIL_SEARCH_URL || tenant.listings.searchUrl,
    widgetScriptUrl:
      process.env.NEXT_PUBLIC_BOLDTRAIL_WIDGET_URL || tenant.listings.widgetScriptUrl,
    leadWebhookUrl: process.env.BOLDTRAIL_LEAD_WEBHOOK_URL || tenant.listings.leadWebhookUrl,
  };
}
