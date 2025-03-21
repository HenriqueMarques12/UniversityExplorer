import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../config/theme';

import { useFavoritesData } from '../../hooks/useFavoritesData';
import LoadingState from '../../components/favorites/LoadingState';
import EmptyState from '../../components/favorites/EmptyState';
import FavoritesList from '../../components/favorites/FavoritesList';

export const FavoritesScreen: React.FC = () => {
  const { favorites, loading, handleUniversityPress } = useFavoritesData();

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }

    if (!favorites || favorites.length === 0) {
      return <EmptyState />;
    }

    return (
      <FavoritesList 
        favorites={favorites} 
        onUniversityPress={handleUniversityPress} 
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  title: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.primaryDark,
  },
});
