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

module.exports = authRouter;