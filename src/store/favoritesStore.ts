import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { University } from '../types/university.types';

const FAVORITES_KEY = '@university-explorer:favorites';

interface FavoritesState {
  favorites: University[];
  loading: boolean;
  loadFavorites: () => void;
  addFavorite: (university: University) => void;
  removeFavorite: (universityId: string) => void;
  isFavorite: (universityId: string) => boolean;
}

const normalizeId = (university: any): University => {
  const normalizedUniversity = {
    ...university,
    id: university.id || university._id
  };
  return normalizedUniversity;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: true,

  loadFavorites: async () => {
    try {
      set({ loading: true });
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        const normalizedFavorites = parsedFavorites.map(normalizeId);
        
        const uniqueMap = new Map();
        normalizedFavorites.forEach((fav: { id: any; }) => {
          uniqueMap.set(fav.id, fav);
        });
        
        set({ favorites: Array.from(uniqueMap.values()), loading: false });
      } else {
        set({ favorites: [], loading: false });
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      set({ favorites: [], loading: false });
    }
  },

  addFavorite: async (university: University) => {
    try {
      const normalizedUniversity = normalizeId(university);
      const currentFavorites = get().favorites;
      
      const exists = currentFavorites.some(fav => fav.id === normalizedUniversity.id);
      if (exists) return;
      
      const updatedFavorites = [...currentFavorites, normalizedUniversity];
      set({ favorites: updatedFavorites });
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  removeFavorite: async (universityId: string) => {
    try {
      const updatedFavorites = get().favorites.filter((fav) => {
        const favId = fav.id || fav._id;
        return favId !== universityId;
      });
      set({ favorites: updatedFavorites });
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  isFavorite: (universityId: string): boolean => {
    if (!universityId) return false;
    return get().favorites.some(fav => {
      const favId = fav.id || fav._id;
      return favId === universityId;
    });
  },
}));
