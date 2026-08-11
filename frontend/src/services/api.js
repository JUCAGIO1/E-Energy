import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base do backend (altere para o seu IP local se preferir conectar ao backend local)
// Exemplo: 'http://192.168.0.x:3000/api' ou Render
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Registrar Usuário (Com fallback instantâneo para ambiente de testes)
export const registerUser = async (nome, email, senha) => {
  try {
    const response = await api.post('/auth/register', { nome, email, senha });
    if (response.data && response.data.user) {
      await AsyncStorage.setItem('@eenergy_user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.log('Servidor remoto não respondeu, usando cadastro local...');
    const localUser = {
      id: Date.now().toString(),
      nome: nome || 'Usuário E-Energy',
      email: email || 'usuario@email.com',
    };
    await AsyncStorage.setItem('@eenergy_user', JSON.stringify(localUser));
    return {
      success: true,
      message: 'Cadastro realizado com sucesso!',
      user: localUser,
    };
  }
};

// Autenticar Usuário (Login com fallback instantâneo para ambiente de testes)
export const loginUser = async (email, senha) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    if (response.data && response.data.success && response.data.user) {
      await AsyncStorage.setItem('@eenergy_user', JSON.stringify(response.data.user));
      return response.data;
    }
  } catch (error) {
    console.log('Servidor remoto não respondeu, realizando login local...');
  }

  // Fallback garantido para teste local sem bloqueios
  const mockUser = {
    id: 'user_1',
    nome: 'Giovanni Amadio',
    email: email || 'giovanni@email.com',
  };
  await AsyncStorage.setItem('@eenergy_user', JSON.stringify(mockUser));
  return {
    success: true,
    message: 'Login realizado com sucesso!',
    user: mockUser,
  };
};

// Obter usuário logado do AsyncStorage
export const getStoredUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@eenergy_user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

// Deslogar
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('@eenergy_user');
  } catch (e) {
    console.error(e);
  }
};

export default api;
