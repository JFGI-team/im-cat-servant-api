var express = require("express");
var router = express.Router();
const user = require("../param/user.js");
const userController = require("../controllers/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/join", user.join, (req, res) => {
    userController.insertUser(req, res);
});

router.post("/login", user.login, (req, res) => {
    userController.verify(req, res);
});
module.exports = router;
