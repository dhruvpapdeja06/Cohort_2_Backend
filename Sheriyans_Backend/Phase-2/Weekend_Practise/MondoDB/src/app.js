
// import a server module
const express = require("express")

// Create a Server
const app = express()

app.use(express.json())

const notes = []

// Creating an API for Notes App

// Get a resource
app.get('/notes',(req,res)=>{
    res.status(200).json({
        messaage: "Get a Resource Succesfully",
        data : notes
    })

    console.log("Get logs")
})

// Update Resource
app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body.description;

    res.status(200).json({
        message: "Resource Updated Successfully",
        data : notes
    })

    console.log("Patch logs")
})



// Create a Resource --> POST and sent there response with status code
app.post('/notes', (req,res)=>{
    console.log(req.body);
    notes.push(req.body);

    console.log("Post Logs")

    res.status(201).json({
        message : "Resource created successfully",
        data: notes
    })

})

// delete a resource 
app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message : "Resource Delete Successfully",
        data : notes
    })

    console.log("Delete logs")
})

module.exports = app;