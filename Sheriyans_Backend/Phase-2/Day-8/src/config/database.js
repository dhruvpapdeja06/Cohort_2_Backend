
// connect to db --> URL connect to cluster then /db-name 

const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to DB");
    })
}

module.exports = connectToDb;