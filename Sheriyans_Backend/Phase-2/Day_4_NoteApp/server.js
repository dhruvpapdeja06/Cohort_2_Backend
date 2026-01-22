
//  Client    ----> API (notes --> title , description)  -------> Server

// Jis method ki API then app.post/get/patch

// Why we are using Postman(Thunder Client) not Browser(Difficulty)


const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

// Get Resources
app.get('/notes',(req, res)=> {
    res.send(notes);
    console.log("Notes sent successfully");
})

// Create Resources
app.post("/notes", (req, res) =>{
    console.log(req.body); //undefined  , Express server not capable to read the body data so ,can read by middleware
    
    notes.push(req.body);
    res.send("Notes Created");
    console.log("Notes Stored successfully");

})


app.listen(3000,() => {
    console.log("Server is running on Port : 3000");
})

