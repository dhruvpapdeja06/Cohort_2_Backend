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


module.exports = {
    createPostController
}