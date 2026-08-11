import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../constants/colors";
import { getStoredUser, logoutUser } from "../../services/api";

export default function TelaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState({ nome: 'Carregando...', email: '...' });

  useEffect(() => {
    const carregarUsuario = async () => {
      const u = await getStoredUser();
      if (u) {
        setUsuario(u);
      } else {
        setUsuario({ nome: 'João da Silva', email: 'joao@email.com' });
      }
    };
    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>👤 Perfil do Usuário</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{usuario.nome}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.value}>{usuario.email}</Text>
        </View>

        <CustomButton
          title="Configurações"
          onPress={() => navigation.navigate("Configuracoes")}
          style={{ marginTop: 20 }}
        />

        <CustomButton
          title="Sair da Conta"
          variant="outline"
          onPress={handleLogout}
          style={{ marginTop: 10 }}
        />
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
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});