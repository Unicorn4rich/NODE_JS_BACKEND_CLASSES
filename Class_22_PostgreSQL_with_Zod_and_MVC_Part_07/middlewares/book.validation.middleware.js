// middlewares\book.validation.middleware.js
const {getBookValidator, createBookValidator, updateBookValidatorId, updateBookValidatorBody, deleteBookValidator} = require("../validators/book.validatorSchema")


// Get Book Validate Middleware
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




// Create Book Validate Middleware
exports.createBookValidateMiddleware = (req, res, next) => {
    try{
        // const {title, description, authorId} = req.body
        createBookValidator.parse(req.body)
        next() 
    }
    catch(error){
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}




// Update Book Validate Middleware
exports.updateBookValidateMiddleware = (req, res, next) => {
    try{
        updateBookValidatorId.parse(req.params) // Validate req.params.id
        updateBookValidatorBody.parse(req.body) // Validate req.body

        next() 
    }
    catch(error){
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}



// Delete Book Validate Middleware
exports.deleteBookValidateMiddleware = (req, res, next) => {
    try{

        deleteBookValidator.parse(req.params)

        next() 
    }
    catch(error){
        res.status(400).json({
            message: "Validation Failed",
            errors: error.issues
        })
    }
}


