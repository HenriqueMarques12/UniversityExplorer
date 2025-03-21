import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../../config/theme';

interface CardProps extends ViewProps {
  style?: ViewStyle;
  elevation?: 'small' | 'medium' | 'large';
  padding?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  style,
  elevation = 'small',
  padding = true,
  children,
  ...props
}) => {
  const getShadowStyle = () => {
    switch (elevation) {
      case 'small':
        return SHADOWS.small;
      case 'medium':
        return SHADOWS.medium;
      case 'large':
        return SHADOWS.large;
      default:
        return SHADOWS.small;
    }
  };

  return (
    <View
      style={[
        styles.card,
        getShadowStyle(),
        padding && styles.padding,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
  },
  padding: {
    padding: SIZES.md,
  },
});
