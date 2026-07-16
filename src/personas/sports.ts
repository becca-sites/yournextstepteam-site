import type { Persona } from "./types";

export const sports: Persona = {
  key: "sports",
  eyebrow: "Built for athletes and their families",
  heroHeadline: "From the locker room to the closing table.",
  heroSubhead:
    "Real estate representation for athletes and their families across {{primaryCity}} and beyond. Privacy-first, schedule-aware, family-coordinated.",
  aboutFraming:
    "Built for the moments when contracts move you, when families travel for the season, when a quick closing matters more than a slow market. Working alongside eXp Sports gives you a national network with local fluency in every market.",
  stats: [
    { value: "10+", label: "Pro client families" },
    { value: "48 hr", label: "Close-of-business turnaround" },
    { value: "100%", label: "NDA on request" },
    { value: "All 50", label: "States with eXp coverage" },
  ],
  scenarios: [
    {
      title: "Buying near a training facility",
      description:
        "Proximity to the practice facility, schools for the family, privacy from the public. We'll map all three before you see a single home.",
      href: "/buyers",
    },
    {
      title: "Selling fast at season's end",
      description:
        "Listing strategy for a tight timeline. Pricing tuned to actually transact, not just attract attention.",
      href: "/sellers",
    },
    {
      title: "Multi-city portfolio support",
      description:
        "Coordination across markets when training, family, and tax residence sit in different places.",
      href: "/contact",
    },
  ],
  primaryCta: { label: "Set up an intro call", href: "/contact" },
  secondaryCta: { label: "Browse the area", href: "/listings" },
  finalCtaHeadline: "We handle the moves so you can handle yours",
  finalCtaSubhead:
    "Privacy-respected, family-centered, schedule-aware. Reach out and we'll structure the process around your year.",
  testimonials: "team-backed",
  visualOverrides: {
    primary: "#0d2538",
    secondary: "#d4a017",
    accent: "#3a5169",
  },
};
