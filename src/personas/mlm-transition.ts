import type { Persona } from "./types";

export const mlmTransition: Persona = {
  key: "mlm-transition",
  eyebrow: "Real estate plus a network business",
  heroHeadline: "Real estate built on relationships. Multiplied through network.",
  heroSubhead:
    "I help clients buy and sell across {{primaryCity}} while building a national real estate practice through eXp's revenue-share model.",
  aboutFraming:
    "I built my last business on relationships. Real estate is the same craft with a different transaction. eXp's revenue-share structure lets me keep growing a national network while serving clients here, locally, at the highest level.",
  stats: [
    { value: "15+", label: "Years in relationship-driven business" },
    { value: "Nat'l", label: "Network reach" },
    { value: "100%", label: "Client-first transactions" },
    { value: "1", label: "Direct line for every client" },
  ],
  scenarios: [
    {
      title: "Buying in {{primaryCity}}",
      description:
        "Personal representation. Same care I bring to every relationship in my business.",
      href: "/buyers",
    },
    {
      title: "Selling in {{primaryCity}}",
      description:
        "Pricing, prep, and marketing tailored to your home. Strategy first, then the listing goes live.",
      href: "/sellers",
    },
    {
      title: "Curious about the eXp model",
      description:
        "If you're transitioning out of another business and considering real estate, let's talk about how eXp works.",
      href: "/contact",
    },
  ],
  primaryCta: { label: "Start a conversation", href: "/contact" },
  secondaryCta: { label: "About the business", href: "/about" },
  finalCtaHeadline: "Relationships first. Transactions follow.",
  finalCtaSubhead:
    "Whether you're buying, selling, or curious about building a real estate practice yourself.",
  testimonials: true,
  visualOverrides: {
    primary: "#2c1810",
    secondary: "#c9a961",
    accent: "#4a2e1f",
  },
};
