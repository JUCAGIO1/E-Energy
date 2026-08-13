import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TelaDicasEconomia({ navigation }) {
  const [potenciaW, setPotenciaW] = useState('1500');
  const [horasDia, setHorasDia] = useState('4');
  const [tarifaKwh, setTarifaKwh] = useState('0.85');
  const [custoCalculado, setCustoCalculado] = useState(null);

  const dicas = [
    {
      id: 1,
      titulo: 'Chuveiro Elétrico',
      descricao: 'Reduza o tempo do banho para 8 minutos e utilize a posição de temperatura mais econômica.',
      economia: 'Economia estimada: até R$ 45,00/mês',
      iconName: 'water-outline',
    },
    {
      id: 2,
      titulo: 'Ar Condicionado',
      descricao: 'Mantenha a temperatura em 23°C ou 24°C e mantenha a manutenção e limpeza dos filtros em dia.',
      economia: 'Economia estimada: 20% a 30% na conta',
      iconName: 'snow-outline',
    },
    {
      id: 3,
      titulo: 'Refrigeração e Geladeira',
      descricao: 'Evite deixar a porta aberta por longos períodos e verifique a vedação da borracha.',
      economia: 'Economia estimada: cerca de R$ 15,00/mês',
      iconName: 'cube-outline',
    },
    {
      id: 4,
      titulo: 'Iluminação LED',
      descricao: 'Substitua lâmpadas antigas por lâmpadas de tecnologia LED de alta eficiência.',
      economia: 'Economia estimada: até 80% no consumo de luz',
      iconName: 'bulb-outline',
    },
  ];

  const calcularCusto = () => {
    const pot = parseFloat(potenciaW) || 0;
    const hrs = parseFloat(horasDia) || 0;
    const tar = parseFloat(tarifaKwh) || 0.85;

    // Consumo kWh/mês = (W * horas/dia * 30 dias) / 1000
    const kwhMes = (pot * hrs * 30) / 1000;
    const custoMes = kwhMes * tar;

    setCustoCalculado({
      kwh: kwhMes.toFixed(2),
      custo: custoMes.toFixed(2),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Dicas & Economia</Text>
        <Text style={styles.subtitle}>
          Aprenda a reduzir o consumo elétrico e calcule os custos dos aparelhos.
        </Text>

        {/* Seção: Calculadora de Aparelhos */}
        <View style={styles.cardCalculadora}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="calculator-outline" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Simular Custo de um Aparelho</Text>
          </View>

          <Text style={styles.label}>Potência do aparelho (Watts):</Text>
          <CustomInput
            placeholder="Ex: 1500W (Chuveiro, Ar, etc.)"
            keyboardType="numeric"
            value={potenciaW}
            onChangeText={setPotenciaW}
          />

          <Text style={styles.label}>Horas de uso por dia:</Text>
          <CustomInput
            placeholder="Ex: 4"
            keyboardType="numeric"
            value={horasDia}
            onChangeText={setHorasDia}
          />

          <CustomButton title="Calcular Custo Mensal" onPress={calcularCusto} />

          {custoCalculado && (
            <View style={styles.resultadoBox}>
              <Text style={styles.resultadoText}>
                Consumo estimado: <Text style={styles.highlight}>{custoCalculado.kwh} kWh/mês</Text>
              </Text>
              <Text style={styles.resultadoText}>
                Custo estimado: <Text style={styles.highlightGold}>R$ {custoCalculado.custo}/mês</Text>
              </Text>
            </View>
          )}
        </View>

        {/* Seção: Lista de Dicas */}
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="bulb-outline" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
          <Text style={styles.sectionHeader}>Dicas Práticas de Consumo</Text>
        </View>

        {dicas.map((dica) => (
          <View key={dica.id} style={styles.dicaCard}>
            <View style={styles.dicaHeader}>
              <Ionicons name={dica.iconName} size={20} color={Colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.dicaTitulo}>{dica.titulo}</Text>
            </View>
            <Text style={styles.dicaDescricao}>{dica.descricao}</Text>
            <Text style={styles.dicaEconomia}>{dica.economia}</Text>
          </View>
        ))}

        <CustomButton
          title="Voltar ao Menu"
          variant="secondary"
          style={{ marginTop: 15, marginBottom: 20 }}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardCalculadora: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  resultadoBox: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 14,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  resultadoText: {
    color: Colors.textPrimary,
    fontSize: 15,
    marginVertical: 2,
  },
  highlight: {
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  highlightGold: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 17,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  dicaCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 15,
    marginBottom: 12,
  },
  dicaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dicaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  dicaDescricao: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  dicaEconomia: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
