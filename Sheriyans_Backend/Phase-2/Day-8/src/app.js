
// Create and config the server

const express = require("express");
const noteModel = require('./models/notes.model')

const app = express();

// middleware
app.use(express.json());


// post
app.post('/notes',async (req,res)=>{
    const { title , description } = req.body

    const noe = await noteModel.create({
        title, descripiton
    })

    res.status(202).json({
        message : "Note Created Successfully",
        note
    })

})

// get API ==> Fetch all the data from the DB 
app.get('/notes',async (req,res)=>{
    const notes = await noteModel.find()

    //find --> return data array of objects
    res.status(200).json({
        message: "Notes fetched Successfully",
        notes
    })
})


module.exports = app;