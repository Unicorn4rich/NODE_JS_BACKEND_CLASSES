const express = require('express');

const app = express();
const PORT = 8000;

//-----------------------------------------------------------------------------------------------------
// Database
const products = ["product1", "product2", "product3", "product4", "product5", "product6", "product7", "product8", "product9", "product10"];


// const page = 3;

// let start = 0;
// let end = 0;

// if(page == 1){
//     start = 0
//     end = 3

//     console.log(products.slice(start, end));
// }
// else if(page == 2){
//     start = 3
//     end = 7

//     console.log(products.slice(start, end));
// }
// else if(page == 3){
//     start = 7
//     end = 10

//     console.log(products.slice(start, end));
// }


//-------------------------------------------------------
// Get

app.get('/', (req, res) =>{                 // http://localhost:8000?page=1&limit=3
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    // console.log("Page: ", page);
    // console.log("Limit: ", limit);

    const start = (page - 1) * limit
    const end = start + limit

    const result = products.slice(start, end);

    res.json({
        products: result
    })
})


app.listen(PORT)