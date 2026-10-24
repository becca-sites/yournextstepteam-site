import { resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
import { PERSON_ID } from "@/lib/entity";
import { tenant, type TenantEpisode } from "@/config/tenant";

export function VideoObjectSchema({ episode }: { episode: TenantEpisode }) {
  if (isPlaceholderMode()) return null;
  if (!episode.youtubeId || episode.youtubeId.startsWith("TODO")) return null;

  const base = resolveSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: episode.title,
    description: episode.description,
    thumbnailUrl: `https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString().split("T")[0],
    contentUrl: `https://www.youtube.com/watch?v=${episode.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${episode.youtubeId}`,
    url: `${base}/your-best-season/${episode.slug}`,
    isPartOf: {
      "@type": "VideoObject",
      name: tenant.videos.seriesTitle,
      description: tenant.videos.seriesDescription,
      url: tenant.videos.featuredPlaylistUrl,
    },
    // The shared Person node, so the video credits the one canonical Becca.
    author: { "@id": PERSON_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
