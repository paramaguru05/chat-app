require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")

const {app,server} = require("./lib/socket.io")
const connectDB = require("./lib/db")
// routers
const authRoutes = require("./routes/auth.route")
const messageRoutes = require("./routes/message.route")

const PORT = process.env.PORT || 5001

// Middlewares

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/message",messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  })
}

server.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`)
    connectDB()
})