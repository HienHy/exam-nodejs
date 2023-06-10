const express = require("express")

const router = express.Router();


const controller = require("./../controllers/auth.controller")



const  middleware =require("./../middlewares/auth.middleware")


//neu muon toan bo route deu luc qua middleware


//neu muon dat middleware cho tung route

router.use("/register",middleware.guest);
router.use("/forgot-password",middleware.guest);
router.use("/reset-password",middleware.guest);



router.use("/logOut",middleware.logged);





router.get ("/register",controller.register)
router.post ("/register",controller.create_user)


router.use("/login",middleware.guest);


router.get ("/login",controller.login)
router.post ("/login",controller.loginUser)

router.post ("/logOut",controller.logOut)
router.get ("/change-password",controller.changePwdForm)
router.post ("/change-password",controller.changePwd)



router.get ("/forgot-password",controller.forgotForm)
router.post ("/forgot-password",controller.forgot)


router.get ("/reset-password",controller.resetForm)
router.post ("/reset-password",controller.reset)


module.exports =router;