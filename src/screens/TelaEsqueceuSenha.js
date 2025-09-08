import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function TelaEsqueceuSenha({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>Digite seu e-mail para redefinir a senha</Text>

        <TextInput
          style={styles.input}
          placeholder="seuemail@gmail.com"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={styles.linkText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, justifyContent: "center", padding: 30 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10, color: "#FFFFFF" },
  subtitle: { fontSize: 16, color: "#A0A0A0", marginBottom: 30 },
  input: {
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3D3D3D",
    padding: 15,
    marginBottom: 20,
    color: "#FFFFFF",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 20, alignItems: "center" },
  linkText: { color: "#FFD700", fontWeight: "bold" },
});
