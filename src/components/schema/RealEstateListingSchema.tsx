import { resolveSiteUrl } from "@/site.config";
import { isPlaceholderMode } from "@/lib/placeholder";

/**
 * RealEstateListing structured data for individual listing detail pages.
 * Wires the property into Google's rich-results pipeline for real estate.
 *
 * Reference: https://schema.org/RealEstateListing
 */
interface Props {
  mlsId: string;
  name: string;
  description?: string;
  url?: string;
  image?: string | string[];
  price?: string;
  priceCurrency?: string;
  numberOfBedrooms?: number;
  numberOfBathroomsTotal?: number;
  floorSize?: { value: number; unitText?: string };
  lotSize?: { value: number; unitText?: string };
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
  };
  geo?: { latitude: number; longitude: number };
  yearBuilt?: number;
  datePosted?: string;
  availabilityStarts?: string;
  status?: "active" | "pending" | "sold" | "coming-soon";
}

export function RealEstateListingSchema(props: Props) {
  // Suppressed while placeholder identity is live (see src/lib/placeholder.ts).
  if (isPlaceholderMode()) return null;

  const base = resolveSiteUrl();
  const url = props.url ? `${base}${props.url}` : `${base}/listings/${props.mlsId}`;

  const offers = props.price
    ? {
        "@type": "Offer",
        price: props.price.replace(/[^0-9.]/g, ""),
        priceCurrency: props.priceCurrency ?? "USD",
        availability:
          props.status === "sold"
            ? "https://schema.org/SoldOut"
            : props.status === "pending"
              ? "https://schema.org/LimitedAvailability"
              : "https://schema.org/InStock",
      }
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    name: props.name,
    description: props.description,
    url,
    image: props.image,
    identifier: props.mlsId,
    datePosted: props.datePosted,
    availabilityStarts: props.availabilityStarts,
    numberOfBedrooms: props.numberOfBedrooms,
    numberOfBathroomsTotal: props.numberOfBathroomsTotal,
    floorSize: props.floorSize
      ? {
          "@type": "QuantitativeValue",
          value: props.floorSize.value,
          unitText: props.floorSize.unitText ?? "SQFT",
        }
      : undefined,
    lotSize: props.lotSize
      ? {
          "@type": "QuantitativeValue",
          value: props.lotSize.value,
          unitText: props.lotSize.unitText ?? "SQFT",
        }
      : undefined,
    address: props.address
      ? {
          "@type": "PostalAddress",
          ...props.address,
          addressCountry: "US",
        }
      : undefined,
    geo: props.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: props.geo.latitude,
          longitude: props.geo.longitude,
        }
      : undefined,
    yearBuilt: props.yearBuilt,
    offers,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, (_, v) => (v === undefined ? undefined : v)),
      }}
    />
  );
}
