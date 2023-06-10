const Category = require("../models/category");
exports.get= async (req, res) => {

    try {
        const rs = await Category.find({});
        res.render("category/list",
            {
                categories: rs
            })
    } catch (error) {
        res.send(error)
    }


}



exports.create = (req,res)=>{
    res.render("category/add.ejs");
};



exports.save = async (req,res)=>{
    const data = req.body;
    const product = new Category(data);
    try {
        await product.save();
        res.redirect("/categories/");
    } catch (error) {
        res.send(error);
    }

};



