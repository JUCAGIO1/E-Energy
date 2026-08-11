import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

import TelaDeAcesso from '../screens/Acesso/TelaDeAcesso';
import TelaCasas from '../screens/Casa/TelaCasas';
import TelaComodos from '../screens/Comodo/TelaComodos';
import TelaPerfil from '../screens/Perfil/TelaPerfil';
import TelaConfiguracoes from '../screens/config/TelaConfiguracoes';
import TelaDicasEconomia from '../screens/Dicas/TelaDicasEconomia';
import { Colors } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function InicioStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MenuPrincipal" component={TelaDeAcesso} />
      <Stack.Screen name="TelaDicasEconomia" component={TelaDicasEconomia} />
    </Stack.Navigator>
  );
}

function CasasStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MinhasCasas" component={TelaCasas} />
      <Stack.Screen name="TelaComodos" component={TelaComodos} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.card,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStackNavigator}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CasasTab"
        component={CasasStackNavigator}
        options={{
          tabBarLabel: 'Casas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DicasTab"
        component={TelaDicasEconomia}
        options={{
          tabBarLabel: 'Dicas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={TelaPerfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size - 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuracoes"
        component={TelaConfiguracoes}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size - 2} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
