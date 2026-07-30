"use client";

import { useState } from "react";
import { resolveIdx } from "@/site.config";

type FormStatus = "idle" | "sending" | "sent" | "error";

/**
 * Accessibility notes for this form:
 *
 * - Labels are explicitly associated by id/htmlFor rather than relying on
 *   wrapping alone, which is the more reliable pairing across screen readers.
 * - Required fields are marked in the visible label as well as with the
 *   `required` attribute, so the requirement is not colour- or attribute-only.
 * - Send/error state lives in a single aria-live region that is present in the
 *   DOM from first render. A region that only appears at the moment it fills is
 *   frequently missed by screen readers.
 * - Inputs are 48px tall and their borders measure 4.7:1 against white, clearing
 *   both the target-size and non-text-contrast requirements.
 */

const FIELD_CLASS =
  "mt-2 block w-full rounded-md border border-neutral-500 bg-white px-4 py-3 text-base leading-normal text-[var(--color-ink)] transition focus:border-[var(--color-moss)]";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);
    // Honeypot field. Bots fill it, humans don't.
    if (data.get("website")) {
      setStatus("sent");
      return;
    }
    try {
      const { leadWebhookUrl } = resolveIdx();
      const res = await fetch(leadWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
    >
      <fieldset className="grid gap-6">
        <legend className="font-heading text-2xl font-semibold">
          Tell me what you&apos;re working on
        </legend>

        <div>
          <label htmlFor="contact-name" className="block text-base font-medium">
            Name <span className="text-[var(--color-muted)]">(required)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-base font-medium">
            Email <span className="text-[var(--color-muted)]">(required)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-base font-medium">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={FIELD_CLASS}
          />
        </div>

        <fieldset>
          <legend className="text-base font-medium">I&apos;m interested in</legend>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {[
              { value: "buying", label: "Buying" },
              { value: "selling", label: "Selling" },
              { value: "both", label: "Both" },
              { value: "just-exploring", label: "Just exploring" },
            ].map((option) => (
              <label
                key={option.value}
                htmlFor={`contact-intent-${option.value}`}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-base"
              >
                <input
                  id={`contact-intent-${option.value}`}
                  type="radio"
                  name="intent"
                  value={option.value}
                  defaultChecked={option.value === "buying"}
                  className="h-5 w-5 accent-[var(--color-moss)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="contact-message" className="block text-base font-medium">
            What&apos;s on your mind?
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            className={FIELD_CLASS}
          />
        </div>

        <label
          htmlFor="contact-sms-consent"
          className="flex cursor-pointer items-start gap-3 text-sm text-[var(--color-muted)]"
        >
          <input
            id="contact-sms-consent"
            name="smsConsent"
            type="checkbox"
            value="yes"
            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-moss)]"
          />
          <span>
            I&apos;d like a follow-up by phone or text. Message and data rates may
            apply. Reply STOP to opt out.
          </span>
        </label>

        {/* Honeypot for bot detection. Kept out of the tab order and the
            accessibility tree so it is invisible to keyboard and screen
            reader users but still available to form-filling bots. */}
        <label className="sr-only" aria-hidden="true">
          Website (do not fill)
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary w-full disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        {/* Live region is always mounted so state changes are announced. */}
        <p
          role="status"
          aria-live="polite"
          className={
            status === "error"
              ? "text-base font-medium text-red-700"
              : "text-base font-medium text-green-700"
          }
        >
          {status === "sent" && "Thanks. I'll be in touch within one business day."}
          {status === "error" &&
            "Something went wrong. Please call or email directly."}
        </p>
      </fieldset>
    </form>
  );
}
