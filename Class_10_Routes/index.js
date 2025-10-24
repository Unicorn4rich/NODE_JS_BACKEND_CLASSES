const express = require('express');

const bookRouter = require('./routes/book.routes')

const app = express();
const PORT = 8000;
//--------------------------------------------------------------------------Middleware

app.use(express.json()) // helps to read json body from request

//--------------------------------------------------------------------------Routes
app.use('/books', bookRouter)

//--------------------------------------------------------------------------
app.listen(PORT, ()=>{
    console.log("Server is Up.. and running this port 8000")
})































