const mongoose =require('mongoose')
const BMWSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    }
})
const BMW=mongoose.model("BMW",BMWSchema)
module.exports=BMW