const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

// other than app.js if we create an API for that  we need an Router

// At react router intergration conflict to avoid if add prefix in backend

//  /api/auth/register

//Token pkt --> npm i jsonwebtoken,cookie-parser

// JWT_SECRET is unique for all application --> like insta , google

//key size is big then more secuity but more processing power required --> 256bytes

//Token creation --> user Data + JWT_SECRET

// cookies storage at client side --> Server has directy access of it.

// Generally same email --> 2 user create --> but in Real world that's not happen

/**
 * api/auth/register
 */
authRouter.post("/register", async (req,res)=>{
    const {name, email, mobile , password} = req.body

    // Check if one of them any  exist then not able to register
    const isUserAlreadyExist = await userModel.findOne({
      $or:[ 
        {email: email},
        {mobile: mobile}
      ]
    })

    if(isUserAlreadyExist){
        const conflictField = isUserAlreadyExist.email === email ? "Email" : "Mobile Number";
        return res.status(409).json({
            message : `User Already Register with the ${conflictField}`
        })
    }


    const user = await userModel.create({
        name, email, mobile, password
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message: "User Register successfully",
        user,
        token
    })

})

// dummy -api --> /protected
authRouter.post("/protected", (req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        "message" : "This is a protected route"
    })
})

//When same user already register and need new token for that again rqst to the server for login
// Details --> login, password --> different website login , lost the token, browser ma store then secuity issue.

//In token we dont' store sensitive information --> we don't store inside it.

//function ,fat arrow function ,callback function , only then execute when rqst came to website --> controlller.

//Database breach or leak --> meaning -->Data inside DB leak is present on Internet or someone else.It's is worst day of backend developer life then you have to terminate from your job.
// user login --> based on what --> email,password --hacker has email and password (store as has value)

//md5 hast generator

authRouter("/login", async (req,res)=>{
    const {email, password} = req.body

    const user = userModel.find({email})

    if(!user){
        res.status(404).json({
            message: "user doesn't exist with this email"
        })
    }

    const isPasswordMatched = user.password === password

    
    if(!isPasswordMatched){
        res.status(401).json({
            message: "password in invalid"
        })
    }

    const token = jwt.sign({
        id : user._id
    },
    process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message: "Login sucessfully",
        token
    })
})

module.exports = authRouter;