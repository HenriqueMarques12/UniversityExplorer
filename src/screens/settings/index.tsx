import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../config/theme';

import SettingsHeader from '../../components/Settings/SettingsHeader';
import SettingSection from '../../components/Settings/SettingSection';
import SwitchSetting from '../../components/Settings/SwitchSetting';
import ActionButton from '../../components/Settings/ActionButton';
import VersionInfo from '../../components/Settings/VersionInfo';

import { useSettings } from '../../hooks/useSettings';

export const SettingsScreen: React.FC = () => {
  const { notifications, toggleNotifications, appActions } = useSettings();

  return (
    <SafeAreaView style={styles.container}>
      <SettingsHeader />

      <ScrollView style={styles.content}>
        <SettingSection title="Notificações">
          <SwitchSetting
            title="Notificações Push"
            description="Receba atualizações sobre novas cotações e recursos"
            value={notifications}
            onValueChange={toggleNotifications}
          />
        </SettingSection>
        
        <SettingSection title="App">
          {appActions.map((action: any) => (
            <ActionButton key={action.id} action={action} />
          ))}
        </SettingSection>
        
        <VersionInfo />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});
