const express = require('express');
const {getAllBooks, getBookBtId, createBook, deleteBookById, updateBookById, getBookByTitle} = require('../controllers/books.controler')

const router = express.Router();

//-----------------------------------------------------------------
// Routes

// Get All Books
router.get('/', getAllBooks)

// Get Book By title indexing
router.get('/title', getBookByTitle)

// Get Book By ID
router.get('/:id', getBookBtId)

// Create New Book
router.post('/', createBook)

// Delete Book By ID
router.delete('/:id', deleteBookById)

// Update Book By ID
router.patch('/:id', updateBookById)


module.exports = router