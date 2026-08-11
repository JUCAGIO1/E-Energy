const User = require('../models/User');

// Memory store fallback para testes sem MongoDB local rodando
const usersMemoryDB = [];

// Cadastro de Usuário
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
    }

    const emailNormalizado = email.toLowerCase().trim();

    // Tenta salvar via MongoDB
    try {
      const userExists = await User.findOne({ email: emailNormalizado });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Este e-mail já está cadastrado.' });
      }

      const newUser = await User.create({ nome, email: emailNormalizado, senha });
      return res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso!',
        user: { id: newUser._id, nome: newUser.nome, email: newUser.email },
      });
    } catch (dbError) {
      // Fallback em memória
      const existsInMem = usersMemoryDB.find(u => u.email === emailNormalizado);
      if (existsInMem) {
        return res.status(400).json({ success: false, message: 'Este e-mail já está cadastrado.' });
      }

      const memoryUser = { id: Date.now().toString(), nome, email: emailNormalizado, senha };
      usersMemoryDB.push(memoryUser);

      return res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso (Modo Local)!',
        user: { id: memoryUser.id, nome: memoryUser.nome, email: memoryUser.email },
      });
    }
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
};

// Login de Usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ success: false, message: 'Informe e-mail e senha.' });
    }

    const emailNormalizado = email.toLowerCase().trim();

    // Tenta autenticar via MongoDB
    try {
      const user = await User.findOne({ email: emailNormalizado });
      if (user && user.senha === senha) {
        return res.status(200).json({
          success: true,
          message: 'Login realizado com sucesso!',
          user: { id: user._id, nome: user.nome, email: user.email },
          token: `token_${user._id}`,
        });
      }
    } catch (dbError) {
      // Fallback em memória
      const memoryUser = usersMemoryDB.find(u => u.email === emailNormalizado && u.senha === senha);
      if (memoryUser) {
        return res.status(200).json({
          success: true,
          message: 'Login realizado com sucesso!',
          user: { id: memoryUser.id, nome: memoryUser.nome, email: memoryUser.email },
          token: `token_${memoryUser.id}`,
        });
      }
    }

    // Se forneceu credenciais genéricas para teste
    if (emailNormalizado === 'joao@email.com' && senha === '123456') {
      return res.status(200).json({
        success: true,
        message: 'Login demo realizado com sucesso!',
        user: { id: 'demo_1', nome: 'João da Silva', email: 'joao@email.com' },
        token: 'token_demo_123',
      });
    }

    return res.status(401).json({ success: false, message: 'E-mail ou senha inválidos.' });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
};
