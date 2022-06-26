var express = require("express");
var router = express.Router();
const user = require("../param/user.js");
const testController = require("../controllers/sample");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/join", user.join, (req, res) => {
    testController.getUserInfo(req, res);
});
module.exports = router;
