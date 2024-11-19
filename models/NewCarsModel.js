const mongoose =require('mongoose')
const NewCarsSchema=new mongoose.Schema({
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
    }
})
const NewCars=mongoose.model("NewCars",NewCarsSchema)
module.exports=NewCars