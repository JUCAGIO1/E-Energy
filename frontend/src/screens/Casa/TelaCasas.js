import React, { useContext } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { styles }  from './styles';
import Entypo from '@expo/vector-icons/Entypo';

export default function TelaCasas({ navigation }) {
  const casas = ["Casa 1", "Casa 2", "Casa 3"];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Cores.fundoEscuro }]}>
      <View style={styles.containerCentralizado}>
        <Text style={[styles.title, { color: Cores.textoBranco }]}>Minhas Casas</Text>
        
        {casas.map((casa, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate("TelaComodos", { nomeCasa: casa })}
          >
            <Entypo name="home" size={24} color="black" />
            <Text style={styles.buttonText}>{casa}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}