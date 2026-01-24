
// Server Create , config

const express = require("express");

// Create an server
const app = express(); 

// config server
app.use(express.json());

// Create an Note App 

const notes = [];

// Get Rqst from user to send data
app.get('/notes', (req,res)=>{
    res.status(200).json(notes);

    console.log("Get logs");
    // res.send(notes);
    // Response always sent with staus code in Json format
    
})


// Use Status code --> To indicate the outcome of client request.

// Create Notes on sever , with post request data come via body
app.post('/notes',(req,res)=>{
    console.log(req.body);

    notes.push(req.body);
    console.log("Patch Logs")
    
    res.status(201).json({
        message: "Notes created Successfully" , 
        data : req.body
    });

    // res.send("Notes Created Successfully");
})


// Delete Notes --> delete the resource (Not Working)
app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index];
    console.log(notes);
    
    console.log("Delete Logs");
    
    // Postman don't show the data --> 204 Only header part sent as response
    res.status(204).json({
        message : "Note deleted Successfully",
        data : notes
    })
})

// Update the note --> PATCH , modification of field (Using Params for small data)

// API not working
app.patch('/notes/:index', (req,res)=>{
    notes[req.params.index].description = req.body.description;

    console.log("Patch Logs");
    // res.send("notes Updated");
    res.status(200).json({
        message : "Notes Updated Successfully"
    })
})


// When we restart the server then data lost because the variable we have created that get the space from 
// RAM and when we start the server then OS allocate the space in memory and we don't know the same place 
// memory allocated or different area that's why every restart data lost ,reccommend to use DB

// delete --> replace with null

// Restart the server (rs)CMD

// Notes --> At Server Start Time notes variable is nothing.

// When user sent notes then it will update on the server and push on notes variable.

// Setup account on MongoDB Atlas , and MongoDB compass Download 

// DB --> Spoitify we have to two type of user 
// Normal user --> Create Playlist
// Artist --> New Songs create

// connect the mongodb application, not with sever.

// connect mongoDB compass to mongoDB Atlas --> mongodb+srv://dhruv2017papdeja_db_user:G8IMC1W1vP7mFU17@cluster0.njlxxmb.mongodb.net/

module.exports = app;