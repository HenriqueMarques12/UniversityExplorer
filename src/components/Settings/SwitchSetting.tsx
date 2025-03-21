import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';

interface SwitchSettingProps {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SwitchSetting: React.FC<SwitchSettingProps> = ({
  title,
  description,
  value,
  onValueChange
}) => {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#767577", true: COLORS.primary }}
        thumbColor={COLORS.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: SIZES.md,
  },
  settingTitle: {
    ...FONTS.medium,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    ...FONTS.regular,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
});

export default React.memo(SwitchSetting);
