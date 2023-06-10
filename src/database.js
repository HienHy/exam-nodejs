const server= process.env.DB_HOST;
const db_name = process.env.DB_NAME;
const mongoose = require("mongoose");




const database =()=>
{

    mongoose.connect(`${server}/${db_name}`)
        .then(()=>{
            console.log("Connect successfully")
        })
        .catch(err =>{
            console.log(err)
        })
}

module.exports = database();