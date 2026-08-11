const Leitura = require('../models/Leitura');

const leiturasMemoryDB = [
  { comodo_id: 'sala', corrente: 1.2, potencia: 152.4, tensao: 127, timestamp: new Date(Date.now() - 3600000 * 4) },
  { comodo_id: 'sala', corrente: 1.9, potencia: 241.3, tensao: 127, timestamp: new Date(Date.now() - 3600000 * 3) },
  { comodo_id: 'sala', corrente: 1.4, potencia: 177.8, tensao: 127, timestamp: new Date(Date.now() - 3600000 * 2) },
  { comodo_id: 'sala', corrente: 2.4, potencia: 304.8, tensao: 127, timestamp: new Date(Date.now() - 3600000 * 1) },
];

// Salva leitura enviada pelo ESP32
exports.salvarLeitura = async (req, res) => {
  try {
    const { comodo_id, corrente, potencia, tensao } = req.body;

    if (corrente === undefined || potencia === undefined) {
      return res.status(400).json({ success: false, message: 'Dados de corrente/potência inválidos' });
    }

    const novaLeitura = {
      comodo_id: comodo_id || 'sala',
      corrente: parseFloat(corrente),
      potencia: parseFloat(potencia),
      tensao: tensao ? parseFloat(tensao) : 127,
      timestamp: new Date(),
    };

    try {
      const doc = await Leitura.create(novaLeitura);
      return res.status(201).json({ success: true, data: doc });
    } catch (dbErr) {
      leiturasMemoryDB.push(novaLeitura);
      return res.status(201).json({ success: true, data: novaLeitura });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro ao salvar leitura' });
  }
};

// Retorna histórico de leituras
exports.obterLeituras = async (req, res) => {
  try {
    try {
      const docs = await Leitura.find().sort({ timestamp: -1 }).limit(50);
      if (docs.length > 0) {
        return res.status(200).json(docs);
      }
    } catch (dbErr) {
      // Ignora e usa memória
    }
    return res.status(200).json(leiturasMemoryDB);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro ao buscar leituras' });
  }
};

// Retorna cômodos
exports.obterComodos = async (req, res) => {
  return res.status(200).json([
    { id: 'sala', nome: 'Sala de Estar' },
    { id: 'cozinha', nome: 'Cozinha' },
    { id: 'quarto', nome: 'Quarto Principal' },
  ]);
};
