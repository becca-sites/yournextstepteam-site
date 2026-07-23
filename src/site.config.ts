/**
 * site.config.ts
 *
 * Legacy adapter. The actual source of tenant values is `src/config/tenant.ts`.
 * This file maps the tenant schema into the older `siteConfig` shape that
 * existing components and schema components still read from. Going forward,
 * new components should import directly from `@/config/tenant`.
 */

import { tenant } from "@/config/tenant";

export type RealEstatePersona =
  | "luxury"
  | "sports"
  | "first-time-agent"
  | "mlm-transition"
  | "established";

export type Brokerage = string;
export type PricingTier = "self-serve" | "managed" | "team";

export interface SiteConfig {
  agentName: string;
  agentFirstName: string;
  agentTitle: string;
  agentPhotoUrl: string;
  agentEmail: string;
  agentPhone: string;
  agentBio?: string;
  yearsOfExperience?: number;

  brokerage: Brokerage;
  brokerageDisclosure: string;
  licenseNumber: string;
  state: string;
  stateAbbreviation: string;

  persona: RealEstatePersona;

  team?: { name: string; leader: string; division: string };

  primaryCity: string;
  serviceArea: string[];
  neighborhoods: string[];

  brandColors: { primary: string; secondary: string; accent: string };
  fonts: { heading: string; body: string };
  logoUrl?: string;
  tagline?: string;

  idxProvider: "boldtrail" | "ihomefinder" | "showcaseidx" | "realgeeks" | "custom";
  boldTrailWidgetScriptUrl: string;
  boldTrailLeadWebhookUrl: string;
  idxAccountId?: string;

  analytics: {
    ga4MeasurementId: string;
    gtmContainerId: string;
    metaPixelId: string;
    microsoftClarityProjectId: string;
    serverSideConversionEndpoint: string;
  };

  gbp: {
    cid: string;
    placeId: string;
    reviewsApiKey: string;
    profileUrl?: string;
  };

  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    tiktok?: string;
    zillow?: string;
    realtorDotCom?: string;
  };

  fairHousingState: string;
  equalHousingOpportunity: boolean;
  realtorCode: boolean;
  pricingTier: PricingTier;

  newsletterProvider?: "mailchimp" | "convertkit" | "beehiiv" | "klaviyo" | "none";
  newsletterListId?: string;
}

export const siteConfig: SiteConfig = {
  agentName: tenant.agent.name,
  agentFirstName: tenant.agent.firstName,
  agentTitle: tenant.agent.title,
  agentPhotoUrl: tenant.agent.headshot,
  agentEmail: tenant.agent.email,
  agentPhone: tenant.agent.phone,
  agentBio: tenant.agent.bio,
  yearsOfExperience: tenant.agent.yearsOfExperience,

  brokerage: tenant.agent.brokerage,
  brokerageDisclosure: tenant.agent.brokerageDisclosure,
  licenseNumber: tenant.agent.license,
  state: tenant.market.state,
  stateAbbreviation: tenant.market.stateAbbreviation,

  persona: "established",

  primaryCity: tenant.market.city,
  serviceArea: tenant.market.neighborhoods,
  neighborhoods: tenant.market.neighborhoods,

  brandColors: {
    primary: tenant.brand.primaryColor,
    secondary: tenant.brand.secondaryColor,
    accent: tenant.brand.accentColor,
  },
  fonts: {
    heading: tenant.brand.headingFont,
    body: tenant.brand.bodyFont,
  },
  logoUrl: tenant.brand.logo,
  tagline: tenant.brand.tagline,

  idxProvider: tenant.listings.feedSource,
  boldTrailWidgetScriptUrl: tenant.listings.widgetScriptUrl ?? "",
  boldTrailLeadWebhookUrl: tenant.listings.leadWebhookUrl ?? "",

  analytics: {
    ga4MeasurementId: "G-XXXXXXXX",
    gtmContainerId: "GTM-XXXXXX",
    metaPixelId: "",
    microsoftClarityProjectId: "",
    serverSideConversionEndpoint: "",
  },

  gbp: {
    cid: "",
    placeId: "",
    reviewsApiKey: "",
    profileUrl: "",
  },

  social: {
    facebook: tenant.social.facebook,
    instagram: tenant.social.instagram,
    youtube: tenant.social.youtube,
    linkedin: tenant.social.linkedin,
  },

  fairHousingState: tenant.market.state,
  equalHousingOpportunity: true,
  realtorCode: true,
  pricingTier: "managed",
  newsletterProvider: "none",
};

export function resolveAnalytics() {
  return {
    ga4MeasurementId:
      process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ||
      siteConfig.analytics.ga4MeasurementId,
    gtmContainerId:
      process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ||
      siteConfig.analytics.gtmContainerId,
    metaPixelId:
      process.env.NEXT_PUBLIC_META_PIXEL_ID || siteConfig.analytics.metaPixelId,
    microsoftClarityProjectId:
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ||
      siteConfig.analytics.microsoftClarityProjectId,
    serverSideConversionEndpoint:
      process.env.SERVER_CONVERSION_ENDPOINT ||
      siteConfig.analytics.serverSideConversionEndpoint,
  };
}

export function resolveSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
}

export function resolveIdx() {
  return {
    widgetScriptUrl:
      process.env.NEXT_PUBLIC_BOLDTRAIL_WIDGET_URL ||
      siteConfig.boldTrailWidgetScriptUrl,
    leadWebhookUrl:
      process.env.BOLDTRAIL_LEAD_WEBHOOK_URL ||
      siteConfig.boldTrailLeadWebhookUrl,
  };
}
