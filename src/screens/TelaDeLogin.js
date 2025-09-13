import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Logo from "..//assets/logo_e_energy.png"; // logo local

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={Logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        {/* Formulário */}
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("TelaEsqueceuSenha")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("TelaDeAcesso")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastro")}
          style={styles.footerLink}
        >
          <Text style={styles.footerText}>
            Não tem uma conta? <Text style={styles.signUpText}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, justifyContent: "center", padding: 30 },
  header: { alignItems: "center", marginBottom: 40 },
  logo: { width: 300, height: 100, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#A0A0A0" },
  input: {
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3D3D3D",
    padding: 15,
    color: "#FFFFFF",
    fontSize: 16,
  },
  linkButton: { alignSelf: "flex-end", marginBottom: 30 },
  linkText: { color: "#FFD700", fontWeight: "600" },
  loginButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: { color: "#121212", fontSize: 18, fontWeight: "bold" },
  footerLink: { alignItems: "center", marginTop: 10 },
  footerText: { color: "#A0A0A0", fontSize: 14 },
  signUpText: { color: "#FFD700", fontWeight: "bold" },
});
