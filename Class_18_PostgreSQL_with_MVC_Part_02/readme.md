# 📖 Book API Project - Part 2 - Complete Roman Urdu Guide

---

## 📢 PROMPT NOTES - Creator Ke Hisaab Se (Part 2)

Yeh notes Part 2 ke hisaab se likhe hain jaise video mein creator ne step-by-step samjhaya tha.

### **Video Ka Pehla Hissa - Confusion Clear Karna**

Creator ne likha:
- "Kaal tak hamne jo kaam kiya tha, aaj us se aage ka kaam karenge"
- "Ek confusion hai log ke dimag mein - dono services ek folder mein chal rahi hain"
- "Ek API service hai, ek Database service hai"

Creator ne folder structure samjhaya:
- Database = Docker container mein 5432 port par chal raha hai
- API = Node.js terminal mein 8000 port par chal raha hai
- Dono alag-alag run ho rahe hain

**Key Point:** Jab client request karta hai:
1. Request API ko aata hai (port 8000)
2. API database se baat karti hai (port 5432)
3. Database data return karta hai
4. API us data ko client ko dikhata hai

---

### **Doosra Hissa - Services Run Karna**

Creator ne likha:
- "Pehle sab services ko run karenge"
- "Phir API ko test karenge"

**VS Code Terminal:**
```
node index.js
```
Server chal gaya port 8000 par

**Docker mein:**
- Book API container ko play button se start kiya
- Green dot dikh gaya = Container running

**Check Karna:**
- Postman se GET request bhejenge
- localhost:8000 par request jayegi
- Response: `{"message": "I am get response"}`

---

### **Teesra Hissa - Drizzle Studio Se Database Dekhna**

Creator ne likha:
- "Database ko bhi dekhen"
- "npx drizzle-kit studio" command chala di

Terminal se link mila:
- Link par click kiya
- Author table dikha
- Book library table dikha
- Both tables working perfectly

---

### **Chautha Hissa - API Aur Database Ka Connection**

Creator ne likha:
- "Yeh jo GET API hai, abhi sirf message return kar raha hai"
- "Hum is ko database se data lana chahte hain"
- "Pehle database mein data create karna padega"

**Data Create Karna:**

**Step 1: Author banao**
- Author table mein jao
- Add Record click karo
- Name: Taha
- Last Name: Ahmad
- Email: taha@example.com
- Save

**Step 2: Book banao**
- Book table mein jao
- Add Record click karo
- Author ID: (Taha ki ID copy karo)
- Title: Book One
- Description: This is a book one
- Save

**Step 3: Ek aur Book banao**
- Author ID: (same)
- Title: Book Two
- Description: This is a book two

---

### **Paanchwa Hissa - GET API ko Database se Connect Karna**

Creator ne likha:
- "GET API ke controller mein logic likhi"
- "Database se select query likhi"

**Controller mein code:**

```javascript
const db = require('../db/connection');
const { bookTable } = require('../models/index');

const getAllBooks = async (req, res) => {
  const result = await db.select().from(bookTable);
  console.log(result);
  
  res.json({
    result: result
  });
};
```

**Key Points:**
- `db.select()` = SELECT query start karo
- `.from(bookTable)` = Book table se select karo
- `async` = Await use karne ke liye
- Database operation ko wait karna padta hai

---

### **Chhhta Hissa - GET API Testing**

Creator ne likha:
- "Postman mein request bhejenge"
- "Database se data aayega"

**Postman Test:**
- GET: localhost:8000
- Send karo
- Response mila:
```json
{
  "result": [
    {
      "id": "...",
      "title": "Book One",
      "description": "This is a book one",
      "authorId": "..."
    },
    {
      "id": "...",
      "title": "Book Two",
      "description": "This is a book two",
      "authorId": "..."
    }
  ]
}
```

**Console Output:**
- Terminal par data print ho gaya

---

### **Satvain Hissa - Postman Environment Variable**

Creator ne likha:
- "localhost:8000 bar-bar likhna padta hai"
- "Environment variable banate hain"

**Steps:**
1. Postman mein Environments par click karo
2. Create Environment karo
3. Local ENV banao
4. Variable: BASE_URL
5. Value: http://localhost:8000
6. Save

**URL mein use:**
```
{{BASE_URL}}
```

---

### **Aathwa Hissa - GET Book By ID API**

Creator ne likha:
- "Ab ek specific book ki ID se data lana chahte hain"
- "Route mein `:id` parameter add kiya"

**Route:**
```javascript
router.get('/books/:id', getBookById);
```

**Controller:**
```javascript
const getBookById = async (req, res) => {
  const bookId = req.params.id;
  
  console.log('📖', bookId);
  
  const result = await db.select().from(bookTable)
    .where(eq(bookTable.id, bookId));
  
  if (!result || result.length === 0) {
    return res.json({ message: 'Book not found' });
  }
  
  res.json({ result: result[0] });
};
```

**Key Points:**
- `req.params.id` = URL se ID lena
- `eq()` = Equal operator (Drizzle se)
- `.where()` = Condition lagana
- Limit(1) = Sirf ek book

---

### **Nauwa Hissa - POST API - Create Book**

Creator ne likha:
- "Ab naya book create karana hai"
- "POST method use karega"
- "JSON body mein data bhejenge"

**Route:**
```javascript
router.post('/', createBook);
```

**Postman Setup:**
1. POST method select karo
2. Body mein Raw JSON bhejo:
```json
{
  "title": "Book Three",
  "description": "This is a book three",
  "authorId": "..."
}
```

**Middleware zaroori tha:**
```javascript
app.use(express.json());
```

Isko VS Code ke index.js mein add karna padta hai.

**Controller:**
```javascript
const createBook = async (req, res) => {
  const { title, description, authorId } = req.body;
  
  try {
    const result = await db.insert(bookTable).values({
      title: title,
      description: description,
      authorId: authorId
    }).returning();
    
    res.json({
      message: 'Book created successfully',
      bookId: result[0].id
    });
  } catch (error) {
    res.status(400).json({
      message: 'Book not created'
    });
  }
};
```

**Key Points:**
- `db.insert()` = INSERT query
- `.values()` = Data dena
- `.returning()` = Naya data return karo
- Try-catch = Error handling

---

### **Daswa Hissa - DELETE API**

Creator ne likha:
- "Book ko delete karna hai"
- "DELETE method use karenge"
- "ID ke hisaab se delete hoga"

**Route:**
```javascript
router.delete('/books/:id', deleteBook);
```

**Controller:**
```javascript
const deleteBook = async (req, res) => {
  const deleteId = req.params.id;
  
  await db.delete(bookTable)
    .where(eq(bookTable.id, deleteId));
  
  res.json({
    message: 'Book deleted successfully'
  });
};
```

**Key Points:**
- `db.delete()` = DELETE query
- `.where()` = Condition
- Koi return nahi

---

### **Gyaarahwa Hissa - UPDATE API - PATCH**

Creator ne likha:
- "Book ko update karna hai"
- "PATCH method use karenge"
- "Selective fields update kar sakte hain"

**Route:**
```javascript
router.patch('/books/:id', updateBook);
```

**Controller:**
```javascript
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, description, authorId } = req.body;
  
  // Only update provided fields
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (authorId !== undefined) updateData.authorId = authorId;
  
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: 'No fields to update'
    });
  }
  
  const result = await db.update(bookTable)
    .set(updateData)
    .where(eq(bookTable.id, bookId))
    .returning();
  
  if (!result || result.length === 0) {
    return res.json({
      message: 'Book not found'
    });
  }
  
  res.json({
    message: 'Book updated successfully',
    book: result[0]
  });
};
```

**Key Points:**
- `db.update()` = UPDATE query
- `.set()` = Kaunsi fields update karani hain
- Conditional update = Sirf diye gaye fields update honge

---

### **Baarahwa Hissa - CRUD Complete**

Creator ne likha:
- "Ab hamne CRUD ke sab operations kar liye"
- CREATE - POST
- READ - GET
- UPDATE - PATCH
- DELETE - DELETE

---

### **Tehrahwa Hissa - Postman Collection Save**

Creator ne likha:
- "Sab requests ko organize karke Postman collection mein save kiya"
- "Folder: Books API"
  - Get All Books
  - Get Book By ID
  - Create A Book
  - Delete Book By ID
  - Update Book By ID

---

## 🚀 COMPLETE STEP-BY-STEP FLOW

### **PHASE 1: DATABASE SE DATA LANA (10 Minutes)**

**Step 1: Data Create Karo**
```
DB Studio mein jao
Author add karo:
  - Name: Taha
  - Email: taha@example.com

Book add karo:
  - Title: Book One
  - Author ID: Taha ki ID
```

**Step 2: GET API Test Karo**
```
Postman:
  GET {{BASE_URL}}/
  Response: Database se sab books
```

---

### **PHASE 2: GET BY ID API (15 Minutes)**

**Step 1: Route Banao**
```javascript
router.get('/books/:id', getBookById);
```

**Step 2: Controller Banao**
```javascript
const { eq } = require('drizzle-orm');

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  const result = await db.select().from(bookTable)
    .where(eq(bookTable.id, bookId));
  
  res.json({ result: result[0] || null });
};
```

**Step 3: Test Karo**
```
Postman:
  GET {{BASE_URL}}/books/[ID]
  
DB Studio se ID copy karo
```

---

### **PHASE 3: CREATE BOOK API (20 Minutes)**

**Step 1: Middleware Add Karo**
```javascript
// index.js mein
app.use(express.json());
```

**Step 2: Route Banao**
```javascript
router.post('/', createBook);
```

**Step 3: Controller Banao**
```javascript
const createBook = async (req, res) => {
  const { title, description, authorId } = req.body;
  
  try {
    const result = await db.insert(bookTable).values({
      title,
      description,
      authorId
    }).returning();
    
    res.status(201).json({
      message: 'Book created',
      bookId: result[0].id
    });
  } catch {
    res.status(400).json({ message: 'Failed' });
  }
};
```

**Step 4: Test Karo**
```
Postman:
  POST {{BASE_URL}}/
  Body (Raw JSON):
  {
    "title": "Book Three",
    "description": "Description",
    "authorId": "[ID]"
  }
```

---

### **PHASE 4: DELETE API (10 Minutes)**

**Step 1: Route Banao**
```javascript
router.delete('/books/:id', deleteBook);
```

**Step 2: Controller Banao**
```javascript
const deleteBook = async (req, res) => {
  const deleteId = req.params.id;
  await db.delete(bookTable)
    .where(eq(bookTable.id, deleteId));
  
  res.json({ message: 'Book deleted' });
};
```

**Step 3: Test Karo**
```
Postman:
  DELETE {{BASE_URL}}/books/[ID]
```

---

### **PHASE 5: UPDATE API - PATCH (20 Minutes)**

**Step 1: Route Banao**
```javascript
router.patch('/books/:id', updateBook);
```

**Step 2: Controller Banao**
```javascript
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, description, authorId } = req.body;
  
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (authorId !== undefined) updateData.authorId = authorId;
  
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'No fields' });
  }
  
  const result = await db.update(bookTable)
    .set(updateData)
    .where(eq(bookTable.id, bookId))
    .returning();
  
  res.json({ message: 'Updated', book: result[0] });
};
```

**Step 3: Test Karo**
```
Postman:
  PATCH {{BASE_URL}}/books/[ID]
  Body (Raw JSON):
  {
    "title": "Updated Title"
  }
```

---

### **PHASE 6: POSTMAN COLLECTION SAVE (5 Minutes)**

**Step 1: Collection Banao**
```
+ New Collection
Name: Books API
```

**Step 2: Requests Add Karo**
```
Folder: Books API
  - Get All Books (GET)
  - Get Book By ID (GET)
  - Create A Book (POST)
  - Update Book (PATCH)
  - Delete Book (DELETE)
```

**Step 3: Environment Set Karo**
```
BASE_URL = http://localhost:8000
BOOK_ID = (copy karo DB se)
```

---

## ✅ FINAL STATUS CHECK

**Hamne kya banaya:**

✨ **GET** - Sab books fetch karna  
✨ **GET by ID** - Ek specific book fetch karna  
✨ **POST** - Naya book create karna  
✨ **PATCH** - Book ko update karna  
✨ **DELETE** - Book ko delete karna  
✨ **Database Connection** - Drizzle ORM se  
✨ **Error Handling** - Try-catch aur validation  
✨ **Documentation** - Postman collection  

---

## 📊 Database Relationships

```
Author Table:
  - id (primary key)
  - firstName
  - lastName
  - email

Book Table:
  - id (primary key)
  - title
  - description
  - authorId (foreign key → Author.id)

Relationship: 
  One Author → Many Books
```

---

## 🎯 API Endpoints Final

```
GET    {{BASE_URL}}/                    → Sab books
GET    {{BASE_URL}}/books/:id          → Specific book
POST   {{BASE_URL}}/                    → Book create
PATCH  {{BASE_URL}}/books/:id          → Book update
DELETE {{BASE_URL}}/books/:id          → Book delete
```

---

**Hamara Project Complete!** 🎉