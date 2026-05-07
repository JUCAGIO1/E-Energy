import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaDeLogin from "./src/screens/Login/TelaDeLogin";
import TelaDeAcesso from "./src/screens/Acesso/TelaDeAcesso";
import TelaDeCadastro from "./src/screens/Cadastro/TelaDeCadastro";
import TelaCasas from "./src/screens/Casa/TelaCasas";
import TelaComodos from "./src/screens/Comodo/TelaComodos";
import TelaPerfil from "./src/screens/Perfil/TelaPerfil";
import TelaConfiguracoes from "./src/screens/config/TelaConfiguracoes";
import TelaEsqueceuSenha from "./src/screens/Esqueceu senha/TelaEsqueceuSenha";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
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
