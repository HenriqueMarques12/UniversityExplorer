import React, { memo } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../config/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  testID?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onClear, testID }) => {
  return (
    <>
      <Text style={styles.searchLabel}>Pesquisar Universidades</Text>
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome da universidade..."
          value={value}
          onChangeText={onChangeText}
          clearButtonMode="while-editing"
          returnKeyType="search"
          accessible={true}
          accessibilityLabel="Campo de pesquisa de universidades"
        />
        {value ? (
          <TouchableOpacity onPress={onClear} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchLabel: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.sm,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  searchIcon: {
    marginRight: SIZES.xs,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontSize: FONTS.sizes.md,
    paddingVertical: 0,
  },
});

export default memo(SearchBar);
