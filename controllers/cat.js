const objectCat = require("../models/modelObjectCat");
const catMapping = require("../models/modelMapCatMapping");
const maps = require("../models/modelMap");
const decryption = require("../middleware/decryptionToken");

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
            message: "이미 3마리의 고양이를 모두 뽑았습니다",
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
    const map = await maps.getMapByMapId(req.body.mapId);
    if (map.user_id !== decode.userNo)
        return res
            .status(400)
            .json({ error: "대표고양이 설정 권한이 없습니다" });

    const catIsMainList = await catMapping.getCatIsMainListByMapId(
        req.body.mapId,
    );
    if (catIsMainList.length === 0)
        return res.status(400).json({ error: "맵에 배치된 고양이가 없습니다" });

    catIsMainList.map(async function (cat) {
        if (cat.is_main === 1) {
            if (cat.object_cat_id === req.body.catId)
                return res
                    .status(400)
                    .json({ message: "이미 대표고양로 설정 되어있습니다" });
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
                    message: "대표고양이 설정이 완료됐습니다.",
                });
            }
        }
    });
};

exports.getCatList = async function (req, res, next) {
    const decode = await decryption.verifyToken(req.headers.authorization);
    const map = await maps.getMapByMapId(req.query.mapId);
    const cats = [];
    if (map.user_id !== decode.userNo)
        return res
            .status(400)
            .json({ error: "고양이 목록 조회 권한이 없습니다" });

    const catList = await catMapping.getCatIsMainListByMapId(req.query.mapId);
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
