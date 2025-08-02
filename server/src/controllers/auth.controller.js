const User = require("../models/User")
const jwt = require("jsonwebtoken")
const cloudinary = require("../lib/cloudinary")
const EventEmitter = require("events")
const fs = require("fs")
const {isEmail} = require("validator")

const myEventEmiter = new EventEmitter() 


exports.signup = async (req,res) =>{
    try {
        const {email,password} = req.body 

        if( !email || !password ) return res.status(400).json({status:"Fail",message:"All fields are required"})

        if( !isEmail(email) ) return res.status(400).json({status:"Fail",message:"Provid valid email"})
        
        if( password.length < 6 ) return res.status(400).json({status:"Fail",message:"The password must be 6 charactors"})

        let userExists = await User.findOne({email})

        if( userExists ) return res.status(400).json({status:"Fail",message:"This email already exists. Please use diffrent one"})

       let newUser =  await User.create(req.body)

       let token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})

       res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV==="production"
       })
        delete newUser.password
        res.status(201).json({status:"Success",user:newUser })
        
    } catch (error) {
        res.status(500).json({
            status:"Error",
            message:error.message,
            
        })
    }
}

exports.login = async (req,res) =>{
    try {
        const {email,password} = req.body
        if(!email || !password) return res.status(400).json({status:"Fail",message:"All fields are required"});
        
        let user = await User.findOne({email:email}).select("+password")
      
        if(!user) return res.status(400).json({status:"Fail",message:"incorrect email or+password"});
        
        let isPasswordMatch = await user.matchPassword(password,user.password)
       
        if(!isPasswordMatch) return res.status(400).json({status:"Fail",message:"incorrect email or password"});

        let token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.cookie("jwt",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production"
        })

        res.status(200).json({
            status:"Success",
            user:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt
            }
        })

    } catch (error) {
        res.status(500).json({status:"Error",message:"Internal server error"})
    }
}

exports.logout = async (req,res) =>{
    try {
        res.clearCookie("jwt")
        res.status(200).json({status:"Success",message:"Logout succssfully"})
    } catch (error) {
        res.status(500).json({status:"Error",message:"Internal server error"})
    }
}

exports.updateProfile = async (req,res) =>{
    try {
        
        const profilePic = req.file.path

        if(!profilePic) return res.status(400).json({status:"Fail",message:"profile picture is required"});

        const {_id,cloudinaryPuplicId} = req.user
        
        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        myEventEmiter.emit('removeImage',cloudinaryPuplicId)

        let updatedUser = await User.findByIdAndUpdate({_id},{profilePic:uploadResponse.secure_url,cloudinaryPuplicId:uploadResponse.public_id},{new:true})

        fs.unlink(profilePic,(err)=>{
            if(err) return res.status(500).json({status:"Fail",message:"Somthing went wrong updata profile pic."});
        })

        res.status(200).json({status:"success",user:updatedUser})

    } catch (error) {
        res.status(500).json({status:"Error",message:error.message})
    }
}

exports.authCheck = async (req, res ) =>{
    try {
        let userId = req?.user?._id

        if(!userId) return res.status(401).json({status:"Fail",message:"Unauthorized - token nto provided"});

        let user = await User.findOne({_id:userId})

        if(!user) return res.status(404).json({status:"Fail",message:"User not found"});

        res.status(200).json({status:"success",user})
    } catch (error) {
        res.status(500).json({status:"Error",message:"Internal server error"})
    }
}

myEventEmiter.on("removeImage",(publicId)=>{

    if(!publicId) return;

    cloudinary.uploader.destroy(publicId, function(error, result) {
        if (error) {
            console.error('Error deleting image auth controller:', error);
        } 
        });
})