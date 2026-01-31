
const mongoose = require("mongoose")


const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

// Collection --> Same type of multiple data store (with same format)

const noteModel = mongoose.model("notes",noteSchema) // which collection they store --> notes


module.exports = noteModel;