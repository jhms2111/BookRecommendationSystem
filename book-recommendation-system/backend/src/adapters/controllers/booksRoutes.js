const express = require('express');
const router = express.Router();
const BooksController = require('./books/booksController');

router.get('/books/search', (req, res) => BooksController.search(req, res));

module.exports = router;
