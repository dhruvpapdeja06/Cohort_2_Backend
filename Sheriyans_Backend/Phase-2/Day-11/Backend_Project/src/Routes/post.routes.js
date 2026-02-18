const express = require('express')
const postRouter = express.Router()
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const postController = require("../controllers/post.controller")
const identifyUser = require("../middlewares/auth.middleware")




//  /api/posts --> make this api protected --. token user acess it

postRouter.post('/',upload.single("imageURL"),identifyUser,postController.createPostController)

/**
 *  Get /api/posts  [protected]  -->server share the all post to the user
 *  -> All post of that particular user return
 * 
 */

postRouter.get('/',identifyUser,postController.getPostController)

/**
 * GET /api/posts/details/:postid
 * -> Return an detail about specific post with the id . also check whether the post belong to the user that rqst come from.
 * -> Private account --> who created only get 
 */

postRouter.get('/details/:postId',identifyUser,postController.getPostDetailsController)



/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in teh request params
 * 
 */

postRouter.post("/like/:postId",identifyUser,postController.likePostController)


module.exports = postRouter;