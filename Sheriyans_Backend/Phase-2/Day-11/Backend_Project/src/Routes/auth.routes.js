const express = require("express")
const userModel = require('../models/user.model')
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
/**
 *  /post/api/register
 * 
 */


// The Problem in this API is that it's not optimized to validate the user 2 rqst sent to server {email,username}
authRouter.post('/register', async (req,res)=>{
    const {username, email, password} = req.body

    const isUserAlreadyExistEmail = await userModel.findOne({email})
    
    if(isUserAlreadyExistEmail){
        return res.status(409).json({
            message: "User Already Exists with this email address"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest("hex")

    const isUserAlreadyExistUserName = await userModel.findOne({username})

    if(isUserAlreadyExistUserName){
        return res.status(409).json({
            message: "Username already exists"
        })
    }

    const user = await userModel.create({
        username,
        email,
        password : hash
    })


    const token = jwt.sign(
        {
            id: user._id
        },process.env.JWT_SECRET
    ) 


    res.cookie("jwt_token",token)

    res.status(201).json({
        message: "User Register sucessfully",
        user,
        token
    })
})


/**
 *  /post/api/login
 */



module.exports = authRouter;