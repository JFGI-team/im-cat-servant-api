const object = require("../models/modelObject");
const url = require("url");

exports.getColorAndDirection = async function (req, res, next) {
    const objectInfo = await object.getColorAndDirection(req.query.objectId);

    res.json({
        objectId: objectInfo.object_id,
        color: objectInfo.colors,
        directions: objectInfo.directions,
    });
};

exports.getObjectIdList = async function (req, res, next) {
    const objectIdStr = await object.getObjectListBySearchAndCategory(
        req.query.searchKeyword,
        req.query.category,
    );
    const objectListObj = new Object({
        totalCount: 0,
        objects: [],
        index: 0,
        limit: req.query.limit,
    });
    if (objectIdStr.object_id) {
        objectListObj.objects = objectIdStr.object_id.split(",");
        objectListObj.totalCount = objectListObj.objects.length;
        objectListObj.index = objectListObj.objects.indexOf(
            req.query.lastMapId,
        );
    } else {
        return res.status(400).json({
            error: "검색 결과가 존재하지 않습니다.",
        });
    }
    if (!Number(req.query.lastMapId) || objectListObj.index !== -1) {
        objectListObj.objects = objectListObj.objects.slice(
            objectListObj.index + 1,
            objectListObj.index + 1 + Number(objectListObj.limit),
        );
    } else {
        return res.status(400).json({
            error: "유효하지 않는 lastMapId 값입니다.",
        });
    }
    if (objectListObj.objects.length) {
        objectListObj.objects = await object.getObjectListByIdList(
            objectListObj.objects,
        );
    }

    res.json({
        totalCount: objectListObj.totalCount,
        objects: objectListObj.objects,
    });
};
