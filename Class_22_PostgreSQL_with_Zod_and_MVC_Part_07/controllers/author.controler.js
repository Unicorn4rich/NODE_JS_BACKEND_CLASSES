const db = require('../db/connection')
const {sql, ilike, or, eq} = require("drizzle-orm")
const authorTable = require('../models/author.model')
const bookTable = require('../models/book.model')



//-------------------------------------------------------------
// Get All Authors
// GET /api/v1/authors?search=xxxxx

exports.getAllAuthors = async (req, res)=>{
try{
    const {search, id} = req.query

    let query = db.select().from(authorTable) 


    if(id){
        query = query.where(eq(authorTable.id, id))    
    }
    else if(search){
        // const result = await db.select().from(authorTable).where(  -> OLD SQL QUERY CODE 
        //     sql`${authorTable.firstName} ILIKE ${`%${search}%`}
        //     OR ${authorTable.lastName} ILIKE ${`%${search}%`}
        //     OR ${authorTable.email} ILIKE ${`%${search}%`}`
        // )
  
        query = db.select().from(authorTable).where(or(  // -> NEW DRIZZLE ORM CODE
            ilike(authorTable.firstName, `%${search}%`),
            ilike(authorTable.lastName, `%${search}%`),
            ilike(authorTable.email, `%${search}%`)
        ))
    }

    const result = await query 

    return res.status(200).json({message: "Author Fetched Successfully", result: result})
}
catch(error){
    console.error("Error Fetching authors", error);
    return res.status(500).json({message: "Error Fetching authors"})
}
}


//-------------------------------------------------------------
// POST Create Authors
// POST /api/v1/authors

exports.createAuthor = async (req, res)=>{
try{
    const {firstName, lastName, email} = req.body;

    // Validation
    // if(!firstName || !email){           // ---> No need of this validation because of zod fill requirement
    //     return res.status(400).json({message: "firstName and email are required"})
    // }

    const result = await db.insert(authorTable).values({firstName, lastName, email}).returning()

    return res.status(201).json({message: "Author Created Successfully", result: result})
}
catch(error){
    console.error("Error Creating authors", error);
    return res.status(500).json({message: "Error Creating authors"})    
}
}


//-------------------------------------------------------------
// Update Author By ID
// PATCH /api/v1/authors/:id

exports.updateAuthorById = async (req, res)=>{
try{
    const {id} = req.params;
    const {firstName, lastName, email} = req.body

        // Build dynamic update values
        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;


        if (Object.keys(updateData).length === 0){
            return res.status(400).json({message: "No fields to update"})
        }


        const result = await db.update(authorTable).set(updateData).where(eq(authorTable.id, id)).returning()

        return res.status(200).json({message: "Author Updated Successfully", result: result})
}
catch(error){
    console.error("Error Updating authors", error);
    return res.status(500).json({message: "Error Updating authors"})
}
}




//-------------------------------------------------------------
// Delete Author By ID
// DELETE /api/v1/authors/:id

exports.deleteAuthorById = async (req, res) =>{
try {
    const {id} = req.params

    const books = await db.select().from(bookTable).where(eq(bookTable.authorId, id))

    if(books.length > 0){
        return res.status(400).json({message: `you cannot delete this author. Author has ${books.length} book. you should delete book first.`})
    }

    const result = await db.delete(authorTable).where(eq(authorTable.id, id)).returning()

    return res.status(200).json({message: "Author Deleted !", result: result})
} catch (error) {
    console.error("Error deleting authors: ", error);
    return res.status(500).json({message: "Error deleting authors"}) 
}
}