const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: [true, "User name is required"],
        unique: [true,"User name already exists"]
    },
    email:{
        type: String,
        require: [true,"Email is required"],
        unique: [true,"Email already exists"]
    },
    password:{
        type: String,
        require: [true,"Password is required"] 
    },
    bio: String,
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/rp1icl2zh/Insta_IMG/User_Img.png"
    }
})



const userModel = mongoose.model('users',userSchema)

module.exports = userModel;


/**
 * followers --> store as id of user 
 * 
 * id --> 12 bytes 
 * 
 * --> 274 million --> 3.2 gb to store it. --> searching --> only single user.
 * --> max doc size of mongodb --> 16mb --> scale --> not able to store it  --> solution --> edge collection
 * 
 * 
 * --> In mongoDb we have different type of collection 
 * --> users                            Follow
 *                                      (Edge Collection)
 *  User A                               Follow A, FollowB  {  
 *                                                              _id
 *                                                              follower: user-B
 *                                                               followee: User-A
 *                                                                  createdAt: Date}                             {
 *                                                                                                  _id
 *                                                                                                  follower : C
 *                                                                                                   following: D 
 *                                                                                                    createAt: DAte}  --> lots of documents is not the issue.
 *                                                            
 *  User B  
 *  User C
 *  USer D
 * 
 * 
 * Ek user data is doucment --> store in collection(set of documents)
 * 
 * --> 2 documents ka beech relation is called edge collection.
 * 
 * --> Designing Intesive  Data Apllication --> Storage in not the issue , read and write operation costly , throughpout (operation per sec)
 */