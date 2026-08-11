const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota Raiz de teste
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    projeto: 'E-Energy API (TCC)',
    version: '1.0.0',
    timestamp: new Date(),
  });
});

// Rotas da API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`⚡ Servidor E-Energy rodando na porta ${PORT}`);
  console.log(`🌐 Endpoint local: http://localhost:${PORT}/api`);
});
