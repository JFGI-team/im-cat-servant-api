const object = require("../models/modelObject");

exports.getColorAndDirection = async function (req, res, next) {
    const objectInfo = await object.getColorAndDirection(req.body.objectId);

    res.json({
        objectId: objectInfo.object_id,
        color: objectInfo.colors,
        directions: objectInfo.directions,
    });
};

exports.getObjectList = async function (req, res, next) {
    const objectIdStr = await object.getObjectsBySearchAndCategory(
        req.body.searchKeyword,
        req.body.category,
    );
    const objectIdList = objectIdStr.object_id
        .split(",")
        .splice(req.body.lastMapId, req.body.lastMapId + req.body.limit);
    const pagingList = await object.getObjectsByPaging(objectIdList);
    res.json({
        totalCount: pagingList.length,
        objects: pagingList,
    });
};
