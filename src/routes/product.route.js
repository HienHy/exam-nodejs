const MODULE = "PRODUCT"

const express = require("express");
const router = express.Router();
const controller = require("./../controllers/product.controllers");


const middleware = require("./../middlewares/auth.middleware")

//neu muon toan bo router deu bi loc qua middleware
router.use(middleware.logged)

router.use((req, res, next) => {
    const auth = req.session.auth;

    if (auth.permissions.includes(MODULE)) {
        return next();
    }
    res.status(404).send("ERROR")
})


// upload file
const multer = require("multer")
const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,"public/uploads/products");

    },
    filename:function (req,file,cb) {
        cb(null,Date.now()+"-"+file.originalname)
    }
});
const upload = multer({storage:storage});



router.get("/", controller.get);
router.get("/create", controller.create);
router.get("/edit", controller.editForm);
router.get("/edit", controller.edit);
router.post("/create",upload.single("thumbnail"), controller.save);

module.exports = router;