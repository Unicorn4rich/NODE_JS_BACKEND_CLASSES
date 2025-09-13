
---

## 🗂 Files ka setup
- Hamare paas 2 files hain:
  - `main.js`
  - `info.txt`
- `info.txt` ke andar likha hai:
  ```
  I am shoaib
  I am 50 years old
  ```
- Agar `main.js` me likhen:
  ```js
  console.log("shoaib")
  ```
  aur terminal me run karen:
  ```bash
  node main.js
  ```
  to output hoga:
  ```
  shoaib
  ```

---

## ❓ Third-Party Code kyu use karte hain?
- Doosron ka likha hua code uthate hain taa ke **apna kaam easy** ho jaye.
- Dobara wohi coding na karni pade jo pehle se likhi gayi ho.
- Ye code **npm (Node Package Manager)** se milta hai.
- Example:  
  ```bash
  npm i @types/node
  ```
  Ye package Node.js ke types aur suggestions deta hai (dot lagao to suggestion milta hai).

---

## 📦 Module aur Package banane ka tareeqa
- Abhi sirf 2 files hain → Ye **sirf files** hain, module nahi.
- Module banane ke liye run karna padta hai:
  ```bash
  npm init
  ```
- Ye command chalane ke baad details poochi jaati hain:
  - Package name
  - Version
  - Description
  - Entry point (default: `main.js`)
  - Author, License, etc.
- Iske baad banti hai file: **package.json**

---

## 📄 package.json
- Isme project ki information hoti hai:
  - Name
  - Version
  - Description
  - Author
  - License
  - Entry file (ex: `main.js`)
- Dependencies bhi isi me record hoti hain.

---

## 📄 package-lock.json
- npm ke sath auto-generate hoti hai.
- Kaam:
  - Dependencies ka record rakhti hai
  - Unke andar ki nested dependencies ka bhi record rakhti hai
- **Is file ko edit nahi karte.**

---

## 📂 node_modules
- Jab npm package install karte ho to package **node_modules** ke andar aata hai.
- `package.json` sirf record rakhta hai.
- `node_modules` folder bohot bara hota hai (MBs ya GBs).  
  Isliye GitHub pe upload nahi karte.

---

## 📤 GitHub / npm par upload
- Upload karte waqt sirf ye files jayengi:
  - `package.json`
  - `package-lock.json`
  - `main.js`
  - `info.txt`
- **node_modules upload nahi hota.**

---

## 🔗 require aur Modules ka use
- Node.js me kisi module ko use karne ke liye `require()` ka use hota hai.

### 3 tareeqe `require` karne ke:
1. **Built-in module**  
   ```js
   const fs = require("fs");
   ```

2. **Third-party module (npm se install kiya hua)**  
   ```js
   const express = require("express");
   ```

3. **Apni file import karna (current directory)**  
   ```js
   const data = require("./info");
   ```

---

## 📖 File ko read karna (fs module)
- `info.txt` file ko read karne ka example:
  ```js
  const fs = require("node:fs");

  const content = fs.readFileSync("info.txt", "utf-8");
  console.log(content);
  ```
- Output:
  ```
  I am Taha
  I am 50 years old
  ```

- `fs.readFileSync()` → Sync (blocking) method hai.  
- `"utf-8"` encoding dena zaroori hai taa ke file text form me read ho.

---

## 📝 Summary
- Code run karne ke liye: `node filename.js`
- Third-party code use karte hain time bachaane ke liye.
- NPM packages dependencies kehlate hain (record `package.json` me hota hai).
- `npm init` se package banta hai.
- `package.json` → info + dependencies.
- `package-lock.json` → nested dependencies ka record (edit nahi karte).
- `node_modules` → packages ka folder (upload nahi karte).
- `require()` se built-in, third-party aur apni files import hoti hain.
- `fs` ek built-in module hai jo file read/write ke liye use hota hai.

-----------------------------------------------------------------------------------------------------------




## Project Setup
- **Files**: Do files hain:
  - `main.js`: Main JavaScript file jisme code likha jata hai.
  - `info.txt`: Text file jisme sample text likha hai, e.g., "I am Taha" ya "I am 50 year old".
- **Objective**: `main.js` ke zariye `info.txt` ko read, write, aur manipulate karna, aur Node.js ke file system module ka istemal karna.

## Node.js Modules aur Dependencies
### Module Types
Node.js mein teen tarah ke modules hote hain:
1. **Built-in Modules**: Node.js ke saath aate hain, jaise `fs` (file system).
2. **Third-Party Modules**: NPM se install kiye jate hain, jaise `@types/node`.
3. **Custom Modules**: Developer khud banata hai.

### Third-Party Modules
- **Purpose**: Doosron ke likhe hue code ka istemal karke development asaan hota hai, taake dobara se wahi code na likhna pade.
- **Example**: `@types/node` package Node.js ke liye type definitions provide karta hai, jo code suggestions aur IntelliSense ke liye useful hai.
  - **Command**: `npm install @types/node`
  - **Result**: Yeh package install hone ke baad `node_modules` folder mein add hota hai aur `package.json` mein dependency ke tor par record hota hai.

### Package.json aur Package-lock.json
- **Package.json**:
  - Yeh file project ke metadata ko store karti hai (e.g., name, version, description, entry point).
  - Dependencies ka record rakhti hai (e.g., `@types/node`).
  - **Command**: `npm init` se `package.json` create hoti hai. Default values ke liye `Enter` press karte jao.
  - **Fields**:
    - `name`: Project ka naam.
    - `version`: Project ka version (e.g., `1.0.0`).
    - `description`: Project ka description.
    - `main`: Entry point file (e.g., `main.js`).
    - `scripts`: Custom scripts define karne ke liye.
    - `dependencies`: Installed third-party packages ka record.
- **Package-lock.json**:
  - Dependencies aur unki sub-dependencies ka exact version record rakhta hai.
  - Yeh file manually edit nahi ki jati.
- **Node_modules**:
  - Third-party packages yahan install hote hain.
  - Yeh folder size mein bara hota hai (e.g., 2.4 MB), jabke doosri files ka size chhota hota hai (e.g., 0.4 MB).
  - GitHub ya NPM par upload karte waqt `node_modules` ko ignore kiya jata hai kyunki yeh locally `npm install` se recreate ho sakta hai.

### NPM aur Publishing
- NPM (npmjs.com) ek platform hai jahan developers apne packages publish karte hain.
- Aap bhi apna package NPM par upload kar sakte hain.
- **Why Share?**: Code ko share karne se doosre developers ka kaam asaan hota hai, aur aapka code reusable banta hai.
- **GitHub**: Code aur project files (e.g., `main.js`, `info.txt`, `package.json`) GitHub par push kiye jate hain, lekin `node_modules` nahi.

## File System (fs) Module
`fs` (file system) module Node.js ka built-in module hai jo files aur folders ko manipulate karne ke liye use hota hai.

### Requiring fs Module
- **Syntax**:
  ```javascript
  const fs = require("fs");
  ```
- `fs` module ko directly require kiya jata hai kyunki yeh built-in hai. `./` ya path ki zarurat nahi.
- Optional syntax (suggested for clarity):
  ```javascript
  const fs = require("node:fs");
  ```
  - `node:` prefix batata hai ke module Node.js ka built-in hai.
