import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";

export default function TelaComodos({ route }) {
  const { nomeCasa } = route.params;
  const comodos = ["Sala", "Cozinha", "Quarto", "Banheiro"];

  const [releStatus, setReleStatus] = useState(false);

  const toggleRele = () => {
    const novoEstado = !releStatus;
    setReleStatus(novoEstado);

    // Aqui você colocará o código para mandar o sinal ao relé futuramente (API, MQTT, Bluetooth, etc.)
    Alert.alert("Relé", `Relé ${novoEstado ? "Ativado" : "Desativado"}`);
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 50, backgroundColor: "white" },
  title: { fontSize: 28, marginBottom: 30 },
  roomButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    alignItems: "center"
  },
  roomText: { color: "white", fontSize: 16 },
  releButton: {
    marginTop: 40,
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center"
  },
  releText: { color: "white", fontSize: 16 }
});
