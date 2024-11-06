const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
require('./config/passport'); // Importa a configuração do Passport

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para analisar o corpo das requisições
app.use(express.json());

// Configurar sessão
app.use(session({ secret: 'seuSegredo', resave: false, saveUninitialized: true }));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/BookRecommendationSystem')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Usar as rotas de usuário
app.use(userRoutes);
app.use(authRoutes); // Usar as rotas de autenticação

// Rota principal
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
