import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function CustomButton({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  style,
  textStyle,
  icon,
}) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'outline':
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'outline':
        return styles.textOutline;
      default:
        return styles.textPrimary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.baseButton, getButtonStyle(), style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={[styles.baseText, getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: Colors.textDark,
  },
  textSecondary: {
    color: Colors.textPrimary,
  },
  textOutline: {
    color: Colors.primary,
  },
});
