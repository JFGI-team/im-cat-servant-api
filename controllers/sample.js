const Object = require("../models/modelObject");

exports.getTestObject = async function (req, res, next) {
    const objectInfo = await Object.getObjectById(1);
    console.log(objectInfo);
    res.json({
        testParam: req.body.testParam,
        sampleParam: req.body.sampleParam,
        objectId: objectInfo.object_id,
        objectName: objectInfo.name,
    });
};
