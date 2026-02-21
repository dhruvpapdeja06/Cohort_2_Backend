const express = require("express")
const authRouter = express.Router()
const authController = require('../controllers/auth.controller')
const identifyUser = require('../middlewares/auth.middleware')

/**
 *  /post/api/register
 * 
 */

authRouter.post('/register',authController.registerController)


// The Problem in this API is that it's not optimized to validate the user 2 rqst sent to server {email,username}
/** 
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

*/

/**
 *  /post/api/login
 */

authRouter.post('/login',authController.loginController)

module.exports = authRouter;


/**
 * @route GET/api/auth/get-me
 * @desc Get the currently login user' info
 * @access Private
 */
authRouter.get('/get-me',identifyUser,authController.getMeController)

//Sever bandwidth pricing --> If size of image is 20kb then 200mb 
// -Sever bandwidth pricing is high as compared to cloud stroage provider. --> pricing is low in cloud provider

//aws(s3),imagekit, cloudary,

//server --> rqst to imagekit , and give the url

//multer --> use case --> give the power to express that read the file from the frontend. --> memoryStorage --> Temporary store the file. 