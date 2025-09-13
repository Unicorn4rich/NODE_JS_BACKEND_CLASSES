// console.log("Hello World")

const fs = require(`./fs`); // mean custom module mein search karo jese sho.js file ko import kar ke laega.

const fs = require(`fs`);

// 1. (info.txt) -> Search in installed node files ke (info.txt) isme hai rakhi hui hai?.
// 2. 3rd-party model
// 3. custom module
const result = fs.readFileSync(`info.txt`, `utf-8`) // utf-8 -> mean text form mein file data ko dikhao warna buffer ki form mein dikhata hai.
console.log("result: ", result) // result:  I am shoaib



// For run this Code
// node main.js -> one time
// node --watch main.js -> awlays run update code