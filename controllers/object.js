const object = require("../models/modelObject");
const cat = require("../models/modelObjectCat");

exports.getColorAndDirection = async function (req, res, next) {
    const objectInfo = await object.getColorAndDirection(req.body.objectId);

    res.json({
        objectId: objectInfo.object_id,
        color: objectInfo.colors,
        directions: objectInfo.directions,
    });
};

exports.getObjectIdList = async function (req, res, next) {
    const objectIdStr = await object.getObjectListBySearchAndCategory(
        req.body.searchKeyword,
        req.body.category,
    );

    const objectListMap = new Map([
        ["totalCount", 0],
        ["objects", []],
        ["lastMapId", req.body.lastMapId],
    ]);

    if (!objectListMap.lastMapId) objectListMap.lastMapId = 1;
    if (objectIdStr.object_id) {
        objectListMap.objects = objectIdStr.object_id?.split(",");
        objectListMap.totalCount = objectListMap.objects.length;
        objectListMap.objects = objectListMap.objects.slice(
            objectListMap.lastMapId - 1,
            objectListMap.lastMapId - 1 + req.body.limit,
        );
        objectListMap.objects = await object.getObejctListByIdList(
            objectListMap.objects,
        );
    }

    res.json({
        totalCount: objectListMap.totalCount,
        objects: objectListMap.objects,
    });
};
