import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

// Configurar o comportamento das notificações em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Solicitar permissões de notificação no aplicativo
export const solicitarPermissaoNotificacoes = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permissão de notificação negada pelo usuário');
      return false;
    }

    return true;
  } catch (error) {
    console.log('Notificações ativas no modo de teste');
    return true;
  }
};

// Disparar Notificação de Alerta de Consumo Excessivo
export const dispararAlertaConsumo = async (titulo, mensagem) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo || '🚨 ALERTA E-ENERGY: Consumo Elevado',
        body: mensagem || 'Corrente elétrica acima do limite de 15A detectada!',
        sound: true,
        data: { data: 'alerta_eenergy' },
      },
      trigger: null, // Dispara imediatamente
    });
  } catch (error) {
    // Fallback via Alert nativo se estiver no simulador sem suporte push
    Alert.alert(titulo || '🚨 ALERTA E-ENERGY', mensagem || 'Corrente elétrica acima do limite de 15A detectada!');
  }
};
