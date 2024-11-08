// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Atualize a importação
import App from './App';
import './index.css'; // Se você estiver usando CSS

// Obtenha o elemento root da DOM
const container = document.getElementById('root');

// Crie uma raiz e renderize o App
const root = createRoot(container); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
