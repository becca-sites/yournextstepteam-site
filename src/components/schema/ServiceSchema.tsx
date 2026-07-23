import { siteConfig, resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";

interface Props {
  name: string;
  serviceType: string;
  description?: string;
}

export function ServiceSchema({ name, serviceType, description }: Props) {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description: description ?? `${name} across ${siteConfig.serviceArea.join(", ")}`,
    provider: { "@id": `${base}#agent` },
    areaServed: siteConfig.serviceArea.map((city) => ({ "@type": "City", name: city })),
    audience: { "@type": "Audience", audienceType: "Real estate buyers and sellers" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
