import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { Card } from '../../components/common/Card';

interface DomainSectionProps {
  domains: string[];
}

const DomainSection: React.FC<DomainSectionProps> = ({ domains }) => {
  return (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Domínios</Text>
      {domains.map((domain, index) => (
        <Text key={`domain-${index}`} style={styles.domainText}>
          {domain}
        </Text>
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
  domainText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.accent,
    marginBottom: SIZES.xs,
  },
});

export default React.memo(DomainSection);
