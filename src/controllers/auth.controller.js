const User = require("./../models/user")
const bcrypt = require("bcryptjs")

const nodemailer = require("nodemailer")

const config_mail = {
    service: "Gmail",
    host: "smtp.gmail.com",
    post: 587,
    auth: {
        user: "hienndth2202041@fpt.edu.vn",
        pass: "avietauoauktwmyi"
    }
}


const transport = nodemailer.createTransport(config_mail);


exports.register = (req, res) => {
    const auth = req.session.auth
    if (auth) return res.send(`you are logged in with email ${auth.email}`)

    res.render("auth/register")
}

exports.create_user = async (req, res) => {

    try {
        let existUser = await User.findOne({email: req.body.email});

        if (existUser) return res.status(422).send("Email is exist")
        //hash password

        const salt = await bcrypt.genSalt(10)

        const hashPwd = await bcrypt.hash(req.body.password, salt);


        //save

        const user = new User({

            name: req.body.name,
            email: req.body.email,
            password: hashPwd
        })
        await user.save();
        req.session.auth = {


            name: user.name,
            email: user.email,
        }


        res.send("Done")


    } catch (e) {
        res.send(e);
    }

}


exports.login = (req, res) => {


    res.render("auth/login")
}


exports.loginUser = async (req, res) => {


    try {
        let existUser = await User.findOne({email: req.body.email});
        if (!existUser) return res.status(401).send("Email or password is not connect...!!")

        const verified = await bcrypt.compare(req.body.password, existUser.password);

        if (!verified) return res.status(401).send("Email or password is not connect...!!")

        //login successfully!!
        req.session.auth = {


            name: existUser.name,
            email: existUser.email,
            permissions:existUser.permissions
        }
        res.redirect("/");


    } catch (e) {
        res.send(e)
    }


}


exports.changePwdForm = async (req, res) => {


    res.render("auth/change-password")


}


exports.changePwd = async (req, res) => {
    const email = req.body.email;


    try {

        const userUpdate = await User.findOne({email:email});


        if (!userUpdate) return res.status(401).send("Email  not connect...!!")


        const verified = await bcrypt.compare(req.body.oldPassword, userUpdate.password);




        if (verified) {
            //hash password

            const salt = await bcrypt.genSalt(10)

            const hashPwd = await bcrypt.hash(req.body.newPassword, salt);

            userUpdate.setUpdate({ $set: { password: hashPwd  } })




        } else {
            return res.status(401).send("Email or password is not connect...!!")

        }


    } catch (e) {
        res.send(e)
    }


}


exports.logOut = (req, res) => {
    req.session.auth = null;
    req.redirect("/auth/login")
}


exports.forgotForm = async (req, res) => {


    res.render("auth/forgot")


}


exports.forgot = async (req, res) => {

    const email = req.body.email;

    try {
        const user = await User.findOne({email: email});
        if (!user) return res.redirect("/auth/forgot-password");

        //neu co email

        const randomStr = btoa(user.email);
        const linkReset ="http://localhost:3000/auth/reset-password?code="+randomStr;

        req.session.resetpassword = {
            user: user,
            code: randomStr
        };

        // send email
   await transport.sendMail({
            from: "T2204m",
            to: user.email,
            cc: "", // chuyen tiep

            subject: "Lay lai mat khau",
            html: `<p><a href= "${linkReset}">Click here </a>to reset password </p>`
        });


        res.send("check email!!!")


    } catch (err) {
        res.send(err)
    }


}


exports.resetForm = async (req, res) => {
//check code

    const code = req.query.code;

    const resetSession = req.session.resetpassword;

    if (code !== resetSession.code) return res.status(404).send("Error");


    res.render("auth/reset")


}


exports.reset = async (req, res) => {
const new_password = req.body.password;
const resetSession = req.session.resetpassword;

const user = resetSession.user;

    const salt = await bcrypt.genSalt(10)

    const hashPwd = await bcrypt.hash(new_password, salt);

    await User.findByIdAndUpdate(user._id,{
        password:hashPwd
    });

    req.session.resetpassword = null;
    res.send("done");


}

