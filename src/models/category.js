const mongoose = require("mongoose")
const category = new mongoose.Schema({
    name:String,
    slug:String,
    status:Boolean,
});


module.exports=mongoose.model("Category",category) //teen bang tu them s va viet thuong