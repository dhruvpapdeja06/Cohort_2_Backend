const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description : String,
})

// To perform the model on DB (CRUD for that we need it modal)

// In DB we can store mulitple notes data.

// Collection --> same type of data , 
// Mulitple collection --> User,product

// Without model we can't perform a single operation

const noteModel = mongoose.model("notes",noteSchema)

module.exports = noteModel;