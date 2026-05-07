import React, { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function TelaCadastro({ navigation }) {

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: "#121212" }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: "#FFFFFF" }]}>Criar Conta</Text>

        <TextInput 
          style={[styles.input, { 
            backgroundColor: "#2C2C2C", 
            borderColor: "#3D3D3D",
            color: "#FFFFFF"
          }]} 
          placeholder="Nome completo" 
          placeholderTextColor={"#A0A0A0"}
        />
        <TextInput 
          style={[styles.input, { 
            backgroundColor: "#2C2C2C", 
            borderColor: "#3D3D3D",
            color: "#FFFFFF"
          }]} 
          placeholder="E-mail" 
          keyboardType="email-address"
          placeholderTextColor={"#A0A0A0"}
        />
        <TextInput 
          style={[styles.input, { 
            backgroundColor: "#2C2C2C", 
            borderColor: "#3D3D3D",
            color: "#FFFFFF"
          }]} 
          placeholder="Senha" 
          secureTextEntry 
          placeholderTextColor={"#A0A0A0"}
        />
        <TextInput 
          style={[styles.input, { 
            backgroundColor: "#2C2C2C", 
            borderColor: "#3D3D3D",
            color: "#FFFFFF"
          }]} 
          placeholder="Confirmar senha" 
          secureTextEntry 
          placeholderTextColor={"#A0A0A0"}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={[styles.linkText, { color: "#FFD700" }]}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: { 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 20, 
    fontSize: 16,
  },
  button: { 
    backgroundColor: "#FFD700", 
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 20, alignItems: "center" },
  linkText: { fontWeight: "bold" },
});
