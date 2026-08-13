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
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

export default function TelaComodos({ route, navigation }) {
  const { nomeCasa } = route.params || { nomeCasa: "Casa" };

  const [releStatus, setReleStatus] = useState(false);
  const [dados, setDados] = useState([]);
  const [comodos, setComodos] = useState([
    { id: '1', nome: 'Medidor Geral (Totalizador)', icon: 'flash' },
    { id: '2', nome: 'Sala de Estar', icon: 'tv-outline' },
    { id: '3', nome: 'Cozinha / Tomadas Pesadas', icon: 'restaurant-outline' },
    { id: '4', nome: 'Chuveiro Elétrico', icon: 'water-outline' },
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
      Alert.alert("Relé", novoEstado ? "Relé ativado com sucesso." : "Relé desativado com sucesso.");
    } catch (error) {
      Alert.alert("Relé", novoEstado ? "Relé ativado (Modo Local)" : "Relé desativado (Modo Local)");
    }
  };

  const adicionarComodo = () => {
    if (!novoComodo.trim()) {
      Alert.alert("Atenção", "Por favor, digite o nome do cômodo ou circuito.");
      return;
    }

    const novoObj = {
      id: Date.now().toString(),
      nome: novoComodo.trim(),
      icon: 'hardware-chip-outline',
    };

    setComodos([...comodos, novoObj]);
    setNovoComodo("");
    setModalVisivel(false);
    Alert.alert("Sucesso", "Novo cômodo ou circuito cadastrado.");
  };

  const showComodoData = (comodo) => {
    if (comodo.id === '1') {
      Alert.alert(
        "Consumo Geral da Casa (Totalizador)",
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

  const handleTrocarCasa = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Botão Superior de Voltar */}
          <TouchableOpacity style={styles.trocarCasaHeader} onPress={handleTrocarCasa}>
            <Entypo name="chevron-left" size={18} color={Colors.primary} />
            <Text style={styles.trocarCasaHeaderText}>Sair / Trocar de Casa</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{nomeCasa}</Text>
          <Text style={styles.subtitle}>Monitoramento de Corrente Elétrica e Cômodos</Text>

          {/* Card do Medidor Geral Totalizador */}
          <View style={styles.totalizadorCard}>
            <View style={styles.totalizadorHeaderRow}>
              <Ionicons name="analytics-outline" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.totalizadorTitle}>Medidor Geral da Casa</Text>
            </View>
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
          <Text style={styles.sectionHeader}>Cômodos / Circuitos de Disjuntor:</Text>

          {comodos.map((comodo) => (
            <CustomButton
              key={comodo.id}
              title={comodo.nome}
              variant={comodo.id === '1' ? 'primary' : 'secondary'}
              icon={<Ionicons name={comodo.icon || 'flash-outline'} size={18} color={comodo.id === '1' ? Colors.textDark : Colors.primary} style={{ marginRight: 10 }} />}
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
              size={22}
              color={releStatus ? "#121212" : "#FFFFFF"}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.releText, releStatus && { color: "#121212" }]}>
              {releStatus ? "Desativar Carga / Relé" : "Ativar Carga / Relé"}
            </Text>
          </TouchableOpacity>

          {/* Botão Inferior de Trocar de Casa */}
          <CustomButton
            title="Sair da Casa (Voltar para Lista de Casas)"
            variant="outline"
            icon={<Ionicons name="home-outline" size={18} color={Colors.primary} style={{ marginRight: 8 }} />}
            style={{ marginTop: 5, marginBottom: 20 }}
            onPress={handleTrocarCasa}
          />

          {/* Modal de Cadastro de Cômodo */}
          <Modal
            visible={modalVisivel}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisivel(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Adicionar Cômodo / Circuito</Text>

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
  trocarCasaHeader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
  },
  trocarCasaHeaderText: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginTop: 5,
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
  totalizadorHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  totalizadorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
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
    fontSize: 15,
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
    marginBottom: 15,
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