import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { Card } from '../common/Card';
import { University } from '../../types/university.types';

interface FavoriteItemProps {
  university: University;
  onPress: (id: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ university, onPress }) => {
  const universityId = university.id || university._id;

  return (
    <TouchableOpacity onPress={() => onPress(universityId)}>
      <Card style={styles.favoriteItem}>
        <View style={styles.itemHeader}>
          <Text style={styles.universityName}>{university.name}</Text>
        </View>
        <Text style={styles.universityLocation}>
          {university.country}{university.state_province ? `, ${university.state_province}` : ''}
        </Text>
        <Text style={styles.universityDomain}>
          {university.domains && university.domains.length > 0 
            ? university.domains.join(', ') 
            : 'Sem domínios'}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteItem: {
    marginBottom: SIZES.md,
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  universityName: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
  },
  universityLocation: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  universityDomain: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.accent,
  },
});

export default memo(FavoriteItem);
