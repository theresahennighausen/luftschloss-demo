import { useState, useEffect } from "react";
import CloudDecoration from "@/components/CloudDecoration";
import SearchBar from "@/components/SearchBar";
import ListingsGrid from "@/components/ListingsGrid";
import { searchListings } from "@/api/api";
import { Listing } from "@/data/mockListings";

const Index = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);

  // Initialize with all listings and update when filters change
  useEffect(() => {
    const results = searchListings({
      location,
      filters: selectedFilters,
    });
    setListings(results);
  }, [location, selectedFilters]);

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setSelectedFilters((prev) =>
      checked ? [...prev, filterId] : prev.filter((f) => f !== filterId)
    );
  };

  const handleSearch = () => {
    const results = searchListings({
      location,
      filters: selectedFilters,
    });
    setListings(results);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CloudDecoration />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="font-pacifico text-5xl text-white drop-shadow-lg">
            Luftschloss
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar
            location={location}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            selectedFilters={selectedFilters}
            onLocationChange={setLocation}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
            onGuestsChange={setGuests}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </div>

        {/* Listings Grid */}
        <div className="mt-8">
          <ListingsGrid listings={listings} />
        </div>
      </div>
    </div>
  );
};

export default Index;
