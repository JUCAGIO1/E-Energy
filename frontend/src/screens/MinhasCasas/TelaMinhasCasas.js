import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CustomButton from "../../components/CustomButton";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../../constants/colors";

export default function TelaMinhasCasas({ navigation }) {
  const casas = ["Casa 1", "Casa 2", "Casa 3"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Minhas Casas</Text>
        <Text style={styles.subtitle}>Selecione a casa para ver os cômodos</Text>

        {casas.map((casa, index) => (
          <CustomButton
            key={index}
            title={casa}
            variant="secondary"
            icon={<Entypo name="home" size={22} color={Colors.primary} style={{ marginRight: 10 }} />}
            onPress={() => navigation.navigate("TelaComodos", { nomeCasa: casa })}
          />
        ))}

        <CustomButton
          title="Voltar"
          variant="outline"
          style={{ marginTop: 20 }}
          onPress={() => navigation.goBack()}
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
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 30,
    textAlign: "center",
  },
});
