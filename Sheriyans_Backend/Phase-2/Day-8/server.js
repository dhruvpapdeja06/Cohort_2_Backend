

//without this line whatever variable you have to create it will give you undefined.
require("dotenv").config()

// Connect to DB Server
const connectToDB = require('./src/config/database')

// Start the server 
const app = require('./src/app')




connectToDB();



app.listen(3000,()=>{
    console.log("Server is running on Port : 3000");
})