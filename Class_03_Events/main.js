const fs = require('fs')


console.log("I am starting....")

const content = fs.readFileSync('info.txt', 'utf-8')
console.log(content)

const content = fs.readFile('info.txt', 'utf-8', (error, data) => {
    if (error){
        console.log("this is error")

        return 
    }

    return console.log(data)
})

console.log("I am ending....")



//--------------------------------------------------------------------------------------------
// Event driven architecture

const EventEmitter = require('events')
const eventEmitter = new EventEmitter()  // instance of EventEmitter class

// event create multiple callable
eventEmitter.on('greet', (userName) =>{ // on means sunna
    console.log(`I am greet event listener, hi ${userName} nice to meet you?`)
})

// event run/start
eventEmitter.emit('greet', 'shoaib')  // emit means bolna
// eventEmitter.emit('greet', 'shoaib')  // you can use this event multiple times

//--------------------

// event create single callable
eventEmitter.once('bey', (userName) => {   // ye event bhi chalega
    console.log(`Allah Hafiz ${userName}`)
});

eventEmitter.once('bey', (userName) => {
    console.log(`I am bey event listener, bye ${userName} see you soon.`) // or ye event bhi chalega
});


eventEmitter.emit('bey', 'shoaib')  // ye aik opar waly dono events ko chlaega.

// only run one time not multiple times.
eventEmitter.emit('bey', 'shoaib') 


const listenerFunct1 = ()=>{
    console.log("Allah Hafiz")
}

const listenerFunct2 = (userName)=>{
    console.log(`Bey Bey ${userName}`)
}

eventEmitter.once('bey', listenerFunct1) 
eventEmitter.once('bey', listenerFunct2) 

eventEmitter.emit('bey') // 2no functions chal jaenge.

eventEmitter.removeListener('bey', listenerFunct1) // removeListener k zariye hum event ko hata skty hain.
eventEmitter.removeListener('bey', listenerFunct2) // removeListener k zariye hum event ko hata skty hain.

console.log(eventEmitter.listeners('bey')) // check karny k liye k event ko koi listen kar rha hai ya nahi.
