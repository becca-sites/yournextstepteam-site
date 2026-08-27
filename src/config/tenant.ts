/**
 * tenant.ts
 *
 * The single source of truth for everything that changes from one agent
 * deployment to the next.
 *
 * TENANT: Rebecca "Becca" Pitts, trading as Your Next Step Team
 * (yournextstepteam.com).
 *
 * REBRAND (2026-08-21). "Your Next Step Home" became "Your Next Step Team"
 * across the brand, the domain, and the repo (becca-sites/yournextstepteam-site).
 * The brand name and domain now live in `brand.name` and `brand.domain` so
 * metadata, schema, and canonical URLs all read from one place instead of
 * hard-coding the string. The logo wordmark reads "Your Next Step" with no
 * suffix, which is intentional.
 *
 * COPY PASS (2026-08-21). Full first-person rewrite positioning Becca as the
 * geographic expert for Bonney Lake, Puyallup, North Tacoma, and Eatonville,
 * with range of expertise second and senior transitions as one strength rather
 * than the whole identity. Copy rules for this tenant: first person, no
 * X-not-Y framing, no em dashes, solo agent ("I", never "we" about Becca).
 *
 * REVIEW MERGE (2026-08-22). Google reviews folded in alongside the Zillow
 * set, deduplicated by review text, newest first. Nine Zillow entries were
 * left under anonymous usernames by that platform but matched a Google review
 * word for word, so they now carry the reviewer's real name and keep
 * `source: "Zillow"` (Jamie Van Eaton, Jan Pauw, Bryanna Michele, Sara
 * Appudoray, Alicia Torrez, Brendan Dudley, Julie, Bethany Schmidt, Patricia
 * Albuquerque). Google and Facebook publish no transaction summary or city,
 * so `context` and `location` are optional and the card drops them.
 *
 * V1 CONTENT PASS (2026-07-16). Pivoted to becca-sites/yournextstepteam-site.
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
  /**
   * Second portrait for the homepage scroll crossfade. Optional: when it is
   * unset the crossfade falls back to running the primary headshot in both
   * slots, so the mechanism still works and nothing looks broken.
   */
  headshotAlt?: string;
  /**
   * Official eXp Realty artwork, two files: the full-colour lockup for light
   * surfaces and the white knockout for dark ones. Both are optional and both
   * are empty until the real files are pulled from the eXp brand toolkit.
   *
   * eXp's guidelines say the logo must never be recreated or typeset and that
   * only official files may be used, so nothing here approximates the mark.
   * While these are empty the compliance lockup renders the brokerage as a
   * plain-text identification line instead. Fill all four fields together;
   * `BrokeredBy` only switches to the artwork when it has a path and both
   * intrinsic dimensions.
   */
  brokerageLogo?: string;
  brokerageLogoLight?: string;
  brokerageLogoWidth?: number;
  brokerageLogoHeight?: number;
  /**
   * The personal-opinion disclaimer eXp expects on an agent-run site. Kept
   * separate from `brokerageDisclosure`, which is the licensing statement.
   */
  opinionDisclaimer: string;
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
  /** Public-facing business name. Used in titles, Open Graph, and schema. */
  name: string;
  /** Bare apex domain, no protocol. `brandUrl()` builds the https origin. */
  domain: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  /** Two-colour primary lockup. For light backgrounds. */
  logo: string;
  /** White knockout of the same lockup. For dark backgrounds. */
  logoLight: string;
  /** Intrinsic pixels of both logo files, so next/image can reserve the box. */
  logoWidth: number;
  logoHeight: number;
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
  /**
   * Transaction summary, e.g. "Bought Single Family". Zillow publishes this
   * alongside the review; Google and Facebook do not, so it is optional and
   * the card drops the line when it is missing.
   */
  context?: string;
  /**
   * City the transaction closed in. Zillow-only for the same reason as
   * `context`, so the card drops the separator when it is missing.
   */
  location?: string;
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
  demo: { noIndex: boolean };
}

export const tenant: Tenant = {
  agent: {
    name: 'Rebecca "Becca" Pitts',
    firstName: "Becca",
    title: "REALTOR®, SRES®",
    brokerage: "eXp Realty",
    brokerageDisclosure:
      "Rebecca Pitts is a licensed real estate broker in Washington State, affiliated with eXp Realty. MLS #87890. License #107351. eXp Realty is a licensed real estate brokerage. Equal Housing Opportunity.",
    // Empty on purpose. See the field docs above: the eXp logo cannot be
    // recreated, so these stay blank until the official artwork is dropped into
    // public/images/brand and the four fields are filled in together.
    brokerageLogo: "",
    brokerageLogoLight: "",
    opinionDisclaimer:
      "Opinions expressed are my own and not the views of eXp Realty.",
    headshot: "/photos/headshots/becca-headshot.webp",
    // The seated studio portrait crossfades into this one on the homepage as
    // the about section scrolls through the viewport.
    headshotAlt: "/photos/headshots/becca-headshot-alt.webp",
    bio: "Here's the thing about 270 closings: they teach you exactly where a deal breaks. So I structure things so they don't. I anticipate problems and have a Plan B ready, sometimes C and D, before anything goes sideways. That kind of experience also teaches you when it's time to walk away and cut losses, and I'll tell you that honestly too.",
    // Becca's own words. Paragraphs are separated by a blank line and split on
    // "\n\n" wherever this renders, so the homepage and the About page stay in
    // sync from this one source. Keep it em dash free: her voice uses periods
    // and commas, not dashes.
    storyLong: [
      "Here's the thing about 270 closings: they teach you exactly where a deal breaks. So I structure things so they don't. I anticipate problems and have a Plan B ready, sometimes C and D, before anything goes sideways. That kind of experience also teaches you when it's time to walk away and cut losses, and I'll tell you that honestly too.",
      "I'm a cooperative agent. I look for the win-win because, let's be honest, at the end of the day everyone at the table has the same goal. I'm also solution-oriented. If there's a way to pull something off with integrity, I'm going to find it. I've sat in driveways at 9 PM helping clients think through a tough call. I've driven hours to track down a signature that saved a deal everyone else had written off. You get me, plus my transaction team keeping every deadline and detail on track behind the scenes. And I will give you a real answer to every question, even when the real answer is 'I don't know yet, but I'm going to find out.'",
      "I've lived in the Puget Sound my whole life. I grew up in the small town of Eatonville, lived in Puyallup and Tacoma for about fifteen years, had a short stint in King County, and now I live in Bonney Lake. I've helped buyers and sellers from Everett to Morton and from Grays Harbor to Roslyn. I've never had a house come to me, so I'll go wherever the right deal is. But generally speaking, I focus my efforts in Pierce and South King Counties, which means I know these neighborhoods well. First house or tenth, upsizing, downsizing, investing, relocating: the questions change, the way I work them stays the same.",
    ].join("\n\n"),
    license: "WA #107351",
    mlsId: "87890",
    phone: "253.678.7089",
    email: "becca@yournextstepteam.com",
    brandEmail: "becca@yournextstepteam.com",
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
    name: "Your Next Step Team",
    domain: "yournextstepteam.com",
    primaryColor: "#1A2028",
    secondaryColor: "#5A6E58",
    accentColor: "#F3B94D",
    surfaceColor: "#FDFBF7",
    textColor: "#1A2028",
    // Becca's real mark, trimmed from the supplied artwork in
    // docs/brand-assets and emitted at 640px wide, which covers a 48px-tall
    // header logo at 3x DPR. The wordmark reads "Your Next Step" with no
    // suffix; that is the logo as drawn and it is deliberate.
    logo: "/images/brand/logo-primary.png",
    logoLight: "/images/brand/logo-white.png",
    logoWidth: 640,
    logoHeight: 312,
    tagline: "Your next step starts here.",
    // Counties rather than the old four-town list. Naming four small towns in
    // the first line of the homepage told a King or Thurston County buyer they
    // were out of range, and they are not. Town names belong on the
    // neighbourhood pages and in blog posts, where they are the subject.
    eyebrow: "Pierce County · King County · Surrounding Areas",
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

  // 57 verified reviews, newest first: all 46 from Becca's Zillow agent
  // profile plus the 11 Google reviews that are not already on Zillow.
  //
  // `quote` is the review text verbatim (whitespace collapsed). Ten of the 21
  // Google reviews are the same review the reviewer also left on Zillow, so
  // they are dropped here and the Zillow entry keeps the earlier, usually
  // longer text; where Zillow published only a screen name, that entry now
  // carries the reviewer's real name from the matching Google review. Zillow
  // publishes the profile rating as 5.0; 45 of the 46 Zillow reviews are five
  // stars and one is four, so `rating` carries each reviewer's own score
  // rather than the rounded average. Every Google review is five stars.
  //
  // `location` is the city from Zillow's transaction summary, with the
  // neighbourhood prefix dropped and ZIP-only entries resolved to their city.
  // Google publishes neither a city nor a transaction summary, so Google
  // entries omit `location` and `context` instead of guessing at them.
  testimonials: [
    {
      quote:
        "I am extremely thankful for Becca! Not only did she make the whole process easy and understandable, she was always just a phone call or text away and got back to me almost immediately. She truly cares about her clients and proves that. I would recommend her to every person I know, and I honestly have! She isn't just an agent, she became a friend. If you're looking for a realtor, look no further!",
      name: "Tory Shelton",
      rating: 5,
      date: "2024-11-06",
      source: "Google",
    },
    {
      quote:
        "Becca is an incredible realtor! She went above and beyond to help us find our dream home. Her knowledge of the market and attention to detail made the process smooth and stress free. She was always available to answer questions and truly cared about our needs. We couldn't have asked for a better experience. Highly recommend!",
      name: "Rebecca McKee",
      rating: 5,
      date: "2024-11-06",
      source: "Google",
    },
    {
      quote:
        "Becca is the best there is! She's hard working, knowledgeable, encouraging, caring and compassionate, goes above and beyond for you and makes it happen!",
      name: "Tasha Shelton",
      rating: 5,
      date: "2024-11-06",
      source: "Google",
    },
    {
      quote:
        "Had a great experience with working with Becca. She is a very professional realtor that is very quick to respond to my texts! I would highly recommend her!",
      name: "Johnny Nuchols",
      rating: 5,
      date: "2024-10-31",
      source: "Google",
    },
    {
      quote:
        "What an amazing whirlwind it was to have Becca and her team helping us find a home. My husband and I are first time home buyers. When everyone else was telling us we couldn't do it Becca was rooting us on and telling us 'you sure can' and 'don't listen to others'. My husband and I had given up until Becca came into our lives. Becca set us up with the La Flamme group and Movement Mortgage and we were pre approved. We immediately started looking at homes. My husband ended up getting frustrated and tired of looking and told me to take care of it. Becca knew what we were looking for and ultimately started looking at homes for us and calling when she found something that would work and doing video calls with me. This one house kept coming up and she looked, then I went and looked. She immediately put in an offer for us, it was excepted and then everyone busted a move getting us finished and closed. We moved in the day after we closed. If you want a mediocre agent who doesn't give a damn then Becca isn't the one for you. Now if you want an amazing, caring, loyal agent who doesn't want to just 'make a sale' then Becca is for you. She will never push you into something that doesn't fit you or you don't love! Today I got home to a gift from Becca, the mugs and candles were perfect and totally us!!!!! I highly recommend you have Becca on your team, you will not be disappointed at all. Becca will forever be a part of this family. We know who's helping us find our next home.",
      name: "Jennifer Ziegenfuss",
      rating: 5,
      date: "2024-09-10",
      source: "Google",
    },
    {
      quote:
        "Becca was incredible every step of the process in selling our house. She was always there when we had a question as we were getting the house ready to put on the market. And she always offered easy to follow advice as it came time to list. We got a lot of quick action on our house once it was on the market and her expertise brought things to a quick closing! Use Becca when buying or selling your home, you will not regret it!!",
      name: "coderunfun",
      context: "Sold Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2024-06-24",
      source: "Zillow",
    },
    {
      quote:
        "Becca has helped us buy four rental properties and sell one. We have found her to be knowledgeable, effective and tenacious in representing us. She is very familiar with the multiple listing contract forms and very efficient in tailoring contracts to our needs and circumstances. She also has been very helpful in finding solutions when problems arose.",
      name: "Jan Pauw",
      context: "Bought and sold Multiple Occupancy",
      location: "Sumner, WA",
      rating: 5,
      date: "2023-10-16",
      source: "Zillow",
    },
    {
      quote:
        "This is the second time we have worked with Becca for our real estate needs. We have now worked with her both while looking for our dream home (10 years ago) and now selling a home for an aging parent who needed additional care. Both times we were in good hands. Becca was always available for the endless questions we had and very responsive. She is extremely knowledgeable in the field and was helpful with decisions regarding prepping for listing, staging, pricing, negotiations, repairs, and closing. Becca was helpful, a good problem solver, compassionate, hard working, honest, confident, and always has a smile and a fun sense of humor. We are greatful for our wonderful experience with Becca who made the stressfulness of selling a home, a positive experience. Thank you Becca!",
      name: "Jen Schumacher",
      rating: 5,
      date: "2023-10-05",
      source: "Google",
    },
    {
      quote:
        "Becca is ridiculously smart and was able to navigate an extremely challenging purchase on a property we recently made. Her sense of humor and tenacity kept us laughing as we slowly rolled across the finish line. She had amazing knowledge of the area and knew just how to compare properties to help us negotiate a fair deal. We love our property! I highly recommend Becca Pitts to anyone purchasing a home.",
      name: "Jamie Van Eaton",
      context: "Bought home",
      location: "Fall City, WA",
      rating: 5,
      date: "2023-09-03",
      source: "Zillow",
    },
    {
      quote:
        "Becca is absolutely awesome. Her and her team are so fast to respond very knowledgeable about the area and can save you a lot of time and headache when it comes to what you want. We were looking at raw property and houses at the same time and she drove all over the king and pierce County areas finding us a home. This is the third house we have bought and in my experience she is the first realtor I have really enjoyed working with! I can't imagine trying to work with another realtor. We will be recommending her team to anyone who asks and giving her our business (If we need it, we got exactly what we wanted and don't think we will have a need to move anytime soon)! Thanks Becca you are awesome!",
      name: "Russell Wells",
      rating: 5,
      date: "2023-08-29",
      source: "Google",
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
        "Becca sold my father's home under some very trying circumstances. She professionally handled unexpected adversity, delays which she had no control over and a drawn out exchange of ownership. She went well above and beyond what my expectations were. I wholeheartedly recommend her expertise with no hesitation.",
      name: "Carl",
      rating: 5,
      date: "2022-08-06",
      source: "Google",
    },
    {
      quote:
        "This market is tough for a buyer, and especially so if you’re like me, a first-time buyer with particular home requirements and a hard limit on resources. By the time Becca was recommended to me, I was tired of searching and feeling a bit under supported from my agents. Immediately, Becca was a whirlwind of positive energy that helped me get the excitement back that I needed. She listened (and heard), put in the work, talked me through the process bits, and generally made me feel like she was on my team, even when things didn’t go our way. Becca has a way of going to bat for her clients and still holding herself and others to a high standard of integrity and ethics, which was important to me and hard to find in this market. I got a home that meets all of my requirements and that I absolutely love because of the relationships and respect that Becca has fostered in the real estate world, and I will always have gratitude for her role in the rollercoaster process of buying my first home!",
      name: "Bryanna Michele",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2021-08-15",
      source: "Zillow",
    },
    {
      quote:
        "Where do I start? Being a buyer in this market is tough. We were referred to Becca after almost a year of striking out on EVERYTHING. She stepped into a difficult situation with confidence, knowledge, attentiveness and a kindness we so desperately needed. She walked us through an unusual deal while we were living out of state, going above and beyond at every step (literally every step). Her level of professionalism and knowledge of the market is unmatched, as well as her ability to put you at ease and hear you like an old friend. We knew right away Becca was next level. I recommend her to anyone who will listen. Thank you for holding our hands and making our buying process a win for everyone involved.",
      name: "Sarah York",
      rating: 5,
      date: "2021-08-15",
      source: "Google",
    },
    {
      quote:
        "Becca was awesome to work with. She is very knowledgeable with a chill attitude that helped lessen any anxieties we were feeling through the home buying and selling process.",
      name: "Sara Appudoray",
      context: "Bought and sold Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2021-08-07",
      source: "Zillow",
    },
    {
      quote:
        "Becca went ABOVE AND BEYOND to help us into our home. We have had other agents in the past and no one has come close to the level of Becca!! She made the process easy for us and was always available to answer our questions. We would 1,000 percent recommend Becca to not only our nearest and dearest but to complete strangers. Thanks Becca for making our dreams a reality!!",
      name: "vdn4yf8ct2",
      context: "Bought Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2021-07-30",
      source: "Zillow",
    },
    {
      quote:
        "I would recommend Becca to ANYONE who is looking to buy or sell a home! Becca was not only professional and hard-working, but she really cared about making sure my family ended up with the right home for us. She was diligent and patient and available to answer any and all questions I had. She eased my stress, was flexible and supportive, and really cared about us more than anything in the homebuying process. What I appreciated most (other than knowing she really cared about us) was how HONEST she was. She didn't put any veils over my eyes our sugar-coat anything; she was realistic and proactive and made sure that we had everything we needed. I am eternally grateful for Becca and her team, and I am a customer (and now friend!) for life!",
      name: "Alicia Torrez",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2021-01-11",
      source: "Zillow",
    },
    {
      quote:
        "Becca was a pleasure to work with. She is professional and responsive. She was an excellent partner during the home buying process. I couldn't expect more. I would 100% work with her again in the future.",
      name: "Brendan Dudley",
      context: "Bought Single Family",
      location: "Bremerton, WA",
      rating: 5,
      date: "2020-07-30",
      source: "Zillow",
    },
    {
      quote:
        "We nervously met Becca for coffee in January to see if she could help us buy our first home and we were sold on her...she is professional, fun, motivating and she had a plan for us of when we *will* move into a house. We had a deadline looming because of when our apartment lease would expire and our first baby's due date. In the next two months, Becca became our daily guide and cheerleader, sending us possibilities, adjusting her schedule to our two full time jobs to help us look at places, cheering us up when we didn't get some houses, and becoming a great new friend and mentor to us. Finally, she helped us win a lovely home that we absolutely adore! And right on time, too!! It's been three weeks and we pinch ourselves every morning when we wake up in this quiet, beautiful, spacious and bright house. We cannot thank and recommend her enough! Thank You again, Becca! :) -Sam and Hilli",
      name: "Hillina Hanes",
      rating: 5,
      date: "2020-03-23",
      source: "Google",
    },
    {
      quote:
        "Working with Becca on selling my home was a breeze. She was there during every step of the process, setting realistic expectations and clearly communicating every piece of the puzzle. It was so nice to have someone I knew I could trust during what can be a very stressful time! I'd enthusiastically recommend her to anyone!",
      name: "Autumn Starr",
      context: "Sold Single Family",
      location: "Covington, WA",
      rating: 5,
      date: "2020-03-12",
      source: "Zillow",
    },
    {
      quote:
        "We couldn't be more pleased with having Becca being a part of our team during such a life change process. She was always very responsive and saw hazards before realized, and w/ her experience already had potential solutions in mind. She was creative with roadblocks, developed great rapport w/ anyone we needed to align with, and did it all with a positive grace. Becca was absolutely fantastic to work with, and we will definitely tapping her shoulder in the future again if the need arises.",
      name: "Burke Dalpez",
      rating: 5,
      date: "2020-03-02",
      source: "Google",
    },
    {
      quote:
        "She answered all my questions, made all the time in the world to make sure I understood the process as well as the how’s and why’s - she was with me every step of the way and I couldn’t imagine having anyone better in my side through this process.",
      name: "Julie",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2020-02-28",
      source: "Zillow",
    },
    {
      quote:
        "A chain of friends referred us to Becca, and for that I'm thankful. She was an amazing person to have in our corner when buying our first home. She was with us every step of the way and made herself available at a moment's notice when time was of the essence. She never skipped beat with all of our paperwork requirements, and was thorough with communicating all of our requests and needs to both the seller and lender. We greatly valued her opinion because she can foresee possible outcomes of big decisions and help zero in on the best strategy. On top of all that, she was a joy to work with and very approachable. I will recommend Becca to anyone I know buying a house in the region.",
      name: "joose206",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2020-02-13",
      source: "Zillow",
    },
    {
      quote:
        "When we first contacted Becca, we weren’t even sure if we would be able to buy a house, and had absolutely no idea how the process even worked and she was amazing from the get go! Came to our house (we had a small baby) and explain every step of the way. She even helped us find a loan agent that we also loved. We ended up buying a house we absolute adore and she was essential in helping us closing the deal, giving us her honest opinions along the way and being always available through the whole process. Becca, went above and beyond to make sure we got the best experience out of this and kept being amazing and thoughtful even after we were already settled at the new house. We were so happy we referred Becca to our friends and they were also very happy with the experience. If you’re looking for an agent, this is the one!",
      name: "Patricia Albuquerque",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2020-01-13",
      source: "Zillow",
    },
    {
      quote:
        "We had an exceptional experience working with Becca purchasing our first home. She was responsive, proactive, professional and a joy to work with. I recommend her to my own friends and family!",
      name: "user2186870",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2020-01-13",
      source: "Zillow",
    },
    {
      quote:
        "We were first time home buyers and Becca was truly wonderful to work with. She was so patient with us and explained things every step of the way. She made the process of buying our first home SO much less stressful. Becca did a great job of listening to our wants, needs, concerns, etc., and made sure to help us find exactly the type of home we were looking for. She was also incredibly responsive and was always just a phone call or text message away. Becca is awesome at what she does!",
      name: "zuser20150105142216044",
      context: "Bought Single Family",
      location: "Graham, WA",
      rating: 5,
      date: "2018-06-19",
      source: "Zillow",
    },
    {
      quote:
        "I highly recommend Becca for the selling or buying of your home. She assisted us with both the sale of our old home and the purchase of our new home (new construction). Becca is very honest, detailed, and informed about the process of buying and selling. She took care of, or informed us on many things that were outside our scope of knowledge. This was our first time selling a home, and our first time buying a newly constructed home, so we had many questions/concerns, but she was always there to answer questions, give advice, and offer reassurance/support. A+++!",
      name: "zuser20170428073515293",
      context: "Sold Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2018-05-03",
      source: "Zillow",
    },
    {
      quote:
        "My husband and I were first-time homebuyers this year and had a million questions about the home purchasing process. Becca was phenomenal to work with and seamlessly guided us through it all! She was quick, efficient, and returned calls and emails promptly. For future home sale or purchase, we will absolutely work with Becca again! Thank you, thank you!",
      name: "zuser20150207111443494",
      context: "Bought Condo",
      location: "Bothell, WA",
      rating: 5,
      date: "2017-11-18",
      source: "Zillow",
    },
    {
      quote:
        "Becca Iverson is wonderful!!! I would recommend her for all your needs on buying a home. I am a first-time home buyer and she was there every time we needed to look at a house. When we finally got our home we love! The house appraised under. Becca played Hardball and got previous owner to drop the price ALOT!!!! It would be in your best interest to work with Becca. I will always have Becca work with us! Thank you Becca from the bottom of our heart !!",
      name: "symakk",
      context: "Bought Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2017-05-08",
      source: "Zillow",
    },
    {
      quote:
        "Becca is absolutely amazing! Our team has done several transactions with her and she has made each one of them completely effortless. She is always professional and her customer service is far superior than the average real estate agent. We have witnessed her go above and beyond for her clients and colleagues on a regular basis. You can tell that Becca really has a heart for this business. She keeps the fun in real estate while simultaneously showing how knowledgeable she is about the industry. I will ALWAYS highly recommend Becca to my friends and family. 10 Stars for you Ms. Iverson!!!",
      name: "Leah West",
      context: "Bought and sold home",
      location: "Tacoma, WA",
      rating: 5,
      date: "2017-05-03",
      source: "Zillow",
    },
    {
      quote:
        "We had received Becca's name from a very good friend at church, not knowing that she was the niece of this friend. I am so glad that I had asked my friend to recommend someone. Becca was absolutely fabulous. She responded immediately to every question we had. She was very informative on the processes that we had to go through. We used her talents with both selling our log home, and then purchasing our new home in town. When you are selling one home, and buying another home at the same time, the details can get complicated. But Becca kept us straight, and we couldn't have done it without her.",
      name: "user17717706",
      context: "Bought and sold Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2017-04-29",
      source: "Zillow",
    },
    {
      quote:
        "Becca is amazing! She is very skilled in her field and gets things done quickly and professionally. She sold our last home and helped us buy our new home. I would recommend her to everyone I know who is looking for a great home buying experience!!",
      name: "firefightress3",
      context: "Bought and sold Single Family",
      location: "Roslyn, WA",
      rating: 5,
      date: "2017-04-29",
      source: "Zillow",
    },
    {
      quote:
        "If you want a real estate agent that will go above and beyond expectations, Becca is the agent for you! When we were finally ready to buy, my wife and I were overwhelmed with emotions and a little fear. Becca put all those fears to rest immediately, and made us feel more like family than buyers. She was always on top of the ball, and really quick to respond to any questions we had, or houses that we wanted to go see! She is BEYOND amazing and I highly recommend her when your considering buying or selling! She is the only one we will ever use!",
      name: "girardy23",
      context: "Bought home",
      location: "Gig Harbor, WA",
      rating: 5,
      date: "2017-04-26",
      source: "Zillow",
    },
    {
      quote:
        "Very responsive, patient and always made time for last minute scheduling. Becca was very easy to work with and I hope to continue to work with her for future purchases.",
      name: "jojoyoung21",
      context: "Bought and sold Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2017-01-04",
      source: "Zillow",
    },
    {
      quote:
        "Becca is THE 'woman'! We recently became homeless after deciding to put our house up for sale in AZ and getting an offer sooner than expected. So, off to Washington on a last minute trip to find a house, and we were lucky enough to have been handed to Becca! We had 3 days to get it done, and she spent almost every waking moment showing us houses. It was exhausting! We put her through the ringer with our demands, BUT, through it all, she remained happy, kept us on track, and kept us entertained! Also, due to her local knowledge, she was able to keep us from making a huge mistake of buying in the wrong area (which we thought we were set on). And when the time came to put an offer in, she was the advocate we needed. We almost got into a bidding war, but due to her knowledge, expertise and experience, she beat our competitor and prevented us from paying a dollar more then we had to! Then, since we had to go back to Phoenix to finalize things, she stood in our place during the inspection to make sure we were getting a solid deal. What could have turned into a miserable experience due to our time crunch and circumstances, ended up being a great one because of her!...and now we're lucky enough to have gained a new friend!",
      name: "Leland Brechbiel",
      context: "Bought Single Family",
      location: "Auburn, WA",
      rating: 5,
      date: "2016-07-30",
      source: "Zillow",
    },
    {
      quote:
        "Becca is one of the hardest working people I have ever met. She goes the extra mile for you and will not rest until every detail is taken care of. Becca also helped my sister buy her first house and did a great job finding the perfect home and making the process as seamless as possible.",
      name: "tashat9",
      context: "Showed home",
      location: "Puyallup, WA",
      rating: 5,
      date: "2016-07-27",
      source: "Zillow",
    },
    {
      quote:
        "Very knowledgeable, easy to work with, hardworking, and great communicator. We are very happy with our experience and will continue to work with Becca for all our real estate needs.",
      name: "user3550574",
      context: "Showed home",
      location: "Tacoma, WA",
      rating: 5,
      date: "2016-07-27",
      source: "Zillow",
    },
    {
      quote:
        "Becca did a wonderful job helping prepare and sell mother's house. She had many suggestions on what to improve and what would not matter when selling our parents house. Couldn't have done it without her",
      name: "pgc76359",
      context: "Sold home",
      location: "Shoreline, WA",
      rating: 5,
      date: "2016-07-27",
      source: "Zillow",
    },
    {
      quote:
        "Becca was always responsive and available whenever we called, emailed or text her. She is very knowledgeable in her field and helped us through what could only be described as a nightmare sale, always on top of everything. We also used her to buy our new home which was thankfully not a nightmare but when there were a few bumps Becca was there to smooth it all out. I would recommend Becca to anyone needing a good realtor!",
      name: "matt p ollie",
      context: "Bought and sold home",
      location: "Renton, WA",
      rating: 5,
      date: "2016-07-22",
      source: "Zillow",
    },
    {
      quote:
        "I was impressed with Beeca from our very first meeting. Initially, I hired her because she actually answered her phone on a Saturday afternoon. We scheduled a meeting right away and she came prepared with research and facts about the housing market in my area. I was new to the selling process and would soon be relocating. From the beginning, she gave me solid advice for getting my home on the market quickly at a price that was competitive, yet priced to move. Move it did. I had a fantastic offer within three days of listing the property. The offer was even higher than asking price. Becca was responsive and available whenever I had a question. She is a straight-shooter whose word I came to trust as well as rely upon. Due to my change of circumstances, most of our interactions took place online. However, the quality of the experience was never compromised. No doubt I will work with Becca again when I am ready to purchase another property.",
      name: "Liw2",
      context: "Sold home",
      location: "Spanaway, WA",
      rating: 5,
      date: "2016-05-24",
      source: "Zillow",
    },
    {
      quote:
        "I have used other agents in the past and never really had the experience I was hoping for. Becca was amazingly refreshing from the start. I buy and sell multiple properties in a year and she gets back to me ridiculously quick on everything I request. In a market changing as quickly as the greater Seattle area it is important to have an agent as competent as Becca is. You will be happy you chose her because she is a true professional!",
      name: "championsand12",
      context: "Bought and sold Single Family",
      location: "Kent, WA",
      rating: 5,
      date: "2016-04-17",
      source: "Zillow",
    },
    {
      quote:
        "Becca, is amazing at what she does, she is easy to get a hold of, friendly, knowledgeable, great follow through. You feel like you are the only client she is working with, she gives you all the time you need. she is very professional and I will be using her in the future and you should too!",
      name: "Rachel030",
      context: "Bought Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2015-12-02",
      source: "Zillow",
    },
    {
      quote:
        "Becca did a great job negotiating the purchase of my new house and gave me great advice! She went out of her way (literally - from Tacoma to Port Ludlow) to not only show the house I bought to me, but to my family (2nd time). Highly recommend her.",
      name: "Tracey Kellogg",
      context: "Bought Single Family",
      location: "Port Ludlow, WA",
      rating: 5,
      date: "2015-08-31",
      source: "Zillow",
    },
    {
      quote:
        "Becca was great to work with. Very knowledgeable and great at explaining things. She worked with my schedule to show me houses as soon as possible. She was very patient and never pressured me. When I liked a house she was great about going after it quickly and fiercely. I love my new home, and without her fast response time I might not have it.",
      name: "petra 67",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2015-08-28",
      source: "Zillow",
    },
    {
      quote:
        "My experience with my Becca was absolutely fantastic. I had the opportunity to meet with her at an open house almost a year ago. When my husband and I found a house that we were interested in, we called her immediately for her assistance. During the entire process Becca was extremely responsive and negotiated on our behalf extremely well. We had a couple of snags in closing the house (NOTHING related to Becca) and she was there for us to assist us and negotiate for us the entire time. She was a real advocate and we really appreciate it. We were impressed with her skills, knowledge, work ethic and quick responsiveness and I have recommended her to everybody I know because I truly do not think you can find a better or more qualified agent!!!",
      name: "melindahansen7",
      context: "Bought Single Family",
      location: "Gig Harbor, WA",
      rating: 5,
      date: "2015-08-27",
      source: "Zillow",
    },
    {
      quote:
        "Becca was amazing. Always there when I needed her and did her best to meet me when I wanted to see a house on super short notice! Gave a lot if great insights, walked me through the whole process, and helped me find a great house that is perfect for me.",
      name: "user1496408",
      context: "Bought Single Family",
      location: "Puyallup, WA",
      rating: 5,
      date: "2015-04-04",
      source: "Zillow",
    },
    {
      quote:
        "Becca Iverson was hands down the right real estate agent for me. Becca quickly grasped what I was looking for in a home, and was remarkably responsive to my questions and concerns. I really appreciated her honesty, and she made certain that I found the right home in the right price-range. Becca was also incredibly persistent on my behalf, and helped make everything fall into place as quickly as possible. I highly recommend her.",
      name: "Bethany Schmidt",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 5,
      date: "2015-04-03",
      source: "Zillow",
    },
    {
      quote:
        "Sometimes in life you come across people that you trust and communicate with like you have known them for years..In my case never met her not even after closing on the house as i am still overseas. However, just how she made it work as if she was buying a house for herself while taking care of all the requirements that i had set out..i am really impressed with the work ethic, propmtness especially when she realized i was working this while deployed overseas. All in all a blessing to have a realtor who could be my eyes and ears all along the way on this..thanks Becca for making this happen and will be working with you again in future for sure...hang on to my keys till i am back..",
      name: "Arvind Sharma",
      context: "Bought Townhouse",
      location: "Tacoma, WA",
      rating: 5,
      date: "2015-04-03",
      source: "Zillow",
    },
    {
      quote:
        "Becca is such a go-getter! We were very impressed with her on all levels. She is a very knowledgeable real estate agent and we highly recommend her to anyone. She saw our family through a very difficult home buying transaction and throughout the entire process she was an effective leader, never gave up, and sucessfully saw us through to the end. She was fantastic to work with!",
      name: "user6601231",
      context: "Bought Single Family",
      location: "Gig Harbor, WA",
      rating: 5,
      date: "2015-04-02",
      source: "Zillow",
    },
    {
      quote:
        "My home buying process was pretty easy. From others I’ve talked to, I think a big portion of that was due to the agent I used. She linked me up with a great lender that got me pre-approved within a day and then when we went out to look at homes, every single one of them were within my criteria I sent forth. I found ‘the house’ the first day out. I have been in it for almost a year now; and I am loving my new home. Granted Becca IS my sister, but…she knows her stuff. -Iverson",
      name: "user7088909",
      context: "Bought Single Family",
      location: "Tacoma, WA",
      rating: 4,
      date: "2015-04-02",
      source: "Zillow",
    },
    {
      quote:
        "Becca Iverson is a great person and a true professional. She took the reigns when our other agent had family matters to attend to and helped us negotiate a great deal on our dream home. Throughout the entire process she was available to answer any questions or concerns we had. We truly appreciate her stepping in when we needed someone the most. I would gladly refer anyone I know to Becca.",
      name: "Eric Brown",
      context: "Bought home",
      location: "Washington",
      rating: 5,
      date: "2015-01-15",
      source: "Zillow",
    },
    {
      quote:
        "I had the greatest experience with Becca. My wife and I just bought our first house, and were pretty nervous about what we were getting into. Becca was super helpful with any questions we had, and when she didn't know the answer, usually could quickly direct us to someone who did. She also really went to bat for us when we had some disputes with the sellers about some work that we wanted done before the sale went through. My wife and I love our new home, and Becca has been in touch to make sure we're happy and ready to help us with a recommendation for any work we need or want done. I'm completely satisfied with my experience, and would gladly direct any friends who were in the market to her door.",
      name: "Dave Brouillette",
      context: "Bought home",
      location: "Tacoma, WA",
      rating: 5,
      date: "2014-12-12",
      source: "Zillow",
    },
    {
      quote:
        "We purchased our home from out of state and made initial contact with Becca via the internet. She was really helpful and accommodating before we had committed to anything. Once we travelled to the area to view homes, she had everything set up and organized and made the trip(s) both enjoyable and productive. She was responsive and very knowledgeable and we were thoroughly pleased. She was a pleasure to work with and made a stressful process a lot easier. We'll definitely work with her in the future.",
      name: "denise t m",
      context: "Bought home",
      location: "Washington",
      rating: 5,
      date: "2014-11-28",
      source: "Zillow",
    },
    {
      quote:
        'My husband and I worked with Becca in buying our first home and we had to go through 8 Realtors to get to the best one! She was very patient in showing us many homes as when we would drive around looking at different houses our kids would fall asleep and she was more than happy to show usa house twice...because one of us had to stay in the car with our kiddos! She also is considerate that when showing a VA home loan client different properties there are strict requirements to be approved by a VA appraiser and everytime an issue came up with the house and we couldn\'t close she was immediately back to looking at houses for us. So don\'t choose a realtor that wants to pressure you into buying any home to make money off a sale, which we have encountered alot. Choose a friend who will be there for you and guide you through the process of not purchasing a house but purchasing a "HOME" that is right for you and your family to start making endless memories for years to come! So what are you waiting for the longer you wait your "Dream Home" is waiting somewhere out there for her to show it to you!',
      name: "Lesheana Acfalle",
      context: "Bought home",
      location: "Tacoma, WA",
      rating: 5,
      date: "2014-11-25",
      source: "Zillow",
    },
    {
      quote:
        "Becca Iverson made buying our first home a wonderful experience. She was available any time we had questions and was able to work with our crazy schedule to view homes. She was able to explain the home buying process in a way that we understood it and felt comfortable with it. My husband and I had met with several Realtors before choosing Becca and I am happy we looked around and found someone that knew what she was doing and what would work for us.",
      name: "laurensmith014",
      context: "Bought home",
      location: "Spanaway, WA",
      rating: 5,
      date: "2014-11-24",
      source: "Zillow",
    },
    {
      quote:
        "Becca was so helpful in helping me purchase my first home. She was able to meet me at times that were convenient to my schedule and was always available by phone when I needed her. She was even able to recommend a lending agency that was way more helpful and expedient than the one I originally started with. I would highly recommend Becca if you are planning on purchasing a home any time soon, she is so personable and caring and really makes the buying experience a great one.",
      name: "adidas 769",
      context: "Bought Single Family",
      location: "Carbonado, WA",
      rating: 5,
      date: "2014-11-24",
      source: "Zillow",
    },
    {
      quote:
        "My husband and I used Becca as our buying agent to purchase our home in Gig Harbor. We started our home search in July and looked at house after house not finding the right one. Becca was super patient with us, very flexible, and was always available to show us the next batch of new listings. After 5 months of searching we found our dream home. Becca found it and encouraged us to check it out. We made an offer and our offer was accepted. We were thrilled. We found Becca to be very a diligent, hardworking, and confident agent. She maintained a good relationship with the seller's agent and advised us in negotiating and even got a riding lawn mower out of the deal! Becca was an essential role in finding us the home of our dreams.",
      name: "henuno",
      context: "Bought Single Family",
      location: "Gig Harbor, WA",
      rating: 5,
      date: "2014-11-24",
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
      title: "Buying your first home in the Puget Sound",
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
      title: "Relocating to Western Washington",
      description:
        "You're moving to Washington from somewhere else entirely, so you need someone standing on the ground here. I'll tour homes on video with you, tell you the truth about the commute from wherever you're considering, and hand you off to an agent I trust to sell where you are now.",
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

  // Market numbers below are the figures Becca supplied on 2026-08-21. Medians,
  // days on market, and year-over-year moves age fast, so refresh them from the
  // NWMLS county report rather than editing them one at a time.
  neighborhoods: [
    {
      slug: "bonney-lake",
      name: "Bonney Lake",
      region: "primary",
      median: "$640K",
      zip: "98391",
      commute: "40 minutes to Tacoma",
      tagline: "Home base, and the market I know street by street",
      description:
        "This is where I live and where most of my closings happen. The median sits around $640K, prices are flat year over year, and homes are going pending in about three weeks, so it's a steady market rather than a frantic one.",
      highlights: [
        "Median sale price around $640,000",
        "About 22 days on market, so you have room to think before you write",
        "Prices flat year over year, which usually means a fair negotiation on both sides",
        "Lake Tapps, plateau views, and a straight shot to Highway 410",
        "I live here, so I can tell you which streets flood and which ones don't",
      ],
    },
    {
      slug: "puyallup",
      name: "Puyallup",
      region: "primary",
      median: "$575K",
      zip: "98371",
      commute: "17 minutes to Tacoma",
      tagline: "Seventeen minutes to Tacoma, and pockets that price differently",
      description:
        "The median runs about $575K, and days on market swing anywhere from 21 to 43 depending on the pocket and the school boundary you land in. That spread is the whole story here, so a citywide average tells you almost nothing about your actual street.",
      highlights: [
        "Median sale price around $575,000",
        "21 to 43 days on market depending on the pocket",
        "About 17 minutes to Tacoma, which is the shortest commute I work",
        "School district boundaries move resale value more than square footage does",
        "South Hill, downtown, and the valley behave like three separate markets",
      ],
    },
    {
      // Slug stays "tacoma" so existing links and the sitemap keep working. The
      // name is North Tacoma because that is the sub-market Becca actually
      // works and the area the rest of the site names.
      slug: "tacoma",
      name: "North Tacoma",
      region: "primary",
      median: "$630K",
      zip: "98406",
      commute: "City center",
      tagline: "The fastest market in the county right now",
      description:
        "Homes here are going pending in about a week at a median near $630K, roughly $363 a square foot. With a compete score in the high 80s to low 90s, you need your financing buttoned up before we tour, not after.",
      highlights: [
        "Median sale price around $630,000",
        "About 7 days on market, the tightest timeline of anywhere I work",
        "Roughly $363 per square foot",
        "Compete score of 88 to 91, so expect company on the good ones",
        "Two blocks a quarter mile apart can price very differently, and I can tell you why",
      ],
    },
    {
      slug: "gig-harbor",
      name: "Gig Harbor",
      region: "primary",
      median: "$835K",
      zip: "98335",
      commute: "20 minutes to Tacoma",
      tagline: "The priciest market I work, and it's still climbing",
      description:
        "The median is around $835K and up 6.5% year over year, so Gig Harbor sits at the top of my range and it isn't slowing down. Water views and the bridge toll both show up in the price, and I'll tell you honestly which one you're really paying for.",
      highlights: [
        "Median sale price around $835,000",
        "Up 6.5% year over year, the strongest appreciation in my areas",
        "About 20 minutes to Tacoma, plus the Narrows Bridge toll",
        "Waterfront and view premiums are real, and they are not all equal",
        "Bring a lender who has actually closed a jumbo loan",
      ],
    },
    {
      slug: "graham",
      name: "Graham",
      region: "primary",
      median: "$570K",
      zip: "98338",
      commute: "30 minutes to Tacoma",
      tagline: "Acreage without the Eatonville drive",
      description:
        "The median runs about $570K, and Graham is where a lot of my buyers land when they want some land but still need to be close to Puyallup and the 512. Well and septic are the norm out here, so the inspection list looks different than it does in town.",
      highlights: [
        "Median sale price around $570,000",
        "About 30 minutes to Tacoma and much less to Puyallup",
        "Larger lots and acreage parcels are common",
        "Most homes are on well and septic, which changes the inspection entirely",
        "A good middle ground between town prices and true rural",
      ],
    },
    {
      slug: "eatonville",
      name: "Eatonville",
      region: "primary",
      median: "$550K",
      zip: "98328",
      commute: "50 minutes to Tacoma",
      tagline: "Where I grew up, and the gateway to Rainier",
      description:
        "A median around $550K out here buys you land and quiet plus a straight shot to the mountain. I grew up in Eatonville, so I can tell you which roads get rough in winter and which parcels will actually pass a perc test.",
      highlights: [
        "Median sale price around $550,000",
        "Genuinely rural, with acreage and outbuildings on plenty of listings",
        "The gateway to Mount Rainier National Park",
        "About 50 minutes to Tacoma, so the commute is the trade-off",
        "I grew up here, which is the kind of local knowledge you can't get from a map",
      ],
    },
    {
      slug: "roy",
      name: "Roy",
      region: "extended",
      median: "$500K",
      zip: "98580",
      // TODO Becca verify the drive time; the rest of this entry is her data.
      commute: "35 minutes to Tacoma",
      tagline: "The most affordable way into Pierce County",
      description:
        "At a median near $500K, Roy is the lowest entry point of anywhere I work. It's small and it's rural, so plan on driving, but if the budget is the constraint this is where the numbers still work.",
      highlights: [
        "Median sale price around $500,000, the most affordable in my areas",
        "The entry point I send budget-conscious first-time buyers to look at first",
        "Small-town and rural, with acreage available",
        "About 35 minutes to Tacoma, longer in commute traffic",
        "Well, septic, and outbuildings are common, so budget for a thorough inspection",
      ],
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
      median: "$665K",
      zip: "98391",
      commute: "40 minutes to Tacoma",
      tagline: "New construction on the Bonney Lake plateau",
      description:
        "Tehaleh is the master-planned side of Bonney Lake, and it's the one pocket up here still climbing: a median near $665K, up 2.8% year over year on new construction demand. Builder incentives change month to month, so know exactly what you're comparing before you sign anything.",
      highlights: [
        "Median sale price around $665,000",
        "Up 2.8% year over year, driven by new construction demand",
        "Master-planned community inside Bonney Lake, sharing the 98391 ZIP",
        "Trails, parks, and an HOA, so ask me what the dues actually cover",
        "Builder contracts are not the standard purchase and sale form, and that matters",
      ],
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

  demo: { noIndex: true },
};

/**
 * Canonical https origin for the brand, with no trailing slash.
 * `resolveSiteUrl()` in site.config.ts falls back to this when
 * NEXT_PUBLIC_SITE_URL is unset, so previews and production agree on one host.
 */
export function brandUrl() {
  return `https://${tenant.brand.domain}`;
}

export function resolveListings() {
  return {
    iframeUrl: process.env.NEXT_PUBLIC_BOLDTRAIL_IFRAME_URL || tenant.listings.iframeUrl,
    searchUrl: process.env.NEXT_PUBLIC_BOLDTRAIL_SEARCH_URL || tenant.listings.searchUrl,
    widgetScriptUrl:
      process.env.NEXT_PUBLIC_BOLDTRAIL_WIDGET_URL || tenant.listings.widgetScriptUrl,
    leadWebhookUrl: process.env.BOLDTRAIL_LEAD_WEBHOOK_URL || tenant.listings.leadWebhookUrl,
  };
}
