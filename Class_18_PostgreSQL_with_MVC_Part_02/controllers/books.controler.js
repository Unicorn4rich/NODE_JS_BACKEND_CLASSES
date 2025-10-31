const { eq } = require('drizzle-orm');
const db = require('../db/connection')
const bookTable = require('../models/book.model');
const { title } = require('process');
const { log } = require('console');


//-------------------------------------------------------------------// Book API route
// Get All Books
exports.getAllBooks = async (req, res)=>{
    const result = await db.select().from(bookTable);
    // console.log(result);

    if(!result){
        res.end("Database is Empty, There is no record found!")
    }
    else{
        res.json({result: result});
    }
}

//-------------------------------------------------------------------
// Book By ID
exports.getBookBtId = async (req, res)=>{
    // res.end("I am getAllBookBtId");
    // console.log("😂", req.params.id)
    const clientId = req.params.id;

    const result = await db.select().from(bookTable).where(eq(bookTable.id, clientId)).limit(1);
    console.log("😈", result);

    res.json({apiResponse: result})
}

//-------------------------------------------------------------------
// Create New Book
exports.createBook = async (req, res)=>{
    // console.log("😂", req.body);
    const {title, description, authorId} = req.body

    const responseID = await db.insert(bookTable).values({
        title: title,
        description: description,
        authorId: authorId
    })
    .returning({
        id: bookTable.id
    })

    if(!responseID){
        res.status(401).json({message: "Book creation failed!"})
    }
    else{
        res.json({message: "Book created", bookId: responseID})
    }
}

//-------------------------------------------------------------------
// Delete Book By ID

exports.deleteBookById = async (req, res)=>{
    const deleteId = req.params.id

    await db.delete(bookTable).where(eq(bookTable.id, deleteId))

    res.json({message: `Book with ID ${deleteId} has been deleted.`})
}


//-------------------------------------------------------------------
// Update Book By ID
exports.updateBookById = async (req, res) => {
    const bookId = req.params.id;
    const { title, description, authorId } = req.body;

    // Optional: Validate that at least one field is provided
    if (!title && !description && authorId === undefined) {
        return res.status(400).json({
            message: "No fields provided to update. Please provide at least one of: title, description, authorId."
        });
    }

    try {
        // Build dynamic update values
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (authorId !== undefined) updateData.authorId = authorId;

        // Perform the update
        const result = await db
            .update(bookTable)
            .set(updateData)
            .where(eq(bookTable.id, bookId))
            .returning({ updatedId: bookTable.id, title: bookTable.title, description: bookTable.description, authorId: bookTable.authorId });

        if (result.length === 0) {
            return res.status(404).json({ message: `Book with ID ${bookId} not found.` });
        }

        res.json({
            message: `Book with ID ${bookId} has been updated successfully.`,
            updatedBook: result[0]
        });
    } 
    catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error while updating book." });
    }
}