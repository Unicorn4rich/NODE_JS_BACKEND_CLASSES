// validators\book.validatorSchema.js
const {z} = require('zod');


//------------------------------------------------GET Validator Schema
// req.query

exports.getBookValidator = z.object({
    search: z.string().min(4).optional(),
    bookId: z.uuid().optional(),
    authorId: z.uuid().optional()
})