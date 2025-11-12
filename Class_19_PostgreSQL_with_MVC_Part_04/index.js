const express = require('express');
const {globalMiddleware} = require('./middlewares/globalMiddleware');
const bookRoute = require('./routes/book.route');

const app = express();
const PORT = 8000;


//-----------------------------------------------------------------
// Middleware for Parsing JSON request Data
app.use(express.json());

//-----------------------------------------------------------------
// Using Global Middleware
app.use(globalMiddleware)

//-----------------------------------------------------------------
// Main All Routes

app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Book Store API",
        version: "1.0.0",
        endpoints: {
            healthCheck: "/health",
            books: "/api/v1/books",
            author: "/api/v1/author",
        }
    })
})


//-----------------------------------------------------------------
// health check Routes:

app.get("/health", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Server is healthy and running",
        timestamp: new Date().toISOString()
    })
})


//-----------------------------------------------------------------
// Using Routes
app.use("/api/v1/books", bookRoute)


//-----------------------------------------------------------------
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})