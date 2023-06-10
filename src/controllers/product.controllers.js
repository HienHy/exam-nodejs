const Product = require("../models/product");

const fs = require("fs")
exports.get = async (req, res) => {

    try {
        const rs = await Product.find({});
        res.render("product/list",
            {
                products: rs
            })
    } catch (error) {
        res.send(error)
    }


}


exports.create = (req, res) => {
    res.render("product/add.ejs");
};





exports.save = async (req, res) => {
    const data = req.body;
    const file = req.file;
    if (file){

        const img = fs.readFileSync(file.path)

        const encode_file =img.toString("base64")

        data.thumbnail ={
            contentType:file.mimetype,
            data:img.toString("base64")
        }




        // data.thumbnail="/uploads/products/"+file.filename;
    }
    const product = new Product(data);
    try {
        await product.save();
        res.redirect("/products/");
    } catch (error) {
        res.send(error);
    }

};



exports.editForm = async (req, res) => {
    res.render("product/edit.ejs")
}

exports.edit = async (req, res) => {

}





