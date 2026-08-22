"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Two stacked portraits that crossfade as the reader scrolls past them.
 *
 * The whole effect is one number: a 0 to 1 progress value written to the
 * `--crossfade` custom property on the wrapper. The top photo reads
 * `calc(1 - var(--crossfade))` for its opacity, the bottom photo reads
 * `var(--crossfade)`, and both take a hair of scale off the same value so the
 * swap feels like a slow push rather than a light switch.
 *
 * Performance notes, because this runs on every scroll frame:
 *
 * - The progress value is written straight to the DOM node's style. React never
 *   re-renders during the scroll, so there is no reconciliation per frame.
 * - Only opacity and transform change. Neither triggers layout or paint, so the
 *   compositor handles the whole animation.
 * - getBoundingClientRect() is read once per animation frame, inside the rAF
 *   callback, and never interleaved with a style write in the same pass. That
 *   is what keeps this off the layout thrashing path.
 * - The scroll listener is only attached while the portrait is actually on
 *   screen. An IntersectionObserver hooks it up on entry and tears it down on
 *   exit, so scrolling the rest of the page costs nothing.
 *
 * Reduced motion gets the first photo, held still, and no listeners at all.
 */

/**
 * Where the crossfade starts and ends, measured as the portrait's center
 * expressed in viewport heights from the top of the viewport.
 *
 * 0.78 means "start when the center of the photo has climbed to just above the
 * bottom edge of the screen" and 0.34 means "finish when it is a third of the
 * way down from the top." The gap between them is the whole travel of the
 * effect. Fractions of the viewport rather than pixels, so a phone and a
 * desktop get the same pacing relative to what the reader can see.
 */
const FADE_START = 0.78;
const FADE_END = 0.34;

/** How much the outgoing photo pushes in, and the incoming photo settles back. */
const SCALE_TRAVEL = 0.04;

/** Smoothstep. Takes the linear edges off both ends of the fade. */
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

type ScrollCrossfadePortraitProps = {
  /** Photo on top at rest, before the reader has scrolled to the section. */
  primarySrc: string;
  /**
   * Photo underneath, revealed by the scroll. Pass the same path as primarySrc
   * to keep the mechanism running with a single photo on hand.
   */
  secondarySrc: string;
  /** Describes the person in both photos. The second image is decorative. */
  alt: string;
  sizes?: string;
  className?: string;
};

export function ScrollCrossfadePortrait({
  primarySrc,
  secondarySrc,
  alt,
  sizes = "(min-width: 1024px) 33vw, 80vw",
  className,
}: ScrollCrossfadePortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldReduceMotion) return;

    let frame = 0;
    let progress = -1;

    const update = () => {
      frame = 0;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const center = (rect.top + rect.height / 2) / viewport;

      // Inverted because the center travels from the bottom of the viewport
      // (large fraction) toward the top (small fraction) as the page scrolls.
      const raw = (FADE_START - center) / (FADE_START - FADE_END);
      const next = ease(Math.min(1, Math.max(0, raw)));

      // Skip the write when nothing moved enough to see. Cheap guard against
      // touching style on frames where a scroll event fired but the portrait
      // sat still, which happens constantly during momentum scrolling on iOS.
      if (Math.abs(next - progress) < 0.001) return;
      progress = next;
      el.style.setProperty("--crossfade", next.toFixed(4));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    // Only listen while the portrait is on screen, with a generous margin so
    // the value is already correct by the time the first pixel of it appears.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", schedule, { passive: true });
          window.addEventListener("resize", schedule, { passive: true });
          schedule();
        } else {
          window.removeEventListener("scroll", schedule);
          window.removeEventListener("resize", schedule);
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );

    observer.observe(el);

    // Covers a reload partway down the page, where the section may already be
    // in its final state before the observer has reported anything.
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={ref}
      className={[
        "relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-white shadow-xl",
        className ?? "",
      ]
        .join(" ")
        .trim()}
      // Declared here rather than in a stylesheet so it ships in the server
      // rendered HTML. Without it the calc() expressions below are invalid on
      // first paint and both photos would land at full opacity.
      style={{ "--crossfade": 0 } as React.CSSProperties}
    >
      <Image
        src={primarySrc}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{
          opacity: "calc(1 - var(--crossfade))",
          transform: `scale(calc(1 + ${SCALE_TRAVEL} * var(--crossfade)))`,
          willChange: "opacity, transform",
        }}
      />
      {/*
        Decorative on purpose. It is the same person as the photo above it, and
        a screen reader announcing the portrait twice is noise. The alt text on
        the primary image carries the meaning for both.
      */}
      <Image
        src={secondarySrc}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className="object-cover"
        style={{
          opacity: "var(--crossfade)",
          transform: `scale(calc(${1 + SCALE_TRAVEL} - ${SCALE_TRAVEL} * var(--crossfade)))`,
          willChange: "opacity, transform",
        }}
      />
    </div>
  );
}
