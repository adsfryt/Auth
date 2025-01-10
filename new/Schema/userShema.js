import mongoose from "mongoose"


const User = new mongoose.Schema({
    email:{type:String, required:false},
    login:{type:String, unique:true, required:true},
    userId:{type:String, required:true},
    activate:{type:Boolean, required:true},
    state:{type:String, required:true},
    role:{type:Number, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    patronymic:{type:String, required:true},
    subjectsId:[{type: mongoose.Schema.Types.Mixed, required:true}],
    method:{type:String, required:true},
    refreshTokenService:{type:String, required:true},
    accessTokenService:{type:String, required:true},
    refreshToken:[{type: mongoose.Schema.Types.Mixed}] ,
    telegramId:{type:String, required:true},
    code:{type:String, required:true},
    blocked:{type:Boolean, required:true},
})



export default mongoose.model("User",User)