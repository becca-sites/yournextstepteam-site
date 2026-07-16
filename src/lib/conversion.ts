import { resolveAnalytics } from "@/site.config";

export type ConversionEventName =
  | "lead_submit"
  | "phone_click"
  | "email_click"
  | "tour_request"
  | "listing_view"
  | "search_save"
  | "newsletter_signup";

export interface ConversionEvent {
  name: ConversionEventName;
  value?: number;
  currency?: string;
  properties?: Record<string, unknown>;
}

/**
 * Centralized event forwarder. Sends conversion events to the aggregation
 * endpoint so server-side Meta CAPI and Google Conversion API can hydrate
 * the appropriate ad platforms from a single source.
 *
 * The endpoint is built later in the brettkmoore-sites infrastructure repo.
 * This client-side helper is the contract every deployed site will share.
 */
export async function trackConversion(event: ConversionEvent) {
  const { serverSideConversionEndpoint } = resolveAnalytics();
  if (!serverSideConversionEndpoint || serverSideConversionEndpoint.includes("[")) return;

  try {
    await fetch(serverSideConversionEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      }),
    });
  } catch {
    // swallow telemetry errors silently
  }

  if (typeof window !== "undefined") {
    const w = window as unknown as {
      dataLayer?: unknown[];
      fbq?: (...args: unknown[]) => void;
    };
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: event.name, ...event.properties });
    }
    if (typeof w.fbq === "function") {
      w.fbq("trackCustom", event.name, event.properties ?? {});
    }
  }
}
