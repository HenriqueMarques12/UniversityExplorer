import React, { memo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { COMMON_COUNTRIES } from '../../constants/countries';
import { getFlagEmoji } from '../../utils/helpers';

interface CountryFiltersProps {
  selectedCountry: string;
  onSelectCountry: (value: string, label: string) => void;
  onToggleExpandedFilters: () => void;
  onOpenMoreFilters: () => void;
  showAllFilters: boolean;
}

const CountryFilters: React.FC<CountryFiltersProps> = ({
  selectedCountry,
  onSelectCountry,
  onToggleExpandedFilters,
  onOpenMoreFilters,
  showAllFilters
}) => {
  return (
    <View style={styles.filtersSection}>
      <View style={styles.filtersHeader}>
        <Text style={styles.filtersLabel}>Filtrar por país</Text>
        <TouchableOpacity onPress={onToggleExpandedFilters}>
          <Text style={styles.toggleFiltersText}>
            {showAllFilters ? "Mostrar menos" : "Mostrar mais"} <Ionicons name={showAllFilters ? "chevron-up" : "chevron-down"} size={14} />
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filtersScrollView}
        contentContainerStyle={styles.filtersContainer}
      >
        {COMMON_COUNTRIES.map((item: { value: string; label: any | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }) => (
          <TouchableOpacity
            key={`quick-${item.value || 'all'}`}
            style={[
              styles.filterChip,
              selectedCountry === item.value && styles.filterChipSelected
            ]}
            onPress={() => onSelectCountry(item.value, item.label)}
          >
            <Text style={styles.filterChipFlag}>
              {item.value ? getFlagEmoji(item.value) : '🌎'}
            </Text>
            <Text 
              style={[
                styles.filterChipText,
                selectedCountry === item.value && styles.filterChipTextSelected
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          style={[styles.filterChip, styles.moreFiltersChip]}
          onPress={onOpenMoreFilters}
        >
          <Text style={styles.moreFiltersText}>Mais países...</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersSection: {
    marginTop: SIZES.md,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  filtersLabel: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
  },
  toggleFiltersText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
  },
  filtersScrollView: {
    flexGrow: 0,
  },
  filtersContainer: {
    paddingVertical: SIZES.xs,
    paddingRight: SIZES.md,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: 50,
    marginRight: SIZES.xs,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  filterChipSelected: {
    backgroundColor: COLORS.lightPrimary,
    borderColor: COLORS.primary,
  },
  filterChipFlag: {
    fontSize: 16,
    marginRight: SIZES.xs,
  },
  filterChipText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
  },
  filterChipTextSelected: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  moreFiltersChip: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderStyle: 'dashed',
  },
  moreFiltersText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
});

export default memo(CountryFilters);
