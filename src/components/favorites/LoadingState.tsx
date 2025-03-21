import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';

const LoadingState: React.FC = () => {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Carregando favoritos...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    marginTop: SIZES.sm,
  },
});

export default LoadingState;
