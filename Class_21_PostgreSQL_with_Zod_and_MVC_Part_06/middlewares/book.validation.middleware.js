// middlewares\book.validation.middleware.js
const {getBookValidator} = require("../validators/book.validatorSchema")


exports.getBookValidateMiddleware = (req, res, next) => {
    try{
        getBookValidator.parse(req.query) // Validate req.query using zod schema
        next() 
    }
    catch(error){
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}