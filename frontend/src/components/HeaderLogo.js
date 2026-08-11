import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logo from '../assets/logo_e_energy.png';
import { Colors } from '../constants/colors';

export default function HeaderLogo({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 240,
    height: 90,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
