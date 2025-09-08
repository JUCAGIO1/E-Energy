import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useState } from "react";

export default function TelaConfiguracoes({ navigation }) {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.option}>
        <Text style={styles.label}>Tema Escuro</Text>
        <Switch value={temaEscuro} onValueChange={setTemaEscuro} />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Notificações</Text>
        <Switch value={notificacoes} onValueChange={setNotificacoes} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  option: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  label: { fontSize: 18 },
  button: { backgroundColor: "green", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 30 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
