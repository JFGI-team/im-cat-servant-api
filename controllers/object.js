const object = require("../models/modelObject");

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
    if (!objectIdStr.object_id) {
        res.json({
            totalCount: 0,
            objects: [],
        });
    } else {
        let start = 0;
        if (req.body.lastMapId) start = req.body.lastMapId - 1;
        const objectIdList = objectIdStr.object_id
            .split(",")
            .slice(start, start + req.body.limit);
        const pagingObjectList = await object.getObejctListByIdList(
            objectIdList,
        );

        res.json({
            totalCount: objectIdList.length,
            objects: pagingObjectList,
        });
    }
};
