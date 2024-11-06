// backend/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Ajuste o caminho se necessário
require('dotenv').config();

const credentials = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};


// backend/config/passport.js
passport.use(new GoogleStrategy({
    clientID: credentials.clientID,
    clientSecret: credentials.clientSecret,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Verifica se o usuário já existe na base de dados
        let usuario = await User.findOne({ googleId: profile.id });
        if (!usuario) {
            // Se o usuário não existir, cria um novo sem senha
            usuario = new User({
                nome: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
                // Não inclui senha aqui
            });
            await usuario.save(); // Salva o novo usuário no banco de dados
        }
        done(null, usuario); // Chama done com o usuário autenticado
    } catch (error) {
        done(error); // Chama done com um erro, se houver
    }
}));


// Serialize e deserialize
passport.serializeUser((usuario, done) => {
    done(null, usuario.id); // Armazena o ID do usuário na sessão
});

passport.deserializeUser(async (id, done) => {
    const usuario = await User.findById(id); // Recupera o usuário da base de dados
    done(null, usuario); // Chama done com o usuário recuperado
});
