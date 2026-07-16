import type { Persona } from "./types";

export const luxury: Persona = {
  key: "luxury",
  eyebrow: "Discreet representation",
  heroHeadline: "Discretion. Expertise. Results.",
  heroSubhead:
    "Representing buyers and sellers of distinguished homes across {{primaryCity}} and the surrounding market.",
  aboutFraming:
    "Quiet, deliberate work for clients who value confidentiality and a long track record. Every transaction handled personally, with the network and resources of eXp Luxury behind it.",
  stats: [
    { value: "$50M+", label: "Lifetime volume" },
    { value: "100%", label: "Off-market access" },
    { value: "30+", label: "Luxury closings" },
    { value: "1:1", label: "Client ratio" },
  ],
  scenarios: [
    {
      title: "Selling a distinguished home",
      description:
        "Pricing strategy, off-market reach, and a marketing approach calibrated to the buyer who can actually transact.",
      href: "/sellers",
    },
    {
      title: "Acquiring a primary or second home",
      description:
        "Quiet inventory access, curated tours, and the network to surface opportunities before they hit public search.",
      href: "/buyers",
    },
    {
      title: "Relocating from another market",
      description:
        "Coordinated handoff with your existing advisors. Concierge introductions to schools, clubs, and trusted local services.",
      href: "/contact",
    },
  ],
  primaryCta: { label: "Schedule a private consultation", href: "/contact" },
  secondaryCta: { label: "View representative work", href: "/listings" },
  finalCtaHeadline: "A quiet conversation, on your timeline",
  finalCtaSubhead:
    "Whether you're exploring an off-market sale or considering a move, the conversation stays between us.",
  testimonials: true,
  visualOverrides: {
    primary: "#0a1f3d",
    secondary: "#c5a572",
    accent: "#1a3a5c",
    heading: "Fraunces",
  },
};
