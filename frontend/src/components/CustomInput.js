import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  ...props
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={Colors.textSecondary}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
