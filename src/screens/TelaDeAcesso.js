import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function TelaDeAcesso({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Escolha uma opção para continuar</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TelaCasas")}
        >
          <Text style={styles.buttonText}>Minhas Casas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Perfil do Usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 30 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#A0A0A0", marginBottom: 30 },
  button: {
    width: "80%",
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#121212" },
});
