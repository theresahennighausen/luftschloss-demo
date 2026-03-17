import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { mockListings } from "@/data/mockListings";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const { lists } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Button>
          <h1 className="font-pacifico text-4xl text-white drop-shadow-lg">
            Favoriten
          </h1>
        </div>

        {lists.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-4 text-primary/40" />
            <h2 className="text-xl font-semibold text-foreground/80 mb-2">
              Noch keine Favoriten
            </h2>
            <p className="text-foreground/60 mb-6">
              Markiere Unterkünfte mit dem Herz-Icon, um sie hier zu speichern.
            </p>
            <Button onClick={() => navigate("/")}>Unterkünfte entdecken</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => {
              const previewListings = list.listingIds
                .slice(0, 4)
                .map((id) => mockListings.find((l) => l.id === id))
                .filter(Boolean);

              return (
                <Link
                  key={list.id}
                  to={`/favorites/${list.id}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Preview grid */}
                  <div className="aspect-[4/3] grid grid-cols-2 grid-rows-2 gap-0.5 bg-muted/30">
                    {[0, 1, 2, 3].map((i) => {
                      const listing = previewListings[i];
                      return (
                        <div key={i} className="overflow-hidden">
                          {listing ? (
                            <img
                              src={listing.imageUrl}
                              alt={listing.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted/50" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{list.name}</h3>
                    <p className="text-xs text-foreground/60 mt-1">
                      {list.listingIds.length} {list.listingIds.length === 1 ? "Unterkunft" : "Unterkünfte"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
