/**
 * tenant.ts
 *
 * The single source of truth for everything that changes from one agent
 * deployment to the next.
 *
 * TENANT: Rebecca "Becca" Pitts (yournextstephome.com).
 *
 * V1 CONTENT PASS (2026-07-16). Pivoted to becca-sites/yournextstephome-site.
 * Palette locked to BBCH sibling brand (Ink/Moss/Bone/Sunshine). Real podcast
 * episodes with verified YouTube IDs. Stats and testimonials are still TODO
 * placeholders. The site is walled off from search and AI indexing while
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

export interface TenantMedia {
  heroPrimary: string;
  heroSecondary: string;
  heroTertiary: string;
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
}

export interface TenantStat {
  value: string;
  label: string;
  detail?: string;
}

export interface TenantScenario {
  title: string;
  description: string;
  href: string;
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
    title: "REALTOR®, Senior Real Estate Specialist",
    brokerage: "eXp Realty",
    brokerageDisclosure:
      "Rebecca Pitts is a licensed real estate broker in Washington State, affiliated with eXp Realty. MLS #87890. License #107351. eXp Realty is a licensed real estate brokerage. Equal Housing Opportunity.",
    headshot: "/photos/headshots/becca-headshot.webp",
    bio: "I help older adults and their families navigate the moves that matter most. From aging-in-place modifications to right-sized downsizing, every transition gets patience, a clear plan, and someone who has done this before.",
    storyLong:
      "I built the care I wished I had for my own parents. After 20 years in senior care and 15 years in real estate, I understand that selling a home you have lived in for decades is never just a transaction. It is a family decision. And it deserves someone who will treat it that way.",
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
    city: "Puyallup",
    state: "Washington",
    stateAbbreviation: "WA",
    primaryArea: "Pierce County",
    positioning:
      "Senior real estate across Pierce and South King County. Aging-in-place strategy, downsizing, and every next step for older adults and their families.",
    neighborhoods: [
      "Bonney Lake",
      "Tacoma",
      "Gig Harbor",
      "Puyallup",
      "Graham",
      "Eatonville",
      "Milton",
      "Edgewood",
      "Sumner",
      "Spanaway",
      "Orting",
      "Enumclaw",
      "Auburn",
      "Tehaleh",
    ],
    zip: "98371",
    schoolDistrict: "Puyallup School District",
    commuteToHub: "30 minutes",
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
    eyebrow: "Pierce County · South King County · Puget Sound",
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
    leadWebhookUrl: "",
    agentSiteUrl: "https://rebeccapitts.exprealty.com/",
    searchAllHomesUrl: "https://rebeccapitts.exprealty.com/",
    buyerQuestionnaireUrl: "/buyers/questionnaire",
    sellerQuestionnaireUrl: "/sellers/questionnaire",
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

  // TODO Becca verify: all testimonials are placeholders.
  testimonials: [
    {
      quote:
        "Becca walked us through every step of moving Mom out of the family home. She understood this was not just a sale. She treated it like what it was: a family decision.",
      name: "Sample Client",
      context: "Senior downsizing, family transition",
      location: "TODO Becca verify",
    },
    {
      quote:
        "We were trying to figure out whether to modify the house or sell it. Becca helped us think through both paths before we made a decision. No pressure, just real information.",
      name: "Sample Family",
      context: "Aging-in-place evaluation",
      location: "TODO Becca verify",
    },
    {
      quote:
        "First-time buyers with a lot of questions. Becca answered every single one and never made us feel like we were slowing things down. We found the right home at the right price.",
      name: "Sample Buyers",
      context: "First-time purchase",
      location: "TODO Becca verify",
    },
    {
      quote:
        "After Dad passed, selling the house felt overwhelming. Becca coordinated with our attorney, handled the estate sale logistics, and kept us informed at every turn.",
      name: "Sample Estate Client",
      context: "Estate transition",
      location: "TODO Becca verify",
    },
  ],

  // TODO Becca verify: all stats are placeholders.
  stats: [
    { value: "15+", label: "Years in real estate", detail: "Pierce and South King County" },
    { value: "SRES", label: "Senior specialist", detail: "Certified designation" },
    { value: "20+", label: "Years in senior care", detail: "Before real estate" },
    { value: "3", label: "Podcast episodes", detail: "Next Step Conversations" },
  ],

  // TODO Becca verify: all results stats are placeholders.
  resultsStats: [
    { value: "150+", label: "Total closings", detail: "Career total" },
    { value: "$58M", label: "Volume sold", detail: "Career total" },
    { value: "5.0", label: "Google rating", detail: "Verified reviews" },
    { value: "60+", label: "Five-star reviews", detail: "From local clients" },
  ],

  scenarios: [
    {
      title: "Planning to age in place",
      description:
        "You want to stay in the home you love. Which modifications matter, what they cost, and how to prioritize the ones that keep you safe and independent.",
      href: "/sellers",
    },
    {
      title: "Ready to downsize",
      description:
        "Decades in one house and it is time for something that fits the next chapter. A calm, staged plan to sell well and land somewhere that works.",
      href: "/sellers",
    },
    {
      title: "Helping a parent move",
      description:
        "You are the adult child coordinating a move for mom or dad. A patient partner who has done this before and can carry the logistics with you.",
      href: "/contact",
    },
    {
      title: "Buying the right next home",
      description:
        "Single level, low maintenance, close to care and community. Finding the home that fits how life actually looks now.",
      href: "/buyers",
    },
    {
      title: "Relocating to the area",
      description:
        "Moving to Pierce or South King County to be closer to family? Which towns fit your pace, your budget, and the care network you need.",
      href: "/contact",
    },
    {
      title: "Sorting out the estate",
      description:
        "An inherited property, a trust sale, or a transition after a loss. Coordinated with the family, the attorney, and no pressure on the timeline.",
      href: "/contact",
    },
  ],

  faqs: [
    {
      question: "What does an SRES designation mean?",
      answer:
        "The Seniors Real Estate Specialist (SRES) designation means additional training in the financial, emotional, and logistical challenges that come with real estate transactions for older adults. It covers reverse mortgages, tax implications of selling a long-held home, aging-in-place modifications, and how to coordinate with elder law attorneys and financial planners.",
    },
    {
      question: "How do you help families who are not sure whether to sell or stay?",
      answer:
        "We start with a conversation, not a listing appointment. I walk the home with the family, talk through what modifications would cost versus what selling and moving would look like, and lay both paths side by side. No pressure toward either outcome. The goal is a clear decision made with real numbers.",
    },
    {
      question: "Can you coordinate with our trust or estate attorney?",
      answer:
        "Yes, and this is one of the most common scenarios I handle. Estate sales, trust sales, and transitions after a loss all involve legal coordination. I work directly with the family's attorney to make sure the real estate side stays aligned with the legal timeline.",
    },
    {
      question: "What if we need to sell and buy at the same time?",
      answer:
        "Coordinating a simultaneous sell-and-buy is one of the most complex transactions in residential real estate. I stage the timeline, manage contingencies on both contracts, and keep both sides moving so you are not stuck between two closings.",
    },
    {
      question: "Do you work with first-time buyers too?",
      answer:
        "Absolutely. The same patient, education-first approach applies. If you are buying your first home, you will get the same level of attention and explanation as a senior client navigating a complex transition. Every question gets answered.",
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
      region: "primary",
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
