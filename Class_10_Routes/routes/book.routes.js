const express = require('express');

const router = express.Router();
const {books} = require('../model/books-data') // object ki shakal mein aya data



//--------------------------------------------------------------------------Get
router.get("/", (req, res) => {
    res.json(books)
});

//--------------------------------------------------------------------------Get by ID
router.get("/:bookId", (req, res) => {
    const bookId = req.params.bookId;

    // console.log("😂", books.books[1])
    const bookFound = books.find((e)=>{return e.id == bookId})

    if (!bookFound){
        return res.status(404).json({"error": `Book id ${bookId} not found`})
    }

    res.json(bookFound)
})

//--------------------------------------------------------------------------Post (only to create data)
router.post("/", (request, response)=>{
    const {title, author} = request.body
    // console.log("👌", id, title, author)

    if(!title || title == ""){
        return response.status(400).json({"error": "Title is required"})
    }
    else if(!author || author == ""){
        return response.status(400).json({"error": "author is required"})
    }
    else{
        const id = books.length + 1
        books.push({id: id, title: title, author: author})
        // response.end("🤑 Book is added successfully") // response mein client ko aik hi cheez bhej sakty hain ya to ye ya neechy wali.
        response.status(201).json(books)
    } 

})

//--------------------------------------------------------------------------Patch (to update any data)
router.patch("/:bookId", (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const { title, author } = req.body;

    // Find the index of the book in the array
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex < 0) {
        return res.status(404).json({ error: `Book id ${bookId} not found` });
    }


    // Update only if valid non-empty values are provided
    if (title == undefined || title == "") {
        return res.status(404).json({ error: `title not found` });
    }
    else if (author == undefined || author == "") {
        return res.status(404).json({ error: `author not found` });        
    }
    else{
        books[bookIndex].title = title; 
        books[bookIndex].author = author;
    }

    // Create an updated book object for response
    const updatedBook = books[bookIndex];

    res.status(200).json({
        message: `Book id ${bookId} updated successfully \n\n`,
        updatedBook: updatedBook,
        allBooks: books
    });
});

//--------------------------------------------------------------------------Delete (to delete any data)
router.delete("/:bookId", (req, res) => {
    const bookId = parseInt(req.params.bookId);

    // Find the index of the book to delete
    const bookIndex = books.findIndex((book) => book.id === bookId);

    // If not found
    if (bookIndex < 0) {
        return res.status(404).json({ error: `Book id ${bookId} not found` });
    }

    // Remove the book from the array
    const deletedBook = books.splice(bookIndex, 1)[0]; // splice returns an array, so take [0]

    res.status(200).json({
        message: `Book id ${bookId} deleted successfully`,
        deletedBook: deletedBook,
        remainingBooks: books
    });
});


//--------------------------------------------------------------------------Deafult Export Router
module.exports = router;