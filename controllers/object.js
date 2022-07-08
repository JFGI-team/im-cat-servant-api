const object = require("../models/modelObject");

exports.getColorAndDirection = async function (req, res, next) {
    const objectInfo = await object.getColorAndDirection(1);
    const values = Object.values(objectInfo[0]);

    res.json({
        objectId: values[0],
        color: values[1].split(","),
        direction: values[2].split(","),
    });
};
