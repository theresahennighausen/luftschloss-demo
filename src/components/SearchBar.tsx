import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterPanel from "./FilterPanel";
import { useState } from "react";

interface SearchBarProps {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  selectedFilters: string[];
  onLocationChange: (value: string) => void;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onGuestsChange: (value: string) => void;
  onFilterChange: (filterId: string, checked: boolean) => void;
  onSearch: () => void;
}

const SearchBar = ({
  location,
  checkIn,
  checkOut,
  guests,
  selectedFilters,
  onLocationChange,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onFilterChange,
  onSearch,
}: SearchBarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-full shadow-xl p-2 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-0">
        {/* Where to? */}
        <div className="flex-1 min-w-[140px] px-4 py-2 border-r border-border">
          <label className="block text-xs font-semibold text-foreground mb-1">
            Where to?
          </label>
          <Input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Check-in */}
        <div className="flex-1 min-w-[120px] px-4 py-2 border-r border-border">
          <label className="block text-xs font-semibold text-foreground mb-1">
            Check-in
          </label>
          <Input
            type="date"
            placeholder="Add date"
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Check-out */}
        <div className="flex-1 min-w-[120px] px-4 py-2 border-r border-border">
          <label className="block text-xs font-semibold text-foreground mb-1">
            Check-out
          </label>
          <Input
            type="date"
            placeholder="Add date"
            value={checkOut}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Who? */}
        <div className="flex-1 min-w-[100px] px-4 py-2 border-r border-border">
          <label className="block text-xs font-semibold text-foreground mb-1">
            Who?
          </label>
          <Input
            type="text"
            placeholder="Add guests"
            value={guests}
            onChange={(e) => onGuestsChange(e.target.value)}
            className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-sm"
          />
        </div>

        {/* Other filters */}
        <div className="relative flex-1 min-w-[120px] px-4 py-2">
          <label className="block text-xs font-semibold text-foreground mb-1">
            Other filters
          </label>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left"
          >
            <span className="flex items-center gap-1">
              <input type="checkbox" className="mr-1" readOnly checked={isFilterOpen} />
              Choose
            </span>
          </button>
          <FilterPanel
            isOpen={isFilterOpen}
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
          />
        </div>

        {/* Search button */}
        <Button
          onClick={onSearch}
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-transform shadow-md flex items-center justify-center"
        >
          <Search className="w-5 h-5 text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
