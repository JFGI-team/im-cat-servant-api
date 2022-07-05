const object = require("../models/modelObject");
const user = require("../models/modelUser");
const encryption = require("../middleware/crypto");
const publishToken = require("../middleware/verifyToken");

exports.insertUser = async function (req, res, next) {
    encryption
        .createHashedPassword(req.body.password)
        .then(function (password, salt) {
            hashPassword = password.password;
            dbSalt = password.salt;
        });
    const userInfo = await user.getUserInfoById(req.body.id);
    if (!userInfo) {
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
    } else {
        const createToken = await publishToken.createToken(
            req.body.id,
            req.body.nickname,
        );
        return res.status(200).send({ token: createToken.token });
    }
};
exports.checkToken = async function (req, res, next) {
    const checkToken = publishToken.verifyToken(req.headers.token);
    if (!checkToken) {
        return res.status(200).send("Token valid");
    } else {
        return res.status(404).send("Token not valid");
    }
};
