import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import FavoritesDialog from "./FavoritesDialog";

interface ListingCardProps {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
}

const ListingCard = ({ id, title, location, imageUrl }: ListingCardProps) => {
  const { isInAnyList, removeFromAllLists } = useFavorites();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isFavorited = isInAnyList(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorited) {
      removeFromAllLists(id);
    } else {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
            aria-label={isFavorited ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorited
                  ? "fill-primary text-primary"
                  : "text-foreground/60 hover:text-primary"
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-xs text-foreground/70">{location}</p>
        </div>
      </div>
      <FavoritesDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        listingId={id}
      />
    </>
  );
};

export default ListingCard;
