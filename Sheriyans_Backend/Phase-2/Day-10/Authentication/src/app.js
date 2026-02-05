
// Create and config the server

const express = require("express")
const authRouter = require("./routes/auth.routes")

const app = express()

// middleware
app.use(express.json())



module.exports = app;