import React, { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function TelaEsqueceuSenha({ navigation }) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: "#121212" }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: "#FFFFFF" }]}>Recuperar Senha</Text>
        <Text style={[styles.subtitle, { color: "#A0A0A0" }]}>Digite seu e-mail para redefinir a senha</Text>

        <TextInput
          style={[styles.input, {
            backgroundColor: "#2C2C2C",
            borderColor: "#3D3D3D",
            color: "#FFFFFF"
          }]}
          placeholder="seuemail@gmail.com"
          placeholderTextColor={"#A0A0A0"}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={[styles.linkText, { color: "#FFD700" }]}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 30 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30 },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
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
  linkText: { fontWeight: "bold" },
});