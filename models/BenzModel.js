const mongoose =require('mongoose')
const BenzSchema=new mongoose.Schema({
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
const Benz=mongoose.model("Benz",BenzSchema)
module.exports=Benz