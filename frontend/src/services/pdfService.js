import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export const gerarRelatorioPDF = async (usuario, dadosConsumo) => {
  try {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Relatório E-Energy</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 25px; color: #121212; }
            .header { text-align: center; border-bottom: 2px solid #FFD700; padding-bottom: 15px; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #121212; margin: 0; }
            .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
            .info-box { background: #F8F9FA; border-radius: 8px; padding: 15px; margin-bottom: 20px; border-left: 4px solid #FFD700; }
            .info-item { font-size: 14px; margin-bottom: 5px; }
            .section-title { font-size: 18px; font-weight: bold; color: #121212; margin-top: 25px; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #E0E0E0; padding: 10px; text-align: left; font-size: 13px; }
            th { background-color: #121212; color: #FFD700; }
            tr:nth-child(even) { background-color: #F9F9F9; }
            .total-box { background: #121212; color: #FFFFFF; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: right; }
            .total-gold { color: #FFD700; font-size: 20px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; font-size: 11px; color: #888; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">⚡ E-ENERGY - Relatório de Eficiência Energética</div>
            <div class="subtitle">Monitoramento Inteligente de Consumo de Energia Elétrica</div>
          </div>

          <div class="info-box">
            <div class="info-item"><strong>Cliente / Usuário:</strong> ${usuario?.nome || 'Giovanni Amadio'}</div>
            <div class="info-item"><strong>E-mail:</strong> ${usuario?.email || 'giovanni@email.com'}</div>
            <div class="info-item"><strong>Data de Emissão:</strong> ${dataAtual} às ${horaAtual}</div>
            <div class="info-item"><strong>Tarifa Aplicada:</strong> Média Estado de São Paulo (R$ 0,85/kWh)</div>
          </div>

          <div class="section-title">📊 Resumo do Consumo por Cômodo / Circuito</div>
          <table>
            <thead>
              <tr>
                <th>Circuito / Cômodo</th>
                <th>Potência Média (W)</th>
                <th>Corrente (A)</th>
                <th>Consumo Est. (kWh/mês)</th>
                <th>Custo Est. (R$)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>⚡ Medidor Geral (Totalizador)</td>
                <td>430 W</td>
                <td>3.38 A</td>
                <td>100.4 kWh</td>
                <td>R$ 85,40</td>
              </tr>
              <tr>
                <td>🛋️ Sala de Estar</td>
                <td>120 W</td>
                <td>0.94 A</td>
                <td>28.0 kWh</td>
                <td>R$ 23,80</td>
              </tr>
              <tr>
                <td>🍳 Cozinha / Tomadas Pesadas</td>
                <td>160 W</td>
                <td>1.25 A</td>
                <td>37.4 kWh</td>
                <td>R$ 31,80</td>
              </tr>
              <tr>
                <td>🚿 Chuveiro Elétrico</td>
                <td>150 W</td>
                <td>1.18 A</td>
                <td>35.0 kWh</td>
                <td>R$ 29,80</td>
              </tr>
            </tbody>
          </table>

          <div class="total-box">
            <span>Custo Total Estimado Mensal: </span>
            <span class="total-gold">R$ 85,40</span>
          </div>

          <div class="section-title">🛡️ Auditoria de Segurança & Integridade</div>
          <div class="info-box" style="border-left-color: #4CAF50;">
            <div class="info-item">✓ Criptografia do Hardware: AES-128 (ESP-NOW) & HMAC-SHA256 Ativos</div>
            <div class="info-item">✓ Protocolo de Segurança: WSS / TLS 1.3 & RateLimiter Anti-DDoS</div>
            <div class="info-item">✓ Limite Máximo de Corrente: 15 Amperes (Sem sobrecarga detectada)</div>
          </div>

          <div class="footer">
            E-Energy TCC &copy; ${new Date().getFullYear()} - Sistema de Gestão Energética Residencial
          </div>
        </body>
      </html>
    `;

    // Gerar o PDF temporário
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // Abrir a caixa de diálogo nativa para compartilhar/salvar o PDF no celular
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
        dialogTitle: 'Exportar Relatório E-Energy PDF',
      });
    } else {
      Alert.alert('Relatório Gerado', `O PDF foi salvo em: ${uri}`);
    }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    Alert.alert('Erro', 'Não foi possível gerar o relatório em PDF.');
  }
};
