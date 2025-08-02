const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        required:true,
        select:false
    },
    profilePic:{
        type:String,
        default:""
    },
    cloudinaryPuplicId:{
        type:String,
        default:""
    }

},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    try {
        this.password = await bcryptjs.hash(this.password,10)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.matchPassword = async function ( reqPass , dbPass ){
    let isPassMatch = await bcryptjs.compare(reqPass,dbPass)
    return isPassMatch
}

const User = mongoose.model("User",userSchema)

module.exports = User