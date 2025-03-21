import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { getFlagEmoji } from '../../utils/helpers';

interface UniversityHeaderProps {
  name: string;
  country: string;
  countryCode: string;
  stateProvince?: string;
}

const UniversityHeader: React.FC<UniversityHeaderProps> = ({
  name,
  country,
  countryCode,
  stateProvince
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.countryFlag}>{getFlagEmoji(countryCode)}</Text>
      <Text style={styles.universityName}>{name}</Text>
      <Text style={styles.location}>
        {country}
        {stateProvince && `, ${stateProvince}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  countryFlag: {
    fontSize: 48,
    marginBottom: SIZES.sm,
  },
  universityName: {
    ...FONTS.bold,
    fontSize: FONTS.sizes.xl,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  location: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default React.memo(UniversityHeader);
