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

    const objectListObj = new Object({
        totalCount: 0,
        objects: [],
        start: 0,
        limit: req.body.limit,
    });

    if (objectIdStr.object_id) {
        objectListObj.objects = objectIdStr.object_id.split(",");
        objectListObj.totalCount = objectListObj.objects.length;
        objectListObj.start =
            objectListObj.objects.indexOf(String(req.body.lastMapId)) + 1;
        objectListObj.objects = objectListObj.objects.slice(
            objectListObj.start,
            objectListObj.start + objectListObj.limit,
        );
        objectListObj.objects = await object.getObejctListByIdList(
            objectListObj.objects,
        );
    }

    res.json({
        totalCount: objectListObj.totalCount,
        objects: objectListObj.objects,
    });
};

exports.getRandomCat = async function (req, res, next) {
    const catIdList = await cat.getCatIdList;
    console.log(catIdList);
    const randCatId = catIdList[(catIdList.length * Math.random()) | 0];
    const randCatImage = await cat.getCatInfoById(randCatId);

    res.json({
        catId: randCatId,
        imageUrl: randCatImage,
    });
};
