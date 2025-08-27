import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaDeAcesso from "./src/screens/TelaDeAcesso";  
import TelaDeCadastro from "./src/screens/TelaDeCadastro";  // idem
import TelaDeLogin from "./src/screens/TelaDeLogin"; // nome sem espaço! 


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={TelaDeLogin} />
        <Stack.Screen name="TelaDeAcesso" component={TelaDeAcesso} />
        <Stack.Screen name="TelaDeCadastro" component={TelaDeCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
