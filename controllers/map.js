const catMapping = require("../models/modelMapCatMapping");
const maps = require("../models/modelMap");
const objectMapping = require("../models/modelMapObjectMapping");
const objectColor = require("../models/modelObjectColor");
const objectDirection = require("../models/modelObjectDirection");
const Token = require("../middleware/decryptionToken.js");

exports.saveMapData = async function (req, res, next) {
    const tokenInfo = await Token.verifyToken(req.header("token"));
    const mapId = await maps.insertMap(
        null,
        tokenInfo.userNo.toString(), //userID인데 헤더에 포함되서 오는거라서 일단은 임의로 지정
        req.body.wallpaperId,
        req.body.floorId,
        req.body.title,
        req.body.description,
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
        const objects = [];
        const cats = [];

        const mapInfo = await maps.getMapByMapId(req.params.map_id);
        const mapCat = await catMapping.getCatListByMapId(mapInfo.map_id);
        const mapObject = await objectMapping.getObjectListByMapId(
            mapInfo.map_id,
        );

        mapObject.map(function (objectRow) {
            const objectDetail = {
                objectId: objectRow.object_id,
                color: objectRow.color,
                imageUrl: objectRow.image_url,
                direction: objectRow.direction,
                xLocation: objectRow.x_location,
                yLocation: objectRow.y_location,
                link: objectRow.link,
            };
            objects.push(objectDetail);
        });

        mapCat.map(function (catRow) {
            const catDetail = {
                objectCatId: catRow.object_cat_id,
                xLocation: catRow.x_location,
                yLocation: catRow.y_location,
                name: catRow.name,
                imageUrl: catRow.image_url,
            };
            cats.push(catDetail);
        });
        const mapDetail = {
            userId: mapInfo.user_id,
            nickname: mapInfo.nickname,
            floorId: mapInfo.floor_id,
            wallpaperId: mapInfo.wallpaper_id,
            title: mapInfo.title,
            mapId: mapInfo.map_id,
            cats: cats,
            objects: objects,
        };

        res.status(200).send(mapDetail);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateMapData = async function (req, res, next) {
    try {
        const tokenInfo = await Token.verifyToken(req.header("token"));
        const chkMapUser = await maps.chkMapUser(req.body.mapId);
        if (tokenInfo.userNo == chkMapUser[0].user_id) {
            await catMapping.deleteCatMapping(req.body.mapId);
            await objectMapping.deleteMapObjectMapping(req.body.mapId);

            await req.body.objects.forEach(async function (object) {
                console.log(object);
                objectMapping.insertMapObjectMapping(
                    req.body.mapId,
                    object.id,
                    object.objectColorId,
                    object.objectDirectionId,
                    object.xLocation,
                    object.yLocation,
                    object.link,
                );
            });

            await req.body.cats.forEach(async function (cat) {
                catMapping.insertMapCatMapping(
                    cat.id,
                    req.body.mapId,
                    cat.name,
                    cat.x_location,
                    cat.y_location,
                    cat.is_main,
                );
            });
        } else {
            res.status(400).json({ msg: "You are not a modifiable user." });
        }

        res.status(200).json({ msg: "update Finsh" });
    } catch (err) {
        res.status(400).json(err);
    }
};
