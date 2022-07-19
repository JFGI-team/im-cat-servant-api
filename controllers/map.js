const catMapping = require("../models/modelMapCatMapping");
const map = require("../models/modelMap");
const objectMapping = require("../models/modelMapObjectMapping");
const objectColor = require("../models/modelObjectColor");
const objectDirection = require("../models/modelObjectDirection");
const RowDataPacket = require("mysql/lib/protocol/packets/RowDataPacket");

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

exports.inquiryMap = async function (req, res, next) {
    try {
        const userMap = await map.getMap(req.params.map_id);
        const mapInfo = new Array();

        for (let mapDt of userMap) {
            const userCat = await map.getCat(mapDt.map_id);
            const userObject = await map.getObject(mapDt.map_id);
            const object = {
                user_id: userMap.user_id,
                nickname: userMap.nickname,
                floorId: userMap.floor_id,
                wallpaperId: userMap.wallpaper_id,
                title: userMap.title,
                map_id: userMap.map_id,
                objects: userObject,
                cats: userCat,
            };
            mapInfo.push(object);
        }
        res.status(200).send(mapInfo);
    } catch (err) {
        console.log(err);
    }
};
