import type { Persona } from "./types";

export const firstTimeAgent: Persona = {
  key: "first-time-agent",
  eyebrow: "Backed by a national team",
  heroHeadline: "New to real estate. Backed by a national team.",
  heroSubhead:
    "I'm partnered with {{teamName}} at eXp Realty's {{division}} division. Every client conversation comes with institutional support, lender relationships, and a team mentor on call.",
  aboutFraming:
    "Newer agents bring fresh energy and full availability. What I add to that is the depth of a national team. When you work with me, you get someone learning fast, paired with senior agents who've closed across every scenario you'll encounter.",
  stats: [
    { value: "100+", label: "Team members" },
    { value: "1,000+", label: "Team closings to date" },
    { value: "24/7", label: "Team support" },
    { value: "1", label: "Direct point of contact" },
  ],
  scenarios: [
    {
      title: "First-time buyer",
      description:
        "I'll walk you through every step, with the team's senior agents reviewing strategy at every milestone.",
      href: "/buyers",
    },
    {
      title: "First-time seller",
      description:
        "Pricing strategy, prep checklist, and marketing the team has refined across hundreds of homes.",
      href: "/sellers",
    },
    {
      title: "Just learning the market",
      description:
        "No pressure, no pitch. A 20-minute call to share what we know about your neighborhood.",
      href: "/contact",
    },
  ],
  primaryCta: { label: "Book a no-pressure intro call", href: "/contact" },
  secondaryCta: { label: "How the team works", href: "/about" },
  finalCtaHeadline: "One agent for you. A whole team behind us.",
  finalCtaSubhead:
    "Bring me your hardest questions. If I don't know the answer, I have 100 colleagues who do.",
  testimonials: "team-backed",
  visualOverrides: {
    primary: "#1a3d2e",
    secondary: "#f5b042",
    accent: "#2d5f47",
  },
};
