
// Start the server and connect the DB

require("dotenv").config()

const connectTODB = require("./src/config/database")

const app = require("./src/app")

connectTODB();

app.listen(3000,()=>{
    console.log("Server is running on Port : 3000")
})