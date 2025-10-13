1. npm init -y
2. npm i @types/node
3. npm i express
4. npm uninstall @types/express -> for remove packges
5. npm i @types/express -D

6.  "scripts": {
    "start": "node --watch index.js"
  },
for run -> npm start -> ye server changes ko update karta jaega.

---------------------------------------------------------------------------

# Node.js Express Routes aur Middleware Notes (Roman Urdu)

Yeh notes YouTube transcript se banaye gaye hain jo Node.js Express pe base hain. Main ne sirf woh cheezain li hain jo students ke liye zaroori hain aur yaad rakhni chahiye. Creator ke diye gaye examples bhi include kiye gaye hain. Sab kuch Roman Urdu mein hai taake asaan ho. Yeh file GitHub pe upload kar sakte ho aur download kar sakte ho.

## Introduction
- Express.js ek framework hai Node.js ke liye jo web servers banane mein madad karta hai.
- REST API rules: GET data fetch karne ke liye, POST data create karne ke liye, PATCH update karne ke liye, DELETE delete karne ke liye.
- Example: Ek library app jisme books ka data manage karte hain (array mein store).

**Code setup example:**
```javascript
const express = require('express');
const app = express();
const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' }
];
app.listen(8000, () => console.log('Server running on port 8000'));
```

## GET Routes (Data Fetch Karna)
- GET route sirf data fetch karne ke liye use hota hai.
- Do tareeqe: Poori library fetch karna ya ek book by ID.

**Example (Poori library):**
```javascript
app.get('/books', (req, res) => {
  res.json(books);
});
```
- Yeh route localhost:8000/books pe chalega aur saari books dikhaega.

**Example (Ek book by ID):**
```javascript
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});
```
- Yeh dynamic route hai (:id se ID dynamic hoti hai).
- Zaroori: req.params se ID nikalo.

## POST Route (Data Create Karna)
- POST sirf data create karne ke liye.
- Body se data lete hain (JSON format mein).
- Middleware zaroori: `app.use(express.json());` taake JSON body read ho sake.
- Validation: Title aur author empty na hon.
- ID auto-generate: books.length + 1.

**Example:**
```javascript
app.post('/books', (req, res) => {
  const { title, author } = req.body; // Destructuring
  if (!title || title === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!author || author === '') {
    return res.status(400).json({ error: 'Author is required' });
  }
  const id = books.length + 1;
  books.push({ id, title, author });
  res.status(201).json({ message: 'You have created a book', books });
});
```
- Client se body bhejte hain (e.g., Thunder Client mein JSON: { "title": "Book 3", "author": "Author 3" }).
- Status 201 for created.
- Example: Pehle 2 books thi, POST se 3rd add hoti hai.

## PATCH Route (Data Update Karna)
- PATCH existing data partially update karne ke liye.
- ID se book find karo, phir title ya author update.
- ChatGPT se code generate kiya gaya tha, phir modify kiya.

**Example:**
```javascript
app.patch('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  if (title && title !== '') {
    books[index].title = title;
  } else if (!title) {
    return res.status(400).json({ error: 'Title is not found' });
  }
  if (author && author !== '') {
    books[index].author = author;
  } else if (!author) {
    return res.status(400).json({ error: 'Author is not found' });
  }
  res.status(201).json({ message: 'Book updated successfully', books });
});
```
- Example: ID 2 ki book update: Body { "author": "New Author" } bhejo, author change ho jaega.
- Validation: Title/author undefined ya empty na hon.

## DELETE Route (Homework)
- DELETE data delete karne ke liye.
- ID se book find karo aur remove (splice use karo).
- Homework: Khud banao, test karo, agar galti ho to improve karo.

**Example (Basic):**
```javascript
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted', books });
});
```
- Zaroori: Array se remove karna yaad rakho.

## Middleware (Beech ka Layer)
- Middleware request aur route ke beech mein aata hai.
- Har request middleware se guzarti hai pehle.
- Uses: Authentication check, logging, validation.
- Definition: Request route tak pahunchne se pehle middleware se guzarna padta hai.
- Global: `app.use(middlewareFunction);` – Sab routes pe apply.
- Route-specific: `app.get('/path', middleware, (req, res) => {...});`.

**Example (Global Middleware for Authentication):**
```javascript
const authCheck = (req, res, next) => {
  const key = req.headers.key;
  if (key === '12340') {
    next(); // Agle middleware ya route pe bhejo
  } else {
    res.send('I don\'t know you');
  }
};
app.use(authCheck);
```
- Headers mein 'key: 12340' bhejo to pass, warna error.
- Next() call karna zaroori warna request atakti hai.

**Example (Logging Middleware):**
```javascript
const fs = require('fs');
const logMiddleware = (req, res, next) => {
  const log = `${new Date().toString()} - Method: ${req.method} - Path: ${req.path}\n`;
  fs.appendFileSync('logs.txt', log, 'utf-8');
  next();
};
app.use(logMiddleware);
```
- Har request pe log file mein entry: Date, method, path.
- Multiple middleware: Sequence mein chalte hain (pehle wala next() karega to agla chalega).

## Important Tips
- Request body: Hamesha express.json() use karo JSON ke liye.
- Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found).
- Destructuring: Req.body se values nikaalne ke liye asaan (e.g., const { title } = req.body;).
- Server restart: Temporary data (array) reset hota hai, permanent ke liye database use karo.
- ChatGPT use: Code generate karne ke liye, phir modify karo.
- Homework: DELETE route banao aur test karo.

Yeh README.md file complete hai. Ise GitHub pe upload kar ke download kar sakte ho. Agar kuch miss ho to transcript se check kar lo!