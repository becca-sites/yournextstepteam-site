"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { tenant } from "@/config/tenant";
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
 * There is no preamble and no Skip. The section is the crawl: it starts the
 * moment it scrolls into view and the sheer length of the list is the argument.
 * Reduced motion is the one escape hatch, and it hands over the same words as a
 * still, left-aligned list.
 *
 * Every word is real text in the DOM. Nothing here is a video, a canvas, or an
 * image, so the whole list is indexable, selectable, translatable, and readable
 * by a screen reader in document order. The 3D effect is a single CSS transform
 * on an ancestor, which changes how the text is painted and nothing about what
 * it is.
 *
 * The mechanics live in globals.css under "The closing crawl". This file owns
 * the copy, the reduced-motion escape hatch, and the one thing CSS cannot work
 * out on its own: how far the track has to travel, and therefore how long the
 * animation should last.
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
   * `aside` is one of the "are you still reading" beats, set slightly smaller
   * and dimmer so it reads as a stage whisper rather than another task.
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
 *
 * The asides are spaced deliberately. They are the only thing telling a reader
 * who is three minutes in that the length is the joke and not a bug.
 */
const CRAWL_LINES: CrawlLine[] = [
  {
    id: "offer",
    text: "Negotiate the initial offer. Counter-offer. Counter the counter-offer. Try not to take it personally when they counter your counter-offer.",
  },
  {
    id: "breakdown",
    text: "Counsel the buyer through their third emotional breakdown this week. Therapist hat: on.",
  },
  {
    id: "inspection",
    text: "Schedule the home inspection. Review 40 pages of findings. Decide which ones actually matter and which ones are just the inspector justifying their fee.",
  },
  {
    id: "dad-tape-measure",
    text: "The buyer’s dad shows up to the inspection with a tape measure and opinions. The inspector is thrilled.",
  },
  {
    id: "uncle-foundation",
    text: "Buyer’s uncle is pointing at the foundation, shaking his head. He once poured a patio. He is now a structural engineer.",
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
    id: "appraisal-gap",
    text: "The appraiser values the house $15K under contract price. Everyone’s day is ruined. Fix it.",
  },
  {
    id: "lender",
    text: "Coordinate with the lender. Then coordinate again. Then one more time, because they need that same document in a slightly different format.",
  },
  {
    id: "one-more-document",
    text: "The lender needs “just one more document.” For the fourth time. This week.",
  },
  {
    id: "no-new-car",
    text: "Remind the buyer that no, they absolutely cannot buy a new car before closing. Yes, even if it’s a really good deal.",
  },
  {
    id: "aside-third",
    variant: "aside",
    text: "Still with me? We are maybe a third of the way down the list.",
  },
  {
    id: "lockbox-rain",
    text: "The lockbox won’t open. The code changed. Nobody told you. The buyers are standing in the rain.",
  },
  {
    id: "boat-in-driveway",
    text: "Get a call at 9 PM because the buyer drove by the house and “the neighbors have a boat in the driveway - is that permanent?”",
  },
  {
    id: "title",
    text: "Review the title report. Resolve any title issues. Explain what a title issue even is.",
  },
  {
    id: "lien-2003",
    text: "The title company finds a lien from 2003 that nobody knew about. Track down the original party. They moved to Florida.",
  },
  // The easter egg sits here, between the title work and the financing
  // contingency. See EGG below.
  {
    id: "financing",
    text: "Navigate the financing contingency. Monitor the interest rate lock. Pray to the mortgage gods.",
  },
  {
    id: "four-schedules",
    text: "Coordinate four people’s schedules to get one signature on one page.",
  },
  {
    id: "youtube-crash",
    text: "Talk the buyer off the ledge after they watched a “housing market crash incoming” video on YouTube at 2 AM.",
  },
  {
    id: "aside-impressed",
    variant: "aside",
    text: "Are you still reading? I am genuinely impressed. There is more.",
  },
  {
    id: "mom-kitchen",
    text: "The buyer’s mom has opinions about the kitchen. So does the buyer’s dad. They disagree. Mediate.",
  },
  {
    id: "home-warranty",
    text: "Explain that the home warranty does not, in fact, cover “everything.” Read the fine print together.",
  },
  {
    id: "lockbox-again",
    text: "Getting locked out of the showing because the lockbox code changed and nobody told you. Again.",
  },
  {
    id: "walkthrough",
    text: "Schedule the final walkthrough. Make sure the sellers actually moved out. Yes, that chandelier was supposed to stay.",
  },
  {
    id: "cat",
    text: "The seller’s cat is still in the house during the final walkthrough. The seller says the cat “comes with the house.” The buyer is allergic.",
  },
  {
    id: "curtain-rods",
    text: "Explain to the buyer why the sellers took the nice curtain rods but left the ugly curtains.",
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
    id: "key-doesnt-work",
    text: "The key doesn’t work on closing day. Call the locksmith. Call the listing agent. Call the locksmith again.",
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
   * Flat means "no tilt, no motion, just the list", and it is what
   * reduced-motion readers get. It is resolved in an effect rather than during
   * render so the server and the first client render agree; globals.css carries
   * the same flattening as a media query, which is what covers the reader who
   * has JavaScript off.
   */
  const [isFlat, setIsFlat] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setIsFlat(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

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

        {/* The crawl itself. No hook, no title card, no preamble: the section
            opens on the crawl and the crawl opens on the logo. */}
        <div className="crawl__viewport relative z-10">
          <div ref={stageRef} className="crawl__stage">
            <div ref={trackRef} className="crawl__track">
              {/* The section's accessible name, and the only heading in here.
                  It rides up with the crawl exactly as the logo does in the
                  films; being inside the animated track changes nothing about
                  how it is announced or indexed. */}
              <h2 id="closing-crawl-heading" className="crawl__logo">
                {tenant.brand.name}
              </h2>
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

                // The egg is spliced in after the title work rather than
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
        </div>
      </div>
    </section>
  );
}
