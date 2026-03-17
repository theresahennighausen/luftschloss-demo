import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface FavoriteList {
  id: string;
  name: string;
  listingIds: string[];
}

interface FavoritesContextType {
  lists: FavoriteList[];
  createList: (name: string) => FavoriteList;
  addToList: (listId: string, listingId: string) => void;
  removeFromList: (listId: string, listingId: string) => void;
  removeFromAllLists: (listingId: string) => void;
  isInAnyList: (listingId: string) => boolean;
  getListsForListing: (listingId: string) => FavoriteList[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "luftschloss-favorites";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<FavoriteList[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const createList = (name: string): FavoriteList => {
    const newList: FavoriteList = {
      id: crypto.randomUUID(),
      name,
      listingIds: [],
    };
    setLists((prev) => [...prev, newList]);
    return newList;
  };

  const addToList = (listId: string, listingId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId && !list.listingIds.includes(listingId)
          ? { ...list, listingIds: [...list.listingIds, listingId] }
          : list
      )
    );
  };

  const removeFromList = (listId: string, listingId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, listingIds: list.listingIds.filter((id) => id !== listingId) }
          : list
      )
    );
  };

  const removeFromAllLists = (listingId: string) => {
    setLists((prev) =>
      prev.map((list) => ({
        ...list,
        listingIds: list.listingIds.filter((id) => id !== listingId),
      }))
    );
  };

  const isInAnyList = (listingId: string) =>
    lists.some((list) => list.listingIds.includes(listingId));

  const getListsForListing = (listingId: string) =>
    lists.filter((list) => list.listingIds.includes(listingId));

  return (
    <FavoritesContext.Provider
      value={{ lists, createList, addToList, removeFromList, removeFromAllLists, isInAnyList, getListsForListing }}
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
