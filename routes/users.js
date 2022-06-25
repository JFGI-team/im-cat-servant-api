var express = require("express");
var router = express.Router();
var con = require("../database/db.js");
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/join", async function (req, res, next) {
    var id = req.body.id;
    var password = req.body.password;
    var nickname = req.body.nickname;
    var sql = "select id from user where id=?";
    con.query(sql, id, function (err, data) {
        if (data[0] == null) {
            var sql2 =
                "insert into user(id, password, nickname) values('" +
                id +
                "','" +
                password +
                "','" +
                nickname +
                "')";
            con.query(sql2, [id, password, nickname], function (err, result) {
                if (err) {
                    throw res.json(err);
                }
                console.log("회원가입 성공");
            });
        } else {
            res.json("exist ID try another ID");
            console.log("exist ID try another ID");
        }
    });
});
module.exports = router;
