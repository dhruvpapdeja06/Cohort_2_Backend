const jwt = require("jsonwebtoken")

//Identify function --> Identify which user has rqst it.

async function identifyUser(req,res,next){
    const token = req.cookies.token  //Identify the user based on id
    
        if(!token){
            return res.status(401).json({
                message: "Unauthorized token"
            })
        }
    
    
        let decoded = null
        try{
             decoded = jwt.verify(token,process.env.JWT_SECRET)  //TO verify the token if right then save it
        }catch(err){
            console.log("JWT ERROR:", err.name);
            console.log("JWT MESSAGE:", err.message);
            return res.status(401).json({
                messsge: "Token invalid"
            })
        }
        req.user = decoded
        console.log(decoded)
        
        next()
}

module.exports = identifyUser;