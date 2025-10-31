const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 8000;

//-----------------------------------------------------------------------
// Create rate limiter

const Limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 3, // each client only 3 requests allow per minute 
    message: "Too many requests, Please try again later."   
})

// apply rate limiting to all requests
// app.use('/api', Limiter); // Apply rate limiting to /api route


// apply rate limiting to specific route
app.get('/api', Limiter, (req, res)=>{
    res.json({message: "You are written the Rate-Limit"})
})

//-----------------------------------------------------------------------
app.listen(PORT);