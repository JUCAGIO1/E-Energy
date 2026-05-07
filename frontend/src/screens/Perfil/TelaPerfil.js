import React, { useContext } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TelaPerfil({ navigation }) {

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: "#121212" }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: "#FFD700" }]}>
          Perfil do Usuário
        </Text>

        <View style={[styles.infoBox, { backgroundColor: "#1E1E1E", borderColor: "#FFD700" }]}>
          <Text style={[styles.label, { color: "#FFD700" }]}>Nome:</Text>
          <Text style={[styles.value, { color: "#fff" }]}>João da Silva</Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: "#1E1E1E", borderColor: "#FFD700" }]}>
          <Text style={[styles.label, { color: "#FFD700" }]}>Email:</Text>
          <Text style={[styles.value, { color: "#fff" }]}>joao@email.com</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FFD700" }]}
          onPress={() => navigation.navigate("TelaConfiguracoes")}
        >
          <Text style={[styles.buttonText, { color: "#121212" }]}>Ir para Configurações</Text>
        </TouchableOpacity>

        {/* Botão Voltar */}
        <TouchableOpacity
          style={[styles.button, styles.backButton, { backgroundColor: "#444" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: "#FFF" }]}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  infoBox: { padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1 },
  label: { fontSize: 16, marginBottom: 5 },
  value: { fontSize: 16 },
  button: { paddingVertical: 15, borderRadius: 12, marginTop: 20 },
  backButton: {},
  buttonText: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
});
