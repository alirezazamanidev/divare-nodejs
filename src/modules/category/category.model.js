
const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    slug:{type:String,required:true,index:true},
    icon:{type:String,required:true},
    parent:{type:mongoose.Types.ObjectId,ref:"category",required:false},
    parents: {type: [mongoose.Types.ObjectId], required: false, default: []},
},{versionKey:0,id:0})


module.exports={
    CategoryModel:mongoose.model('category',CategorySchema)
}