import { useState } from "react";
import { Heart, Plus, Check } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { mockListings } from "@/data/mockListings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  listingId: string;
  className?: string;
  size?: "sm" | "md";
}

const suggestListNames = (listingId: string): string[] => {
  const listing = mockListings.find((l) => l.id === listingId);
  if (!listing) return [];
  const city = listing.location.split(",")[0].trim();
  const suggestions: string[] = [];
  if (city) suggestions.push(city);
  if (listing.tags.includes("petFriendly")) suggestions.push("Pet-friendly stays");
  if (listing.tags.includes("pool")) suggestions.push("Pool vibes");
  if (listing.tags.includes("sauna")) suggestions.push("Sauna retreats");
  if (listing.tags.includes("treeHouses") || listing.tags.includes("houseBoats"))
    suggestions.push("Unique stays");
  return suggestions.slice(0, 3);
};

const FavoriteButton = ({ listingId, className = "", size = "md" }: FavoriteButtonProps) => {
  const { lists, isListingFavorited, addToList, removeFromAllLists, createList } = useFavorites();
  const [open, setOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedListIds, setSelectedListIds] = useState<Set<string>>(new Set());
  const isFavorited = isListingFavorited(listingId);

  const iconSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const btnSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorited) {
      removeFromAllLists(listingId);
      toast({ title: "Removed from favorites" });
      return;
    }

    // Pre-select lists that already contain this listing
    const preSelected = new Set(
      lists.filter((l) => l.listingIds.includes(listingId)).map((l) => l.id)
    );
    setSelectedListIds(preSelected);
    setNewListName("");
    setOpen(true);
  };

  const toggleList = (listId: string) => {
    setSelectedListIds((prev) => {
      const next = new Set(prev);
      if (next.has(listId)) next.delete(listId);
      else next.add(listId);
      return next;
    });
  };

  const handleConfirm = () => {
    selectedListIds.forEach((id) => addToList(listingId, id));
    setOpen(false);
    toast({ title: "Added to favorites!" });
  };

  const handleCreateAndAdd = () => {
    const name = newListName.trim();
    if (!name) return;
    const newList = createList(name, listingId);
    setSelectedListIds((prev) => new Set(prev).add(newList.id));
    setNewListName("");
    toast({ title: `List "${name}" created` });
  };

  const handleSuggestionClick = (name: string) => {
    const newList = createList(name, listingId);
    setSelectedListIds((prev) => new Set(prev).add(newList.id));
    toast({ title: `List "${name}" created` });
  };

  const suggestions = suggestListNames(listingId).filter(
    (s) => !lists.some((l) => l.name === s)
  );

  return (
    <>
      <button
        onClick={handleClick}
        className={`${btnSize} rounded-full flex items-center justify-center transition-all duration-200 
          ${isFavorited
            ? "bg-primary/90 text-primary-foreground shadow-md hover:bg-primary"
            : "bg-white/80 backdrop-blur-sm text-foreground/60 hover:text-primary hover:bg-white shadow-sm"
          } ${className}`}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`${iconSize} transition-transform duration-200 ${isFavorited ? "fill-current scale-110" : "hover:scale-110"}`}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save to list</DialogTitle>
            <DialogDescription>Choose a favorites list or create a new one.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* Existing lists */}
            {lists.length > 0 && (
              <div className="space-y-2">
                {lists.map((list) => {
                  const isSelected = selectedListIds.has(list.id);
                  return (
                    <button
                      key={list.id}
                      onClick={() => toggleList(list.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors
                        ${isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card hover:border-primary/40"
                        }`}
                    >
                      <span className="font-medium text-sm">{list.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {isSelected ? (
                          <Check className="w-4 h-4 text-primary" />
                        ) : (
                          `${list.listingIds.length} saved`
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Suggested lists */}
            {suggestions.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((name) => (
                    <button
                      key={name}
                      onClick={() => handleSuggestionClick(name)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary/20 transition-colors"
                    >
                      + {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* New list input */}
            <div className="flex gap-2">
              <Input
                placeholder="New list name…"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateAndAdd()}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCreateAndAdd}
                disabled={!newListName.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Confirm */}
            <Button onClick={handleConfirm} className="w-full" disabled={selectedListIds.size === 0}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FavoriteButton;
