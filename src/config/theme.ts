import { DefaultTheme } from '@react-navigation/native';

export const COLORS = {
  primary: '#003366',      
  primaryDark: '#002244',  
  primaryLight: '#1e5b96', 
  accent: '#00AEEF',      
  
  textPrimary: '#333333',
  textSecondary: '#5A5A5A',
  
  divider: '#CCCCCC',
  background: '#F5F7FA',
  white: '#FFFFFF',
  
  error: '#E53935',
  success: '#43A047',
  warning: '#FB8C00',
  info: '#00AEEF',  

  lightGray: '#EFEFEF',     
  lightPrimary: '#E6EEF7',  
  shadow: '#000000',       
};

export const FONTS = {
  regular: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400' as const,
  },
  medium: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500' as const,
  },
  bold: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '700' as const,
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  
  containerWidth: '90%',
  
  borderRadius: 8,
  buttonRadius: 25,
  
  headerHeight: 60,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.white,
    text: COLORS.textPrimary,
    border: COLORS.divider,
    notification: COLORS.accent,
  },
};
