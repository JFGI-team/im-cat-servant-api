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
        await user.insertUserAtJoin(
            req.body.id,
            hashedPasswordAndSalt.password,
            hashedPasswordAndSalt.salt,
            req.body.nickname,
        );
        res.status(200).json({ message: "success" });
    } else {
        res.status(400).json({ message: "exist ID try another ID" });
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
        res.status(400).json({ error: "비밀번호가 일치하지 않습니다." });
    } else {
        const token = await publishToken.createToken(
            req.body.id,
            req.body.nickname,
        );
        return res.status(200).json({ token });
    }
};
exports.checkToken = async function (req, res, next) {
    const checkToken = publishToken.verifyToken(req.headers.token);
    if (!checkToken) {
        return res.status(200).json({ message: "success" });
    } else {
        return res.status(404).json({ error: "Token not valid" });
    }
};
