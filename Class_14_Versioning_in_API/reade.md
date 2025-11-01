# API Versioning — Notes (Roman Urdu) 🔁

> Video se liye hue notes — har step aur example bilkul creator ke tarike se samjhaya gaya hai.

---

## 1. Introduction — Versioning kyun zaruri hai? 🤔

- **Definition:** Jab API change karte ho to existing clients (jo us API pe application banaye hue hain) break na hon, iske liye **versioning** use karte hain.
- **Problem jo video batata hai:** Agar aap API ka response structure badal doge to jo clients purana structure expect kar rahe hain, unki application crash ho jayegi.
- **Solution:** Old version ko chalne do (V1) aur naya version launch karo (V2). Dono endpoints parallel chal sakte hain.

---

## 2. Video ka Example (step-by-step) — jo creator ne dikhaya

1. **Simple server banaya** — `express` require karke `app = express()`.
2. **GET route banaya** — `/products` jo ek object mein `products` property return karta hai.
3. **Server run karwaya** — `app.listen(8000)` aur client (Thundar/Postman) se test kiya.
4. **Response improve kiya:** Products array ko objects mein convert kiya (id, name, price).
5. **Change ka nateeja:** Response structure change hua — agar kisi ne purana structure use kiya tha to unki UI crash karegi.
6. **Versioning implement kiya:** `v1` aur `v2` route banaye — `GET /v1/products` (purana) aur `GET /v2/products` (naya).
7. **Metadata add karna:** Response mein version ka metadata bhi bhejna acha hota hai taake client ko pata chale kaun sa version chal raha hai.

---

## 3. Versioning approaches (short) ⚖️

- **URI Path Versioning:** `/v1/products`, `/v2/products` — simple aur easy to discover.
- **Header-based Versioning:** `Accept` header ya custom header `API-Version: 2` — URL clean rehta hai.
- **Media-type Versioning:** `Accept: application/vnd.myapp.v2+json` — REST-pure approach for content negotiation.
- **Query string versioning:** `GET /products?version=2` — easy but less recommended for long-term.

---

## 4. Video ka practical code (simple pattern)

```js
// index.js (simplified)
const express = require('express');
const app = express();
const productsV1 = [ 'product one', 'product two', 'product three' ];

app.get('/v1/products', (req, res) => {
  res.json({ version: 'v1', products: productsV1 });
});

const productsV2 = [
  { id: 1, name: 'product one', price: 100 },
  { id: 2, name: 'product two', price: 70 },
  { id: 3, name: 'product three', price: 30 }
];

app.get('/v2/products', (req, res) => {
  res.json({ version: 'v2', products: productsV2 });
});

app.listen(8000, () => console.log('Server running on 8000'));
```

---

## 5. Important Definitions & Key Facts ✨

- **Backward compatibility:** Naye changes aise hon ke purane clients unaffected rahen.
- **Deprecation policy:** Jab koi version retire karna ho to announce karo, migration window do aur docs + examples provide karo.
- **Metadata in response:** `version` field bhejna helpful hota hai debugging aur client-side logging ke liye.

---

## 6. Mind-map (Tree Structure)

```
API Versioning
├─ Why
│  ├─ Prevent client crashes
│  ├─ Allow improvements
│  └─ Controlled rollout
├─ Strategies
│  ├─ URI Path (/v1/)
│  ├─ Header (API-Version)
│  ├─ Media-type (Accept header)
│  └─ Query param (?version=)
├─ Implementation
│  ├─ Duplicate routes (v1, v2)
│  ├─ Shared middleware for auth/rate-limit
│  └─ Add version metadata in response
├─ Deprecation
│  ├─ Announce timeline
│  ├─ Provide migration guide
│  └─ Maintain old version for X months
└─ Handover
   ├─ Postman collection
   ├─ OpenAPI spec
   ├─ Run commands & env
   └─ Test cases
```

---

## 7. Yaad rakhne ka cheatsheet (short)

- Agar API change = version karo. ✅
- `/v1/` simple; header clean. ✅
- Response mein `version` metadata dena helpful hai. ✅
- Deprecate with notice + migration docs. ✅

---

## 8. Summary (short paragraph) 📝

Video ka main point: jab aap API change karte ho to client apps jo purane response pe dependent hain unki stability ke liye versioning bahut zaruri hai. Simple approach: old endpoints chalate raho (`/v1/...`) aur naye features nayi endpoints mein release karo (`/v2/...`). Docs aur migration plan dena na bhoolen.

---

## 9. Suggestions — Client / Freelancer Project Handover (market view)

1. **Document everything:** Endpoints, versioning approach, sample requests/responses, Postman collection, OpenAPI spec (swagger).  
2. **Deprecation policy:** Clear dates (announce -> deprecate -> remove), migration guide, compatibility notes.  
3. **Testing:** CI tests to ensure v1 responses remain stable; integration tests for v2.  
4. **Logs & Metrics:** Track which version clients are using; plan sunset based on usage.  
5. **Delivery artifacts:** Exported Postman collection + README + example curl commands + environment variables.

---

## 10. File/Download instructions

- Yeh file `README.md` format mein hai — copy karke `README.md` naam se save kar lo.  

---

**End — Clear, version-safe notes. Good luck! 🚀**

