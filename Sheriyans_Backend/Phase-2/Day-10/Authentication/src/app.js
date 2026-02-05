
// Create and config the server

const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express()

// middleware
app.use(express.json())

//cookie
app.use(cookieParser()) 

//authRouter with prefix
app.use('/api/auth',authRouter)


module.exports = app;