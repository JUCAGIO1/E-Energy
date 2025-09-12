import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useState } from "react";

export default function TelaComodos({ route }) {
  const { nomeCasa } = route.params;
  const comodos = ["Sala", "Cozinha", "Quarto", "Banheiro"];
  const [releStatus, setReleStatus] = useState(false);

  const toggleRele = async () => {
    const novoEstado = !releStatus;
    setReleStatus(novoEstado);

    try {
      const url = novoEstado
        ? "http://192.168.0.150/ligar"   // Troque pelo IP do seu ESP32
        : "http://192.168.0.150/desligar";

      const response = await fetch(url);
      const texto = await response.text();

      Alert.alert("Relé", texto); // Exibe a resposta do ESP32
    } catch (error) {
      Alert.alert("Erro", "Não foi possível comunicar com o ESP32");
      setReleStatus(!novoEstado); // Reverte o estado se a requisição falhar
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Cômodos de {nomeCasa}</Text>

        {comodos.map((comodo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.roomButton}
            // ✅ corrigido: interpolação com crase
            onPress={() => Alert.alert("Consumo", `Energia gasta por ${comodo}`)}
          >
            <Text style={styles.roomText}>{comodo}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.releButton} onPress={toggleRele}>
          <Text style={styles.releText}>
            {releStatus ? "Desativar Relé" : "Ativar Relé"}
          </Text>
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
