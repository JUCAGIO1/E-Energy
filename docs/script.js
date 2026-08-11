// 🧮 E-Energy - Calculadora de Consumo Residencial em SP
document.addEventListener('DOMContentLoaded', () => {
  const inputPotencia = document.getElementById('potencia');
  const inputHoras = document.getElementById('horas');
  const inputDias = document.getElementById('dias');

  const resKwh = document.getElementById('resKwh');
  const resValor = document.getElementById('resValor');

  const TARIFA_SP = 0.85; // R$ 0,85 por kWh (Média Estado de São Paulo)

  function calcularConsumo() {
    const potencia = parseFloat(inputPotencia.value) || 0;
    const horas = parseFloat(inputHoras.value) || 0;
    const dias = parseFloat(inputDias.value) || 0;

    // Cálculo em kWh mensal = (Watts * horas/dia * dias/mês) / 1000
    const kwhMensal = (potencia * horas * dias) / 1000;
    const valorMensal = kwhMensal * TARIFA_SP;

    resKwh.textContent = `${kwhMensal.toFixed(1)} kWh`;
    resValor.textContent = `R$ ${valorMensal.toFixed(2).replace('.', ',')} / mês`;
  }

  inputPotencia.addEventListener('input', calcularConsumo);
  inputHoras.addEventListener('input', calcularConsumo);
  inputDias.addEventListener('input', calcularConsumo);

  // Executa o primeiro cálculo ao carregar
  calcularConsumo();
});
