import { useState, useEffect, useCallback } from 'react';
import { universityApi } from '../api/university.api';
import { useFavorites } from '../hooks/useFavorites';
import { University } from '../types/university.types';

export const useUniversityDetail = (universityId: string) => {
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const fetchUniversity = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await universityApi.getUniversityById(universityId);
      console.log("Fetched university data:", data);
      setUniversity(data);
    } catch (error) {
      console.error('Error fetching university:', error);
      setError('Falha ao carregar os detalhes da universidade');
    } finally {
      setLoading(false);
    }
  }, [universityId]);
  
  useEffect(() => {
    const checkFavorite = () => {
      console.log("Checking favorite for ID:", universityId);
      const isFav = isFavorite(universityId);
      console.log("Is favorite:", isFav);
      setIsFavorited(isFav);
    };
    
    fetchUniversity();
    checkFavorite();
  }, [universityId, isFavorite, fetchUniversity]);
  
  const toggleFavorite = useCallback(() => {
    if (university) {
      console.log("Toggling favorite for:", university.name);
      if (isFavorited) {
        removeFavorite(universityId);
      } else {
        addFavorite(university);
      }
      setIsFavorited(!isFavorited);
    }
  }, [university, isFavorited, addFavorite, removeFavorite, universityId]);
  
  
  return {
    university,
    loading,
    error,
    isFavorited,
    fetchUniversity,
    toggleFavorite
  };
};
