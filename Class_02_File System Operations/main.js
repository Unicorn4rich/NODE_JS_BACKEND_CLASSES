const fs = require('node:fs')


const contant = fs.readFileSync('info.txt', 'utf-8')

fs.appendFileSync('azlan.txt', 'Hy this is azlaan', 'utf-8')
// console.log(contant)
// i am shoaib
// my age is 70 year old

const myFile = fs.readFileSync('azlan.txt', 'utf-8')
console.log(myFile)

// -----------------------------------------------------------------------------

fs.mkdirSync('persons') // create single folder

fs.mkdirSync('persons/abc/x', {recursive: true}) // create parent and childs folders 

fs.rmdirSync('persons/abc/x') // remove only child x folder
fs.rmdirSync('persons/abc')  // remove only child abc folder
fs.rmdirSync('persons') // remove only parent persons folder

fs.unlinkSync('azlan.txt') // delete azlan file

