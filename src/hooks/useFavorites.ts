import { useEffect } from 'react';
import { useFavoritesStore } from '../store/favoritesStore';

export const useFavorites = () => {
  const { 
    favorites, 
    loading, 
    loadFavorites, 
    addFavorite, 
    removeFavorite, 
    isFavorite 
  } = useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
