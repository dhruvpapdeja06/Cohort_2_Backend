

const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res){
    // If not use edge collection then application become slow 
    // req.user comes from middleware
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    if(followeeUsername == followerUsername){
        return res.status(400).json({
            messaage: "You cannot follow yourself"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })

    // status code 200, 409
    if(isAlreadyFollowing){
        return res.status(409).json({
            message: `Your are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists ){
        return res.status(401).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee : followeeUsername

    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })




}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `Your are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing,_id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })


}


/**
 *  As a backend engg think client is pagal 
 * client can sent anything you have to verify --> validate all the thing --> otherwise you job gone.
 * 
 * Isliye --. mulitple layer validation
 *  Express validaor 
 * Frontend 
 * Schema 
 * Controller 
 * 
 * 
 * Like api same issue lik1 11.8m then approx --> 146mb --> 12bytes
 */


module.exports = {
    followUserController,
    unfollowUserController
}