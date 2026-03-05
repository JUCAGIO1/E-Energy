import React, { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function TelaCadastro({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? "#121212" : "#F5F5F5" }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#121212" }]}>Criar Conta</Text>

        <TextInput 
          style={[styles.input, { 
            backgroundColor: isDark ? "#2C2C2C" : "#FFFFFF", 
            borderColor: isDark ? "#3D3D3D" : "#CCCCCC",
            color: isDark ? "#FFFFFF" : "#121212"
          }]} 
          placeholder="Nome completo" 
          placeholderTextColor={isDark ? "#A0A0A0" : "#666666"}
        />
        <TextInput 
          style={[styles.input, { 
            backgroundColor: isDark ? "#2C2C2C" : "#FFFFFF", 
            borderColor: isDark ? "#3D3D3D" : "#CCCCCC",
            color: isDark ? "#FFFFFF" : "#121212"
          }]} 
          placeholder="E-mail" 
          keyboardType="email-address"
          placeholderTextColor={isDark ? "#A0A0A0" : "#666666"}
        />
        <TextInput 
          style={[styles.input, { 
            backgroundColor: isDark ? "#2C2C2C" : "#FFFFFF", 
            borderColor: isDark ? "#3D3D3D" : "#CCCCCC",
            color: isDark ? "#FFFFFF" : "#121212"
          }]} 
          placeholder="Senha" 
          secureTextEntry 
          placeholderTextColor={isDark ? "#A0A0A0" : "#666666"}
        />
        <TextInput 
          style={[styles.input, { 
            backgroundColor: isDark ? "#2C2C2C" : "#FFFFFF", 
            borderColor: isDark ? "#3D3D3D" : "#CCCCCC",
            color: isDark ? "#FFFFFF" : "#121212"
          }]} 
          placeholder="Confirmar senha" 
          secureTextEntry 
          placeholderTextColor={isDark ? "#A0A0A0" : "#666666"}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={[styles.linkText, { color: isDark ? "#FFD700" : "#B8860B" }]}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: { 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 20, 
    fontSize: 16,
  },
  button: { 
    backgroundColor: "#FFD700", 
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 20, alignItems: "center" },
  linkText: { fontWeight: "bold" },
});
