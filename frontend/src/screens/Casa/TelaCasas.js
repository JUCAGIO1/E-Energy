import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/colors";

export default function TelaCasas({ navigation }) {
  const [casas, setCasas] = useState([
    { id: '1', nome: 'Casa Principal' },
    { id: '2', nome: 'Casa de Campo' },
  ]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoNomeCasa, setNovoNomeCasa] = useState('');

  const adicionarCasa = () => {
    if (!novoNomeCasa.trim()) {
      Alert.alert("Atenção", "Por favor, digite o nome da casa.");
      return;
    }

    const novaCasaObj = {
      id: Date.now().toString(),
      nome: novoNomeCasa.trim(),
    };

    setCasas([...casas, novaCasaObj]);
    setNovoNomeCasa('');
    setModalVisivel(false);
    Alert.alert("Sucesso", "Nova casa cadastrada com sucesso!");
  };

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Minhas Casas</Text>
          <Text style={styles.subtitle}>Selecione uma casa para visualizar os cômodos e consumo</Text>

          {casas.map((casa) => (
            <CustomButton
              key={casa.id}
              title={casa.nome}
              variant="secondary"
              icon={<Ionicons name="home-outline" size={20} color={Colors.primary} style={{ marginRight: 12 }} />}
              onPress={() => navigation.navigate("TelaComodos", { nomeCasa: casa.nome })}
            />
          ))}

          {/* Botão para Adicionar Nova Casa */}
          <CustomButton
            title="+ Adicionar Nova Casa"
            variant="outline"
            style={{ marginTop: 15 }}
            onPress={() => setModalVisivel(true)}
          />

          {/* Modal de Cadastro de Casa */}
          <Modal
            visible={modalVisivel}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisivel(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Cadastrar Nova Casa</Text>
                
                <Text style={styles.label}>Nome da Casa ou Propriedade:</Text>
                <CustomInput
                  placeholder="Ex: Casa da Praia, Escritório..."
                  value={novoNomeCasa}
                  onChangeText={setNovoNomeCasa}
                />

                <CustomButton title="Salvar Casa" onPress={adicionarCasa} />
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
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 25,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justify.content: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
});