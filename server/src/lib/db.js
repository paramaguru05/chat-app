const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected :")
    } catch (error) {
        console.log("Error in connectiong MongoDB",error)
        process.exit(1)
    }
}

module.exports = connectDB