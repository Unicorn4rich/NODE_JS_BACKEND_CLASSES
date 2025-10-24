//NAMED EXPORTs

// const mn = require("./main")

// console.log(mn.myName); // shoaib

// console.log(mn.friend1_name); // ahmed

//-------------------------------------------------

// const {myName, friend1_name} = require("./main")

// console.log(myName); // shoaib

// console.log(friend1_name); // ahmed


//-------------------------------------------------------------------------------------------
// DEFAULT EXPORTS

// example1
const mainFileDefaultVariable = require("./main")

console.log(mainFileDefaultVariable("shoaib", "shobi"));  // shoaib says remove to shobi


// example 2
const greeting = require("./main")

console.log(greeting("shoaib", "shobi"));  // shoaib says remove to shobi