import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface FavoritesList {
  id: string;
  name: string;
  listingIds: string[];
}

interface FavoritesContextValue {
  lists: FavoritesList[];
  createList: (name: string) => string;
  renameList: (id: string, name: string) => void;
  deleteList: (id: string) => void;
  addListingToList: (listId: string, listingId: string) => void;
  removeListingFromList: (listId: string, listingId: string) => void;
  setListingLists: (listingId: string, listIds: string[]) => void;
  getListsForListing: (listingId: string) => string[];
  isFavorite: (listingId: string) => boolean;
  removeFromAllLists: (listingId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY = "luftschloss.favorites.v1";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<FavoritesList[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    } catch {}
  }, [lists]);

  const createList = (name: string) => {
    const id = `list-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setLists((prev) => [...prev, { id, name: name.trim() || "Untitled list", listingIds: [] }]);
    return id;
  };

  const renameList = (id: string, name: string) =>
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, name } : l)));

  const deleteList = (id: string) =>
    setLists((prev) => prev.filter((l) => l.id !== id));

  const addListingToList = (listId: string, listingId: string) =>
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId && !l.listingIds.includes(listingId)
          ? { ...l, listingIds: [...l.listingIds, listingId] }
          : l
      )
    );

  const removeListingFromList = (listId: string, listingId: string) =>
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId ? { ...l, listingIds: l.listingIds.filter((id) => id !== listingId) } : l
      )
    );

  const setListingLists = (listingId: string, listIds: string[]) =>
    setLists((prev) =>
      prev.map((l) => {
        const has = l.listingIds.includes(listingId);
        const should = listIds.includes(l.id);
        if (has && !should) return { ...l, listingIds: l.listingIds.filter((id) => id !== listingId) };
        if (!has && should) return { ...l, listingIds: [...l.listingIds, listingId] };
        return l;
      })
    );

  const getListsForListing = (listingId: string) =>
    lists.filter((l) => l.listingIds.includes(listingId)).map((l) => l.id);

  const isFavorite = (listingId: string) =>
    lists.some((l) => l.listingIds.includes(listingId));

  const removeFromAllLists = (listingId: string) =>
    setLists((prev) =>
      prev.map((l) => ({ ...l, listingIds: l.listingIds.filter((id) => id !== listingId) }))
    );

  return (
    <FavoritesContext.Provider
      value={{
        lists,
        createList,
        renameList,
        deleteList,
        addListingToList,
        removeListingFromList,
        setListingLists,
        getListsForListing,
        isFavorite,
        removeFromAllLists,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};
