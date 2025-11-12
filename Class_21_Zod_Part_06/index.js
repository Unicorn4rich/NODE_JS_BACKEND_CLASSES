const {z} = require('zod');
 

// Interface
// DataTypes
// Value Validation


// schemas -> parse -> <yourObject>
//--------------------------------Validation Schema:
const nameSchema = z.object({
    name: z.string({message: "Ye data type string hai bhai"}).min(4, {message: "4 se km charecter nhi dey sakty"}).max(10, {message: "10 se zyada character dena lazim hai"}),
    age: z.int(),
    email: z.email()
})

//--------------------------------Main Object:
// name: string
const myNameObject = {
    name: "Shoaib",
    age: 24,
    email: "sho@gmail.com"
}

//--------------------------------Validation:
const result = nameSchema.parse(myNameObject)

console.log(result);