import { useState, useRef, useCallback } from 'react';
import { Animated, FlatList, ViewToken } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useOnboarding } from '../hooks/useOnboarding';
import { RootStackParamList } from '../types/navigation.types';
import { onboardingData } from '../constants/onboardingData';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const useOnboardingNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const { completeOnboarding } = useOnboarding();
  
  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50
  }).current;
  
  const viewableItemsChanged = useRef(({ 
    viewableItems 
  }: { 
    viewableItems: Array<ViewToken>; 
    changed: Array<ViewToken> 
  }) => {
    if (viewableItems[0] && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  
  const scrollTo = useCallback(() => {
    if (currentIndex < onboardingData.length - 1) {
      try {
        slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
      } catch (error) {
        console.error('Erro ao rolar para o índice:', error);
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      completeOnboardingHandler();
    }
  }, [currentIndex]);
  
  const completeOnboardingHandler = async () => {
    try {
      await completeOnboarding();
      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    } catch (error) {
      setError('Erro ao concluir o onboarding. Tente novamente.');
      
      try {
        setTimeout(() => {
          navigation.navigate('Main' as any);
        }, 100);
      } catch (navError) {
        console.error('Falha na navegação de fallback:', navError);
      }
    }
  };
  
  return {
    currentIndex,
    scrollX,
    slidesRef,
    error,
    viewableItemsChanged,
    viewConfig,
    scrollTo,
    completeOnboardingHandler,
    isLastSlide: currentIndex === onboardingData.length - 1,
    totalSlides: onboardingData.length
  };
};
