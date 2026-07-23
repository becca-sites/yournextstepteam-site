import type { Metadata } from "next";
import { tenant } from "@/config/tenant";
import { FinalCtaBlock } from "@/components/sections/FinalCtaBlock";

export const metadata: Metadata = {
  title: "Videos",
  description: `${tenant.videos.seriesTitle}: ${tenant.videos.seriesDescription}`,
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  const { channelUrl, featuredPlaylistId, featuredPlaylistUrl, seriesTitle, seriesDescription } =
    tenant.videos;

  return (
    <>
      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="eyebrow">Senior living education</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight md:text-6xl">
            {seriesTitle}
          </h1>
          <p className="mt-5 text-lg text-[color:var(--color-muted)] md:text-xl">
            {seriesDescription}
          </p>
          <p className="mt-4 text-base text-[color:var(--color-muted)]">
            An 8-part series walking through the decisions that come with a later-in-life
            move: aging in place, downsizing, elder care, and choosing a confident next step.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-black/5 bg-neutral-100 shadow-lg">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/videoseries?list=${featuredPlaylistId}`}
              title={`${seriesTitle} playlist`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={featuredPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Watch the full series on YouTube ↗
            </a>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Visit the channel ↗
            </a>
          </div>
        </div>
      </section>

      <FinalCtaBlock
        heading="Have a question the videos did not cover?"
        subhead="A short, no pressure call to talk through your situation and the right next step."
      />
    </>
  );
}
