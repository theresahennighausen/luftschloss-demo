import { useParams, useNavigate, Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { mockListings } from "@/data/mockListings";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

const FavoritesList = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const { lists } = useFavorites();

  const list = lists.find((l) => l.id === listId);

  if (!list) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Liste nicht gefunden</h2>
          <Button onClick={() => navigate("/favorites")}>Zu Favoriten</Button>
        </div>
      </div>
    );
  }

  const listings = list.listingIds
    .map((id) => mockListings.find((l) => l.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/favorites")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Favoriten
          </Button>
          <h1 className="font-pacifico text-4xl text-white drop-shadow-lg">
            {list.name}
          </h1>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-4 text-primary/40" />
            <h2 className="text-xl font-semibold text-foreground/80 mb-2">
              Diese Liste ist leer
            </h2>
            <p className="text-foreground/60 mb-6">
              Füge Unterkünfte über das Herz-Icon hinzu.
            </p>
            <Button onClick={() => navigate("/")}>Unterkünfte entdecken</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing) => (
              <Link key={listing!.id} to={`/listing/${listing!.id}`}>
                <ListingCard
                  id={listing!.id}
                  title={listing!.title}
                  location={listing!.location}
                  imageUrl={listing!.imageUrl}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
