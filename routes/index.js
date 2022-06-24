const express = require("express");
const testController = require("../controllers/sample");
const testParam = require("../param/testParam");
const router = express.Router();

router.post("/", testParam.sample, (req, res) => {
    testController.getTestObject(req, res);
});

module.exports = router;
