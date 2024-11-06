// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Rota para autenticação com Google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Rota de callback do Google
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login' // Redireciona para a página de login em caso de falha
}), (req, res) => {
    // Sucesso: redirecionar para a página principal ou dashboard
    res.redirect('/'); // ou outra página
});

module.exports = router;
