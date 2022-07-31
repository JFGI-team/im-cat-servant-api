const catMapping = require("../models/modelMapCatMapping");
const map = require("../models/modelMap");
const objectMapping = require("../models/modelMapObjectMapping");
const objectColor = require("../models/modelObjectColor");
const objectDirection = require("../models/modelObjectDirection");
const user = require("../models/modelUser");

exports.saveMapData = async function (req, res, next) {
    const mapId = await map.insertMap(
        null,
        1,
        req.body.wallpaperId,
        req.body.floorId,
        req.body.title,
        null,
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

exports.saveProfile = async function (req, res, next) {
    const decode = await description.verifyToken(req.headers.authorization);
    const mapId = await map.insertMap(
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
    map.map.updateProfileByMapId(
        req.body.mapId,
        req.body.title,
        req.body.description,
    );

    res.status(200).json({
        message: `Update Profile Success`,
    });
};

exports.getProfile = async function (req, res, next) {
    const profile = await map.getProfileByMapId(req.query.mapId);
    if (!profile) {
        return res.status(400).json({
            error: "유효하지 않는 MapID입니다.",
        });
    }

    res.json({
        nickname: profile.nickname,
        title: profile.title,
        description: profile.description,
    });
};
