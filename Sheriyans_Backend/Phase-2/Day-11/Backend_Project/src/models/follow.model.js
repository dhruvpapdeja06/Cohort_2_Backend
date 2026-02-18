const mongoose = require("mongoose")


/**
 *  Edge collection --> Realtion between two users (followers and followee)
 * 
 */
const followSchema = new mongoose.Schema({
    follower:{
        type: String
    },
    followee:{
        type: String
    },
    status:{
        type: String,
        default: "pending",
        enum : {
            value: ["pending","accepted","rejected"],
            message: "status can only be pending, accepted or rejected"
        }
    }
    },{
        timestamps: true
    }
)

followSchema.index({ follower: 1, followee: 1}, {unique : true})

const followModel = mongoose.model('follows',followSchema)

module.exports = followModel;


/**
 * Three layer on backend 
 * schema validator
 * 
 * 
 */

// 12 byte to store the id of mongodb user. --store the likes 

//Today task --> follow schema , create a simple property status --> type string 