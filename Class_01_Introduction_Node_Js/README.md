Repo Link Know about Node.Js Check Note -> https://github.com/Sid-Taha/Docs/blob/main/Node.js.md

1. Javascript: 
   React -> (web app) 
   React Native -> (mobile app)  
   Electron -> (Desktop app) 

2. Main.Js -> Parse -> Syntax tree 
   (JIT) Compiler hmare code ko bite code mein convert karega uske bad machine code mein convert kar dega
   hmara code machine code mein convert hone ke bad exicute hota hai.

3. Google Chrome has V8 engine -> Same engine have Node.js   
   
4. Browser Web API:
   ye API javascript ko browser mein chalny ke liye help karta hai Node.Js ke pass ye API nahi hoti.  

5. window object -> iske pass sari browser ki cheezen hoti hain.   
---------------------------------------------------------------------------

## JavaScript Basics
### What is JavaScript?
- **Definition**: JavaScript (JS) ek dynamic programming language hai jo web pages par interactive effects banane ke liye use hoti hai. Iska short form "JS" bhi hai.
- **Usage**:
  - Web development mein interactive features banane ke liye.
  - Mobile app development frameworks jaise React Native mein bhi use hota hai.
  - Desktop applications ke liye Electron framework ke saath kaam karta hai.
- **Why Famous?**: JavaScript ek asaan language hai, jo C++ ya C# jaisi languages se zyada approachable hai. Is ki simplicity ki wajah se browsers ne isay native language bana diya.

### Three Layers of Web Development
Web development teen layers par hota hai:
1. **HTML (HyperText Markup Language)**: Yeh website ka structure banata hai, jo website ki shakal deta hai.
2. **CSS (Cascading Style Sheets)**: Yeh website ko visually appealing banata hai, colors, layouts, aur styling ke liye.
3. **JavaScript**: Yeh website ko interactive banata hai. Buttons ke logic, form submissions, aur events ko handle karta hai.

**Example**: Agar HTML aur CSS se website banayi, to woh dikhegi magar kaam nahi karegi (e.g., buttons press karne se kuch nahi hoga). JavaScript website mein "rooh" daalta hai, jo interactivity deta hai.

### Importance of JavaScript
- Agar JavaScript hata diya jaye, to website sirf static hogi aur buttons ya forms kaam nahi karenge.
- JavaScript ke bina website functional nahi hoti.

## JavaScript Frameworks and Libraries
- **Frameworks aur Libraries**: JavaScript ke upar bohat se frameworks aur libraries bani hain jo development ko asaan karti hain:
  - **React**: Web applications banane ke liye ek library.
  - **React Native**: Mobile applications ke liye.
  - **Electron**: Desktop applications ke liye.
  - **Next.js**: Advanced front-end web applications ke liye.
  - **Expo**: Mobile app development ke liye ek famous framework.
- **Ecosystem**: JavaScript ka ecosystem bohat bara hai, aur yeh frameworks aur libraries isay versatile banate hain.

## How JavaScript Code Executes
### Compilation Process
- **Source Code**: JavaScript code ek file (e.g., `main.js`) mein likha jata hai, jisme variables, loops, ya if-conditions hoti hain.
- **Syntax Tree**: Code likhne ke baad, JavaScript ka engine isay syntax tree mein arrange karta hai (parsing).
- **JIT Compiler**: Just-In-Time (JIT) compiler code ko pehle **bytecode** mein convert karta hai, phir **machine code** mein, jo execute hota hai.
- **Execution**: Machine code execute hone ke baad output terminal ya browser par dikhta hai.

### Example
```javascript
let name = "shoaib";
console.log(name);
```
- Yeh code syntax tree mein arrange hota hai, JIT compiler isay bytecode aur phir machine code mein convert karta hai, aur output "Taha" dikhta hai.

### Key Points
- JavaScript code machine code mein convert hone ke baad hi execute hota hai.
- Parsing aur compilation automatically hoti hai, developer ko yeh manually nahi karna padta.

## Browser vs. Node.js
### JavaScript in Browser
- **Environment**: Browser mein JavaScript V8 engine (Google Chrome), SpiderMonkey (Firefox), ya Nitro (Safari) ke zariye run hota hai.
- **V8 Engine**: Google Chrome ka V8 engine open-source hai, is liye zyada famous hai. Yeh JavaScript code ko compile aur execute karta hai.
- **Web APIs**: Browser-specific APIs (jaise `alert`, `window` object) sirf browser mein kaam karti hain. Yeh APIs JavaScript ko browser ke environment mein enhance karti hain.
  - **Example**: `alert("I am alert")` browser mein ek popup dikhata hai, lekin Node.js mein yeh kaam nahi karta.

### Node.js: JavaScript Outside Browser
- **History**: Pehle JavaScript sirf browser mein chalta tha. Ryan Dahl ne 2009 mein Node.js banaya taake JavaScript browser ke bahar bhi run ho sake.
- **Node.js Definition**: Node.js ek **runtime environment** hai jo V8 engine ko C++ wrapper ke saath use karta hai, taake JavaScript server-side ya local machine par run ho sake.
- **Key Achievement**: Node.js ne JavaScript ko browser ki dependency se azaad kiya. Ab aap JavaScript code terminal ya server par bhi chala sakte hain.

### Differences Between Browser and Node.js
- **Browser**:
  - JavaScript browser mein V8 (Chrome), SpiderMonkey (Firefox), ya Nitro (Safari)