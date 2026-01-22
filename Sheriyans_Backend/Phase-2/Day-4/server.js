
// API --> It is set of rules and protocol that enables different software programs to communicate and exchage data with each other.

// Ex - Insta Application download on mob , the sever of Instagram or Fb Server communication.

// Rest API --> Main two rules  follow for communication  

// HTTP and HTTPS 

// Method --> What action you want to perform on resource.

// Idempodent --> Every rqst result will be same

// GET --> Retrieve data without change on resource.

// Post --> Add user , Registration

// PUT --> Resource update,(Email,Phone,Name) 
 
// PATCH --> minor part update (Partially Update)


// Resource --> means create post,Account creation, commment, video upload

const express = require("express");


const app = express();


app.get('/',(req,res)=>{
    console.log("Home Logs stored here");
    res.send("This is home Page");
})

app.get('/about',(req,res)=>{
    console.log("About Page Logs");
    res.send("About Page")
})

//This callback call ,When Server start and ready to listen the rqst of the user.
app.listen(3000,()=>{
    console.log("Server is running on port : 3000");
});