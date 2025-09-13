

## File System (FS) Module aur File Reading

- **FS Module ka Istemal**: Node.js mein files ko read/write karne ke liye FS module use hota hai. Yeh built-in module hai, require('fs') se import karte hain.
- **Zaroori Baat**: Files ko read karne ke 2 tareeqe: Sync (blocking) aur Async (non-blocking). Sync mein execution ruk jati hai jab tak task complete na ho, async mein nahi rukti.
- **Examples**:
  - Sync: `fs.readFileSync('info.txt', 'utf8')` – Yeh file ko read karta hai aur execution ko block karta hai. Example: Console pe pehle "Starting" print, phir file content, phir "Ending".
  - Async: `fs.readFile('info.txt', 'utf8', (err, data) => { if(err) console.error(err); else console.log(data); })` – Yeh callback function use karta hai. Execution nahi rukti. Example: "Starting" aur "Ending" pehle print, phir file content baad mein.

## Synchronous vs Asynchronous Execution

- **Sync (Blocking Code)**: Line by line execute hota hai, agla code tab chalega jab current task complete ho. Yeh execution ko block karta hai.
- **Async (Non-Blocking Code)**: Code side pe chalta hai, execution rukti nahi. Task complete hone pe callback call hota hai.
- **Zaroori Baat**: Async heavy tasks ke liye behtar, jaise file reading ya network calls, taake app responsive rahe.
- **Examples**:
  - Sync: File read karte hue "Starting", file content, "Ending" ka order. Execution ruk jati hai file read hone tak.
  - Async: "Starting", "Ending", phir file content. File reading background mein hoti hai.
  - Restaurant Analogy: Sync mein waiter aik customer ka order complete hone tak dusron ko wait karata hai (1 hour for 4 customers). Async mein sab orders saath le ke kitchen bhejta hai, sab saath ready (20 min for 4 customers).

## Event Queue aur Execution Flow

- **Event Queue**: Sab tasks (events) queue mein aate hain, FIFO (First In First Out) manner mein process hote hain.
- **Event Loop**: Queue ko continuously watch karta hai. Blocking tasks ko khud handle karta hai (execution block), non-blocking ko thread pool ko deta hai.
- **Thread Pool**: Non-blocking tasks ke liye workers hote hain, parallel mein kaam karte hain.
- **Zaroori Baat**: Event loop Node.js ka core hai, yeh single-threaded ko efficient banata hai by handling async tasks.
- **Execution Flow Example**:
  - Queue: Task1 (blocking) -> Task2 (blocking) -> Task3 (non-blocking) -> Task4 (non-blocking).
  - Flow: Event loop Task1 ko block karke complete karta hai, phir Task2. Task3 ko thread pool bhejta hai (worker handle), execution nahi rukti. Task complete hone pe queue mein wapis aata hai. Sab parallel manage hota hai, jaise multiple async tasks saath chalte hain.

## Blocking vs Non-Blocking Code

- **Blocking**: Execution ruk jati hai, agla code nahi chalta jab tak current complete na ho.
- **Non-Blocking**: Execution continue, task background mein complete hota hai.
- **Zaroori Baat**: Node.js non-blocking pe based hai, is liye fast aur scalable.
- **Examples**:
  - Blocking: `fs.readFileSync()` – File read hone tak code rukta hai.
  - Non-Blocking: `fs.readFile()` with callback – Code aage chalta hai, callback tab call jab file read ho.

## Event-Driven Architecture aur Pub-Sub Model

- **Event-Driven**: Code events pe react karta hai. Event hone pe listener function call hota hai.
- **Pub-Sub Model**: Publisher (emitter) event publish karta hai, subscribers (listeners) usko sunte hain. Yeh event-driven ka hi naam hai.
- **Zaroori Baat**: Node.js event-driven non-blocking architecture pe based hai, perfect for real-time apps jaise chat, APIs, streaming.
- **Examples**:
  - Doorbell Analogy: Darwaza ki ghanti (event) bajti hai, user (listener) uth ke darwaza kholta hai. Ghanti na bajaye to user nahi uthega.
  - YouTube: Video publish (event) hone pe subscribers ko notification (listener triggers).
  - Node.js mein: Events module se EventEmitter class use. `emitter.on('eventName', listenerFn)` listener banata hai, `emitter.emit('eventName', args)` event fire karta hai.

## Events Module aur EventEmitter

- **EventEmitter**: Events handle karne ki class. Require('events') se import, new EventEmitter() se instance.
- **Methods**: on() (multiple times), once() (single time), emit() (fire event), removeListener() (remove), listenerCount() (count listeners).
- **Zaroori Baat**: Yeh Node.js ko event-driven banata hai, listeners functions hote hain jo events pe chalte hain.
- **Examples**:
  - Basic: `const EventEmitter = require('events'); const emitter = new EventEmitter(); emitter.on('greet', (username) => console.log(`Hi ${username}`)); emitter.emit('greet', 'Taha');` – Output: "Hi Taha".
  - Once: `emitter.once('bye', () => console.log('Bye')); emitter.emit('bye'); emitter.emit('bye');` – Sirf aik baar "Bye" print.
  - Multiple Listeners: Aik event pe 2 listeners: `emitter.on('bye', () => console.log('Bye')); emitter.on('bye', () => console.log('Allah Hafiz')); emitter.emit('bye');` – Dono print.
  - Remove: `emitter.removeListener('bye', listenerFn);` – Listener hatata hai.
  - Listener Count: `emitter.listenerCount('bye');` – Kitne listeners hain batata hai.

## Chat Room Example using EventEmitter

- **Setup**: ChatRoom class banai jo EventEmitter extend karti hai. Users join karte hain aur messages fire hote hain.
- **Zaroori Baat**: Yeh event-driven ko practical dikhata hai, jaise real chat app mein join hone pe welcome event.
- **Examples**:
  - Class: `class ChatRoom extends EventEmitter { constructor(name) { super(); this.name = name; } join(username) { console.log(`Welcome to chat room, ${username}`); this.emit('message', username); } }`
  - Usage: `const studyRoom = new ChatRoom('Study Group'); studyRoom.on('message', (username) => console.log(`Hi I'm ${username} from message event`)); studyRoom.join('Taha');`
  - Output: "Welcome to chat room, Taha" phir "Hi I'm Taha from message event". Join hone pe message event fire hota hai.

