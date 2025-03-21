import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { Card } from '../../components/common/Card';
import { University } from '../../types/university.types';
import { getFlagEmoji } from '../../utils/helpers';

interface UniversityCardProps {
  university: University;
  isFavorite: boolean;
  onPress: (id: string) => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  isFavorite,
  onPress
}) => {
  const universityId = university.id || university._id;

  return (
    <TouchableOpacity 
      style={styles.universityItem} 
      onPress={() => onPress(universityId)}
      activeOpacity={0.7}
    >
      <Card style={isFavorite ? styles.favoriteCard : undefined}>
        <View style={styles.cardHeader}>
          <Text style={styles.universityName}>{university.name}</Text>
          {isFavorite && (
            <Ionicons name="heart" size={18} color={COLORS.accent} />
          )}
        </View>
        
        <View style={styles.locationContainer}>
          <Text style={styles.countryFlag}>
            {getFlagEmoji(university.alpha_two_code)}
          </Text>
          <Text style={styles.locationText}>
            {university.country}
            {university.state_province && `, ${university.state_province}`}
          </Text>
        </View>
        
        {university.domains && university.domains.length > 0 && (
          <View style={styles.infoRow}>
            <Ionicons name="globe-outline" size={14} color={COLORS.accent} style={styles.infoIcon} />
            <Text style={styles.domainText}>{university.domains.join(', ')}</Text>
          </View>
        )}
        
        {university.web_pages && university.web_pages.length > 0 && (
          <View style={styles.infoRow}>
            <Ionicons name="link-outline" size={14} color={COLORS.primary} style={styles.infoIcon} />
            <Text style={styles.webPageText} numberOfLines={1} ellipsizeMode="tail">
              {university.web_pages[0]}
            </Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  universityItem: {
    marginBottom: SIZES.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  favoriteCard: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  universityName: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  countryFlag: {
    fontSize: FONTS.sizes.md,
    marginRight: SIZES.xs,
  },
  locationText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  infoIcon: {
    marginRight: SIZES.xs,
  },
  domainText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.accent,
    flex: 1,
  },
  webPageText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    flex: 1,
  },
});

export default memo(UniversityCard);
