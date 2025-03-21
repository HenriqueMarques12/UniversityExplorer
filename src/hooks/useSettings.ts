import { useState, useCallback } from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { getAppActions } from '../constants/settingsData';

export const useSettings = () => {
  const { resetOnboarding } = useOnboarding();
  const [notifications, setNotifications] = useState(true);
  
  const toggleNotifications = useCallback((value: boolean) => {
    setNotifications(value);
  }, []);
  
  const appActions = getAppActions(resetOnboarding);
  
  return {
    notifications,
    toggleNotifications,
    appActions
  };
};
