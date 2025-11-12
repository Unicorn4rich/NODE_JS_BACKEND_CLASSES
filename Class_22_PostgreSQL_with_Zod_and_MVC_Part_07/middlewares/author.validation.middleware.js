const {getAuthorValidator, createAuthorValidator, updateAuthorValidatorID, updateAuthorValidatorBody, deleteAuthorValidator} = require('../validators/author.validatorSchema')



// Schema.parse(commingData) -> For creating middleware logic


// Get Author Validate Middleware
exports.getAuthorValidateMiddleware = (req, res, next)=>{
try{
    // Schema.parse(commingData)
    getAuthorValidator.parse(req.query)

    next();
}
catch(error){
    return res.status(400).json({
        message: "Validation Failed",
        error: error.issues
    })
}
}




// Create Author Validate Middleware
exports.createAuthorValidateMiddleware = (req, res, next)=>{
try{
    // const {firstName, lastName, email} = req.body; -> for write coding
    // Schema.parse(commingData)

    createAuthorValidator.parse(req.body)
    next();
}
catch(error){
    return res.status(400).json({
        message: "Validation Failed",
        error: error.issues
    })
}
}



// Update Author Validate Middleware
exports.updateAuthorValidateMiddleware = (req, res, next)=>{
try{
    // const {id} = req.params;                      -> for write coding
    // const {firstName, lastName, email} = req.body -> for write coding
    // Schema.parse(commingData)


    updateAuthorValidatorID.parse(req.params);
    updateAuthorValidatorBody.parse(req.body)
    next();
}
catch(error){
    return res.status(400).json({
        message: "Validation Failed",
        error: error.issues
    })
}
}


// Delete Author Validate Middleware
exports.deleteAuthorValidateMiddleware = (req, res, next)=>{
try{
    // const {id} = req.params
    // Schema.parse(commingData)


    deleteAuthorValidator.parse(req.params)
    next();
}
catch(error){
    return res.status(400).json({
        message: "Validation Failed",
        error: error.issues
    })
}
}