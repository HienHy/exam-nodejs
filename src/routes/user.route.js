const MODULE = "USER"

const express = require("express");
const router = express.Router();
const controller = require("./../controllers/user.controllers");








router.get("/", controller.get);
router.get("/create", controller.create);
router.post("/create/add", controller.save);

module.exports = router;