const express = require("express");
const router = express.Router();
const objectController = require("../controllers/object");
const catController = require("../controllers/cat");
const objectParam = require("../param/object");

router.get("/", objectParam.index, objectController.getColorAndDirection);
router.get("/list", objectParam.list, objectController.getObjectIdList);
router.get("/cat", objectParam.cat, catController.getRandomCat);
router.put("/cat/head", objectParam.catHead, catController.setCatHead);
router.get("/cat/list", objectParam.cat, catController.getCatList);

module.exports = router;
