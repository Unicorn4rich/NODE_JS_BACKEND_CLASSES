//-----------------------------------------------------------------
// Global Middleware
exports.globalMiddleware =  (req, res, next) => {
    console.log("I am global middlware 😈");

    next();
}