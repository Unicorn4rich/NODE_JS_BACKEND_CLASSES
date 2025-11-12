const express = require('express')
const router = express.Router();

const {getAllAuthors, createAuthor, updateAuthorById, deleteAuthorById} = require('../controllers/author.controler')
const {getAuthorValidateMiddleware, createAuthorValidateMiddleware, updateAuthorValidateMiddleware, deleteAuthorValidateMiddleware} = require('../middlewares/author.validation.middleware')

//---------------------------------------------------------
// Author APIs

// Get All Authors
// GET /api/v1/authors?search=xxxxx
router.get('/', getAuthorValidateMiddleware, getAllAuthors)


// POST Create Authors
// POST /api/v1/authors
router.post('/', createAuthorValidateMiddleware ,createAuthor)


// Update Author By ID
// PATCH /api/v1/authors/:id  
router.patch('/:id', updateAuthorValidateMiddleware, updateAuthorById)


// Delete Author By ID
// DELETE /api/v1/authors/:id
router.delete('/:id', deleteAuthorValidateMiddleware, deleteAuthorById)

module.exports = router