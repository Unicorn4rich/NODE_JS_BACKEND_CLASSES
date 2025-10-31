// connection string
const {drizzle} = require("drizzle-orm/node-postgres")



// postgres://postgres:admin@<host>:<port>/<db_name>
const db = drizzle("postgres://postgres:admin@localhost:5432/mydb")

module.exports = db