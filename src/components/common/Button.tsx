import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../config/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  ...props
}) => {
  const getButtonStyles = () => {
    let baseStyle: ViewStyle = {};

    switch (variant) {
      case 'primary':
        baseStyle = {
          backgroundColor: COLORS.primary,
        };
        break;
      case 'secondary':
        baseStyle = {
          backgroundColor: COLORS.accent,
        };
        break;
      case 'outline':
        baseStyle = {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: COLORS.primary,
        };
        break;
      case 'text':
        baseStyle = {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        };
        break;
    }

    switch (size) {
      case 'small':
        baseStyle = {
          ...baseStyle,
          paddingVertical: SIZES.xs,
          paddingHorizontal: SIZES.md,
          borderRadius: SIZES.xs,
        };
        break;
      case 'medium':
        baseStyle = {
          ...baseStyle,
          paddingVertical: SIZES.sm,
          paddingHorizontal: SIZES.lg,
          borderRadius: SIZES.sm,
        };
        break;
      case 'large':
        baseStyle = {
          ...baseStyle,
          paddingVertical: SIZES.md,
          paddingHorizontal: SIZES.xl,
          borderRadius: SIZES.md,
        };
        break;
    }

    return baseStyle;
  };

  const getTextStyles = () => {
    let baseStyle: TextStyle = {
      ...FONTS.medium,
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        baseStyle = {
          ...baseStyle,
          color: COLORS.white,
        };
        break;
      case 'outline':
        baseStyle = {
          ...baseStyle,
          color: COLORS.primary,
        };
        break;
      case 'text':
        baseStyle = {
          ...baseStyle,
          color: COLORS.primary,
        };
        break;
    }

    switch (size) {
      case 'small':
        baseStyle = {
          ...baseStyle,
          fontSize: FONTS.sizes.sm,
        };
        break;
      case 'medium':
        baseStyle = {
          ...baseStyle,
          fontSize: FONTS.sizes.md,
        };
        break;
      case 'large':
        baseStyle = {
          ...baseStyle,
          fontSize: FONTS.sizes.lg,
        };
        break;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button, 
        getButtonStyles(), 
        (disabled || loading) && styles.disabled,
        style
      ]}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? COLORS.primary : COLORS.white} 
        />
      ) : (
        <>
          {icon && icon}
          <Text 
            style={[
              styles.text, 
              getTextStyles(), 
              icon ? styles.textWithIcon : null,
              textStyle
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    textAlign: 'center',
  },
  textWithIcon: {
    marginLeft: SIZES.xs,
  },
  disabled: {
    opacity: 0.5,
  },
});