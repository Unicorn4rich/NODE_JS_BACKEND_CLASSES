const express = require('express');
const {globalMiddleware} = require('./middlewares/globalMiddleware');
const bookRoute = require('./routes/book.route');

const app = express();
const PORT = 8000;


//-----------------------------------------------------------------
// Using Global Middleware
app.use(globalMiddleware)

//-----------------------------------------------------------------
// Using Routes
app.use("/", bookRoute)



//-----------------------------------------------------------------
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})