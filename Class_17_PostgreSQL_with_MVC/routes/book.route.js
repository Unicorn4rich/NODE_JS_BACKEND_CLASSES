const express = require('express');
const {getAllBooks} = require('../controllers/books.controler')

const router = express.Router();

//-----------------------------------------------------------------
// Routes
router.get('/', getAllBooks)


module.exports = router