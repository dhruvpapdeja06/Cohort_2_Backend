const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    imgURL:{
        type: String,
        required: [true,"imgURL is required to create a post"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true,"user id is required to create post"]  
    },
    
})

const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;

// Token forgery --> Read or verify ,with the help of JWT, Token wrong means --> temper
// storage of one objId size in mongodb --12bytes