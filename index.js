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
//     const Product = require("./src/models/product");
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
// const productRouter = require("./src/routes/product.route")
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
    secret:"t2204m",
        cookie:{

        maxAge:3600000 , // miliseconds

            // secure : process.env.COOKIE_SECURE
        }
}))


app.get("/",function(req,res){
    const Product = require("./src/models/product");
    Product.find({})
        .then(rs=>{
            res.render("home",{
                products: rs
            })
        })
        .catch(err=>{
            res.send(err);
        })

})

// CRUD products
const productRoutes = require("./src/routes/product.route");
app.use("/products",productRoutes);

const categoryRoutes = require("./src/routes/category.route");
app.use("/categories",categoryRoutes);


const brandRoutes = require("./src/routes/brand.route");
app.use("/brands",brandRoutes);



const authRoutes = require("./src/routes/auth.route");
app.use("/auth",authRoutes);

