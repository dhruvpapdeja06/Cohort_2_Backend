
// Define the DB schema

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : [true, "With this email user account already exists"]
    },
    mobile : {
        type: Number,
        unique : [true, "Mobile Number is already exist"]
    },
    passowrd : String
})


const userModel = mongoose.model("users",userSchema) //first collection name then schema

module.exports = userModel;