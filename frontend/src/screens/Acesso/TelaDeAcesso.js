import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Logo from "../../assets/logo_e_energy.png"; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TelaDeAcesso({ navigation }) {

  return (
    <View style={[styles.container, { backgroundColor: "#121212" }]}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, { color: "#FFD700" }]}>Menu Principal</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaCasas")}
      >
        <MaterialCommunityIcons name="home-group" size={24} color="black" style={{ marginRight: 10 }}/>
        <Text style={styles.buttonText}>Minhas Casas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaPerfil")}
      >
        <FontAwesome name="user" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Perfil do Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaConfiguracoes")}
      >
        <FontAwesome name="cog" size={24} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { width: 200, height: 200, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 40 },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    marginBottom: 20,
    width: "80%",
  },
  buttonText: { color: "#121212", fontSize: 18, fontWeight: "bold" },
});
