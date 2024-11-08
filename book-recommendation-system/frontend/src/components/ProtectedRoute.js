// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    console.log('Estado de autenticação atual:', isAuthenticated); // Log para depuração
    if (!isAuthenticated) {
        console.log('Usuário não autenticado, redirecionando para login...');
        return <Navigate to="/login" />; // Redireciona para a página de login se não estiver autenticado
    }

    console.log('Usuário autenticado, permitindo acesso à rota.'); // Log para depuração
    return children; // Se estiver autenticado, renderiza os filhos
};

export default ProtectedRoute;
