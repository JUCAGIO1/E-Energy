import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import HeaderLogo from "../../components/HeaderLogo";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../constants/colors";
import { registerUser } from "../../services/api";

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const result = await registerUser(nome, email, senha);
    setLoading(false);

    if (result.success) {
      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.replace("MainApp") }
      ]);
    } else {
      Alert.alert("Erro no Cadastro", result.message || "Não foi possível criar a conta.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderLogo title="Criar Conta" subtitle="Crie sua conta para monitorar a energia" />

        <CustomInput
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />
        <CustomInput
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <CustomInput
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 15 }} />
        ) : (
          <CustomButton title="Cadastrar" onPress={handleCadastro} />
        )}

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={styles.linkText}>Já tenho conta</Text>
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
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
});
