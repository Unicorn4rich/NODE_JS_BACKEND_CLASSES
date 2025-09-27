// const buf1 = Buffer.from("Hello")

// console.log(buf1) // <Buffer 48 65 6c 6c 6f>

//--------------------------------

// const char = "h"  // utf-16 

// // console.log(char.codePointAt(0)) // unicode number -> 104
// // console.log(char.toString(2)) // h -> 104 -> 1101000

// const uniCode = char.codePointAt(0)
// const binary = uniCode.toString(2)

// console.log(binary) // 1101000

//--------------------------------

// const char = "t"  // utf-16 

// const uniCode = char.codePointAt(0) // uniCode
// console.log(uniCode) // 116

// const hexaDecimalCode = Buffer.from(char)  // hexaDecimalCode
// console.log(hexaDecimalCode) // <Buffer 74>

// const binary = uniCode.toString(2)  // binary
// console.log(binary) // 1110100


//--------------------------------

// const fs = require("node:fs")

// // const data = fs.readFileSync("info.txt", "utf-8");    // My name is shoaib
// // const data = fs.readFileSync("info.txt");             // <Buffer 4d 79 20 6e 61 6d 65 20 69 73 20 73 68 6f 61 69 62>
// const data = fs.readFileSync("info.txt", "base64");      // TXkgbmFtZSBpcyBzaG9haWI=

// console.log(data) 


//--------------------------------
// Image Convert in Base64

const fs = require("fs")

const imageData = fs.readFileSync("spidy.jpg", "base64") // image ko hamne base64 mein mangwaya.
// console.log(imageData); // ajeeb bohut sary characters ye tasweer hai hmari -> Vbq7bO0rCFiGepHc5xzjIJHTNa1p4K8ExY/0FZjtLHz5pHOB1OMgEDvxkdxU+1iX7CZ4tkDqQPrR5kfeRB/wIV75a6J4WiUC30bSmO4JxEpy2AQMkHkggj1BBBIq9DaaE

const hexDacimalImage = Buffer.from(imageData, "base64") // us image ko ab hexaDacimal mein convert kiyya.

// or yahn par hamne us data ko dosri file mein dala orignal form mein show hui wo image.
fs.writeFileSync("shoaib.jpg", hexDacimalImage) // created file with your name shoaib.jpg -> get your image in your folder