import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import HeaderLogo from "../../components/HeaderLogo";
import CustomButton from "../../components/CustomButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "../../constants/colors";

export default function TelaDeAcesso({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderLogo title="Menu Principal" subtitle="Selecione a opção desejada" />

        <CustomButton
          title="Minhas Casas & Cômodos"
          icon={<MaterialCommunityIcons name="home-group" size={24} color={Colors.textDark} style={{ marginRight: 10 }} />}
          onPress={() => navigation.navigate("CasasTab")}
        />

        <CustomButton
          title="Dicas & Calculadora de Consumo"
          variant="secondary"
          icon={<Ionicons name="leaf" size={22} color={Colors.primary} style={{ marginRight: 10 }} />}
          onPress={() => navigation.navigate("TelaDicasEconomia")}
        />

        <CustomButton
          title="Perfil do Usuário"
          variant="secondary"
          icon={<FontAwesome name="user" size={20} color={Colors.primary} style={{ marginRight: 10 }} />}
          onPress={() => navigation.navigate("Perfil")}
        />

        <CustomButton
          title="Configurações"
          variant="secondary"
          icon={<FontAwesome name="cog" size={20} color={Colors.primary} style={{ marginRight: 10 }} />}
          onPress={() => navigation.navigate("Configuracoes")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
});
