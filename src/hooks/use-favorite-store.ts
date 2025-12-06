'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FavoriteState = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: 'favorite-cars-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFavoriteStore;
