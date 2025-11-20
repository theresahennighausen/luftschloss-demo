import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  selectedFilters: string[];
  onFilterChange: (filterId: string, checked: boolean) => void;
}

const filterOptions: FilterOption[] = [
  { id: "petFriendly", label: "Pet friendly" },
  { id: "allergyFriendly", label: "Allergy friendly" },
  { id: "familyFriendly", label: "Family friendly" },
  { id: "treeHouses", label: "Tree houses" },
  { id: "houseBoats", label: "House boats" },
  { id: "castles", label: "Castles" },
  { id: "withAView", label: "With a view" },
  { id: "pool", label: "Pool" },
  { id: "wifi", label: "Wifi" },
  { id: "sauna", label: "Sauna" },
];

const FilterPanel = ({ isOpen, selectedFilters, onFilterChange }: FilterPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-lg p-6 z-50 w-64">
      <div className="space-y-4">
        {filterOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <Checkbox
              id={option.id}
              checked={selectedFilters.includes(option.id)}
              onCheckedChange={(checked) => 
                onFilterChange(option.id, checked as boolean)
              }
            />
            <Label
              htmlFor={option.id}
              className="text-sm font-normal cursor-pointer text-foreground"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
