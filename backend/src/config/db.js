const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://localhost:27017/eenergy';

    if (connStr.includes('<db_username>') || connStr.includes('<db_password>')) {
      console.log('⚠️ Alerta MongoDB Atlas: Lembre-se de substituir <db_username> e <db_password> pelas suas credenciais reais no arquivo .env!');
      console.log('⚠️ O servidor iniciará em modo fallback local.');
      return;
    }

    const conn = await mongoose.connect(connStr);
    console.log(`✅ MongoDB Atlas Conectado com Sucesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erro ao conectar no MongoDB Atlas: ${error.message}`);
    console.log('⚠️ Servidor continuará rodando em modo memória fallback.');
  }
};

module.exports = connectDB;
