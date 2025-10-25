const express = require('express');
const NodeCache = require('node-cache');

const app = express();
const myCache = new NodeCache({stdTTL: 10}); // for 10 sec


//--------------------------------------------------------------Data
const products = [
  { id: 1, name: 'laptop' },
  { id: 2, name: 'mobile' }
];

//--------------------------------------------------------------Routes
app.get('/', (req, res) => {
  const cacheData = myCache.get("products", ()=>{});

  if (cacheData){
    return res.json({source: "cache", data: cacheData})
  }
  else{
    myCache.set("products", products);
    return res.json({source: "Direct server", data: products});
  }

  
});


//--------------------------------------------------------------Server
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
