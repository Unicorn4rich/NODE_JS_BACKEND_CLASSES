const { eq, sql } = require('drizzle-orm');
const db = require('../db/connection')
const bookTable = require('../models/book.model');
const authorTable = require('../models/author.model');


//-------------------------------------------------------------------// Book API route
// Get All Books

exports.getAllBooks = async (req, res)=>{
    try{
    const {search, bookId, authorId} = req.query

    let query = db.select().from(bookTable)

    if(search){
    // search by title
      query = query.where(sql`to_tsvector('english', ${bookTable.title}) @@ plainto_tsquery('english', ${search})`);
    }
    if(bookId){
    // search by bookId
      query = query.where(eq(bookTable.id, bookId))
    }
    if(authorId){
    // search by authorId
      query = await query.where(eq(bookTable.authorId, authorId))
    }
 
    // Get all books from DB
    const result = await query

    // 
    return res.status(200).json({message: "Book fetched successfully", result: result })

    }
    catch(error){
        console.error("Error fetching books:", error); 
        return res.status(500).json({message: "Error fetching books"})

    }
}


//-------------------------------------------------------------------
// Create New Book

exports.createBook = async (req, res)=>{
try{
    // console.log("😂", req.body);
    const {title, description, authorId} = req.body

    // Validatation
    // if(!title || !description || !authorId){    // ---> ye validation ab kisi kam ki nahi zod manage karega sab.
    //     return res.status(400).json({message: "title, description, and authorId is missing"})
    // }

    // Check if authorId exists in authorTable
    const authorExisits = await db.select().from(authorTable).where(eq(authorTable.id, authorId)).limit(1)

    if(authorExisits.length === 0){
        return res.status(404).json({message: "Author not found"})
    }


    const result = await db.insert(bookTable).values({
        title: title,
        description: description,
        authorId: authorId
    })
    .returning() // All data resturn

    return res.status(201).json({message: "Book created successfully", result: result })
}
catch(error){
    console.error("Error creating books:", error); 
    return res.status(500).json({message: "Error creating books"})    
}

}


//-------------------------------------------------------------------
// Update Book By ID

exports.updateBookById = async (req, res) => {
    try {

        const bookId = req.params.id;
        const { title, description, authorId } = req.body;

        // Optional: Validate that at least one field is provided
       if (!title && !description && authorId === undefined) {
          return res.status(400).json({
            message: "No fields provided to update. Please provide at least one of: title, description, authorId."
          });
        }

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
            .returning(); // Return the updated record(all data)

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
        res.status(500).json({ message: "Error updating book:" });
    }
}

//-------------------------------------------------------------------
// Delete Book By ID

exports.deleteBookById = async (req, res)=>{
try{
     const deleteId = req.params.id

     const result = await db.delete(bookTable).where(eq(bookTable.id, deleteId)).returning()

     if(result.length == 0){
        return res.status(404).json({message: "Book not found"})
     }

     return res.status(200).json({message: `Book with ID ${deleteId} has been deleted.`})
}catch(error){
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book:" })    
}

}


