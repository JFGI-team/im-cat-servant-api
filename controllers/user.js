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
exports.findUser = async function (req, res, next) {
    const checkUserInfo = await user.findUserAtDb(req.body.id);
    const verified = await encryption.verifyPassword(
        req.body.password,
        checkUserInfo[0].salt,
        checkUserInfo[0].password,
    );
    if (!verified) {
        res.json("비밀번호가 일치하지 않습니다.");
        console.log("비밀번호가 일치하지 않습니다.");
    } else {
        res.json("로그인 완료");
        console.log("로그인 완료");
    }
};
