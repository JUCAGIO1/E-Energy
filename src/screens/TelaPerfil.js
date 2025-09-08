import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TelaPerfil({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <Text style={styles.label}>Nome: João Silva</Text>
      <Text style={styles.label}>E-mail: joao@email.com</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TelaConfiguracoes")}
      >
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "red", marginTop: 20 }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "white" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  label: { fontSize: 18, marginBottom: 10 },
  button: { backgroundColor: "green", padding: 15, borderRadius: 8, width: "80%", alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
