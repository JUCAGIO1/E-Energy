import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TelaDeLogin from "./src/screens/Login/TelaDeLogin";
import TelaDeCadastro from "./src/screens/Cadastro/TelaDeCadastro";
import TelaEsqueceuSenha from "./src/screens/EsqueceuSenha/TelaEsqueceuSenha";
import TabNavigator from "./src/navigation/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Telas de Autenticação */}
          <Stack.Screen name="Login" component={TelaDeLogin} />
          <Stack.Screen name="Cadastro" component={TelaDeCadastro} />
          <Stack.Screen name="TelaEsqueceuSenha" component={TelaEsqueceuSenha} />
          
          {/* Aplicação Principal com Barra de Navegação Inferior */}
          <Stack.Screen name="TelaDeAcesso" component={TabNavigator} />
          <Stack.Screen name="MainApp" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
