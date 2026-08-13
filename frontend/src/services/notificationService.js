import { Alert, Platform } from 'react-native';

// Tenta carregar expo-notifications com proteção para Expo Go (SDK 53/54)
let Notifications = null;
try {
  Notifications = require('expo-notifications');
  if (Notifications && Notifications.setNotificationHandler) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }
} catch (e) {
  console.log('Expo Go: Modo de alertas nativos ativado');
}

// Solicitar permissões de notificação no aplicativo
export const solicitarPermissaoNotificacoes = async () => {
  if (!Notifications || !Notifications.getPermissionsAsync) {
    return true;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.log('Modo de compatibilidade Expo Go ativo para permissões');
    return true;
  }
};

// Disparar Notificação de Alerta de Consumo Excessivo
export const dispararAlertaConsumo = async (titulo, mensagem) => {
  const tituloFinal = titulo || 'ALERTA E-ENERGY: Consumo Elevado';
  const mensagemFinal = mensagem || 'Corrente elétrica acima do limite de 15A detectada!';

  try {
    if (Notifications && Notifications.scheduleNotificationAsync) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: tituloFinal,
          body: mensagemFinal,
          sound: true,
        },
        trigger: null,
      });
      return;
    }
  } catch (error) {
    console.log('Exibindo alerta in-app (Expo Go)');
  }

  // Fallback seguro in-app para Expo Go e navegadores
  Alert.alert(tituloFinal, mensagemFinal, [{ text: "OK" }]);
};
