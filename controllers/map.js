const catMapping = require("../models/modelMapCatMapping");
const map = require("../models/modelMap");
const objectMapping = require("../models/modelMapObjectMapping");
const objectColor = require("../models/modelObjectColor");
const objectDirection = require("../models/modelObjectDirection");

exports.saveMapData = async function (req, res, next) {
    const mapId = await map.insertMap(
        null,
        1, //userID인데 헤더에 포함되서 오는거라서 일단은 임의로 지정
        req.body.wallpaperId,
        req.body.floorId,
        req.body.title,
    );

    req.body.objects.forEach(async function (object) {
        const colorId = await objectColor.getObjectColorId(
            object.id,
            object.color,
        );
        const directionId = await objectDirection.getObjectDirectionId(
            object.id,
            object.direction,
        );
        objectMapping.insertMapObjectMapping(
            mapId.insertId,
            object.id,
            colorId[0].object_color_id,
            directionId[0].object_direction_id,
            object.xLocation,
            object.yLocation,
            object.link,
        );
    });

    req.body.cats.forEach(async function (cat) {
        catMapping.insertMapCatMapping(
            cat.id,
            mapId.insertId,
            cat.name,
            cat.x_location,
            cat.y_location,
        );
    });

    res.json({
        mapId: mapId.insertId,
    });
};
