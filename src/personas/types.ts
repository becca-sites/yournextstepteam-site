import type { Stat } from "@/components/sections/StatCardRow";
import type { Scenario } from "@/components/sections/ScenarioRouter";
import type { TestimonialBehavior } from "@/components/sections/TestimonialCarousel";
import type { RealEstatePersona } from "@/site.config";

export interface Persona {
  /** Internal key matching siteConfig.persona */
  key: RealEstatePersona;

  /** Above-the-fold copy */
  eyebrow: string;
  heroHeadline: string;
  heroSubhead: string;

  /** About-section framing copy used on /about and the homepage intro */
  aboutFraming: string;

  /** Stat cards: 4 numbers and labels */
  stats: Stat[];

  /** Scenario cards: 3 to 6 entry points routed to the right page */
  scenarios: Scenario[];

  /** CTAs */
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  finalCtaHeadline: string;
  finalCtaSubhead: string;

  /** Testimonial behavior */
  testimonials: TestimonialBehavior;

  /** Visual treatment overrides applied via CSS variables. Each key maps to
   *  a CSS custom property that pages and components already consume. */
  visualOverrides?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    heading?: string;
    body?: string;
  };
}
