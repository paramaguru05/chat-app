const http = require("http")
const {Server} = require("socket.io")
const express = require('express')

const app = express()

const server = new http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        credentials:true
    }
})

const userSocketMap = new Map()

const getSocketId = (reciverId) =>{
    return userSocketMap.get(reciverId)
}

io.on("connection",(socket)=>{
    console.log(`User conncected ${socket.id}`)
    const userId = socket.handshake.query.userId
    userSocketMap.set(userId,socket.id)
    io.emit("getOnlineUsers",[...userSocketMap.keys()])
    socket.on("disconnect",()=>{
        userSocketMap.delete(userId)
        io.emit("getOnlineUsers",[...userSocketMap.keys()]) 
        console.log(`User disconnect ${socket.id}`) 
        
    })
})

module.exports = { app , server , io , getSocketId }