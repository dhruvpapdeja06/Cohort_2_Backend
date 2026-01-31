
const mongoose = require("mongoose")

function connectTODB(){
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connect to DB")
        })
}


module.exports = connectTODB;