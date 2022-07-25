const objectCat = require("../models/modelObjectCat");

exports.getRandomCat = async function (req, res, next) {
    const catList = await objectCat.getCatList();
    const randomCat = catList[Math.floor(Math.random() * catList.length)];

    res.json({
        catId: randomCat.object_cat_id,
        imageUrl: randomCat.image_url,
    });
};
