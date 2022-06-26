const object = require("../models/modelObject");
const user = require("../models/modelUser");

exports.insertUser = async function (req, res, next) {
    const UserInfo = await user.getUserInfoById(req.body.id);
    if (UserInfo[0] == null) {
        const insertInfo = await user.insertUserAtJoin(
            req.body.id,
            req.body.password,
            req.body.nickname,
        );
    } else {
        res.json("exist ID try another ID");
        console.log("exist ID try another ID");
    }
};
