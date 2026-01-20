
// Program server to response to Users

const express = require("express");

const app = express(); // Server instance create 

// Server --> Programmed liked that when user rqst it then server response welcome to Express Server



// node server.js run before write this code , In older server that code is not there then you want this code run again hit cmd

// Home Page
app.get('/',(req,res) =>{
    console.log("Express server log")
    res.send("Welcome to Express server");
})

// fat arrow function or classic function you can use

// About Page
app.get('/about',(req,res) =>{
    console.log("About Page logs");
    res.send("This is about Page");
})

// Contact us
app.get('/contact',(req,res) =>{
    console.log("Contact us log");
    res.send("This is Contact US Page");
})


// In one building --> 2 Person
// Chairman = 110
// Director = 111


// npx nodemon server.js
app.listen(3000); //server start