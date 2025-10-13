const express = require('express');
const fs = require("node:fs");

const app = express();
const PORT = 8000;

//--------------------------------------------------------------------------functions

const mid1 = (request, response, next)=>{
    // logic   -> yahn se sirf loic likhene response back nahi karene wo next() wala method chal kar uske aly wala response back karega.
    // logic
    // logic
    // logic
    const log = `\n${Date.now()} method of ${request.method} on path: ${request.path}`
    fs.appendFileSync('logs.txt', log, 'utf-8')
    response.end("Hi")

    console.log("I am mid2")
    next(); // ye neechy waly middleware ko dega aai hui request kiyun ke ye sequencly aik dosry ko request dety jaty hain.
}

const mid2 = (request, response, next)=>{
    // logic  -> yahn se sirf loic likhene response back nahi karene wo next() wala method chal kar uske aly wala response back karega.
    // logic
    // logic
    // logic
    if ("shoaib" == "shoaib"){
        console.log("I am mid2")
        next();
    }
  
}

//--------------------------------------------------------------------------Middleware

// ye global hai -> direct route se bhi use kiyya jaa sakta hai as single route middleware function
// app.use(mid1) // helps to check user authentication

app.use(mid2) // helps to check 

//--------------------------------------------------------------------------DATA

const books = [
    {id:1, title: "Book One", author: "Author One"},
    {id:2, title: "Book Two", author: "Author Two"},
]

//--------------------------------------------------------------------------Get (only fetch/get data)
// aik middleware nahi bohut sary middleware bhi laa sakty hain is route mein.
app.get("/books", mid1, (req, res) => {
    res.setHeader("x-info", "Shoaib Ahmed")
    res.json(books)
} )


//--------------------------------------------------------------------------
app.listen(PORT, ()=>{
    console.log("Server is Up.. and running this port 8000")
})