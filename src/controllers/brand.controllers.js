const Brand = require("../models/brand")
const slug = require("slug")
const fs = require("fs");
exports.get= async (req, res) => {

    try {
        const rs = await Brand.find({});
        res.render("brand/list",
            {
                brands: rs
            })
    } catch (error) {
        res.send(error)
    }


}



exports.create = (req,res)=>{
    res.render("brand/add.ejs");
};



exports.save = async (req,res)=>{
    const data = req.body;
    const file = req.file;


    if (file) {

        const img = fs.readFileSync(file.path)

        const encode_file = img.toString("base64")
data.slug =slug(req.body.name)
        data.icon = {
            contentType: file.mimetype,
            data: img.toString("base64")
        }
    }



    const brand = new Brand(data);



    try {


        await brand.save();
        res.redirect("/brands/");
    } catch (error) {
        res.send(error);
    }

};



