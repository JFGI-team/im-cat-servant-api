const object = require("../models/modelObject");

exports.getTestObject = async function (req, res, next) {
    const objectInfo = await object.getObjectById(1);
    res.json({
        testParam: req.body.testParam,
        sampleParam: req.body.sampleParam,
        objectId: objectInfo[0].object_id,
        objectName: objectInfo[0].name,
    });
};
