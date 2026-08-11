const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const leituraController = require('../controllers/leituraController');

// Rotas de Autenticação
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Rotas de Leituras do ESP32 & App
router.post('/leituras', leituraController.salvarLeitura);
router.get('/leituras', leituraController.obterLeituras);
router.get('/dados', leituraController.obterLeituras);
router.get('/comodos', leituraController.obterComodos);

module.exports = router;
