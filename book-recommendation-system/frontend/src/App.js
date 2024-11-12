// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignupPage from './components/Auth/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AuthSuccess from './components/Auth/AuthSuccess';
import BookSearchPage from './pages/Books/BookSearchPage';
import BookDetailsPage from './pages/Books/BookDetailsPage';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicialmente null

useEffect(() => {
    const token = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(token === 'true');
}, []);

    

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
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
                            <div>
                                <h1>Welcome to the Book Recommendation System!</h1>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </ProtectedRoute>
                    } 
                />
                <Route path="/auth/success" element={<AuthSuccess setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/search-books" element={<BookSearchPage />} />
                <Route path="/book/:bookId" element={<BookDetailsPage />} />
             
                <Route 
                    path="/search-books" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <BookSearchPage />
                        </ProtectedRoute>
                    } 

                    
                />
            </Routes>
        </Router>
    );
};

export default App;
