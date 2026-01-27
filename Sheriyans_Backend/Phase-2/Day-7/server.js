
// bufferworks

// start the server 
// Connect to the DataBase


const app = require('./src/app')

// connect to mongoDB
const mongoose = require('mongoose');

// compass contact to cluster --> URI Stirng

// server will connect to DB
function connectToDB(){
    // if not get db from that name then create it and connect , if already there then directly connect
    mongoose.connect("mongodb+srv://dhruv2017papdeja_db_user:nSKwktNtpudxkGHD@clustercohort2.qylhwmc.mongodb.net/day-7")
    .then(()=>{
        console.log("Connected to DataBase");
    })     

    // local server connect to DB server remotely by Internet we don't know time taken to connect it.    
}

connectToDB();

app.listen(3000,()=>{
    console.log("Server is running on Port : 3000");
})