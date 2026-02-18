const postModel = require('../models/post.model')
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const likeModel = require("../models/like.model")


const imagekit = new ImageKit({
    privatekey : process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res){

    console.log(req.body, req.file);

    // Express don't handle or read the file for that we use multer middleware

    userId = req.user.id

    // If forgery in token
    //If status code is not right then at frontend engg face difficulty and all the bill come to you.
   
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
    
    userId = req.user.id
    // path == resource ko like img,video store
    // route --> task perform --> post creation
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


// WHy we use Middleware --> here for token code is repeat in all the api to get the userId.
// All rqst come by app --> further route it to base on the api hit.


// app --> route in   authRouter          postRouter
    // Post/api/posts   Get/api/posts  Get/api/posts/details/:postId

// createPostController  getPostCont      getPostDetailsController   --> do the same work in it(Identifying the user)

async function getPostDetailsController(req,res){
    const UserId = req.user.id

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


async function likePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post Not found"
        })
    }

    const like = await likeModel.create({
        post : postId,
        user: username
    })

    res.status(200).json({
        message: "Post like successfully",
        like
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}