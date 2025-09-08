import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TelaMinhasCasas({ navigation }) {
  const casas = ["Casa 1", "Casa 2", "Casa 3"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Casas</Text>
      <Text style={styles.subtitle}>Selecione a casa para ver os cômodos</Text>

      {casas.map((casa, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("TelaComodos", { nomeCasa: casa })}
        >
          <Text style={styles.buttonText}>{casa}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 32, fontWeight: "bold", color: "#FFD700", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#FFFFFF", marginBottom: 30, textAlign: "center" },
  button: { backgroundColor: "#2C2C2C", padding: 15, borderRadius: 8, marginBottom: 15, alignItems: "center" },
  buttonText: { color: "#FFD700", fontSize: 18, fontWeight: "bold" },
  backButton: { marginTop: 30, alignItems: "center" },
  backButtonText: { color: "#FFFFFF", fontSize: 16 },
});
