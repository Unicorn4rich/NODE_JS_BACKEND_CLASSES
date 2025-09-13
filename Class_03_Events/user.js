const ChatRoom = require('./chatRoom');

const studyRoom = new ChatRoom("Study Group")

studyRoom.on('message', (userName)=>{ // on ke method chatRoom class mein nahi balke jo inheritance hui hai us dosri class se aa rha hai.
    console.log(`hey i am ${userName} from message event`); // event listener
})

studyRoom.join('azlaan')


// node user.js 
// Output:
// welcome to chat room: azlaan
// hey i am azlaan from message event
