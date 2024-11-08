import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignupPage from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifica o token no localStorage
        const token = localStorage.getItem('isAuthenticated');
        if (token === 'true') {
            setIsAuthenticated(true);
            console.log('Usuário autenticado via localStorage.');
        }

        // Verifica parâmetros da URL
        const params = new URLSearchParams(window.location.search);
        const user = params.get('user');
        const auth = params.get('auth');
        
        if (user && auth === 'true') {
            setIsAuthenticated(true); // Atualiza o estado de autenticação
            localStorage.setItem('isAuthenticated', 'true'); // Armazena no localStorage
            console.log('Usuário autenticado na URL:', user);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Usuário autenticado via handleLogin.');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        console.log('Usuário deslogado.');
    };

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />} />
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <h1>Bem-vindo ao Sistema de Recomendação de Livros!</h1>
                            <button onClick={handleLogout}>Logout</button>
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
};

export default App;
