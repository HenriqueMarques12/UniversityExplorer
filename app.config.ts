import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'University Explorer',
  slug: 'university-explorer',
  version: '1.0.0',
  plugins: [
    "expo-font",
    [
      "expo-build-properties",
      {
        "android": {
          "newArchEnabled": true
        },
        "ios": {
          "newArchEnabled": true
        }
      }
    ]
  ],
  orientation: 'portrait',
  icon: './assets/512.png',
  userInterfaceStyle: 'automatic',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourcompany.universityexplorer',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/512.png',
      backgroundColor: '#3f51b5',
    },
    package: 'com.yourcompany.universityexplorer',
  },
  
  extra: {
    apiUrl: 'https://university.hmdev.com.br',
  },
});
