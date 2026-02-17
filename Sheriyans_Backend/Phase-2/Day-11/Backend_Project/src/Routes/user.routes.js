const express = require("express")
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router()


/**
 *  JS comment String -->Readibility, description short and clear
 *  @route POST /api/users/follow/:username
 *  @description Follow a user
 *  @acess Private
 * 
 */

userRouter.post("/follow/:username",identifyUser,userController.followUserController)



module.exports = userRouter;