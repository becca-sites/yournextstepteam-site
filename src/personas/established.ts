import type { Persona } from "./types";

export const established: Persona = {
  key: "established",
  eyebrow: "Local. Experienced. Available.",
  heroHeadline: "Your next step starts here.",
  heroSubhead:
    "{{yearsOfExperience}} years helping families across {{primaryCity}} and the surrounding market find homes that fit.",
  aboutFraming:
    "Years of working the same market means I know the streets, the schools, the listing agents, and the patterns that don't show up in the data. That depth gets passed on to every client.",
  stats: [
    { value: "{{yearsOfExperience}}+", label: "Years in the market" },
    { value: "{{closingsToDate}}+", label: "Closings to date" },
    { value: "5★", label: "Client rating" },
    { value: "24 hr", label: "Average response time" },
  ],
  scenarios: [
    {
      title: "Selling your home",
      description:
        "Pricing strategy and prep checklist tuned to {{primaryCity}}'s actual buyer pool.",
      href: "/sellers",
    },
    {
      title: "Buying in {{primaryCity}}",
      description:
        "From first tour to closing day, the process is the same: clear, calm, prepared.",
      href: "/buyers",
    },
    {
      title: "Exploring neighborhoods",
      description:
        "Browse the guides, or call for the unvarnished take on which streets actually fit what you're looking for.",
      href: "/neighborhoods",
    },
  ],
  primaryCta: { label: "Schedule a call", href: "/contact" },
  secondaryCta: { label: "See listings", href: "/listings" },
  finalCtaHeadline: "Ready when you are",
  finalCtaSubhead:
    "No pressure, no pitch. A 20-minute conversation about what you're working on.",
  testimonials: true,
  visualOverrides: {
    primary: "#1a1a1a",
    secondary: "#d4af37",
    accent: "#cccccc",
  },
};
