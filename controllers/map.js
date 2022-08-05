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

exports.getALLMapList = async function (req, res, next) {
    const allMapStr = await maps.getAllMapStrBySearch(req.query.searchKeyword);
    const mapListObject = new Object({
        totalCount: 0,
        maps: [],
        index: 0,
        limit: req.query.limit,
    });

    if (allMapStr.mapId) {
        mapListObject.maps = allMapStr.mapId.split(",");
        mapListObject.totalCount = mapListObject.maps.length;
        mapListObject.index = mapListObject.maps.indexOf(req.query.lastMapId);
    } else {
        return res.status(400).json({
            error: "NOT_FOUND_SEARCH_RESULT",
        });
    }
    if (!Number(req.query.lastMapId) || mapListObject.index !== -1) {
        mapListObject.maps = mapListObject.maps.slice(
            mapListObject.index + 1,
            mapListObject.index + 1 + Number(mapListObject.limit),
        );
    } else {
        return res.status(400).json({
            error: "INVALID_LAST_MAP_ID",
        });
    }

    if (mapListObject.maps.length) {
        mapListObject.maps = await maps.getMapListByIdList(mapListObject.maps);
    }
    console.log(mapListObject.maps);
    res.json({
        totalCount: mapListObject.totalCount,
        maps: mapListObject.maps,
    });
};
