const express = require('express')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const postController = require("../controllers/post.controller")




//  /api/posts --> make this api protected --. token user acess it

postRouter.post('/',upload.single("imageURL"),postController.createPostController)

/**
 *  Get /api/posts  [protected]  -->server share the all post to the user
 *  -> All post of that particular user return
 * 
 */

postRouter.get('/',postController.getPostController)

/**
 * GET /api/posts/details/:postid
 * -> Return an detail about specific post with the id . also check whether the post belong to the user that rqst come from.
 * -> Private account --> who created only get 
 */

postRouter.get('/details/:postId',postController.getPostDetailsController)


module.exports = postRouter;