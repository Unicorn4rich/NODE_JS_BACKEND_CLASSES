npm init -y
npm i express
npm i @types/express -D
npm i @types/node -D
npm install node-cache --save

-----------------------------------------------------------------------------------------------


# 📦 API Caching — Notes (Transcript se banaya hua)

## 🎯 Topic Overview
Is lecture mein **Cache** ka concept samjhaya gaya — kya hota hai, kyun zaroori hai, aur kaise simple Node.js API mein cache implement karte hain (practical example ke saath). Video ke examples aur flow ko waise hi note kiya gaya hai jese creator ne bataya.

---

## 🧠 Cache kya hai (Simple Definition)
- **Cache** ek temporary storage hota hai jo request aur server ke beech rakha jata hai.
- Agar same data pe multiple requests aayen to server ko baar‑baar hit karne ke bajaye cache se data return kar diya jata hai.
- Is se **latency kam** hoti hai aur **performance improve** hoti hai.

---

## 🔁 Basic Flow (Client → Cache → Server)
1. Client request bhejta hai (Thunder Client, Postman, browser).  
2. Request pehle **cache** ko check karti hai:  
   - Agar cache mein data maujood hai → cache se response return karein (fast).  
   - Agar cache mein nahi hai → request server tak jayegi, server se data aaega, phir us data ko cache mein **store** kar lenge (temporary).  
3. Agli requests TTL (time to live) ke andar cache se serve hongi.

```
Client → Cache (check) → [if miss → Server → Cache store → Client]
                 → [if hit  → Client]
```

---

## 🔢 Example Scenario (Video ka example)
- Server ek array return karta hai jisme products hote hain (example: 1000 products).
- Agar user baar‑baar ek button click kare to har click server ko hit karega — is se latency aur load badhta hai.
- Cache istemal karne se pehli request server se aayegi, baad ki requests cache se milengi.

---

## 🛠️ Node.js Simple Implementation (Video Example)
**Steps (as explained in video):**
1. `npm init -y` karein.  
2. `npm i express` install karein.  
3. Developer ne suggest kiya: types agar chahen to dev-dependencies mein add karein (`npm i -D @types/express @types/node`).
4. `index.js` banayein aur API create karein.

**Sample `index.js` (simple, transcript ke logic ke mutabiq):**

```js
const express = require('express');
const app = express();

// Example products "database"
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mobile' }
];

app.get('/products', (req, res) => {
  // Yeh simple API hai, pehli baar server se data return hoga
  res.json({ source: 'server', data: products });
});

app.listen(8000, () => console.log('Server running on port 8000'));
```

---

## ⚡ Node Cache (Video ne `node-cache` dikhaya)
- `node-cache` ek simple in-memory caching module hai jisme methods jaise `set`, `get`, `del`, `ttl` hotay hain.
- Install command (video ke mutabiq):
  ```bash
  npm install node-cache --save
  ```

**Initialization aur TTL set karna:**
```js
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 10, checkperiod: 120 });
// stdTTL: default time-to-live (seconds) - yahan example ke liye 10 sec rakha
```

**Cache logic in API (video logic):**
```js
app.get('/products', (req, res) => {
  const cached = myCache.get('products');
  if (cached) {
    // agar cache hai to immediately return karo (source: cache)
    return res.json({ source: 'cache', data: cached });
  }

  // agar cache nahi hai to server se data le kar cache mein store karo
  myCache.set('products', products);
  return res.json({ source: 'server', data: products });
});
```

**Behaviour (video example):**
- Pehli request: source = `server`. Cache set ho jayega.  
- Agli requests (TTL ke andar): source = `cache`.  
- TTL expire hote hi fir se server se data ayega aur cache update ho jayega.

---

## ⏳ TTL (Time To Live)
- TTL decide karta hai ke cache mein data kitni der tak rahega.
- Video example: initially 10 seconds rakha gaya, phir demo mein value badha kar 100s ya 5s karke dekha gaya.
- TTL ko application logic ke mutabiq set karna chahiye (static data zyada lamba, dynamic kam).

---

## 🏗️ Large Scale Architecture (Video ka conceptual part)
- Real systems mein cache sirf single machine memory nahi hoti. Multiple layers hoti hain:
  - **Client-side cache** (browser)
  - **Edge cache / CDN (Content Delivery Network)** — static assets, videos, images ko nearest location par store karta hai (Netflix example)
  - **Load balancer** — requests ko multiple servers par distribute karta hai; khud bhi caching rakh sakta hai
  - **API Gateway** — incoming requests ka route decide karta hai
  - **Server-side cache (Redis, Memcached)** — centralized in-memory cache for multiple servers

**Flow (simplified):**
```
Client → Load Balancer → API Gateway → Server(s) → Database
           ↓                  ↑
           → (edge cache / CDN)  
```

---

## 🌐 CDN (Content Delivery Network) Example — Netflix
- Agar Netflix ka main server USA mein ho aur user Pakistan se movie dekhe,
  - Pehli baar movie USA server se aayegi aur CDN node (jo nearest hai, e.g. India) mein store ho jayegi.  
  - Agli baar Pakistan se agar koi user wahi movie dekhe, CDN se serve ho jayegi (latency kam).
- CDN mostly **static data** serve karta hai (video files, images). TTL/CDN cache policy se content expiry control hoti hai.

---

## 🔁 Cache Types (Video ne 3 types ka zikr kiya)
1. **Persistent on disk** (hard-disk caching)  
2. **In-memory (RAM)** — fast, temporary  
3. **CPU cache** — bahut chhota aur fastest (hardware level)

---

## 🧾 Key Points (Students ke liye)
- Cache latency kam karta hai aur server load reduce karta hai.  
- Pehli request miss hoti hai (server), baad ki requests hit hoti hain (cache) jab tak TTL valid hai.  
- Cache set karna aur clear karna (expire) aap control kar sakte ho.  
- Large systems mein Redis/Memcached use hotay hain, aur CDN static content ke liye.
- Cache ko update/rule karna zaroori hai (consistency issue): agar underlying data change ho to cache invalidate karna padega.

---

## ✅ Practical Checklist (Follow karne ke steps)
1. `npm init -y`  
2. `npm i express`  
3. `npm i node-cache --save`  
4. `index.js` me express app aur simple products array banayein  
5. `NodeCache` initialize karein (`stdTTL` set karein)  
6. GET `/products` route me cache `get` check karein, miss par server se data le kar `set` karein  
7. Postman/Thunder Client se test karein: pehli request server se, 2nd request cache se

---

*Ye notes bilkul transcript ke mutabiq banaye gaye hain jese video ne samjhaya. Agar chaho to main is file ko canvas me ek `README_cache.md` naam se save kar dunga jisse tum download kar sako.*

