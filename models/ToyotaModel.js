const mongoose =require('mongoose')
const ToyotaSchema=new mongoose.Schema({
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
const Toyota=mongoose.model("Toyota",ToyotaSchema)
module.exports=Toyota