const objectCat = require("../models/modelObjectCat");
const catMapping = require("../models/modelMapCatMapping");
const decryption = require("../middleware/decryptionToken");

exports.getRandomCat = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const map = await maps.getMapByMapId(req.query.mapId);
    if (!map) {
        return res.status(400).json({
            error: "NOT_FOUND_MAP",
        });
    }
    if (map.user_id !== decode.userNo)
        return res.status(400).json({ error: "NO_PERMISSION" });

    const catMappingList = await objectCat.getCatMappingListByMapId(
        req.query.mapId,
    );

    let myCat = 0;
    const catList = catMappingList.filter(function (catMapping) {
        if (!catMapping.map_id) return true;
        else myCat = myCat + 1;
    });
    if (myCat >= 3) {
        return res.status(400).json({
            message: "ALL_PICKED",
        });
    }

    const randomCat = catList[Math.floor(Math.random() * catList.length)];
    res.json({
        catId: randomCat.object_cat_id,
        imageUrl: randomCat.image_url,
    });
};

exports.setCatHead = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const catList = await catMapping.getCatIsMainListByMapId(req.body.mapId);

    if (catList.length === 0)
        return res.status(400).json({ error: "NOT_FOUND" });
    if (catList[0].user_id !== decode.userNo)
        return res.status(400).json({ error: "NO_PERMISSION" });

    catList.map(async function (cat) {
        if (cat.is_main === "T") {
            if (cat.object_cat_id === req.body.catId)
                return res.status(400).json({ message: "ALREADY_SET_HEAD" });
            else
                catMapping.setCatHeadByMapIdAndCatId(
                    cat.map_id,
                    cat.object_cat_id,
                    false,
                );
        } else {
            if (cat.object_cat_id === req.body.catId) {
                catMapping.setCatHeadByMapIdAndCatId(
                    cat.map_id,
                    cat.object_cat_id,
                    true,
                );
                return res.status(200).json({
                    message: "SET_HEAD_SUCCESS",
                });
            }
        }
    });
};

exports.getCatList = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const catList = await catMapping.getCatIsMainListByMapId(req.query.mapId);
    const cats = [];

    if (catList.length === 0)
        return res.json({
            cats,
        });
    if (catList[0].user_id !== decode.userNo)
        return res.status(400).json({ error: "NO_PERMISSION" });

    catList.map(function (cat) {
        cats.push({
            catId: cat.object_cat_id,
            catName: cat.name,
            imageUrl: cat.image_url,
            isMain: cat.is_main,
        });
    });

    res.json({
        cats,
    });
};
