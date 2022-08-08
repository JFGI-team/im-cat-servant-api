const catMapping = require("../models/modelMapCatMapping");
const maps = require("../models/modelMap");
const objectMapping = require("../models/modelMapObjectMapping");
const objectColor = require("../models/modelObjectColor");
const objectDirection = require("../models/modelObjectDirection");
const decryption = require("../middleware/decryptionToken");

exports.saveMapData = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const mapId = await maps.insertMap(
        null,
        decode.userNo,
        req.body.wallpaperId,
        req.body.floorId,
        req.body.title,
        req.body.description,
    );

    req.body.maps.forEach(async function (object) {
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
            colorId.object_color_id,
            directionId.object_direction_id,
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
        const maps = [];
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
            maps.push(objectDetail);
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
            maps: maps,
        };

        res.status(200).send(mapDetail);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.saveProfile = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const mapId = await maps.insertMap(
        null,
        decode.userNo,
        null,
        null,
        req.body.title,
        req.body.description,
    );

    res.json({
        mapId: mapId.insertId,
    });
};

exports.updateProfile = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const map = await maps.getMapByMapId(req.body.mapId);

    if (!map) {
        return res.status(400).json({
            error: "NOT_FOUND_PROFILE",
        });
    }
    if (map.user_id !== decode.userNo)
        return res.status(400).json({ error: "NO_PERMISSION" });

    maps.updateProfileByMapId(
        req.body.mapId,
        req.body.title,
        req.body.description,
    );

    res.status(200).json({
        message: `UPDATE_SUCCESS`,
    });
};

exports.getProfile = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const profile = await maps.getProfileByMapIdAndUserId(
        req.query.mapId,
        decode.userNo,
    );
    if (!profile) {
        return res.status(400).json({
            error: "NOT_FOUND",
        });
    }

    res.json({
        nickname: profile.nickname,
        title: profile.title,
        description: profile.description,
    });
};

exports.getUserMapList = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const userMapStr = await maps.getUserMapStrByUserId(decode.userNo);
    const limit = req.query.limit;
    const mapListObject = new Object({
        totalCount: 0,
        maps: [],
    });

    if (userMapStr.mapId) {
        mapListObject.maps = userMapStr.mapId.split(",");
        mapListObject.totalCount = mapListObject.maps.length;
    } else {
        return res.status(400).json({
            error: "NOT_FOUND_MAP",
        });
    }

    if (Number(req.query.lastMapId)) {
        const index = mapListObject.maps.indexOf(req.query.lastMapId);
        if (index !== -1) {
            mapListObject.maps = mapListObject.maps.slice(
                index + 1,
                index + 1 + limit,
            );
        } else {
            return res.status(400).json({
                error: "INVALID_LAST_MAP_ID",
            });
        }
    } else mapListObject.maps = mapListObject.maps.slice(0, limit);

    if (mapListObject.maps.length) {
        mapListObject.maps = await maps.getMapListByIdList(mapListObject.maps);
    }

    mapListObject.maps.map(function (map, i) {
        mapListObject.maps[i] = {
            mapId: map.map_id,
            title: map.title,
            userId: map.user_id,
            nickname: map.nickname,
            previewImageUrl: map.image_url,
        };
    });

    res.json({
        totalCount: mapListObject.totalCount,
        maps: mapListObject.maps,
    });
};
