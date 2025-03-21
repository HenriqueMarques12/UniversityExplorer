import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../config/theme';

interface EmptyStateProps {
  error: string | null;
  onRetry: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ error, onRetry }) => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="school-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyText}>Nenhuma universidade encontrada</Text>
      <Text style={styles.emptySubText}>Tente outros filtros de pesquisa</Text>
      
      {error && (
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={onRetry}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xl,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    marginTop: SIZES.md,
  },
  emptySubText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SIZES.lg,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.borderRadius,
  },
  retryButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.white,
  },
});

export default memo(EmptyState);
