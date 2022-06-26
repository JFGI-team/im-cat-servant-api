const object = require("../models/modelObject");
const user = require("../models/modelUser");

exports.getTestObject = async function (req, res, next) {
    const objectInfo = await object.getObjectById(1);
    res.json({
        testParam: req.body.testParam,
        sampleParam: req.body.sampleParam,
        objectId: objectInfo[0].object_id,
        objectName: objectInfo[0].name,
    });
};

exports.getUserInfo = async function (req, res, next) {
    const UserInfo = await user.getUserInfoById(
        req.body.id,
        req.body.password,
        req.body.nickname,
    );
    res.json({
        // 이따 수정
        id: req.body.id,
        password: req.body.password,
        nickname: req.body.nickname,
    });
};
