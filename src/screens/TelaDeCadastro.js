import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function TelaCadastro({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome completo" 
          placeholderTextColor="#A0A0A0"
        />
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          keyboardType="email-address"
          placeholderTextColor="#A0A0A0"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          secureTextEntry 
          placeholderTextColor="#A0A0A0"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirmar senha" 
          secureTextEntry 
          placeholderTextColor="#A0A0A0"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={styles.linkText}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" }, // fundo preto
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#FFFFFF" },
  input: { 
    borderWidth: 1, 
    borderColor: "#3D3D3D", 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 20, 
    backgroundColor: "#2C2C2C", 
    color: "#FFFFFF",
    fontSize: 16,
  },
  button: { 
    backgroundColor: "#FFD700", // amarelo logo
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" }, // texto escuro sobre amarelo
  link: { marginTop: 20, alignItems: "center" },
  linkText: { color: "#FFD700", fontWeight: "bold" }, // amarelo para destaque
});
