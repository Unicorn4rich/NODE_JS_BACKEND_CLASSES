const express = require('express');

const router = express.Router();
const {books} = require('../model/books-data') // object ki shakal mein aya data

// Get API routes from controller
const {getAllBooks, getBookById, createBook, upDateAnyBook, deleteBookById} = require('../controllers/book.controller')

// Get Middleware functions
const {getAllBookMid} = require('../middlewares/book.middleware')



//--------------------------------------------------------------------------Get
router.get("/", getAllBookMid, getAllBooks); // http://localhost:8000/books

//--------------------------------------------------------------------------Get by ID
router.get("/:bookId", getBookById)  // http://localhost:8000/books/2

//--------------------------------------------------------------------------Post (only to create data)
router.post("/", createBook) // http://localhost:8000/books

//--------------------------------------------------------------------------Patch (to update any data)
router.patch("/:bookId", upDateAnyBook);  // http://localhost:8000/books/2

//--------------------------------------------------------------------------Delete (to delete any data)
router.delete("/:bookId", deleteBookById);  // http://localhost:8000/books/2


//--------------------------------------------------------------------------Deafult Export Router
module.exports = router;