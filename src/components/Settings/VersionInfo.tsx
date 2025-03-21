import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { APP_VERSION } from '../../constants/settingsData';

const VersionInfo: React.FC = () => {
  return (
    <View style={styles.versionContainer}>
      <Text style={styles.versionText}>Versão {APP_VERSION}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  versionContainer: {
    alignItems: 'center',
    marginTop: SIZES.xl,
    marginBottom: SIZES.xxl,
  },
  versionText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
});

export default React.memo(VersionInfo);
