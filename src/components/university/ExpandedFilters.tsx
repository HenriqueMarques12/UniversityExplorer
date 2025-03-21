import React, { memo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { ALL_COUNTRIES } from '../../constants/countries';
import { getFlagEmoji } from '../../utils/helpers';

interface ExpandedFiltersProps {
  selectedCountry: string;
  onSelectCountry: (value: string, label: string) => void;
  onOpenMoreFilters: () => void;
}

const ExpandedFilters: React.FC<ExpandedFiltersProps> = ({
  selectedCountry,
  onSelectCountry,
  onOpenMoreFilters
}) => {
  return (
    <View style={styles.expandedFiltersContainer}>
      <ScrollView 
        contentContainerStyle={styles.expandedFiltersContent}
        showsVerticalScrollIndicator={false}
        style={styles.expandedFiltersScrollView}
      >
        {ALL_COUNTRIES.slice(0, 20).map((item) => (
          <TouchableOpacity
            key={`expanded-${item.value}`}
            style={[
              styles.expandedFilterItem,
              selectedCountry === item.value && styles.expandedFilterItemSelected
            ]}
            onPress={() => onSelectCountry(item.value, item.label)}
          >
            <Text style={styles.expandedFilterFlag}>
              {getFlagEmoji(item.value)}
            </Text>
            <Text 
              style={[
                styles.expandedFilterText,
                selectedCountry === item.value && styles.expandedFilterTextSelected
              ]}
            >
              {item.label}
            </Text>
            {selectedCountry === item.value && (
              <Ionicons name="checkmark" size={16} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity
          style={styles.viewAllCountriesButton}
          onPress={onOpenMoreFilters}
        >
          <Text style={styles.viewAllCountriesText}>
            Ver todos os países <Ionicons name="arrow-forward" size={14} />
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  expandedFiltersContainer: {
    marginTop: SIZES.sm,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.sm,
    maxHeight: 200,
  },
  expandedFiltersScrollView: {
    flexGrow: 0,
  },
  expandedFiltersContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  expandedFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.sm,
    marginBottom: SIZES.xs,
    borderRadius: SIZES.borderRadius,
  },
  expandedFilterItemSelected: {
    backgroundColor: COLORS.lightPrimary,
  },
  expandedFilterFlag: {
    fontSize: 16,
    marginRight: SIZES.xs,
    width: 20,
  },
  expandedFilterText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  expandedFilterTextSelected: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  viewAllCountriesButton: {
    alignSelf: 'center',
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.md,
    marginTop: SIZES.sm,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  viewAllCountriesText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
  },
});

export default memo(ExpandedFilters);
