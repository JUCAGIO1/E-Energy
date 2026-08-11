const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Limite geral de requisições (Proteção contra spam/DDoS em feiras de tecnologia)
const limiterGeral = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 150, // Máximo 150 requisições por IP
  message: {
    success: false,
    message: 'Muitas requisições vindas deste IP. Por favor, tente novamente em 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limite estrito para Login e Cadastro (Proteção contra Força Bruta)
const limiterAutenticacao = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15, // Máximo 15 tentativas de login por IP
  message: {
    success: false,
    message: 'Muitas tentativas de login/cadastro. Bloqueado por 15 minutos por segurança.',
  },
});

// Middleware de Validação de Token de Hardware para o ESP32
const validarSecretESP32 = (req, res, next) => {
  const esp32Secret = req.headers['x-esp32-secret'];
  const secretEsperada = process.env.ESP32_SECRET || 'eenergy_esp32_secret_2026';

  // Se for GET (consulta do app), permite passar
  if (req.method === 'GET') {
    return next();
  }

  // Se for POST de leitura sem a chave do ESP32 e sem token de usuário
  if (req.path === '/leituras' && req.method === 'POST') {
    if (esp32Secret !== secretEsperada) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado: Requisição de hardware não autorizada.',
      });
    }
  }

  next();
};

module.exports = {
  limiterGeral,
  limiterAutenticacao,
  validarSecretESP32,
  mongoSanitize: mongoSanitize(),
};
