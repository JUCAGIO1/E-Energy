import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const getDados = async () => {
  try {
    const response = await axios.get('https://e-energy-api.onrender.com/api/dados')
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
    return null;
  };
}

const getComodos = async () => {
  try {
    const response = await axios.get('https://e-energy-api.onrender.com/api/comodos')
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
    return null;
  };
}

export default function TelaComodos({ route }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  
  const { nomeCasa } = route.params;
  const [releStatus, setReleStatus] = useState(false);
  const [dados, setDados] = useState([]);
  const [comodos, setComodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedComodos = await getComodos();
      const fetchedDados = await getDados();

      if (fetchedComodos) {
        setComodos(fetchedComodos);
      }
      if (fetchedDados) {
        setDados(fetchedDados);
      }
    };

    fetchData();
  }, []);

  const toggleRele = async () => {
    const novoEstado = !releStatus;
    setReleStatus(novoEstado);

    try {
      const url = novoEstado
        ? "http://192.168.0.150/ligar"
        : "http://192.168.0.150/desligar";

      const response = await fetch(url);
      const texto = await response.text();

      Alert.alert("Relé", texto); // Exibe a resposta do ESP32
    } catch (error) {
      Alert.alert("Erro", "Não foi possível comunicar com o ESP32");
      setReleStatus(!novoEstado); // Reverte o estado se a requisição falhar
    }
  };

  const showComodoData = (comodo) => {
    const comodoDados = dados.filter(dado => dado.comodo_id === comodo.id);

    if (comodoDados.length > 0) {
      const consumo = comodoDados[0].consumo || "N/A";
      const potencia = comodoDados[0].potencia || "N/A";
      const custo = comodoDados[0].custo || "N/A";

      Alert.alert(
        `Consumo de energia no ${comodo.nome}`,
        `Consumo: ${consumo} kWh\nPotência: ${potencia} W\nCusto: R$ ${custo}`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        `Consumo de energia no ${comodo.nome}`,
        "Não há dados disponíveis para este cômodo.",
        [{ text: "OK" }]
      );
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? "#121212" : "#F5F5F5" }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDark ? "#FFFFFF" : "#121212" }]}>Cômodos de {nomeCasa}</Text>

        {comodos.map((comodo, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.roomButton, 
              { 
                backgroundColor: isDark ? "#2C2C2C" : "#FFFFFF", 
                borderColor: isDark ? "#2C2C2C" : "#CCCCCC" 
              }
            ]}
            onPress={() => showComodoData(comodo)}
          >
            <Text style={[styles.roomText, { color: isDark ? "#FFD700" : "#D4AF37" }]}>{comodo.nome}</Text>
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
  safeArea: { flex: 1 },
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
  title: { fontSize: 24, marginBottom: 20 },
  roomButton: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  roomText: { fontSize: 16, fontWeight: "bold" },
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