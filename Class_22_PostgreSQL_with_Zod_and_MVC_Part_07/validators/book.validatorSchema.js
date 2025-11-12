// validators\book.validatorSchema.js
const {z} = require('zod');


//------------------------------------------------GET Validator Schema
// req.query

exports.getBookValidator = z.object({
    search: z.string().min(4).optional(),
    bookId: z.uuid().optional(),
    authorId: z.uuid().optional()
})



//------------------------------------------------CREATE Validator Schema
// req.body

exports.createBookValidator = z.object({
    title: z.string({required_error: "title is required !"}).min(3, {message: "title connot be less then 3 charactors"}),
    description: z.string().optional(),
    authorId: z.uuid()
})



//------------------------------------------------UPDATE Validator Schema
// req.params.id

exports.updateBookValidatorId = z.object({
    id: z.uuid()
})


// req.body
exports.updateBookValidatorBody = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    authorId: z.uuid().optional()
})


//------------------------------------------------Delete Validator Schema
// req.params.id

exports.deleteBookValidator = z.object({
    id: z.uuid()
})