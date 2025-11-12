const express = require('express');
const {getAllBooks, getBookBtId, createBook, deleteBookById, updateBookById, getBookByTitle} = require('../controllers/books.controler')

const router = express.Router();

//-----------------------------------------------------------------
// Routes

// Get All Books
// GET /api/v1/books  -> URL API request
// GET /api/v1/books?search=book 1  
// GET /api/v1/books?authorId=xxxxxxxxxxxxxxxx  
// GET /api/v1/books?bookId=xxxxxxxxxxxxxxxx  
router.get('/', getAllBooks)



// Create New Book
// POST /api/v1/books  -> URL API request
router.post('/', createBook)

// Update Book By ID
// PATCH /api/v1/books/:id  -> URL API request
router.patch('/:id', updateBookById)

// Delete Book By ID
// DELETE /api/v1/books/:id  -> URL API request
router.delete('/:id', deleteBookById)



module.exports = router