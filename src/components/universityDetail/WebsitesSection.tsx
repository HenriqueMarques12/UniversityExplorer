import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { Card } from '../../components/common/Card';
import { openWebPage } from '../../utils/helpers';

interface WebsitesSectionProps {
  websites: string[];
}

const WebsitesSection: React.FC<WebsitesSectionProps> = ({ websites }) => {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Websites</Text>
      {websites.map((url, index) => (
        <TouchableOpacity 
          key={`webpage-${index}`}
          style={styles.websiteButton}
          onPress={() => openWebPage(url)}
        >
          <Text style={styles.websiteText}>{url}</Text>
          <Ionicons name="open-outline" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  websiteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.xs,
  },
  websiteText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    flex: 1,
    marginRight: SIZES.sm,
  },
});

export default React.memo(WebsitesSection);
