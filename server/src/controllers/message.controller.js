const fs = require("fs")

const {io,getSocketId} = require("../lib/socket.io")
const User = require("../models/User")
const Message = require("../models/Message")
const cloudinary = require("../lib/cloudinary")

exports.getUsers = async (req, res ) =>{
    try {
        let userId = req.user._id

        let users = await User.find({
            _id:{
                $ne:userId
            }
        })

        res.status(200).json({
            status:"Success",
            users
        })

    } catch (error) {
        console.log("Error message controller",error)
        res.status(500).json({status:"Error",message:"Internal server error"})
    }
}

exports.getMessages = async (req, res ) =>{
    try {
        const firentId = req.params.id 
        const myId = req.user._id 
        const messages = await Message.find({
            $or:[
                { senderId: firentId , reciverId : myId },
                { senderId:myId , reciverId:firentId }
            ]
        })
        res.status(200).json({status:"Success",messages})
    } catch (error) {
        console.log("Error in get message controller",error)
        res.status(500).json({status:"Error",message:"Internal server error"})
    }
}

exports.sendMessage = async (req, res) =>{
    try {
        const {text,tempImage} = req.body 
        
        const reciverId = req.params.id 
        const senderId = req.user._id

        if(!reciverId) return res.status(400).json({status:"Fail",message:"Reciver id is required"})
       
        if(!text && !req.file.path) return res.status(400).json({status:"Fail",message:"Can't store empty message"});   

        let reciverIsOnline = getSocketId(reciverId)


        let imageUrl;

        if(req.file?.path){
        let uploadResponse = await cloudinary.uploader.upload(req.file.path)
            imageUrl = uploadResponse.secure_url
            fs.unlink(req.file.path,(err)=> {
                if(err) console.log("error in delete file from send message controller",err)
            } )  
        }
        const newMessage = new Message({
                senderId:senderId,
                reciverId:reciverId,
                text,
                image: imageUrl,
                tempImage:""
        })

        await newMessage.save()
            
        if(reciverIsOnline){
            io.to(reciverIsOnline).emit("newMessage", newMessage)
        }
        res.status(201).json({status:"success",newMessage})
    } catch (error) {
        res.status(500).json({status:"Error",message:"Internal server error"})
    }
}