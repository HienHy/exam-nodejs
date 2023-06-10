const express = require("express");
const router = express.Router();
const controller = require("./../controllers/brand.controllers");



// upload file
const multer = require("multer")
const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,"public/uploads/brands");

    },
    filename:function (req,file,cb) {
        cb(null,Date.now()+"-"+file.originalname)
    }
});
const upload = multer({storage:storage});




router.get("/",controller.get);
router.get("/create",controller.create);
router.post("/create",upload.single("icon"),controller.save);



module.exports = router;