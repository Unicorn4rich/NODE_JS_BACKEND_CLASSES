const {z} = require('zod');



// -------------------------------------------------------------GET Author Validator Schema
// req.query

exports.getAuthorValidator = z.object({

    search: z.string().optional(),
    id: z.uuid().optional()
})




// -------------------------------------------------------------Create Author Validator Schema
// req.body


// const {firstName, lastName, email} = req.body; -> foor write coding

exports.createAuthorValidator = z.object({
    firstName: z.string({required_error: "First Name is required!"}).min(3, {message: "First Name connot be less then 3 charactors"}),
    lastName: z.string().optional(),
    email: z.email()
})



// -------------------------------------------------------------Update Author Validator Schema
// req.params

// const {id} = req.params;
exports.updateAuthorValidatorID = z.object({
    id: z.uuid({message: "Invalid author ID format"}),
})

// req.body
// const {firstName, lastName, email} = req.body;
exports.updateAuthorValidatorBody = z.object({
    firstName: z.string().min(3, {message: "Name connot be less then 3 charactors"}).optional(),
    lastName: z.string().optional(),
    email: z.email().optional()

})



// -------------------------------------------------------------delete Author Validator Schema
// req.params

// const {id} = req.params;
exports.deleteAuthorValidator = z.object({
    id: z.uuid({message: "Invalid author ID format"}),
})

