import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from '../../config/theme';

import AnimatedLogo from '../../components/splash/AnimatedLogo';
import { useSplashAnimation } from '../../hooks/useSplashAnimation';

SplashScreen.preventAutoHideAsync();

export const SplashScreenComponent: React.FC = () => {
  const { logoScale, logoOpacity, textOpacity } = useSplashAnimation();

  return (
    <View style={styles.container}>
      <AnimatedLogo 
        logoScale={logoScale}
        logoOpacity={logoOpacity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
