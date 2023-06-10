const mongoose = require("mongoose")
const brand = new mongoose.Schema({
    name:String,
    slug:String,
    icon:{
        data:String,
        contentType:String
    },
});


module.exports=mongoose.model("Brand",brand) //teen bang tu them s va viet thuong