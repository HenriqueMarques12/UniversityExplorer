import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';

const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Você ainda não tem favoritos.</Text>
      <Text style={styles.emptySubText}>
        Adicione universidades aos seus favoritos para vê-las aqui.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.lg,
  },
  emptyText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  emptySubText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default EmptyState;
