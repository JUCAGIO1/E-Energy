import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaDeLogin from "./src/screens/TelaDeLogin";
import TelaDeAcesso from "./src/screens/TelaDeAcesso";
import TelaDeCadastro from "./src/screens/TelaDeCadastro";
import TelaCasas from "./src/screens/TelaCasas";       // ✅
import TelaComodos from "./src/screens/TelaComodos";   // ✅

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={TelaDeLogin} />
        <Stack.Screen name="TelaDeAcesso" component={TelaDeAcesso} />
        <Stack.Screen name="TelaDeCadastro" component={TelaDeCadastro} />
        <Stack.Screen name="TelaCasas" component={TelaCasas} />
        <Stack.Screen name="TelaComodos" component={TelaComodos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
