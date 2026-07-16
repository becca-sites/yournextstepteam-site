/**
 * IDX adapter abstraction.
 *
 * The chassis supports multiple MLS data sources without component-level lock-in.
 * Each adapter implements this interface. Concrete adapters live alongside this
 * file (reso.ts, simplyrets.ts, boldtrail.ts).
 *
 * Default per the playbook:
 *  1. RESO Web API (direct MLS access, the gold standard)
 *  2. SimplyRETS (affordable aggregator fallback)
 *  3. BoldTrail (single-vendor stack, last resort)
 */

export type IdxProvider = "reso" | "simplyrets" | "boldtrail" | "custom";

export type ListingStatus = "active" | "pending" | "sold" | "coming-soon";

export interface ListingSummary {
  mlsId: string;
  status: ListingStatus;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: number;
  yearBuilt?: number;
  photoUrl?: string;
  detailPath: string;
}

export interface ListingDetail extends ListingSummary {
  description: string;
  photos: string[];
  features: string[];
  hoaFee?: number;
  taxAnnual?: number;
  geo?: { lat: number; lng: number };
  listAgent?: { name: string; phone?: string; email?: string };
}

export interface ListingSearchFilters {
  city?: string;
  zip?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  status?: ListingStatus[];
  page?: number;
  perPage?: number;
}

export interface ListingSearchResult {
  results: ListingSummary[];
  total: number;
  page: number;
  perPage: number;
}

export interface IdxAdapter {
  provider: IdxProvider;
  search(filters: ListingSearchFilters): Promise<ListingSearchResult>;
  detail(mlsId: string): Promise<ListingDetail | null>;
}
