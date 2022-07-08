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

exports.getColorAndDirection = async function (req, res, next) {
    const objectInfo = await object.getColorAndDirection(1);
    const values = Object.values(objectInfo[0]);

    res.json({
        objectId: values[0],
        color: values[1].split(","),
        direction: values[2].split(","),
    });
};
