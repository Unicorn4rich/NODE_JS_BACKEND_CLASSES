const express = require('express')
const router = express.Router();

const {getAllAuthors, createAuthor, updateAuthorById, deleteAuthorById} = require('../controllers/author.controler')


//---------------------------------------------------------
// Author APIs

// Get All Authors
// GET /api/v1/authors?search=xxxxx
router.get('/', getAllAuthors)


// POST Create Authors
// POST /api/v1/authors
router.post('/', createAuthor)


// Update Author By ID
// PATCH /api/v1/authors/:id  
router.patch('/:id', updateAuthorById)


// Delete Author By ID
// DELETE /api/v1/authors/:id
router.delete('/:id', deleteAuthorById)

module.exports = router