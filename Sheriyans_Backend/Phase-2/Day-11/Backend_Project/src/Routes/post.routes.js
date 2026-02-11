const express = require('express')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const postController = require("../controllers/post.controller")




//  /api/posts --> make this api protected --. token user acess it

postRouter.post('/',upload.single("imageURL"),postController.createPostController)


module.exports = postRouter;