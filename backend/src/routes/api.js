const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const leituraController = require('../controllers/leituraController');
const { limiterAutenticacao, validarSecretESP32 } = require('../middleware/security');

// Rotas de Autenticação (Protegidas com limite de tentativas por IP)
router.post('/auth/register', limiterAutenticacao, authController.register);
router.post('/auth/login', limiterAutenticacao, authController.login);

// Rotas de Leituras do ESP32 & App (Protegidas com validação de Secret do ESP32)
router.post('/leituras', validarSecretESP32, leituraController.salvarLeitura);
router.get('/leituras', leituraController.obterLeituras);
router.get('/dados', leituraController.obterLeituras);
router.get('/comodos', leituraController.obterComodos);

module.exports = router;
