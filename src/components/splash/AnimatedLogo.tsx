import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface AnimatedLogoProps {
  logoScale: Animated.SharedValue<number>;
  logoOpacity: Animated.SharedValue<number>;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ logoScale, logoOpacity }) => {
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default React.memo(AnimatedLogo);
