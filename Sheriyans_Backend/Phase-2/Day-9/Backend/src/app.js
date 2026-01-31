// Cors policy --> browser netbanking login , transfer the money 
// suppose by chance hacker come to there website like banking and behind it run a script and all the money transfer to hancker account.
// Cors policy implement on browser --> Ek website par rahta hi not allowed to rqst to other website. (Cross origin request)

// backend run localhost:3000 , browser understand different website frontend :5173

// How to bypass it --> how to config server allowed to access request from other webiste as traffic allow.(only for development)

// Create and config the server

const express = require("express")
const cors = require("cors")

const noteModel = require("./models/notes.model")


const app = express();

app.use(cors())

// middleware
app.use(express.json())

// Create an api to store the data in DB before that we have design the schema (data format)


// post /api/notes
app.post("/api/notes", async (req,res)=>{
    const { title, description } = req.body
    
    // new note create which data pass as obj --> data store in mumbai cluster and get the ack based on the internet
    const note = await noteModel.create({
        title,
        description
    })

    // Resource Created and sent the status code
    res.status(201).json({
        message : "Notes created Successfully",
        note
    })
})

//get -- >find --> array of obj
app.get("/api/notes", async (req,res)=>{
    const note = await noteModel.find();

    res.status(200).json({
        message: "fetch data successfully",
        note
    })
})

// delete
app.delete('/api/notes/:id', async (req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    // console.log(id)
    res.status(200).json({
        message: "Notes delete sucessfully"
    })
})


//patch  --> /api/notes/:id
// req.body = { description }
app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    const note = await noteModel.findByIdAndUpdate(id,{ description })

    res.status(200).json({
        message : "Notes Updated successfully",
        note
    })
})

module.exports = app;