import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Logo from "..//assets/logo_e_energy.png"; // logo no topo

export default function TelaDeAcesso({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Menu Principal</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaCasas")}
      >
        <Text style={styles.buttonText}>Minhas Casas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaPerfil")}
      >
        <Text style={styles.buttonText}>Perfil do Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaConfiguracoes")}
      >
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212", padding: 20 },
  logo: { width: 200, height: 200, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFD700", marginBottom: 40 },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
  },
  buttonText: { color: "#121212", fontSize: 18, fontWeight: "bold" },
});
