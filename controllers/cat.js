const objectCat = require("../models/modelObjectCat");
const maps = require("../models/modelMap");
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
