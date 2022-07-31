const express = require("express");
const mapController = require("../controllers/map");
const mapParam = require("../param/map");
const router = express.Router();

router.post("/", mapParam.index, mapController.saveMapData);
router.get("/profile", mapParam.profile, mapController.getProfile);
router.post("/profile", mapParam.profile, mapController.saveProfile);
router.put("/profile", mapParam.profile, mapController.updateProfile);
router.get("/:map_id", mapParam.map_id, (req, res) => {
    mapController.getMapAllObject(req, res);
});

module.exports = router;
