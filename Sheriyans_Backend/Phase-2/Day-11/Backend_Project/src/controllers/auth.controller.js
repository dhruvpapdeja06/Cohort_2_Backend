
const userModel = require('../models/user.model')
// const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


//crypt pkg is used to low level code security

// If user enter email then username is undefined , vice-versa

async function registerController(req,res){
    const {username, email, password, bio, profileImg} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email : email
            }
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists " + (isUserAlreadyExists.email == email ? "with this Email" : "with this Username")

        })
    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex')
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password : hash,
        bio,
        profileImg
    })

    const token = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,{
            expiresIn: "1d"
        }
    )

    res.cookie("token",token)

    res.status(201).json({
        message : "User Created Successfully",
        user : {
            email : user.email,
            username: user.username,
            bio : user.bio,
            profileImg: user.profileImg
        }
    })

}


async function loginController(req,res){
    const { username, email, password}  = req.body;
    // console.log(email)

    const isUserValid = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email : email
            }
        ]
    })

    if(!isUserValid){
        return res.status(404).json({
            message : "User not found"
        })
    }

    /**  const hash = crypto.createHash('sha256').update(password).digest('hex') */

    const isPasswordValid = await bcrypt.compare(password, isUserValid.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message : "password invalid"
        })
    }

    const token = jwt.sign(
        {id : isUserValid._id},process.env.JWT_SECRET,{
            expiresIn: "1d"
        }
    )

    res.cookie("token",token)

    res.status(200).json({
        message : "user loggedIn successfully",
        isUserValid: {
            username : isUserValid.username,
            email : isUserValid.email,
            bio: isUserValid.bio,
            profileImg: isUserValid.profileImg
        }
    })


}

module.exports = {registerController, loginController};