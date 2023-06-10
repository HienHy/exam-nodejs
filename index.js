// const express = require("express");
// const path = require("path");
// const database = require("./src/database")
//
//
// const app = express();
//
//
// const PORT = process.env.PORT || 3000;
//
// app.listen(PORT, () => {
//
//         console.log("server is running ...")
//     }
// )
//
// app.use(
//     express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
// );
//
//
//
//
// // connect
//
//
// app.set("view engine", "ejs");
// app.use(express.static("public"));
//
// app.use(express.json);
// app.use(express.urlencoded({extended:true}));
//
//
//
//
// app.get("/", (req, res) => {
//
//
//     const Product = require("./src/models/user");
//
//     Product.find({})
//         .then(rs => {
//             res.render("home",
//                 {
//                     products: rs
//                 }
//             )
//         })
//         .catch(err => {
//             res.send(err)
//         })
//
//
//     // res.render("home")
// })
//
//
//
// const productRouter = require("./src/routes/user.route")
//
// app.use("/products",productRouter)
//
//
//
//
//
//
//
//

require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./src/database");
const PORT = process.env.PORT;


app.listen(PORT,()=>{
    console.log("server is running...");
})


app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//session
const session =require("express-session")
app.use(
    session({
    resave:true,
    saveUninitialized:true,
    secret:"exam_nodejs",
        cookie:{

        maxAge:3600000 , // miliseconds

            // secure : process.env.COOKIE_SECURE
        }
}))


app.get("/",function(req,res){
    const User = require("./src/models/user");
    User.find({})
        .then(rs=>{
            res.render("home",{
                users: rs
            })
        })
        .catch(err=>{
            res.send(err);
        })

})

// CRUD products
const userRoutes = require("./src/routes/user.route");
app.use("/users",userRoutes);





