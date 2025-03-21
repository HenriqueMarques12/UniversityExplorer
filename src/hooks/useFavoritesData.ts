import { useCallback } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigation } from '@react-navigation/native';
import { UniversityListScreenNavigationProp } from '../types/navigation.types';

export const useFavoritesData = () => {
  const { favorites, loading } = useFavorites();
  const navigation = useNavigation<UniversityListScreenNavigationProp>();

  const handleUniversityPress = useCallback((id: string) => {
    if (!id) {
      console.error("ID da universidade é indefinido ou nulo");
      return;
    }
    console.log("Navegando para universidade com ID:", id);
    navigation.navigate('UniversityDetail', { id });
  }, [navigation]);

  return {
    favorites,
    loading,
    handleUniversityPress,
  };
};
