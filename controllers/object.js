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
    const limit = Number(req.query.limit);
    const objectListObj = new Object({
        totalCount: 0,
        objects: [],
    });
    if (objectIdStr.object_id) {
        objectListObj.objects = objectIdStr.object_id.split(",");
        objectListObj.totalCount = objectListObj.objects.length;
    } else {
        return res.status(400).json({
            error: "NOT_FOUND_SEARCH_RESULT",
        });
    }
    if (Number(req.query.lastMapId)) {
        index = objectListObj.objects.indexOf(req.query.lastMapId);
        if (index !== -1) {
            objectListObj.objects = objectListObj.objects.slice(
                index + 1,
                index + 1 + limit,
            );
        } else {
            return res.status(400).json({
                error: "INVALID_LAST_MAP_ID",
            });
        }
    } else objectListObj.objects = objectListObj.objects.slice(0, limit);

    if (objectListObj.objects.length) {
        objectListObj.objects = await object.getObjectListByIdList(
            objectListObj.objects,
        );
    }

    objectListObj.objects.map(function (object, i) {
        objectListObj.objects[i] = {
            objectId: object.object_id,
            imageUrl: object.image_url,
            name: object.name,
        };
    });

    res.json({
        totalCount: objectListObj.totalCount,
        objects: objectListObj.objects,
    });
};
