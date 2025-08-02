require("dotenv").config()
const User = require("../models/User")
const  jwt= require("jsonwebtoken")

exports.productRoute = async (req,res,next) =>{
    try {
        let token = req.cookies.jwt 
        if(!token) return res.status(401).json({status:"Fail",message:"Unauthorized access"});
        
        const {userId} = jwt.verify(token,process.env.JWT_SECRET)
        
        if(!userId) return res.status(401).json({status:"Fail",message:"Token not provided"});
       
        let user = await User.findOne({_id:userId})
        if(!user) return res.status(404).json({status:"Fail",message:"User not found"});
       
        req.user = user
        next()
    } catch (error) {
        console.log("Error in productRoute middleawre",error)
        res.status(500).json({status:"Error",message:"Internal server error"})
    }
}