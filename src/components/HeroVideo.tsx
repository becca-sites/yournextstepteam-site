"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { TenantHeroVideo } from "@/config/tenant";

/**
 * Full-bleed hero background video.
 *
 * The <video> is server-rendered so it lands in the initial HTML and can start
 * buffering immediately rather than waiting on hydration. Reduced-motion
 * handling then happens in an effect: pausing at frame zero leaves the poster
 * on screen, which is the same still the video opens on.
 *
 * The element is aria-hidden because it is decoration behind the headline. The
 * headline, subhead, and CTAs carry the page's meaning, and a screen reader
 * announcing a 24 second property tour here would be noise. The footage is
 * described for crawlers in HeroVideoSchema instead.
 */
/** Cinematic slow-down for the background footage. 1 is source speed. */
const HERO_PLAYBACK_RATE = 0.75;

export function HeroVideo({ video }: { video: TenantHeroVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (shouldReduceMotion) {
      el.pause();
      el.currentTime = 0;
      return;
    }

    // Three-quarter speed. The source is a drone and walkthrough tour, and at
    // 1x the camera moves fast enough to read as a listing reel rather than a
    // backdrop. Set before play() so the opening frames are already slowed.
    // The rate survives the loop attribute's seek back to zero.
    el.playbackRate = HERO_PLAYBACK_RATE;

    // Some browsers reject the autoplay promise even when muted (low power
    // mode, aggressive autoplay settings). Failing quietly leaves the poster
    // up, which is a perfectly good hero.
    void el.play().catch(() => {});
  }, [shouldReduceMotion]);

  return (
    // z-0, not -z-10. The hero <section> is position:relative with z-index:auto,
    // so it does not open a stacking context, and a negative z-index here paints
    // the video underneath the section's own bg-white instead of on top of it.
    // z-0 sits above that background and below the z-10 content column.
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // Stops the iOS Safari fullscreen takeover on tap.
        disablePictureInPicture
        tabIndex={-1}
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/*
        One gradient only: a left-to-right wash that keeps the headline legible
        over the footage. There is deliberately no bottom fade here, so the
        video stays fully visible right down to the edge of the section. The
        homepage hero paints its own dark scrim over this at the bottom, behind
        the glass stat cards.

        Peaks at 0.90 on the far left, where the left-justified h1 and subhead
        sit, so the dark ink stays readable against any frame of the footage.
        It then drops fast and is fully clear by 62%, which leaves the right
        side of the video untouched.
      */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.80) 20%, rgba(255,255,255,0.60) 35%, rgba(255,255,255,0.30) 50%, rgba(255,255,255,0) 62%)",
        }}
      />
    </div>
  );
}
