
//Create and config the server

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()


// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
// app.use(express.urlencoded({ extended: true }));


/** require routes */
const authRouter = require("./Routes/auth.routes")
const postRouter = require("./Routes/post.routes")
const userRouter = require("./Routes/user.routes")

// using routes 
app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)
app.use('/api/users/',userRouter)





module.exports = app;