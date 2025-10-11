const express = require('express');

const app = express();
const PORT = 8000;
//--------------------------------------------------------------------------DATA

const books = [
    {id:1, title: "Book One", author: "Author One"},
    {id:2, title: "Book Two", author: "Author Two"},
]

//--------------------------------------------------------------------------Routes
app.get("/books", (req, res) => {
    res.setHeader("x-info", "Shoaib Ahmed")
    res.json(books)
} )


app.get("/books/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    // console.log("🤑", bookId) // 23
    // res.end(bookId)

    const bookFound = books.find((e)=>{return e.id == bookId})
    // console.log("😁", bookFound) // 2 data

    if (!bookFound){
        return res.status(404).json({"error": `Book id ${bookId} not found`})
    }

    res.json(bookFound)
} )



//--------------------------------------------------------------------------
app.listen(PORT, ()=>{
    console.log("Server is Up.. and running this port 8000")
})