

const followModel = require("../models/follow.model")


async function followUserController(req,res){
    // If not use edge collection then application become slow 
    // req.user comes from middleware
    const followerUsername = req.user.id
    const followeeUsername = req.params.username

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee : followeeUsername

    })

    res.status(201).json({
        message: `You are now following ${followee}`
    })




}



module.exports = {
    followUserController
}