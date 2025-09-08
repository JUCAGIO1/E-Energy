import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useState } from "react";

export default function TelaComodos({ route }) {
  const { nomeCasa } = route.params;
  const comodos = ["Sala", "Cozinha", "Quarto", "Banheiro"];
  const [releStatus, setReleStatus] = useState(false);

  const toggleRele = () => {
    const novoEstado = !releStatus;
    setReleStatus(novoEstado);
    Alert.alert("Relé", `Relé ${novoEstado ? "Ativado" : "Desativado"}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Cômodos de {nomeCasa}</Text>

        {comodos.map((comodo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.roomButton}
            onPress={() => Alert.alert("Consumo", `Energia gasta por ${comodo}`)}
          >
            <Text style={styles.roomText}>{comodo}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.releButton} onPress={toggleRele}>
          <Text style={styles.releText}>{releStatus ? "Desativar Relé" : "Ativar Relé"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
  title: { fontSize: 24, color: "#FFFFFF", marginBottom: 20 },
  roomButton: {
    backgroundColor: "#2C2C2C",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  roomText: { color: "#FFD700", fontSize: 16, fontWeight: "bold" },
  releButton: {
    marginTop: 30,
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    width: "60%",
    alignItems: "center",
  },
  releText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
});
