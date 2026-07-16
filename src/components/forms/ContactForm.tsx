"use client";

import { useState } from "react";
import { resolveIdx } from "@/site.config";

type FormStatus = "idle" | "sending" | "sent" | "error";

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
      <fieldset className="grid gap-5">
        <legend className="font-heading text-2xl font-semibold">Tell me what you're working on</legend>

        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </label>

        <fieldset className="block">
          <legend className="text-sm font-medium">I'm interested in</legend>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="intent" value="buying" defaultChecked /> Buying
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="intent" value="selling" /> Selling
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="intent" value="both" /> Both
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="intent" value="just-exploring" /> Just exploring
            </label>
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-medium">What's on your mind?</span>
          <textarea
            name="message"
            rows={5}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </label>

        <label className="block text-xs text-neutral-600">
          <input
            name="smsConsent"
            type="checkbox"
            value="yes"
            className="mr-2 align-middle"
          />
          I'd like a follow-up by phone or text. Message and data rates may apply. Reply STOP to opt out.
        </label>

        {/* Honeypot for bot detection */}
        <label className="sr-only" aria-hidden="true">
          Website (do not fill)
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-[var(--color-sunshine)] px-6 py-3 text-base font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-sunshine-deep)] disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-green-700">Thanks. I'll be in touch within one business day.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-700">
            Something went wrong. Please call or email directly.
          </p>
        )}
      </fieldset>
    </form>
  );
}
