const express = require('express');

const app = express();
const PORT = 8000;
//---------------------------------------------------------------------------------
// Version 1
app.get('/v1/products', (req, res)=>{
    res.json({
        version: 1,
        products: ["Product 1", "Product 2", "Product 3"]
    })    
})


// Version 2
app.get('/v2/products', (req, res)=>{
    res.json({
        version: 2,
        products: [
            {id: 1, name: "Product 1", price: 1000}, 
            {id: 2, name: "Product 2", price: 70}, 
            {id: 3, name: "Product 3", price: 300}, 
        ]
    })    
})

//---------------------------------------------------------------------------------
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})