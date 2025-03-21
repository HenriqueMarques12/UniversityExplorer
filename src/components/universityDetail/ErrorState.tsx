import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';

interface ErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage, onRetry }) => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{errorMessage || 'Universidade não encontrada'}</Text>
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={onRetry}
      >
        <Text style={styles.retryButtonText}>Tentar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.error,
    marginBottom: SIZES.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.borderRadius,
  },
  retryButtonText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
  },
});

export default React.memo(ErrorState);
