import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import HeaderLogo from "../../components/HeaderLogo";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../constants/colors";
import { loginUser } from "../../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (result.success) {
      navigation.replace("MainApp");
    } else {
      Alert.alert("Erro de Autenticação", result.message || "E-mail ou senha incorretos.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderLogo
          title="Bem-vindo de volta!"
          subtitle="Faça login para continuar"
        />

        <CustomInput
          placeholder="Seu e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <CustomInput
          placeholder="Sua senha"
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

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 15 }} />
        ) : (
          <CustomButton
            title="ENTRAR"
            onPress={handleLogin}
          />
        )}

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
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  linkButton: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  footerLink: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  signUpText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});