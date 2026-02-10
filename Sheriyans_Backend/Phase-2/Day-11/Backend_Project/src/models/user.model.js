const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: [true, "User name is required"],
        unique: [true,"User name already exists"]
    },
    email:{
        type: String,
        require: [true,"Email is required"],
        unique: [true,"Email already exists"]
    },
    password:{
        type: String,
        require: [true,"Password is required"] 
    },
    bio: String,
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/rp1icl2zh/Insta_IMG/User_Img.png"
    }
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;