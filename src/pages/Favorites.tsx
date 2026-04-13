import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites, FavoritesList } from "@/contexts/FavoritesContext";
import { mockListings } from "@/data/mockListings";
import ListingCard from "@/components/ListingCard";
import FavoriteButton from "@/components/FavoriteButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Favorites = () => {
  const navigate = useNavigate();
  const { lists, deleteList } = useFavorites();
  const [openListId, setOpenListId] = useState<string | null>(null);

  const openList = lists.find((l) => l.id === openListId);

  if (openList) {
    const listings = mockListings.filter((l) => openList.listingIds.includes(l.id));
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white">
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setOpenListId(null)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to lists
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                deleteList(openList.id);
                setOpenListId(null);
                toast({ title: "List deleted" });
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete list
            </Button>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">{openList.name}</h1>

          {listings.length === 0 ? (
            <p className="text-foreground/60 text-center py-16">This list is empty.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="relative group">
                  <Link to={`/listing/${listing.id}`}>
                    <ListingCard
                      title={listing.title}
                      location={listing.location}
                      imageUrl={listing.imageUrl}
                    />
                  </Link>
                  <div className="absolute top-3 right-3 z-10">
                    <FavoriteButton listingId={listing.id} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Favorites</h1>

        {lists.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
            <p className="text-lg text-foreground/60">No favorites yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Tap the heart icon on any listing to save it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => {
              const preview = mockListings.find((l) => list.listingIds.includes(l.id));
              return (
                <button
                  key={list.id}
                  onClick={() => setOpenListId(list.id)}
                  className="text-left bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    {preview ? (
                      <img
                        src={preview.imageUrl}
                        alt={list.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Heart className="w-10 h-10 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{list.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {list.listingIds.length} {list.listingIds.length === 1 ? "listing" : "listings"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
