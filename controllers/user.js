const object = require("../models/modelObject");
const user = require("../models/modelUser");
const encryption = require("../middleware/encryptionPassword");
const publishToken = require("../middleware/verificationToken");

exports.insertUser = async function (req, res, next) {
    const hashedPasswordAndSalt = await encryption.createHashedPassword(
        req.body.password,
    );
    const userInfo = await user.getUserInfoById(req.body.id);
    if (!userInfo) {
        user.insertUserAtJoin(
            req.body.id,
            hashedPasswordAndSalt.password,
            hashedPasswordAndSalt.salt,
            req.body.nickname,
        );
    } else {
        res.status(400).json({ msg: "exist ID try another ID" });
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
        res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    } else {
        const token = await publishToken.createToken(
            req.body.id,
            req.body.nickname,
        );
        return res.status(200).send({ token });
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
