// src/adapters/routers/bookRoutes.js
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

// Rota para buscar detalhes de um livro específico
router.get('/api/books/:bookId', BookController.getBookDetails);

module.exports = router;
