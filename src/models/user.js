const mongoose = require("mongoose")
const user = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        minLength: [6, "minLength 6"],
        maxLength: 100,

    },
    email: {
        type: String,
        require: true,
        minLength: [6, "minLength 6"],
        maxLength: 100,
        unique: true,
        validate: {
            validator: (v) => {
                const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                return v.match(emailRegex);
            },
            message: (e) => `${e.value} not email`
        }
    },
    password:{
        type:String,
        require: true,
        minLength: [6, "minLength 6"],
        maxLength: 255,

    },
    permissions:Array


})

module.exports=mongoose.model("User",user) //teen bang tu them s va viet thuong
