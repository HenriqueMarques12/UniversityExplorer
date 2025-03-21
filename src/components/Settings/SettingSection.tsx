import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
  },
});

export default React.memo(SettingSection);
