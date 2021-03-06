const express = require("express");
const router = express.Router();
const objectController = require("../controllers/object");
const objectParam = require("../param/object");

router.get("/", objectParam.index, objectController.getColorAndDirection);

module.exports = router;
