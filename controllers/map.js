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

exports.getMapAllObject = async function (req, res, next) {
    try {
        const mapInfo = await map.getMapByMapId(req.params.map_id);
        const mapCat = await catMapping.getCatListByMapId(mapInfo.map_id);
        const mapObject = await objectMapping.getObjectListByMapId(
            mapInfo.map_id,
        );
        const object = [];
        for (objectRow of mapObject) {
            console.log(objectRow);
            const objectDetail = {
                object_id: objectRow.object_id,
                color: objectRow.color,
                image_url: objectRow.image_url,
                direction: objectRow.direction,
                x_location: objectRow.x_location,
                y_location: objectRow.y_location,
                link: objectRow.link,
            };
            object.push(objectDetail);
        }
        const cat = [];
        for (catRow of mapCat) {
            const catDetail = {
                object_cat_id: catRow.object_cat_id,
                x_location: catRow.x_location,
                y_location: catRow.y_location,
                name: catRow.name,
                image_url: catRow.image_url,
            };
            cat.push(catDetail);
        }
        const mapDetail = {
            user_id: mapInfo.user_id,
            nickname: mapInfo.nickname,
            floorId: mapInfo.floor_id,
            wallpaperId: mapInfo.wallpaper_id,
            title: mapInfo.title,
            map_id: mapInfo.map_id,
        };
        const finalMap = { mapDetail, object, cat };
        res.status(200).send(finalMap);
    } catch (err) {
        res.status(400).send(err);
    }
};
