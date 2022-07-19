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
    const objectIdStr = await object.getObjectListBySearchAndCategory(
        req.body.searchKeyword,
        req.body.category,
    );
    const objectIdList = objectIdStr.object_id
        ?.split(",")
        ?.slice(req.body.lastMapId, req.body.lastMapId + req.body.limit);

    let pagingObjectList = [];
    if (objectIdList.length != 0)
        pagingObjectList = await object.getObjectListByPaging(objectIdList);
    res.json({
        totalCount: pagingObjectList.length,
        objects: pagingObjectList,
    });
};
