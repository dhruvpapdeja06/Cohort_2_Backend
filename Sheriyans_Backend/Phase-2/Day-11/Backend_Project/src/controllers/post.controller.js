const postModel = require('../models/post.model')
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imagekit = new ImageKit({
    privatekey : process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res){

    console.log(req.body, req.file);

    // Express don't handle or read the file for that we use multer middleware


    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided , Unauthorized acess"
        })
    }

    // If forgery in token
    //If status code is not right then at frontend engg face difficulty and all the bill come to you.
    let decoded = null;
    
    try{
         decoded = jwt.verify(token,process.env.JWT_SECRET)
         console.log(decoded)
    } catch (err){
        return res.status(401).json({
            message : "User not Authorized"
        })
    }

    // const decoded = jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decoded)


    // We don't store the high resolution img it require the bandwith and storage to display and store it.

    //Bandwidth --> when you become developer then you understand the cost cutting for image compressior

    // Try different website --> good resolution small size --> first webp --> then compress it. video also .
    //Best file format --> browser --> webp, avif , webm (avif not all the browser support it.)


        //Here imagekit not only store the file also give smaller verison of it like thumbnail , original file size and large
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: 'Test',
        folder: "Cohort-2-Insta"
    })
    res.send(file)

    const post = await postModel.create({
        caption: req.body.caption,
        imgURL: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created Successfully",
        post
    })

    
}

/**
 *  --User don't have token that means user don't register or not login
 *  -> post api/posts 
 *  User Rqst it by token . Server check token use there id to save it.
 */


async function getPostController(req,res){
    const token = req.cookies.token  //Identify the user based on id

    if(!token){
        return res.status(401).json({
            message: "Unauthorized token"
        })
    }


    let decoded = null
    try{
         decoded = jwt.verify(token,process.env.JWT_SECRET)  //TO verify the token if right then save it
    }catch(err){
        return res.status(401).json({
            messsge: "Token invalid"
        })
    }

    const userId = decoded.id


    // Return all the post , user rqst it based on the id --> which user create it store id 
    const posts = await postModel.find({
        user: userId
    })

    res.status(200)
    .json({
        message : "Posts fetched successfully",
        posts
    })
}


async function getPostDetailsController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized token"
        })
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    const userId = decoded.id

    const postId = req.params.postId

    const post = await postModel.findById(postId)

    //If post not get
    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }
    //convert into string
    const isValidUser = post.user.toString() === userId //here compare objectid but when you compare in js not compare as normal expression which has different method
    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }
    //If user and create post user match
    return res.status(200).json({
        "message" : "post fetched Successfully",
        post
    })
}



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
}