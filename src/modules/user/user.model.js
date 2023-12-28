
const mongoose=require('mongoose');

const OTPSchema=new mongoose.Schema({
    code:{type:String,required:false,default:undefined},
    expiresIn:{type:Number,required:false,default:0}
})
const userSchema=new mongoose.Schema({
    fullName: {type: String, required: false},
    mobile: {type: String, unique: true, required: true},
    otp: {type: OTPSchema},
    verifiedMobile: {type: Boolean, default: false, required: true},
    accessToken: {type: String},
},{timestamps:true});


module.exports={
    UserModel:mongoose.model('user',userSchema)
}