const object = require("../models/modelObject");
const user = require("../models/modelUser");
const encryption = require("../middleware/function");

exports.insertUser = async function (req, res, next) {
    encryption
        .createHashedPassword(req.body.password)
        .then(function (password, salt) {
            hashPassword = password.password;
            dbSalt = password.salt;
        });
    const UserInfo = await user.getUserInfoById(req.body.id);
    if (UserInfo[0] == null) {
        const insertInfo = await user.insertUserAtJoin(
            req.body.id,
            hashPassword,
            dbSalt,
            req.body.nickname,
        );
    } else {
        res.json("exist ID try another ID");
        console.log("exist ID try another ID");
    }
};
