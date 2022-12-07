const object = require("../models/modelObject");
const user = require("../models/modelUser");
const encryption = require("../middleware/encryptionPassword");
const publishToken = require("../middleware/verificationToken");
const decryption = require("../middleware/decryptionToken");

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
        res.status(400).json({ error: "ERROR_EXIST_ID" });
    }
};
exports.verify = async function (req, res, next) {
    try {
        const checkUserInfo = await user.getUserById(req.body.id);
        await encryption.verifyPassword(
            req.body.password,
            checkUserInfo[0].salt,
            checkUserInfo[0].password,
        );
        const token = await publishToken.createToken(
            checkUserInfo[0].user_id,
            checkUserInfo[0].id,
            checkUserInfo[0].nickname,
        );
        return res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: "ERROR_INCORRECT_PASSWORD" });
    }
};
