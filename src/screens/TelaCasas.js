import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TelaCasas({ navigation }) {
  const casas = ["Casa 1", "Casa 2", "Casa 3"]; // Você pode usar dados dinâmicos depois

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Casas</Text>
      {casas.map((casa, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate("TelaComodos", { nomeCasa: casa })}
        >
          <Text style={styles.buttonText}>{casa}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 50, backgroundColor: "white" },
  title: { fontSize: 28, marginBottom: 30 },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    alignItems: "center"
  },
  buttonText: { color: "white", fontSize: 16 }
});
