"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { tenant } from "@/config/tenant";

export type TestimonialBehavior = boolean | "team-backed";

/** How long each card sits before the carousel advances. */
const AUTO_SCROLL_MS = 6000;

export function TestimonialCarousel({
  show = true,
  heading,
  eyebrow = "Real clients, real results",
}: {
  show?: TestimonialBehavior;
  heading?: string;
  eyebrow?: string;
}) {
  const list = tenant.testimonials ?? [];
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length < 2) return;

    // Card offsets measured against the track's own content box, so they line
    // up with scrollLeft regardless of where the track sits on the page.
    const base = cards[0].offsetLeft;
    const positions = cards.map((card) => card.offsetLeft - base);

    // Once the last card is fully visible there is nothing left to scroll to,
    // so wrap back to the beginning.
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    const current = positions.findIndex((left) => left >= track.scrollLeft - 1);
    const next =
      atEnd || current < 0 || current >= cards.length - 1 ? 0 : current + 1;

    track.scrollTo({ left: positions[next], behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion, and hold still while someone is reading
    // (hover, keyboard focus, or their own scrolling).
    if (shouldReduceMotion || paused || list.length < 2) return;
    const id = window.setInterval(advance, AUTO_SCROLL_MS);
    return () => window.clearInterval(id);
  }, [advance, paused, shouldReduceMotion, list.length]);

  if (show === false) return null;
  if (list.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
            {heading || `What ${tenant.market.primaryArea} clients are saying.`}
          </h2>
        </div>

        <div
          ref={trackRef}
          // items-stretch plus flex-col cards keeps every attribution block on
          // the same baseline no matter how long the quote above it runs.
          className="mt-12 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto pb-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {list.map((t, idx) => (
            <figure
              key={`${t.name}-${idx}`}
              className="flex min-w-[300px] max-w-md flex-col snap-start rounded-2xl border border-black/5 bg-[var(--color-surface)] p-8 md:min-w-[420px]"
            >
              <p className="font-heading text-3xl text-[var(--color-secondary)]">“</p>
              <blockquote className="mt-2 mb-6 text-lg leading-relaxed text-[color:var(--color-ink)]">
                {t.quote}
              </blockquote>
              {/* mt-auto pins the attribution to the bottom of every card, and
                  the reserved min-height keeps the divider and the name on the
                  same line across cards even when a context line wraps. */}
              <figcaption className="mt-auto border-t border-black/5 pt-4 text-sm">
                <div className="min-h-[5rem]">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-[color:var(--color-muted)]">
                    {t.context} &middot; {t.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
