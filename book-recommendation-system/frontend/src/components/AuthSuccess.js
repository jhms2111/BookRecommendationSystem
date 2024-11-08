// src/components/AuthSuccess.js

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Captura o token da URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Armazena o token no localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('isAuthenticated', 'true');

            // Atualiza o estado de autenticação no App
            setIsAuthenticated(true);

            // Redireciona para a página inicial ou outra página protegida
            navigate('/');
        } else {
            // Se não houver token na URL, redireciona para a página de login
            navigate('/login');
        }
    }, [location, navigate, setIsAuthenticated]);

    return null; // Este componente não precisa renderizar nada
};

export default AuthSuccess;
