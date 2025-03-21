export const APP_VERSION = '1.0.0';

export interface ActionItem {
  id: string;
  title: string;
  icon: string;
  action?: any;
}

export const getAppActions = (resetOnboarding: () => void) => [
  {
    id: 'reset-onboarding',
    title: 'Redefinir Onboarding',
    icon: 'refresh-outline',
    action: resetOnboarding
  },
  {
    id: 'about',
    title: 'Sobre',
    icon: 'information-circle-outline'
  },
  {
    id: 'terms',
    title: 'Termos e Política de Privacidade',
    icon: 'document-text-outline'
  }
];
