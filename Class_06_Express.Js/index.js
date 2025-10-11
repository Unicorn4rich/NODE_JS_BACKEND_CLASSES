const { log } = require('console');
const express = require('express');

const app = express();

//--------------------------------------------------------------------------GET
app.get('/', (request, response)=> response.end("Hello from Home page"))

app.get('/shoaib', (request, response)=> response.end("Hello shoaib your request is accepted"))

app.get('/tweet', (request, response) => response.end("These are your tweets Brooooo"))

//--------------------------------------------------------------------------POST

app.post('/news', (request, response) => response.status(201).end("This is news for post request"))


app.listen(8000, ()=>{
    console.log("Server is Up.. and running this port 8000")
})