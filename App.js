import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaDeLogin from "./src/screens/TelaDeLogin";
import TelaDeAcesso from "./src/screens/TelaDeAcesso";
import TelaDeCadastro from "./src/screens/TelaDeCadastro";
import TelaCasas from "./src/screens/TelaCasas";
import TelaComodos from "./src/screens/TelaComodos";
import TelaPerfil from "./src/screens/TelaPerfil";
import TelaConfiguracoes from "./src/screens/TelaConfiguracoes";
import TelaEsqueceuSenha from "./src/screens/TelaEsqueceuSenha";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={TelaDeLogin} />
        <Stack.Screen name="TelaDeAcesso" component={TelaDeAcesso} />
        <Stack.Screen name="Cadastro" component={TelaDeCadastro} />
        <Stack.Screen name="TelaCasas" component={TelaCasas} />
        <Stack.Screen name="TelaComodos" component={TelaComodos} />
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        <Stack.Screen name="TelaConfiguracoes" component={TelaConfiguracoes} />
        <Stack.Screen name="TelaEsqueceuSenha" component={TelaEsqueceuSenha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
