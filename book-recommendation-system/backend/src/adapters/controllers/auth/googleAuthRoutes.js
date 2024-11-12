const express = require('express');
const passport = require('passport');

const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config(); // Certifique-se de que as variáveis de ambiente estão configuradas

function generateAuthToken(user) {
    const payload = {
        id: user.id,
        nome: user.nome,
        email: user.email
    };

    // Use uma chave secreta segura armazenada em uma variável de ambiente
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}


// Rota para autenticação com Google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), async (req, res) => {
    // Dados do usuário autenticado
    const user = {
        id: req.user._id,
        nome: req.user.nome,
        email: req.user.email,
        googleId: req.user.googleId
    };

    // Gera um token de autenticação usando JWT
    const authToken = generateAuthToken(user);

    // Redireciona para o front-end com o token como parâmetro
    res.redirect(`http://localhost:3000/auth/success?token=${authToken}`);
});





module.exports = router;

//https://console.cloud.google.com/apis/credentials/oauthclient/462938419440-fq5819gf7jf5hdm137mi24ad4ktjgce1.apps.googleusercontent.com?project=liquid-anchor-440817-c9