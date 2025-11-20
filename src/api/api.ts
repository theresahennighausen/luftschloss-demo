import { mockListings, Listing } from "@/data/mockListings";

export interface SearchParams {
  location?: string;
  filters: string[];
}

/**
 * Mock API function to search listings based on location and selected filters
 */
export function searchListings(params: SearchParams): Listing[] {
  let results = [...mockListings];

  // Filter by location (case-insensitive substring match)
  if (params.location && params.location.trim() !== "") {
    const searchTerm = params.location.toLowerCase();
    results = results.filter(
      (listing) =>
        listing.location.toLowerCase().includes(searchTerm) ||
        listing.title.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by selected tags (listing must have ALL selected filters)
  if (params.filters.length > 0) {
    results = results.filter((listing) =>
      params.filters.every((filter) => listing.tags.includes(filter))
    );
  }

  return results;
}
