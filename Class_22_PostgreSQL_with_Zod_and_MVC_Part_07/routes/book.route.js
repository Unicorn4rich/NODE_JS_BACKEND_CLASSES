const express = require('express');
const {getAllBooks, createBook, deleteBookById, updateBookById} = require('../controllers/books.controler')
const {getBookValidateMiddleware, createBookValidateMiddleware, updateBookValidateMiddleware, deleteBookValidateMiddleware} = require('../middlewares/book.validation.middleware')

const router = express.Router();

//-----------------------------------------------------------------
// Routes

// Get All Books
// GET /api/v1/books  -> URL API request
// GET /api/v1/books?search=book 1  
// GET /api/v1/books?authorId=xxxxxxxxxxxxxxxx  
// GET /api/v1/books?bookId=xxxxxxxxxxxxxxxx  
router.get('/', getBookValidateMiddleware, getAllBooks)



// Create New Book
// POST /api/v1/books  -> URL API request
router.post('/', createBookValidateMiddleware, createBook)

// Update Book By ID
// PATCH /api/v1/books/:id  -> URL API request
router.patch('/:id', updateBookValidateMiddleware, updateBookById)

// Delete Book By ID
// DELETE /api/v1/books/:id  -> URL API request
router.delete('/:id', deleteBookValidateMiddleware, deleteBookById)



module.exports = router