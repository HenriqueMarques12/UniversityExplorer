import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../config/theme';
import { ActionItem } from '../../constants/settingsData';

interface ActionButtonProps {
  action: ActionItem;
}

const ActionButton: React.FC<ActionButtonProps> = ({ action }) => {
  return (
    <TouchableOpacity 
      style={styles.settingButton}
      onPress={action.action}
    >
      <View style={styles.settingButtonContent}>
        <Ionicons name={action.icon as any} size={24} color={COLORS.primary} />
        <Text style={styles.settingButtonText}>{action.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingButtonText: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    marginLeft: SIZES.sm,
  },
});

export default React.memo(ActionButton);
