import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    if (isAuthenticated === null) {
        // Mostra um indicador de carregamento ou nada enquanto aguarda o estado
        return <div>Carregando...</div>;
    }
    if (!isAuthenticated) {
        console.log('Usuário não autenticado, redirecionando para login...');
        return <Navigate to="/login" />;
    }
    console.log('Usuário autenticado, permitindo acesso à rota.');
    return children;
};

export default ProtectedRoute;
