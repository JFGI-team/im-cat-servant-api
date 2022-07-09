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
    try {
        const checkUserInfo = await user.findUserAtDb(req.body.id);
        await encryption.verifyPassword(
            req.body.password,
            checkUserInfo[0].salt,
            checkUserInfo[0].password,
        );
        const token = await publishToken.createToken(
            req.body.id,
            req.body.nickname,
        );
        return res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: "비밀번호가 일치하지 않습니다." });
    }
};
exports.checkToken = async function (req, res, next) {
    try {
        publishToken.verifyToken(req.headers.token);
        return res.status(200).json({ message: "success" });
    } catch (error) {
        return res.status(404).json({ error: error });
    }
};
