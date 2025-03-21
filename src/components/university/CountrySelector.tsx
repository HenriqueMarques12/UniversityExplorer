import React, { memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { ALL_COUNTRIES } from '../../constants/countries';
import { getFlagEmoji } from '../../utils/helpers';

interface CountrySelectorProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  selectedCountry: string;
  onSelectCountry: (value: string, label: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  bottomSheetRef,
  selectedCountry,
  onSelectCountry
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['70%']}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
    >
      <View style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetTitle}>Selecione um país</Text>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
            <Ionicons name="close" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={[{value: '', label: 'Todos os países'}, ...ALL_COUNTRIES]}
          keyExtractor={(item) => item.value || 'all'}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.countryItem,
                selectedCountry === item.value && styles.selectedCountryItem
              ]}
              onPress={() => onSelectCountry(item.value, item.label)}
            >
              <Text style={styles.countryItemFlag}>
                {item.value ? getFlagEmoji(item.value) : '🌎'}
              </Text>
              <Text 
                style={[
                  styles.countryItemText,
                  selectedCountry === item.value && styles.selectedCountryItemText
                ]}
              >
                {item.label}
              </Text>
              {selectedCountry === item.value && (
                <Ionicons name="checkmark" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: COLORS.white,
  },
  bottomSheetIndicator: {
    backgroundColor: COLORS.divider,
    width: 40,
  },
  bottomSheetContainer: {
    flex: 1,
    padding: SIZES.md,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SIZES.md,
    marginBottom: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  bottomSheetTitle: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  selectedCountryItem: {
    backgroundColor: COLORS.lightPrimary,
  },
  countryItemFlag: {
    fontSize: FONTS.sizes.md,
    marginRight: SIZES.sm,
    width: 30,
  },
  countryItemText: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    flex: 1,
  },
  selectedCountryItemText: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
});

export default memo(CountrySelector);
