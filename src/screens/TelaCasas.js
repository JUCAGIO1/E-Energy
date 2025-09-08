import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function TelaCasas({ navigation }) {
  const casas = ["Casa 1", "Casa 2", "Casa 3"];

  return (
    <SafeAreaView style={styles.safeArea}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, alignItems: "center", paddingTop: 50 },
  title: { fontSize: 28, color: "#FFFFFF", marginBottom: 30 },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
});
