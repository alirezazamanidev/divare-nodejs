const mongoose=require('mongoose');


const optionSchema=new mongoose.Schema({
    title:{type:String,required:true},
    key:{type:String,required:true},
    type:{type:String,enum:['number','string','array','boolean'],default:[]},
    enum:{type:Array,default:[]},
    guid:{type:String,required:false},
    required:{type:Boolean,required:true,default:false},
    category:{type:mongoose.Types.ObjectId,ref:'category',required:true}
});
module.exports={
    OptionModel:mongoose.model('option',optionSchema)
}