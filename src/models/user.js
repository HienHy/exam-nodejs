const mongoose = require("mongoose")
const user = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        minLength: [6, "minLength 6"],
        maxLength: 100,

    },
    lastName: {
        type: String,
        require: true,
        minLength: [6, "minLength 6"],
        maxLength: 100,

    },
    mobileNumber:{
        type: String,
        require: true,
        minLength: [6, "minLength 6"],
        maxLength: 100,
        unique:[true,"existed"],

        validate: {
            validator: (value) => {
                const regExp = /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}/;
                return value.match(regExp);
            },
            message: (text) =>` ${text.value} không phải số điện thoại`
        }
    },
    userName:{
        type: String,
        require: true,
        minLength: [6, "minLength 6"],
        maxLength: 100,
        unique:[true,"existed"]
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
