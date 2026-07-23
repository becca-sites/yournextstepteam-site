import { resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";
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
    author: {
      "@type": "Person",
      name: tenant.agent.name,
      url: base,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
