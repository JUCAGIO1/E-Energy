import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

export default function GraficoConsumo({ dadosHistoricos = [] }) {
  const [tipoFiltro, setTipoFiltro] = useState('potencia'); // 'potencia' | 'corrente'

  // Dados fictícios/fallback caso a API ainda não tenha retornado dados suficientes
  const dadosMockPotencia = [
    { value: 120, label: '08:00', dataPointText: '120W' },
    { value: 250, label: '10:00', dataPointText: '250W' },
    { value: 180, label: '12:00', dataPointText: '180W' },
    { value: 310, label: '14:00', dataPointText: '310W' },
    { value: 210, label: '16:00', dataPointText: '210W' },
    { value: 90,  label: '18:00', dataPointText: '90W'  },
  ];

  const dadosMockCorrente = [
    { value: 0.94, label: '08:00', dataPointText: '0.9A' },
    { value: 1.96, label: '10:00', dataPointText: '2.0A' },
    { value: 1.41, label: '12:00', dataPointText: '1.4A' },
    { value: 2.44, label: '14:00', dataPointText: '2.4A' },
    { value: 1.65, label: '16:00', dataPointText: '1.7A' },
    { value: 0.70, label: '18:00', dataPointText: '0.7A' },
  ];

  // Se houver dados vindos do backend, converte para o formato da biblioteca
  const chartData = dadosHistoricos.length > 0
    ? dadosHistoricos.map((item) => ({
        value: tipoFiltro === 'potencia' ? item.potencia : item.corrente,
        label: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }))
    : (tipoFiltro === 'potencia' ? dadosMockPotencia : dadosMockCorrente);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>⚡ Consumo de Energia em Tempo Real</Text>
      
      {/* Seletor de Métrica */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.filterButton, tipoFiltro === 'potencia' && styles.filterButtonActive]}
          onPress={() => setTipoFiltro('potencia')}
        >
          <Text style={[styles.filterText, tipoFiltro === 'potencia' && styles.filterTextActive]}>
            Potência (W)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, tipoFiltro === 'corrente' && styles.filterButtonActive]}
          onPress={() => setTipoFiltro('corrente')}
        >
          <Text style={[styles.filterText, tipoFiltro === 'corrente' && styles.filterTextActive]}>
            Corrente (A)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Gráfico */}
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={width * 0.75}
          height={180}
          color="#FFD700"
          thickness={3}
          startFillColor="rgba(255, 215, 0, 0.3)"
          endFillColor="rgba(255, 215, 0, 0.01)"
          startOpacity={0.4}
          endOpacity={0.1}
          areaChart
          curved
          dataPointsColor="#FFFFFF"
          dataPointsRadius={4}
          textColor1="#FFD700"
          textFontSize={10}
          yAxisTextStyle={{ color: '#A0A0A0', fontSize: 10 }}
          xAxisLabelTextStyle={{ color: '#A0A0A0', fontSize: 10 }}
          hideRules
          yAxisColor="#3D3D3D"
          xAxisColor="#3D3D3D"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginVertical: 15,
    width: '90%',
    borderColor: '#3D3D3D',
    borderWidth: 1,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    padding: 3,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#121212',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
});
