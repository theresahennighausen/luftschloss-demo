import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface FavoritesList {
  id: string;
  name: string;
  listingIds: string[];
}

interface FavoritesContextType {
  lists: FavoritesList[];
  isListingFavorited: (listingId: string) => boolean;
  getListsForListing: (listingId: string) => FavoritesList[];
  addToList: (listingId: string, listId: string) => void;
  removeFromList: (listingId: string, listId: string) => void;
  removeFromAllLists: (listingId: string) => void;
  createList: (name: string, listingId?: string) => FavoritesList;
  deleteList: (listId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "luftschloss-favorites";

const loadFromStorage = (): FavoritesList[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<FavoritesList[]>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const isListingFavorited = useCallback(
    (listingId: string) => lists.some((l) => l.listingIds.includes(listingId)),
    [lists]
  );

  const getListsForListing = useCallback(
    (listingId: string) => lists.filter((l) => l.listingIds.includes(listingId)),
    [lists]
  );

  const addToList = useCallback((listingId: string, listId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId && !l.listingIds.includes(listingId)
          ? { ...l, listingIds: [...l.listingIds, listingId] }
          : l
      )
    );
  }, []);

  const removeFromList = useCallback((listingId: string, listId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, listingIds: l.listingIds.filter((id) => id !== listingId) }
          : l
      )
    );
  }, []);

  const removeFromAllLists = useCallback((listingId: string) => {
    setLists((prev) =>
      prev.map((l) => ({
        ...l,
        listingIds: l.listingIds.filter((id) => id !== listingId),
      }))
    );
  }, []);

  const createList = useCallback((name: string, listingId?: string): FavoritesList => {
    const newList: FavoritesList = {
      id: crypto.randomUUID(),
      name,
      listingIds: listingId ? [listingId] : [],
    };
    setLists((prev) => [...prev, newList]);
    return newList;
  }, []);

  const deleteList = useCallback((listId: string) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        lists,
        isListingFavorited,
        getListsForListing,
        addToList,
        removeFromList,
        removeFromAllLists,
        createList,
        deleteList,
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
