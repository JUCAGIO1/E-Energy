import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";
import GraficoConsumo from "../../components/GraficoConsumo";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { Colors } from "../../constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TelaComodos({ route }) {
  const { nomeCasa } = route.params || { nomeCasa: "Casa" };

  const [releStatus, setReleStatus] = useState(false);
  const [dados, setDados] = useState([]);
  const [comodos, setComodos] = useState([
    { id: '1', nome: '⚡ Medidor Geral (Totalizador)' },
    { id: '2', nome: '🛋️ Sala de Estar' },
    { id: '3', nome: '🍳 Cozinha / Tomadas Pesadas' },
    { id: '4', nome: '🚿 Chuveiro Elétrico' },
  ]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoComodo, setNovoComodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dados');
        if (response.data) {
          setDados(response.data);
        }
      } catch (error) {
        console.log('Modo local ativo para cômodos');
      }
    };

    fetchData();
  }, []);

  const toggleRele = async () => {
    const novoEstado = !releStatus;
    setReleStatus(novoEstado);

    try {
      const endpoint = novoEstado ? "/rele/ligar" : "/rele/desligar";
      await api.get(endpoint);
      Alert.alert("Relé", novoEstado ? "Relé ativado!" : "Relé desativado!");
    } catch (error) {
      Alert.alert("Relé", novoEstado ? "Relé ativado (Local)" : "Relé desativado (Local)");
    }
  };

  const adicionarComodo = () => {
    if (!novoComodo.trim()) {
      Alert.alert("Atenção", "Por favor, digite o nome do cômodo ou circuito.");
      return;
    }

    const novoObj = {
      id: Date.now().toString(),
      nome: `⚡ ${novoComodo.trim()}`,
    };

    setComodos([...comodos, novoObj]);
    setNovoComodo("");
    setModalVisivel(false);
    Alert.alert("Sucesso", "Novo cômodo/circuito adicionado!");
  };

  const showComodoData = (comodo) => {
    if (comodo.id === '1') {
      Alert.alert(
        "⚡ Consumo Geral da Casa (Totalizador)",
        "Potência Total Atual: 430 W\nCorrente Total: 3.38 A\nTensão: 127 V\nConsumo Estimado: R$ 85,40/mês",
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        `Consumo no ${comodo.nome}`,
        "Potência Circuito: 150 W\nCorrente: 1.18 A\nCusto Estimado: R$ 24,10/mês",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🏡 {nomeCasa}</Text>
          <Text style={styles.subtitle}>Monitoramento de Corrente Elétrica e Cômodos</Text>

          {/* Card do Medidor Geral Totalizador */}
          <View style={styles.totalizadorCard}>
            <Text style={styles.totalizadorTitle}>📊 Medidor Geral da Casa</Text>
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Potência</Text>
                <Text style={styles.metricValue}>430 W</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Corrente</Text>
                <Text style={styles.metricValue}>3.38 A</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Custo Est.</Text>
                <Text style={styles.metricGold}>R$ 85,40</Text>
              </View>
            </View>
          </View>

          {/* Gráfico de Consumo */}
          <GraficoConsumo dadosHistoricos={dados} />

          {/* Lista de Cômodos e Circuitos */}
          <Text style={styles.sectionHeader}>🔌 Cômodos / Circuitos de Disjuntor:</Text>

          {comodos.map((comodo) => (
            <CustomButton
              key={comodo.id}
              title={comodo.nome}
              variant={comodo.id === '1' ? 'primary' : 'secondary'}
              onPress={() => showComodoData(comodo)}
            />
          ))}

          {/* Botão de Adicionar Cômodo */}
          <CustomButton
            title="+ Adicionar Cômodo / Circuito"
            variant="outline"
            style={{ marginTop: 10 }}
            onPress={() => setModalVisivel(true)}
          />

          {/* Botão de Controle de Relé */}
          <TouchableOpacity
            style={[styles.releButton, releStatus && styles.releButtonActive]}
            onPress={toggleRele}
          >
            <MaterialCommunityIcons
              name={releStatus ? "power-plug" : "power-plug-off"}
              size={24}
              color={releStatus ? "#121212" : "#FFFFFF"}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.releText, releStatus && { color: "#121212" }]}>
              {releStatus ? "Desativar Carga / Relé ❌" : "Ativar Carga / Relé ⚡"}
            </Text>
          </TouchableOpacity>

          {/* Modal de Cadastro de Cômodo */}
          <Modal
            visible={modalVisivel}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisivel(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>🔌 Adicionar Cômodo / Circuito</Text>

                <Text style={styles.label}>Nome do Cômodo ou Disjuntor:</Text>
                <CustomInput
                  placeholder="Ex: Suíte, Ar Condicionado, Cozinha..."
                  value={novoComodo}
                  onChangeText={setNovoComodo}
                />

                <CustomButton title="Salvar Cômodo" onPress={adicionarComodo} />
                <CustomButton
                  title="Cancelar"
                  variant="secondary"
                  onPress={() => setModalVisivel(false)}
                  style={{ marginTop: 6 }}
                />
              </View>
            </View>
          </Modal>
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
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  totalizadorCard: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },
  totalizadorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metricItem: {
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  metricGold: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginTop: 15,
    marginBottom: 10,
  },
  releButton: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  releButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  releText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
});