// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignupPage from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import AuthSuccess from './components/AuthSuccess'; // Importe o novo componente

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('isAuthenticated');
        if (token === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
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
                            <h1>Welcome to the Book Recommendation System!</h1>
                            <button onClick={handleLogout}>Logout</button>
                        </ProtectedRoute>
                    } 
                />
                {/* Adicione a rota de sucesso da autenticação */}
                <Route path="/auth/success" element={<AuthSuccess setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </Router>
    );
};

export default App;
