const object = require("../models/modelObject");

exports.getColorAndDirection = async function (req, res, next) {
    const objectInfo = await object.getColorAndDirection(req.body.objectId);
    console.log(objectInfo);

    res.json({
        objectId: objectInfo.object_id,
        color: objectInfo.colors,
        directions: objectInfo.directions,
    });
};
