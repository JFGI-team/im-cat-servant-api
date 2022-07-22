const object = require("../models/modelObject");
const objectCat = require("../models/modelObjectCat");

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
    const objectListObj = new Object({
        totalCount: 0,
        objects: [],
        index: 0,
        limit: req.body.limit,
    });

    if (objectIdStr.object_id) {
        objectListObj.objects = objectIdStr.object_id.split(",");
        objectListObj.totalCount = objectListObj.objects.length;
        objectListObj.index = objectListObj.objects.indexOf(
            String(req.body.lastMapId),
        );
    } else {
        return res.status(400).json({
            error: "검색 결과가 존재하지 않습니다.",
        });
    }
    if (!req.body.lastMapId || objectListObj.index !== -1) {
        objectListObj.objects = objectListObj.objects.slice(
            objectListObj.index + 1,
            objectListObj.index + 1 + objectListObj.limit,
        );
    } else {
        return res.status(400).json({
            error: "유효하지 않는 lastMapId 값입니다.",
        });
    }
    if (objectListObj.objects.length) {
        objectListObj.objects = await object.getObejctListByIdList(
            objectListObj.objects,
        );
    }

    res.json({
        totalCount: objectListObj.totalCount,
        objects: objectListObj.objects,
    });
};
