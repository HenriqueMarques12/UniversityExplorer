import React from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { COLORS } from '../../config/theme';

import { onboardingData } from '../../constants/onboardingData';
import { useOnboardingNavigation } from '../../hooks/useOnboardingNavigation';
import OnboardingItem from '../../components/onboarding/OnboardingItem';
import OnboardingControls from '../../components/onboarding/OnboardingControls';
import ErrorMessage from '../../components/onboarding/ErrorMessage';

export const OnboardingScreen: React.FC = () => {
  const {
    scrollX,
    slidesRef,
    error,
    viewableItemsChanged,
    viewConfig,
    scrollTo,
    completeOnboardingHandler,
    isLastSlide,
  } = useOnboardingNavigation();

  return (
    <View style={styles.container}>
      <ErrorMessage message={error || ''} />

      <View style={styles.slidesContainer}>
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={3}
        />
      </View>

      <OnboardingControls
        isLastSlide={isLastSlide}
        onNext={scrollTo}
        onSkip={completeOnboardingHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slidesContainer: {
    flex: 3,
  },
});
