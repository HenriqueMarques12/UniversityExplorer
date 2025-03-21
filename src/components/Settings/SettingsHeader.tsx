import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';

const SettingsHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Configurações</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: SIZES.md,
    backgroundColor: COLORS.white,
  },
  title: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.primaryDark,
  },
});

export default React.memo(SettingsHeader);
