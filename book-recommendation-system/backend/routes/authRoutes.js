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
}), async (req, res) => {
    console.log('Callback do Google chamado.'); // Log para verificar se a rota é atingida
    const user = {
        id: req.user._id,
        nome: req.user.nome,
        email: req.user.email,
        googleId: req.user.googleId
    };

    console.log('Usuário autenticado:', user); // Log para verificar os dados do usuário

    // Redirecionar com os dados do usuário
    //res.redirect(`http://localhost:3000?user=${encodeURIComponent(JSON.stringify(user))}`);
    // Redirecionar com os dados do usuário e um token de sucesso
    res.redirect(`http://localhost:3000?user=${encodeURIComponent(JSON.stringify(user))}&auth=true`);


});

module.exports = router;

//https://console.cloud.google.com/apis/credentials/oauthclient/462938419440-fq5819gf7jf5hdm137mi24ad4ktjgce1.apps.googleusercontent.com?project=liquid-anchor-440817-c9