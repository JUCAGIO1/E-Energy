const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const { limiterGeral, mongoSanitize } = require('./middleware/security');

const app = express();

// Conectar ao Banco de Dados MongoDB Atlas
connectDB();

// 🛡️ Middlewares de Segurança para Feira de Tecnologia / Produção
app.use(helmet()); // Oculta cabeçalhos do servidor e previne ataques XSS/Clickjacking
app.use(mongoSanitize); // Remove caracteres maliciosos $ de injeção NoSQL
app.use('/api', limiterGeral); // Aplica limite de requisições por IP

// Middlewares Padrão
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limita tamanho do body JSON a 10kb contra ataques de estouro

// Rota Raiz de teste de saúde
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    projeto: 'E-Energy API (TCC)',
    seguranca: 'Helmet, RateLimit & MongoSanitize Ativos 🛡️',
    timestamp: new Date(),
  });
});

// Rotas da API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`⚡ Servidor E-Energy rodando na porta ${PORT}`);
  console.log(`🛡️ Camada de Segurança Ativa: Helmet + RateLimiter + MongoSanitize`);
  console.log(`🌐 Endpoint local: http://localhost:${PORT}/api`);
});
