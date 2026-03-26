import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function TelaConfiguracoes({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
      <Text style={[styles.title, { color: isDark ? "#FFD700" : "#121212" }]}>Configurações</Text>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={[styles.buttonText, { color: isDark ? "#FFD700" : "#FFD700" }]}>
          Alternar Tema {isDark ? "→ Claro" : "→ Escuro"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, { color: isDark ? "#FFD700" : "#FFD700" }]}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 40 },
  button: { padding: 15, borderRadius: 10, borderWidth: 2, borderColor: "#FFD700", marginBottom: 20, width: "80%", alignItems: "center" },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
