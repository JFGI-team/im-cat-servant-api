const express = require("express");
const mapController = require("../controllers/map");
const mapParam = require("../param/map");
const router = express.Router();

router.post("/", mapParam.index, mapController.saveMapData);

router.get("/:map_id", mapParam.id, (req, res) => {
    mapController.getMapAllObject(req, res);
});
module.exports = router;
