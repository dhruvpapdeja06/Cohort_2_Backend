
const express = require("express");
const http = require('http');
const Server = require('socket.io');
const path = require('path');


const app = express();

const server = http.createServer(app);

// socket server create
const io = Server(server);

// Connection establish
io.on('connection',(socket)=>{
    
    // it event-based so event is 'message' | simplify with key-value pair
    // here broadcast the msg
    socket.on('message',(data)=>{
        console.log('msg-received', data);
        io.emit("new-message",data);
    })

    


    server.on('disconnect',()=>{
        console.log("Disconnect from the server");
    })
})

// index.html file is serverd by backend
// In different tab different tab consider then id change


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

// http server run
server.listen(3000,()=>{
    console.log("Server is running on Port : 3000");
})



// index.html file is server by server