import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../config/theme';
import { UniversityStackParamList } from '../../types/navigation.types';
import { Ionicons } from '@expo/vector-icons';

import LoadingState from '../../components/universityDetail/LoadingState';
import ErrorState from '../../components/universityDetail/ErrorState';
import UniversityHeader from '../../components/universityDetail/UniversityHeader';
import DomainSection from '../../components/universityDetail/DomainSection';
import WebsitesSection from '../../components/universityDetail/WebsitesSection';

import { useUniversityDetail } from '../../hooks/useUniversityDetail';


type UniversityDetailRouteProps = RouteProp<UniversityStackParamList, 'UniversityDetail'>;

export const UniversityDetailScreen: React.FC = () => {
  const route = useRoute<UniversityDetailRouteProps>();
  const navigation = useNavigation();
  const { id } = route.params;
  
  const { 
    university, 
    loading, 
    error, 
    isFavorited,
    fetchUniversity, 
    toggleFavorite 
  } = useUniversityDetail(id);
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={toggleFavorite}
        >
          <Ionicons 
            name={isFavorited ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorited ? COLORS.accent : COLORS.white} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isFavorited, toggleFavorite]);
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error || !university) {
    return <ErrorState errorMessage={error || ''} onRetry={fetchUniversity} />;
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <UniversityHeader
        name={university.name}
        country={university.country}
        countryCode={university.alpha_two_code}
        stateProvince={university.state_province}
      />
      
      <DomainSection domains={university.domains} />
      
      <WebsitesSection websites={university.web_pages} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SIZES.md,
  },
  favoriteButton: {
    padding: SIZES.sm,
    marginRight: SIZES.sm,
  }
});