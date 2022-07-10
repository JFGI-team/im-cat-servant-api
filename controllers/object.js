const object = require("../models/modelObject");

exports.getColorAndDirection = async function (req, res, next) {
    const objectInfo = await object.getColorAndDirection(req.body.objectId);

    res.json({
        objectId: objectInfo.object_id,
        color: objectInfo.colors,
        directions: objectInfo.directions,
    });
};

exports.searchObjects = async function (req, res) {
    let ObjectArray = []; //const는 값을 바꿀수 없어서 let 사용
    if (req.body.searchKeyword == null && req.body.category == null)
        objectArray = await object.getObjectsByPaging(
            req.body.limit,
            req.body.pageId,
        );
    else if (req.body.searchKeyword != null && req.body.category == null)
        objectArray = await object.getObjectsBySearchKeyword(
            req.body.searchKeyword,
        );
    else objectArray = await object.getObjectsByCategory(req.body.category);

    res.json({
        totalCount: objectArray.length,
        objects: objectArray,
    });
};
