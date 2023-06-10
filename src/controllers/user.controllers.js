const User = require("../models/user");
const bcrypt = require("bcryptjs")


exports.get = async (req, res) => {

    try {
        const rs = await User.find({});
        res.render("user/list",
            {
                users: rs
            })
    } catch (error) {
        res.send(error)
    }


}


exports.create = (req, res) => {
    res.render("user/add.ejs");
};





exports.save = async (req, res) => {


    const salt = await bcrypt.genSalt(10)

    const hashPwd = await bcrypt.hash(req.body.password, salt);


    try {
        const user = new User({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            userName: req.body.userName,
            password: hashPwd
        })
        await user.save();
        res.redirect("/users/");
    } catch (error) {
        res.send(error);
    }

};








