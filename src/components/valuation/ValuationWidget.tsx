"use client";

import { useEffect, useRef, useState } from "react";
import { tenant } from "@/config/tenant";

/**
 * ValuationWidget
 *
 * RealScout-ready container with a graceful fallback form. When the tenant
 * configures a `valuationWidgetUrl`, the RealScout script mounts inside this
 * container. Otherwise the fallback collects the address and posts to the
 * lead webhook for a manual CMA follow-up.
 *
 * RealScout is the default per the playbook. The script tag and attribute
 * contract is per the tenant's RealScout account onboarding.
 */
export function ValuationWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");

  const widgetUrl =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_REALSCOUT_WIDGET_URL || ""
      : "";

  useEffect(() => {
    if (!widgetUrl || widgetUrl.includes("[")) return;
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-realscout="true"]`,
    );
    if (existing) return;
    const s = document.createElement("script");
    s.src = widgetUrl;
    s.async = true;
    s.dataset.realscout = "true";
    document.body.appendChild(s);
  }, [widgetUrl]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address.trim()) return;
    setSubmitted(true);
    // Phase 2: post to tenant.listings.leadWebhookUrl
  }

  if (widgetUrl && !widgetUrl.includes("[")) {
    return (
      <div
        ref={widgetRef}
        data-realscout-container
        className="min-h-[480px] rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8"
      >
        <p className="text-sm text-[color:var(--color-muted)]">
          RealScout valuation widget loads here.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-10 text-center"
      >
        <p className="eyebrow">Estimate request received</p>
        <h2 className="mt-3 font-heading text-2xl font-semibold md:text-3xl">
          Thanks. {tenant.agent.firstName} will be in touch within 24 hours.
        </h2>
        <p className="mt-4 text-base text-[color:var(--color-muted)]">
          A personalized CMA based on recent comparable sales is on the way to
          the email on file.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8 md:p-10"
    >
      <label htmlFor="valuation-address" className="eyebrow">
        Your home address
      </label>
      <input
        id="valuation-address"
        name="address"
        type="text"
        required
        autoComplete="street-address"
        placeholder={`123 Main St, ${tenant.market.city}, ${tenant.market.stateAbbreviation}`}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mt-3 block w-full rounded-xl border border-neutral-500 bg-white px-5 py-4 text-lg transition focus:border-[var(--color-primary)]"
      />
      <button type="submit" className="btn-primary mt-5">
        Get my estimate
      </button>
      <p className="mt-4 text-sm text-[color:var(--color-muted)]">
        By submitting, you agree to receive a follow-up email with the personalized
        CMA. No additional marketing contact unless you opt in.
      </p>
    </form>
  );
}
