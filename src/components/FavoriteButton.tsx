import { useMemo, useState, MouseEvent } from "react";
import { Heart, Plus, Check } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { mockListings } from "@/data/mockListings";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  listingId: string;
  variant?: "card" | "detail";
}

const FavoriteButton = ({ listingId, variant = "card" }: FavoriteButtonProps) => {
  const { lists, isFavorite, getListsForListing, setListingLists, createList, removeFromAllLists } = useFavorites();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [newListName, setNewListName] = useState("");

  const favorited = isFavorite(listingId);
  const listing = mockListings.find((l) => l.id === listingId);

  const suggestions = useMemo(() => {
    if (!listing) return [] as string[];
    const city = listing.location.split(",")[0].trim();
    const ideas = [`Trip to ${city}`, ...listing.tags.slice(0, 2).map((t) => `${t.charAt(0).toUpperCase() + t.slice(1)} stays`)];
    const existing = lists.map((l) => l.name.toLowerCase());
    return ideas.filter((s) => !existing.includes(s.toLowerCase()));
  }, [listing, lists]);

  const handleOpen = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      removeFromAllLists(listingId);
      toast({ title: "Removed from favorites" });
      return;
    }
    setSelected(getListsForListing(listingId));
    setNewListName("");
    setOpen(true);
  };

  const toggleSel = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleConfirm = () => {
    let toAssign = [...selected];
    if (newListName.trim()) {
      const id = createList(newListName.trim());
      toAssign.push(id);
    }
    if (toAssign.length === 0) {
      toast({ title: "Select or create a list", variant: "destructive" });
      return;
    }
    setListingLists(listingId, toAssign);
    setOpen(false);
    toast({ title: "Saved to favorites" });
  };

  const useSuggestion = (name: string) => setNewListName(name);

  const sizeClasses = variant === "detail" ? "w-11 h-11" : "w-9 h-9";

  return (
    <>
      <button
        onClick={handleOpen}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        className={cn(
          "flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:scale-110 transition-transform",
          sizeClasses
        )}
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-colors",
            favorited ? "fill-primary text-primary" : "text-foreground/70"
          )}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClick={(e) => e.stopPropagation()} className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-pacifico text-2xl">Save to favorites</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {lists.length > 0 && (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                <p className="text-sm font-medium text-foreground/70">Your lists</p>
                {lists.map((list) => (
                  <label
                    key={list.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100/60 cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.includes(list.id)}
                      onCheckedChange={() => toggleSel(list.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{list.name}</p>
                      <p className="text-xs text-foreground/60">{list.listingIds.length} stays</p>
                    </div>
                    {selected.includes(list.id) && <Check className="w-4 h-4 text-primary" />}
                  </label>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground/70">Create new list</p>
              <Input
                placeholder="List name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="rounded-full bg-pink-50/60 border-pink-200"
              />
              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => useSuggestion(s)}
                      className="text-xs px-3 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-foreground/80 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="rounded-full">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FavoriteButton;
