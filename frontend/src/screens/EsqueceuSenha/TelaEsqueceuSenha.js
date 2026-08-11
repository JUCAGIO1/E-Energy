import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import HeaderLogo from "../../components/HeaderLogo";
import { Colors } from "../../constants/colors";

export default function TelaEsqueceuSenha({ navigation }) {
  const [email, setEmail] = useState("");

  const handleRecuperar = () => {
    // Lógica para envio de e-mail de recuperação
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderLogo
          title="Recuperar Senha"
          subtitle="Digite seu e-mail para redefinir a senha"
        />

        <CustomInput
          placeholder="seuemail@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <CustomButton title="Enviar" onPress={handleRecuperar} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={styles.linkText}>Voltar</Text>
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
