const express = require("express");
const mapController = require("../controllers/map");
const mapParam = require("../param/map");
const router = express.Router();

router.post("/", mapParam.index, mapController.saveMapData);

router.get("/:map_id", mapParam.map_id, (req, res) => {
    mapController.getMapAllObject(req, res);
});
router.put("/", mapParam.index, mapParam.token, (req, res) => {
    mapController.updateMapData(req, res);
});
module.exports = router;
