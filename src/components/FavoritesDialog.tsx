import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Check, Plus, Heart } from "lucide-react";

interface FavoritesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: string;
}

const FavoritesDialog = ({ open, onOpenChange, listingId }: FavoritesDialogProps) => {
  const { lists, createList, addToList, removeFromList } = useFavorites();
  const [newListName, setNewListName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const handleToggleList = (listId: string, isInList: boolean) => {
    if (isInList) {
      removeFromList(listId, listingId);
    } else {
      addToList(listId, listingId);
    }
  };

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const newList = createList(newListName.trim());
    addToList(newList.id, listingId);
    setNewListName("");
    setShowCreate(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Zu Favoritenliste hinzufügen
          </DialogTitle>
          <DialogDescription>
            Wähle eine Liste oder erstelle eine neue.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {lists.length === 0 && !showCreate && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Du hast noch keine Favoritenlisten. Erstelle deine erste!
            </p>
          )}
          {lists.map((list) => {
            const isInList = list.listingIds.includes(listingId);
            return (
              <button
                key={list.id}
                onClick={() => handleToggleList(list.id, isInList)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
              >
                <span className="font-medium text-sm text-foreground">{list.name}</span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {list.listingIds.length} {list.listingIds.length === 1 ? "Unterkunft" : "Unterkünfte"}
                  {isInList && <Check className="w-4 h-4 text-primary" />}
                </span>
              </button>
            );
          })}
        </div>

        {showCreate ? (
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Listenname…"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateList()}
              autoFocus
              className="bg-secondary/30"
            />
            <Button onClick={handleCreateList} size="sm" disabled={!newListName.trim()}>
              Erstellen
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setShowCreate(false); setNewListName(""); }}>
              ✕
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full mt-2 gap-2"
            onClick={() => setShowCreate(true)}
          >
            <Plus className="w-4 h-4" />
            Neue Liste erstellen
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FavoritesDialog;
