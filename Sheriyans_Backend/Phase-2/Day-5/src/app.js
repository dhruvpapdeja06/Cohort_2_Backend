// Server Create , config the server(middleware)

const express = require("express");

const app = express();  //Create a server

// middleware --> express.json
app.use(express.json());

// Notes 

const notes = [];


// Get API

app.get('/', (req,res)=>{
    res.send("This is Home Page");
    console.log("Home Page Logs");
})

// Get the Resource
app.get('/notes',(req,res)=>{
    res.send(notes);
})


// Resource Created
app.post('/notes',(req,res)=>{
    console.log(req.body);  //express server by defualt not understand the req.body data , we have to middleware
    notes.push(req.body);

    console.log(notes);
    res.send("Notes created");
})

// Update the resource 
// PATCH  /notes/:index
// req.body = {description : "Sample modified description."}
app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body.description;
    res.send("notes Updated Successfully");
})



// Delete Resource
// req.parms  (params) sent data using URL is called params -> how user pass the input

// When value is dynamic , user can enter any value that not exists also
// When single data want to sent then use params 
app.delete('/notes/:index',(req,res)=>{
    console.log(req.params.index);
    delete notes[req.params.index];

    // delete --> not actually delete basically replace with null in db also
    res.send("Notes deleted successfully");
})

// Problem in this code is that when we update on the server then data will be lost

// Work of garbage collector , Node Js run time env ma handle karta hai


module.exports = app;