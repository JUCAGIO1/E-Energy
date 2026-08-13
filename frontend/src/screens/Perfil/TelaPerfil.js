import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../constants/colors";
import { getStoredUser, logoutUser } from "../../services/api";
import { gerarRelatorioPDF } from "../../services/pdfService";
import { dispararAlertaConsumo, solicitarPermissaoNotificacoes } from "../../services/notificationService";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TelaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState({ nome: 'Giovanni Amadio', email: 'giovanni@email.com' });

  useEffect(() => {
    const carregarUsuario = async () => {
      solicitarPermissaoNotificacoes();
      const u = await getStoredUser();
      if (u) {
        setUsuario(u);
      }
    };
    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace("Login");
  };

  const handleGerarPDF = () => {
    gerarRelatorioPDF(usuario);
  };

  const handleTestarAlerta = () => {
    dispararAlertaConsumo(
      "ALERTA E-ENERGY: PICO DE CORRENTE",
      "Detector de sobrecarga acionado! A corrente no Chuveiro ultrapassou 16.5A."
    );
  };

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Perfil do Usuário</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{usuario.nome}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.value}>{usuario.email}</Text>
          </View>

          {/* Exportação em PDF */}
          <CustomButton
            title="Exportar Relatório em PDF"
            icon={<Ionicons name="document-text-outline" size={18} color={Colors.textDark} style={{ marginRight: 8 }} />}
            onPress={handleGerarPDF}
            style={{ marginTop: 15 }}
          />

          {/* Alerta Push de Consumo Excessivo */}
          <CustomButton
            title="Testar Alerta de Sobrecarga"
            variant="secondary"
            icon={<Ionicons name="warning-outline" size={18} color={Colors.primary} style={{ marginRight: 8 }} />}
            onPress={handleTestarAlerta}
            style={{ marginTop: 8 }}
          />

          <CustomButton
            title="Configurações"
            variant="secondary"
            icon={<Ionicons name="settings-outline" size={18} color={Colors.primary} style={{ marginRight: 8 }} />}
            onPress={() => navigation.navigate("Configuracoes")}
            style={{ marginTop: 8 }}
          />

          <CustomButton
            title="Sair da Conta"
            variant="outline"
            icon={<Ionicons name="log-out-outline" size={18} color={Colors.primary} style={{ marginRight: 8 }} />}
            onPress={handleLogout}
            style={{ marginTop: 15, marginBottom: 20 }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flexGrow: 1,
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 25,
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