import { Listing } from "@/data/mockListings";
import ListingCard from "./ListingCard";

interface ListingsGridProps {
  listings: Listing[];
}

const ListingsGrid = ({ listings }: ListingsGridProps) => {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-foreground/70">
          No listings found. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          title={listing.title}
          location={listing.location}
        />
      ))}
    </div>
  );
};

export default ListingsGrid;
