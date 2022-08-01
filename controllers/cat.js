const objectCat = require("../models/modelObjectCat");

exports.getRandomCat = async function (req, res, next) {
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
            message: "Already picked three cats",
        });
    }

    const randomCat = catList[Math.floor(Math.random() * catList.length)];
    res.json({
        catId: randomCat.object_cat_id,
        imageUrl: randomCat.image_url,
    });
};
