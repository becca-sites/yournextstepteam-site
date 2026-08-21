"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { tenant } from "@/config/tenant";

const BG_TILES: string[] = [
  ...tenant.media.listingShowcase,
  ...tenant.media.aerial,
  ...tenant.media.lifestyle,
];

function hoverIntensity(col: number): {
  saturation: number;
  brightness: number;
} {
  if (col <= 3) return { saturation: 0.35, brightness: 0.95 };
  if (col <= 5) return { saturation: 0.55, brightness: 1.0 };
  if (col <= 7) return { saturation: 0.75, brightness: 1.05 };
  return { saturation: 1.0, brightness: 1.1 };
}

export function HeroMosaicBackground() {
  return (
    // z-0, not -z-10. The hero <section> is position:relative with z-index:auto,
    // so it opens no stacking context, and a negative z-index paints this behind
    // the section's own bg-white. See the same note in HeroVideo.
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="grid h-full w-full auto-rows-fr grid-cols-6 gap-1.5 sm:grid-cols-8 lg:grid-cols-10">
        {BG_TILES.map((src, i) => {
          const col = i % 10;
          const inTextColumns = col <= 3;
          const { saturation, brightness } = hoverIntensity(col);
          return (
            <div
              key={`${src}-${i}`}
              data-col={col}
              tabIndex={-1}
              className={
                inTextColumns
                  ? "relative overflow-hidden rounded-sm pointer-events-none"
                  : "relative overflow-hidden rounded-sm group pointer-events-auto cursor-pointer transition duration-[480ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              }
              style={
                inTextColumns
                  ? undefined
                  : ({
                      "--hover-saturation": saturation,
                      "--hover-brightness": brightness,
                    } as React.CSSProperties)
              }
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 10vw, (min-width: 640px) 12vw, 16vw"
                className="mosaic-tile-img object-cover"
                priority={i < 10}
              />
            </div>
          );
        })}
      </div>

      {/* Left-to-right wash only. The bottom fade is gone here for the same
          reason it is gone in HeroVideo: this is the video's stand-in, so the
          two need to sit in the hero the same way. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}

type Tile = {
  src: string;
  alt: string;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
  tilt: number;
  shiftX: number;
  shiftY: number;
};

const TILES: Tile[] = [
  { src: tenant.media.listingShowcase[0] ?? "/images/hero/valley-landscape.jpg", alt: "Home exterior", col: 1, row: 1, colSpan: 3, rowSpan: 2, tilt: -4, shiftX: -2, shiftY: 4 },
  { src: tenant.media.aerial[0] ?? "/images/hero/valley-hero-1.jpg", alt: "Aerial community view", col: 4, row: 1, colSpan: 2, rowSpan: 2, tilt: 3, shiftX: 6, shiftY: -3 },
  { src: tenant.media.lifestyle[0] ?? "/images/hero/valley-hero-2.jpg", alt: "Living space", col: 6, row: 1, colSpan: 3, rowSpan: 2, tilt: -6, shiftX: 2, shiftY: 2 },
  { src: tenant.media.listingShowcase[1] ?? "/images/hero/valley-landscape.jpg", alt: "Featured home", col: 9, row: 1, colSpan: 2, rowSpan: 2, tilt: 5, shiftX: -4, shiftY: 0 },
  { src: tenant.media.aerial[1] ?? "/images/hero/valley-hero-1.jpg", alt: "Neighborhood aerial", col: 11, row: 1, colSpan: 2, rowSpan: 2, tilt: -3, shiftX: 0, shiftY: -2 },
  { src: tenant.media.listingShowcase[2] ?? "/images/hero/valley-hero-2.jpg", alt: "Home interior", col: 1, row: 3, colSpan: 2, rowSpan: 2, tilt: 6, shiftX: 4, shiftY: -6 },
  { src: tenant.media.lifestyle[1] ?? "/images/hero/valley-landscape.jpg", alt: "Community setting", col: 3, row: 3, colSpan: 3, rowSpan: 2, tilt: -2, shiftX: -2, shiftY: 6 },
  { src: tenant.media.listingShowcase[3] ?? "/images/hero/valley-hero-1.jpg", alt: "Home detail", col: 6, row: 3, colSpan: 2, rowSpan: 2, tilt: 4, shiftX: 8, shiftY: 0 },
  { src: tenant.media.aerial[2] ?? "/images/hero/valley-hero-2.jpg", alt: "Valley view", col: 8, row: 3, colSpan: 3, rowSpan: 2, tilt: -5, shiftX: -6, shiftY: 4 },
  { src: tenant.media.lifestyle[2] ?? "/images/hero/valley-landscape.jpg", alt: "Living room", col: 11, row: 3, colSpan: 2, rowSpan: 2, tilt: 2, shiftX: 0, shiftY: -4 },
];

export function HeroMosaic() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [tileRects, setTileRects] = useState<
    Array<{ cx: number; cy: number } | null>
  >([]);

  const measure = useCallback(() => {
    if (!ref.current) return;
    const containerRect = ref.current.getBoundingClientRect();
    const tiles = ref.current.querySelectorAll<HTMLElement>("[data-tile]");
    const rects: Array<{ cx: number; cy: number } | null> = [];
    tiles.forEach((el) => {
      const r = el.getBoundingClientRect();
      rects.push({
        cx: r.left - containerRect.left + r.width / 2,
        cy: r.top - containerRect.top + r.height / 2,
      });
    });
    setTileRects(rects);
  }, []);

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [shouldReduceMotion],
  );

  const onLeave = useCallback(() => {
    setCursor(null);
  }, []);

  return (
    <>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="hidden md:block relative isolate aspect-[16/11] w-full"
        aria-hidden="true"
      >
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-2 sm:gap-3 [perspective:1200px]">
          {TILES.map((tile, i) => {
            const rect = tileRects[i] ?? null;
            let darken = 0;
            if (cursor && rect) {
              const dx = cursor.x - rect.cx;
              const dy = cursor.y - rect.cy;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const radius = 180;
              darken = Math.max(0, 1 - dist / radius);
            }
            const grayscale = 1 - darken * 0.95;
            const brightness = 1.05 - darken * 0.4;
            const opacity = 0.6 + darken * 0.4;

            return (
              <div
                key={`${tile.src}-${i}`}
                data-tile
                className="relative overflow-hidden rounded-xl shadow-sm ring-1 ring-neutral-900/5"
                style={{
                  gridColumn: `${tile.col} / span ${tile.colSpan}`,
                  gridRow: `${tile.row} / span ${tile.rowSpan}`,
                  transform: `translate(${tile.shiftX}px, ${tile.shiftY}px) rotate(${tile.tilt}deg)`,
                  transformOrigin: "center",
                  transition: shouldReduceMotion
                    ? undefined
                    : "filter 250ms ease, opacity 250ms ease",
                  filter: `grayscale(${grayscale}) brightness(${brightness})`,
                  opacity,
                }}
              >
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 33vw"
                  className="object-cover"
                  priority={i < 5}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:hidden grid grid-cols-2 gap-3" aria-hidden="true">
        {TILES.slice(0, 6).map((tile, i) => (
          <div
            key={`${tile.src}-mobile-${i}`}
            className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-neutral-900/5"
            style={{ filter: "grayscale(0.4)", opacity: 0.95 }}
          >
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
