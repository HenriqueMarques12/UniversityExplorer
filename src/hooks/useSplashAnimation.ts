import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useOnboarding } from '../hooks/useOnboarding';
import { RootStackParamList } from '../types/navigation.types';
import { ANIMATION_CONFIG, NAVIGATION_DELAY } from '../constants/animationConfig';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const useSplashAnimation = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { hasCompletedOnboarding } = useOnboarding();

  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    const animateSplash = async () => {
      logoScale.value = withSpring(1, ANIMATION_CONFIG.SCALE);
      logoOpacity.value = withTiming(1, { duration: ANIMATION_CONFIG.OPACITY.duration });
      textOpacity.value = withTiming(1, { 
        duration: ANIMATION_CONFIG.TEXT_OPACITY.duration, 
        easing: Easing.ease 
      });

      try {
        await SplashScreen.hideAsync();

        setTimeout(() => {
          try {
            const routeName = hasCompletedOnboarding ? 'Main' : 'Onboarding';

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: routeName }],
              })
            );
          } catch (error) {
            console.error('Navigation error:', error);

            try {
              navigation.navigate('Onboarding' as any);
            } catch (navError) {
              console.error('Fallback navigation failed:', navError);
            }
          }
        }, NAVIGATION_DELAY);
      } catch (error) {
        console.error('Error in splash animation:', error);
      }
    };

    animateSplash();
  }, [navigation, logoScale, logoOpacity, textOpacity, hasCompletedOnboarding]);

  return {
    logoScale,
    logoOpacity,
    textOpacity
  };
};
