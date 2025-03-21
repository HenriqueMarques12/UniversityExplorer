import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SIZES } from '../../config/theme';
import { University } from '../../types/university.types';
import FavoriteItem from './FavoriteItem';

interface FavoritesListProps {
  favorites: University[];
  onUniversityPress: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onUniversityPress }) => {
  return (
    <FlatList
      data={favorites}
      keyExtractor={(item, index) => {
        const uniqueId = item.id || item._id || `index-${index}-${item.name}`;
        return uniqueId;
      }}
      renderItem={({ item }) => (
        <FavoriteItem university={item} onPress={onUniversityPress} />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: SIZES.md,
  },
});

export default memo(FavoritesList);
