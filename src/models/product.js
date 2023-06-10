const mongoose = require("mongoose")
const product = new mongoose.Schema({
    name:String,
    price:Number,
    qty:Number,
    brand:String,
    thumbnail: {
        data:String,
        contentType:String
    }
});


module.exports=mongoose.model("Product",product) //teen bang tu them s va viet thuong