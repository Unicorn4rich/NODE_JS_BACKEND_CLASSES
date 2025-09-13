const EventEmitter = require('events')


class ChatRoom extends EventEmitter{ // EventEmitter class ki cheezen ChatRoom mein inharit ho gai.
    constructor(name){
        super();  // parent class ka constructor call karna parta hai.
        this.name = name;
    }

    join(userName){
        console.log(`welcome to chat room: ${userName}`)
        this.emit('message', userName) // dosri file mein moujod event ko cala rha hai.
    }
}

// const usr1 = new ChatRoom("pk chat room")
// usr1.join("shoaib")

module.exports = ChatRoom;