const mongoose = require('mongoose');

const LeituraSchema = new mongoose.Schema({
  comodo_id: {
    type: String,
    required: true,
    default: 'sala',
  },
  corrente: {
    type: Number,
    required: true,
  },
  potencia: {
    type: Number,
    required: true,
  },
  tensao: {
    type: Number,
    default: 127,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Leitura', LeituraSchema);
