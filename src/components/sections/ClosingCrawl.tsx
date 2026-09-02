"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { tenant } from "@/config/tenant";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

/**
 * The closing crawl.
 *
 * A Star Wars opening crawl, played straight, listing everything that happens
 * between mutual acceptance and keys. The search is the five percent people
 * think they are hiring an agent for; this is the other ninety-five, and the
 * only honest way to show how much of it there is turned out to be to make the
 * reader sit through it.
 *
 * Every word is real text in the DOM. Nothing here is a video, a canvas, or an
 * image, so the whole list is indexable, selectable, translatable, and readable
 * by a screen reader in document order. The 3D effect is a single CSS transform
 * on an ancestor, which changes how the text is painted and nothing about what
 * it is.
 *
 * The mechanics live in globals.css under "The closing crawl". This file owns
 * the copy, the two escape hatches (Skip, and reduced motion), and the one thing
 * CSS cannot work out on its own: how far the track has to travel, and therefore
 * how long the animation should last.
 */

/**
 * Crawl speed, in local pixels per second, measured in the track's own
 * untransformed space rather than on screen. The perspective compresses that
 * into a much slower apparent crawl near the vanishing point, which is the whole
 * effect: the line you are reading at the bottom moves at a readable clip and
 * the ones above it appear to slow as they recede.
 *
 * Duration is derived from this and the measured travel rather than fixed, so a
 * phone and a 27" monitor crawl at the same perceived speed instead of the
 * phone taking three times as long to clear a track three times as tall.
 */
const CRAWL_SPEED = 30;

/** Ignore re-measurements smaller than this. Stops a scrollbar appearing or an
 *  iOS address bar collapsing from restarting the timing for no visible gain. */
const REMEASURE_THRESHOLD_PX = 24;

type CrawlLine = {
  id: string;
  text: string;
  /**
   * `aside` is one of the two "are you still reading" beats, set slightly
   * smaller and dimmer so it reads as a stage whisper rather than another task.
   * `finale` is the payoff line. `signature` is the sign-off.
   */
  variant?: "aside" | "finale" | "signature";
};

/**
 * The crawl body, in order.
 *
 * Written as data rather than as inline JSX because the list is the point: it
 * should be obvious at a glance how long it is, and adding a step should mean
 * adding one line here. The easter egg is the single exception and is rendered
 * separately below, since it is the only entry that changes shape between the
 * two presentations.
 */
const CRAWL_LINES: CrawlLine[] = [
  {
    id: "offer",
    text: "Negotiate the initial offer. Counter-offer. Counter the counter-offer. Try not to take it personally when they counter your counter-offer.",
  },
  {
    id: "inspection",
    text: "Schedule the home inspection. Review 40 pages of findings. Decide which ones actually matter and which ones are just the inspector justifying their fee.",
  },
  {
    id: "aside-appraisal",
    variant: "aside",
    text: "Still with me? Good. Because we have not even gotten to the appraisal yet.",
  },
  {
    id: "appraisal",
    text: "Order the appraisal. Hope the appraiser had coffee. Negotiate repairs based on the inspection results. Get three contractor bids, because the first one was ridiculous.",
  },
  {
    id: "lender",
    text: "Coordinate with the lender. Then coordinate again. Then one more time, because they need that same document in a slightly different format.",
  },
  {
    id: "title",
    text: "Review the title report. Resolve any title issues. Explain what a title issue even is.",
  },
  // The easter egg sits here, between the title report and the financing
  // contingency. See EGG below.
  {
    id: "financing",
    text: "Navigate the financing contingency. Monitor the interest rate lock. Pray to the mortgage gods.",
  },
  {
    id: "walkthrough",
    text: "Schedule the final walkthrough. Make sure the sellers actually moved out. Yes, that chandelier was supposed to stay.",
  },
  {
    id: "aside-gave-up",
    variant: "aside",
    text: "Are you still reading? Seriously? Most people gave up around the appraisal.",
  },
  {
    id: "escrow",
    text: "Coordinate with the escrow company. Review the closing disclosure. Explain why the numbers look different from the estimate. They always look different from the estimate.",
  },
  {
    id: "signing",
    text: "Arrange the final signing. Track the wire transfer. Wait. Wait some more. Get the keys.",
  },
  {
    id: "more",
    variant: "aside",
    text: "But wait, there is more...",
  },
  {
    id: "after",
    text: "Celebrate. Send a gift. Check in a month later to make sure the water heater is still working.",
  },
  {
    id: "finale",
    variant: "finale",
    text: "THIS is the other 95%. This is what I do.",
  },
  {
    id: "signature",
    variant: "signature",
    text: `- Becca Pitts, ${tenant.brand.name}`,
  },
];

/**
 * The easter egg, split around the phone number so the number can become a
 * tappable sms: link in the flat reading view.
 *
 * It stays plain text while the crawl is moving on purpose. A focusable link
 * inside a clipped, animating container makes the browser scroll its nearest
 * scroll box when it receives focus, which yanks the crawl sideways for anyone
 * tabbing through the page. Screen readers and search engines get the number
 * either way, since it is real text in both presentations.
 */
const EGG = {
  lead: "If you are still reading this, text me at ",
  tail: " with the phrase “the sarlacc pit has better escrow” and I will buy you a coffee. First person each month wins a $25 gift card.",
};

export function ClosingCrawl() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Flat means "no tilt, no motion, just the list": the Skip destination, and
   * also what reduced-motion readers get. Reduced motion is resolved in an
   * effect rather than during render so the server and the first client render
   * agree; globals.css carries the same flattening as a media query, which is
   * what covers the reader who has JavaScript off.
   */
  const [flat, setFlat] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const isFlat = flat || reduced;

  /*
   * Travel distance and duration.
   *
   * The track starts one stage-height below the top of the stage and has to
   * clear it entirely, so the distance is stage height plus track height. CSS
   * cannot add those two together on its own (one is a percentage of the
   * viewport, the other is content-driven), so it is measured here and handed
   * back as a custom property the keyframes read.
   */
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!root || !stage || !track || isFlat) return;

    let applied = 0;

    const measure = () => {
      const distance = stage.offsetHeight + track.offsetHeight;
      if (Math.abs(distance - applied) < REMEASURE_THRESHOLD_PX) return;
      applied = distance;
      root.style.setProperty("--crawl-distance", `${distance}px`);
      root.style.setProperty(
        "--crawl-duration",
        `${(distance / CRAWL_SPEED).toFixed(1)}s`,
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(track);

    return () => observer.disconnect();
  }, [isFlat]);

  /*
   * Start the crawl when the reader gets here, not when the page loads.
   *
   * The paused state is written to the DOM from an effect rather than rendered
   * as an attribute, and globals.css defaults the track to running. That
   * ordering is deliberate: a reader with JavaScript off still sees a crawl
   * (just one that started at page load), rather than a black box holding a
   * track that is parked below the fold forever.
   */
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || isFlat) return;

    root.dataset.playing = "false";

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.playing = entry.isIntersecting ? "true" : "false";
      },
      // A third of the stage on screen is about the point where the crawl is
      // worth watching rather than glimpsing.
      { threshold: 0.3 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [isFlat]);

  const phone = tenant.agent.phone;

  return (
    <section
      aria-labelledby="closing-crawl-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        ref={rootRef}
        className={cn("crawl relative", isFlat && "crawl--flat")}
      >
        {/* Stars sit behind everything and cost nothing but a background. */}
        <div className="crawl__sky" aria-hidden="true" />

        {/* The static hook, before the crawl starts. */}
        <Container className="relative z-10 pt-16 pb-10 lg:pt-24 lg:pb-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              The other 95 percent
            </p>
            <h2
              id="closing-crawl-heading"
              className="mt-4 font-display text-3xl font-semibold leading-tight text-white md:text-4xl"
            >
              You might find the house yourself. Most of my buyers do.
            </h2>
            <p className="mt-5 text-lg text-white/75">
              But the search is about 5% of the home-buying process.
            </p>
            <p className="mt-2 text-lg text-white/75">
              The other 95%? Scroll down.
            </p>

            {/*
              The blue title card. In the films this is a static line that sits
              on black before the logo hits, and it is the single most
              recognisable half-second of the whole sequence, so it is static
              here too rather than riding up with the crawl.
            */}
            <p className="crawl__prologue mt-12">
              A long time ago in a housing market not so far away...
            </p>
          </div>
        </Container>

        {/* The crawl itself. */}
        <div className="crawl__viewport relative z-10">
          <div ref={stageRef} className="crawl__stage">
            <div ref={trackRef} className="crawl__track">
              <h3 className="crawl__logo">{tenant.brand.name}</h3>
              <p className="crawl__episode">Episode 270: The Closing</p>

              {CRAWL_LINES.map((line) => {
                const node = (
                  <p
                    key={line.id}
                    className={cn(
                      "crawl__line",
                      line.variant && `crawl__line--${line.variant}`,
                    )}
                  >
                    {line.text}
                  </p>
                );

                // The egg is spliced in after the title report rather than
                // living in CRAWL_LINES, because it is the one entry whose
                // markup differs between the crawl and the flat view.
                if (line.id !== "financing") return node;

                return (
                  <Fragment key="financing-group">
                    <p className="crawl__line crawl__line--egg">
                      {EGG.lead}
                      {isFlat ? (
                        <a
                          className="crawl__egg-link"
                          href={`sms:${phone.replace(/[^+\d]/g, "")}`}
                        >
                          {phone}
                        </a>
                      ) : (
                        phone
                      )}
                      {EGG.tail}
                    </p>
                    {node}
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* Paints the receding text back into the sky. An overlay rather
              than a mask-image, matching the marquee: an overlay cannot
              silently do nothing on an engine that has not shipped it. */}
          <div className="crawl__fade" aria-hidden="true" />

          {/*
            WCAG 2.2.2. The crawl starts on its own and runs well past five
            seconds, so there has to be a control that stops it. This one does
            not just stop the motion, it hands over the same words as an
            ordinary, left-aligned, fully scrollable list.
          */}
          <button
            type="button"
            onClick={() => setFlat((value) => !value)}
            className="crawl__skip"
          >
            {flat ? "Play the crawl" : "Skip the crawl"}
          </button>
        </div>
      </div>
    </section>
  );
}
