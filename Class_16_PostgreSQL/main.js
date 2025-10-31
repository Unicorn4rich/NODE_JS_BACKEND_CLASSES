const db = require('./db')
const {userTable} = require('./drizzle/schema')



async function getAllUsers(){
    const user =  await db.select().from(userTable)
    console.log("🤑", user)
} 


// Insert a new user
async function createUser(){
    await db.insert(userTable).values({  // data create
        id: 3,
        name: "awais",
        email: "awais@gmail.com"
    })

    getAllUsers(); // data get
}

createUser() // function run