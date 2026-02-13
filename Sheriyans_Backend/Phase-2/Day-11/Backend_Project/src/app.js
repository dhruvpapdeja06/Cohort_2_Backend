
//Create and config the server

const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./Routes/auth.routes")
const postRouter = require("./Routes/post.routes")

const app = express()


// middleware
app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));


app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)





module.exports = app;