import React, { useContext } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { globalStyles, Cores } from './styles';
import Entypo from '@expo/vector-icons/Entypo';

export default function TelaCasas({ navigation }) {
  const casas = ["Casa 1", "Casa 2", "Casa 3"];

  return (
    <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: Cores.fundoEscuro }]}>
      <View style={globalStyles.containerCentralizado}>
        <Text style={[globalStyles.title, { color: Cores.textoBranco }]}>Minhas Casas</Text>
        
        {casas.map((casa, index) => (
          <TouchableOpacity
            key={index}
            style={globalStyles.button}
            onPress={() => navigation.navigate("TelaComodos", { nomeCasa: casa })}
          >
            <Entypo name="home" size={24} color="black" />
            <Text style={globalStyles.buttonText}>{casa}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}