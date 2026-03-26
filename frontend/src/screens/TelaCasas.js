import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function TelaCasas({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const casas = ["Casa 1", "Casa 2", "Casa 3"];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? "#121212" : "#F5F5F5" }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#121212" }]}>Minhas Casas</Text>
        {casas.map((casa, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate("TelaComodos", { nomeCasa: casa })}
          >
            <Text style={styles.buttonText}>{casa}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, alignItems: "center", paddingTop: 50 },
  title: { fontSize: 28, marginBottom: 30, fontWeight: "bold" },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
});