import { tenant } from "@/config/tenant";
import type { IdxAdapter, IdxProvider } from "./types";

/**
 * Adapter factory. Returns the active IDX adapter based on the tenant config.
 *
 * Adapters are intentionally stubbed for the chassis. Each tenant deployment
 * wires a real adapter in Phase 2 once their MLS credentials are in hand.
 *
 * Usage in a server component:
 *   const idx = getIdxAdapter();
 *   const { results } = await idx.search({ city: "Duvall", page: 1 });
 */
export function getIdxAdapter(): IdxAdapter {
  const provider = (tenant.listings.feedSource as IdxProvider) ?? "boldtrail";

  // All adapters return empty results in the chassis. Real implementations
  // live in tenant deployments and are loaded dynamically per tenant.
  const stub: IdxAdapter = {
    provider,
    async search() {
      return { results: [], total: 0, page: 1, perPage: 0 };
    },
    async detail() {
      return null;
    },
  };

  return stub;
}

export type { IdxAdapter, IdxProvider, ListingDetail, ListingSummary, ListingSearchFilters, ListingSearchResult } from "./types";
