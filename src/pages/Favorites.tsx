import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import CloudDecoration from "@/components/CloudDecoration";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { mockListings } from "@/data/mockListings";

const Favorites = () => {
  const { lists, deleteList } = useFavorites();
  const [openListId, setOpenListId] = useState<string | null>(null);

  const openList = openListId ? lists.find((l) => l.id === openListId) : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CloudDecoration />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white drop-shadow">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="font-pacifico text-4xl text-white drop-shadow-lg">
            {openList ? openList.name : "Favorites"}
          </h1>
          <div className="w-16" />
        </div>

        {!openList && (
          <>
            {lists.length === 0 ? (
              <div className="text-center py-20 bg-white/70 rounded-3xl backdrop-blur-sm">
                <p className="text-lg text-foreground/70">
                  No favorite lists yet. Tap the heart on any stay to start saving.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lists.map((list) => {
                  const previewListings = list.listingIds
                    .map((id) => mockListings.find((l) => l.id === id))
                    .filter(Boolean)
                    .slice(0, 4);
                  return (
                    <button
                      key={list.id}
                      onClick={() => setOpenListId(list.id)}
                      className="text-left bg-white/80 backdrop-blur-sm rounded-3xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      <div className="grid grid-cols-2 gap-1 aspect-square rounded-2xl overflow-hidden mb-3 bg-pink-50">
                        {previewListings.length === 0 && (
                          <div className="col-span-2 row-span-2 flex items-center justify-center text-foreground/40">
                            Empty
                          </div>
                        )}
                        {previewListings.map((l) => (
                          <img
                            key={l!.id}
                            src={l!.imageUrl}
                            alt={l!.title}
                            className="w-full h-full object-cover"
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{list.name}</h3>
                          <p className="text-xs text-foreground/60">{list.listingIds.length} stays</p>
                        </div>
                        <span
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteList(list.id);
                          }}
                          className="p-2 rounded-full hover:bg-pink-100 text-foreground/60"
                        >
                          <Trash2 className="w-4 h-4" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {openList && (
          <>
            <Button
              variant="ghost"
              onClick={() => setOpenListId(null)}
              className="mb-4 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> All lists
            </Button>
            {openList.listingIds.length === 0 ? (
              <div className="text-center py-20 bg-white/70 rounded-3xl">
                <p className="text-foreground/70">This list is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {openList.listingIds
                  .map((id) => mockListings.find((l) => l.id === id))
                  .filter(Boolean)
                  .map((l) => (
                    <Link key={l!.id} to={`/listing/${l!.id}`}>
                      <ListingCard title={l!.title} location={l!.location} imageUrl={l!.imageUrl} />
                    </Link>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
