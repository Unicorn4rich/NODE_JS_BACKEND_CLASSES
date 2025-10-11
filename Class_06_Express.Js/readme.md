1. npm init -y
2. npm i @types/node
3. npm i express
4. npm uninstall @types/express -> for remove packges
5. npm i @types/express -D

6.  "scripts": {
    "start": "node --watch index.js"
  },
for run -> npm start -> ye server changes ko update karta jaega.

----------------------------------------------------------------------------------------------------------

# Express.js Notes in Roman Urdu

Yeh notes Express.js ke baare mein hain jo ke ek backend framework hai Node.js ke liye. Ye notes students ke liye zaroori concepts aur examples ko Roman Urdu mein cover karte hain, jo ke asaan samajh ke liye banaye gaye hain. Ye notes GitHub ke liye markdown format mein hain.

## 1. **Express.js Kya Hai?**
- **Express.js** ek backend framework hai jo Node.js ke liye banaya gaya hai.
- Iska kaam APIs banane aur manage karne mein madad karna hai.
- HTTP module ke comparison mein Express.js zyaada simple aur manageable hai kyunke complex switch ya if-else statements se bachata hai.

**Example**:
Agar aap HTTP module use karte hain, toh aapko har request ke liye switch ya if-else likhna padta hai, jo ke jab data bada hota hai toh mushkil ho jata hai.

## 2. **Project Setup**
Express.js ke sath kaam shuru karne ke liye basic setup:

1. **Folder aur Package.json Banayein**:
   - Ek folder banayein aur usme `npm init -y` command chalayein package.json file banane ke liye.
   - Yeh file aapke project ke dependencies ka record rakhti hai.

2. **Express Install Karna**:
   - Command: `npm install express`
   - Yeh Express.js ko aapke project mein add karta hai aur node_modules folder mein save hota hai.

**Example**:
```bash
npm init -y
npm install express
```

## 3. **Dependencies aur Dev Dependencies**
- **Dependencies**: Yeh wo packages hain jo aapke application ke runtime ke liye zaroori hote hain, jaise Express.js.
- **Dev Dependencies**: Yeh packages sirf development ke waqt madad karte hain, jaise code likhte waqt suggestions dene ke liye `@types/express`.
  - Command: `npm install --save-dev @types/express`
  - Yeh package.json mein `devDependencies` ke under save hota hai.

**Example**:
Agar aap `@types/express` ko galti se main dependency mein install kar dein:
```bash
npm install @types/express
```
Toh isko dev dependency mein karne ke liye:
```bash
npm uninstall @types/express
npm install --save-dev @types/express
```

## 4. **Basic Express Server Banayein**
Express server banane ke liye yeh steps follow karein:

1. **Express Import Karna**:
   - File `index.js` banayein.
   - Express ko import karein: `const express = require('express');`
   - Ek app variable banayein: `const app = express();`

2. **Port Define Karna**:
   - Ek port number set karein, jaise `8000`.
   - Server ko listen karayein: `app.listen(8000, () => console.log('Server is up and running on port 8000'));`

**Example Code**:
```javascript
const express = require('express');
const app = express();

app.listen(8000, () => {
  console.log('Server is up and running on port 8000');
});
```

- Yeh code server ko localhost:8000 par start karta hai.
- Browser ya Postman/Thunder Client se `http://localhost:8000` access karein.

## 5. **APIs Banayein**
Express mein APIs routes aur HTTP methods (GET, POST, etc.) ke zariye banayi jati hain.

### **GET API**
- **GET** method data retrieve karne ke liye hota hai.
- Example:
```javascript
app.get('/', (req, res) => {
  res.send('This is the home page at localhost:8000');
});
```
- Yeh `/` endpoint par ek response deta hai jab browser ya client isko access karta hai.

### **POST API**
- **POST** method naye data ko create karne ke liye hota hai.
- Browser mein POST requests directly nahi chalti, iske liye Thunder Client ya Postman use karna padta hai.
- Example:
```javascript
app.post('/news', (req, res) => {
  res.status(201).send('These are today\'s news');
});
```
- Yeh `/news` endpoint par POST request ke response mein status code 201 (Created) deta hai.

## 6. **Watch Mode (Auto-Restart)**
- Har code change ke baad server ko manually restart karna mushkil hota hai.
- **Nodemon** use karke server ko watch mode mein chalayein, jo code changes par automatically restart karta hai.
  - Command: `npm install --save-dev nodemon`
  - Package.json mein script add karein:
    ```json
    "scripts": {
      "start": "nodemon index.js"
    }
    ```
  - Ab `npm start` se server chalayein, aur code changes par server apne aap restart ho jayega.

## 7. **Client-Server Architecture**
- **Client**: Browser, Thunder Client, Postman, JavaScript (fetch), Python (requests library), ya koi bhi device (jaise Alexa) client ho sakta hai.
- **Server**: Aapka Express.js server jo requests ko handle karta hai aur responses deta hai.
- Browser sirf GET requests ko directly handle karta hai, POST ke liye Thunder Client ya Postman zaroori hai.

**Example**:
- Browser mein: `http://localhost:8000/` se GET request ka response milta hai.
- Thunder Client mein: `http://localhost:8000/news` par POST request bheji jati hai aur response milta hai.

## 8. **REST API Rules**
- **GET**: Sirf data retrieve karta hai, naye data create nahi karta.
- **POST**: Naye data create karta hai, iska status code ideally 201 hota hai jab data successfully create hota hai.
- REST API ek guideline hai jo HTTP methods ko sahi tarike se use karne ke rules define karta hai.

**Example**:
```javascript
app.post('/news', (req, res) => {
  res.status(201).send('These are today\'s news');
});
```
- Yeh POST request ke liye 201 status code return karta hai, jo ke REST API ke rules ke mutabiq hai.

## 9. **Endpoints**
- Endpoints URLs ke wo hisse hote hain jo different resources ko represent karte hain.
- Example:
  - `http://localhost:8000/` → Home endpoint
  - `http://localhost:8000/tweets` → Tweets endpoint
  - `http://localhost:8000/news` → News endpoint

**Example Code**:
```javascript
app.get('/tweets', (req, res) => {
  res.send('These are your tweets');
});
```

## 10. **API Testing**
- APIs ko test karne ke liye Thunder Client ya Postman use karein.
- Thunder Client ek VS Code extension hai jo API testing ke liye lightweight hai.
- Example:
  - Thunder Client mein `http://localhost:8000/news` par POST request bhejein aur response check karein.

## 11. **Zaroori Points**
- **Package.json**: Dependencies aur scripts ka record rakhta hai.
- **Node_modules**: Downloaded packages yahan store hote hain.
- **Nodemon**: Development ke waqt server ko auto-restart karta hai.
- **Status Codes**:
  - 200: OK (GET requests ke liye)
  - 201: Created (POST requests ke liye jab data successfully create ho)
- **REST API**: HTTP methods ke sahi use ke liye guideline deta hai.
- **Clients**: Multiple clients (browser, Postman, Thunder Client, etc.) server se interact kar sakte hain.

## 12. **Complete Example Code**
Yeh ek complete Express.js server ka example hai jo multiple endpoints ke sath hai:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('This is the home page at localhost:8000');
});

app.get('/tweets', (req, res) => {
  res.send('These are your tweets');
});

app.post('/news', (req, res) => {
  res.status(201).send('These are today\'s news');
});

app.listen(8000, () => {
  console.log('Server is up and running on port 8000');
});
```

- **Run Command**: `npm start` (agar nodemon setup hai).
- **Test URLs**:
  - GET: `http://localhost:8000/` → "This is the home page at localhost:8000"
  - GET: `http://localhost:8000/tweets` → "These are your tweets"
  - POST: `http://localhost:8000/news` → "These are today's news" (Thunder Client/Postman se test karein).

Yeh notes Express.js ke basic concepts ko cover karte hain aur students ke liye zaroori hain. Inko follow karke aap apne backend development ke skills ko improve kar sakte hain.