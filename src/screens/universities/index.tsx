// src/screens/UniversityList/index.tsx
import React, { useState, useCallback, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  Text, 
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFavorites } from '../../hooks/useFavorites';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { UniversityListScreenNavigationProp } from '../../types/navigation.types';

import { useUniversityList } from '../../hooks/useUniversityList';
import SearchBar from '../../components/university/SearchBar';
import CountryFilters from '../../components/university/CountryFilters';
import ExpandedFilters from '../../components/university/ExpandedFilters';
import UniversityCard from '../../components/university/UniversityCard';
import EmptyState from '../../components/university/EmptyState';
import CountrySelector from '../../components/university/CountrySelector';

export const UniversityListScreen: React.FC = () => {
  const navigation = useNavigation<UniversityListScreenNavigationProp>();
  const { isFavorite } = useFavorites();
  const {
    universities,
    loading,
    refreshing,
    searchText,
    country,
    totalItems,
    page,
    loadingMore,
    error,
    handleRefresh,
    handleLoadMore,
    handleSearch,
    handleSelectCountry,
    setSearchText
  } = useUniversityList();

  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [countryName, setCountryName] = useState<string>('Brasil');

  const listRef = useRef<FlatList>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  const handleClearSearch = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);
  
  const handleToggleFilters = useCallback(() => {
    setShowAllFilters(prev => !prev);
    Keyboard.dismiss();
  }, []);
  
  const handleOpenMoreFilters = useCallback(() => {
    bottomSheetRef.current?.expand();
    Keyboard.dismiss();
  }, []);
  
  const handleCountrySelect = useCallback((value: string, label: string) => {
    handleSelectCountry(value);
    setCountryName(label);
    setShowAllFilters(false);
    bottomSheetRef.current?.close();
    Keyboard.dismiss();
  }, [handleSelectCountry]);
  
  const handleScrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);
  
  const handleScroll = useCallback(({ nativeEvent }: any) => {
    const offset = nativeEvent.contentOffset.y;
    setShowScrollTop(offset > 300);
  }, []);
  
  const handleUniversityPress = useCallback((id: string) => {
    navigation.navigate('UniversityDetail', { id });
  }, [navigation]);

  const renderResultsInfo = () => {
    if (loading || universities.length === 0) return null;
    
    return (
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>
          {totalItems} {totalItems === 1 ? 'universidade encontrada' : 'universidades encontradas'}
          {page > 1 ? ` • Página ${page}` : ''}
        </Text>
      </View>
    );
  };
  
  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }, [loadingMore]);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchText}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
        />
        
        <CountryFilters
          selectedCountry={country}
          onSelectCountry={handleCountrySelect}
          onToggleExpandedFilters={handleToggleFilters}
          onOpenMoreFilters={handleOpenMoreFilters}
          showAllFilters={showAllFilters}
        />
        
        {showAllFilters && (
          <ExpandedFilters
            selectedCountry={country}
            onSelectCountry={handleCountrySelect}
            onOpenMoreFilters={handleOpenMoreFilters}
          />
        )}
        
        {renderResultsInfo()}
      </View>
      
      {loading && universities.length === 0 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando universidades...</Text>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={universities}
          renderItem={({ item }) => (
            <UniversityCard
              university={item}
              isFavorite={isFavorite(item.id || item._id)}
              onPress={handleUniversityPress}
            />
          )}
          keyExtractor={(item) => item.id || item._id}
          contentContainerStyle={[
            styles.listContainer,
            universities.length === 0 && styles.emptyList
          ]}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <EmptyState error={error} onRetry={handleRefresh} />
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}
      
      {showScrollTop && (
        <TouchableOpacity 
          style={styles.scrollTopButton}
          onPress={handleScrollToTop}
          accessible={true}
          accessibilityLabel="Voltar ao topo da lista"
        >
          <Ionicons name="arrow-up" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
      
      <CountrySelector
        bottomSheetRef={bottomSheetRef}
        selectedCountry={country}
        onSelectCountry={handleCountrySelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  resultsInfo: {
    marginTop: SIZES.sm,
  },
  resultsText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SIZES.sm,
  },
  listContainer: {
    padding: SIZES.sm,
    paddingBottom: SIZES.xl,
  },
  emptyList: {
    flexGrow: 1,
  },
  footerLoader: {
    paddingVertical: SIZES.md,
    alignItems: 'center',
  },
  scrollTopButton: {
    position: 'absolute',
    right: SIZES.lg,
    bottom: SIZES.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
