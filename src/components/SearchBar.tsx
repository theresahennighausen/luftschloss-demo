import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterPanel from "./FilterPanel";
import { useState, useEffect, useRef } from "react";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFilterOpen &&
        filterPanelRef.current &&
        filterButtonRef.current &&
        !filterPanelRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-full shadow-xl p-2 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-0">
        {/* Where to? */}
        <div className="flex-1 min-w-[160px] px-2 py-2 border-r border-border/40">
          <label className="block text-xs font-semibold text-foreground mb-1.5 ml-2">
            Where to?
          </label>
          <Input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="border-0 p-0 h-8 leading-8 ml-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70 text-sm font-medium text-foreground/90 flex items-center bg-transparent"
          />
        </div>

        {/* Check-in */}
        <div className="flex-1 min-w-[160px] px-2 py-2 border-r border-border/40">
          <label className="block text-xs font-semibold text-foreground mb-1.5 ml-2">
            Check-in
          </label>
          <Input
            type="date"
            placeholder="Select date"
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="border-0 p-0 h-8 leading-8 ml-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70 text-sm font-medium text-foreground/90 flex items-center bg-transparent"
          />
        </div>

        {/* Check-out */}
        <div className="flex-1 min-w-[160px] px-2 py-2 border-r border-border/40">
          <label className="block text-xs font-semibold text-foreground mb-1.5 ml-2">
            Check-out
          </label>
          <Input
            type="date"
            placeholder="Add date"
            value={checkOut}
            onChange={(e) => onCheckOutChange(e.target.value)}
            className="border-0 p-0 h-8 leading-8 ml-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70 text-sm font-medium text-foreground/90 flex items-center bg-transparent"
          />
        </div>

        {/* Who? */}
        <div className="flex-1 min-w-[160px] px-2 py-2 border-r border-border/40">
          <label className="block text-xs font-semibold text-foreground mb-1.5 ml-2">
            Who?
          </label>
          <Input
            type="text"
            placeholder="Add guests"
            value={guests}
            onChange={(e) => onGuestsChange(e.target.value)}
            className="border-0 p-0 h-8 leading-8 ml-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70 text-sm font-medium text-foreground/90 flex items-center bg-transparent"
          />
        </div>

        {/* Other filters */}
        <div className="relative flex-1 min-w-[160px] px-2 py-2">
          <label className="block text-xs font-semibold text-foreground mb-1.5 ml-2">
            Other filters
          </label>
          <button
            ref={filterButtonRef}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="h-8 px-3 ml-2 rounded-full bg-transparent border-0 text-sm font-medium text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Choose more</span>
          </button>
          <div ref={filterPanelRef}>
            <FilterPanel
              isOpen={isFilterOpen}
              selectedFilters={selectedFilters}
              onFilterChange={onFilterChange}
            />
          </div>
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
