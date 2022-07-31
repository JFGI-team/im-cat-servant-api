const express = require("express");
const mapController = require("../controllers/map");
const mapParam = require("../param/map");
const router = express.Router();

router.post("/", mapParam.index, mapController.saveMapData);
router.get("/:map_id", mapParam.map_id, (req, res) => {
    mapController.getMapAllObject(req, res);
});
router.post("/profile", mapParam.profile, mapController.saveProfile);
router.put("/profile", mapParam.profile, mapController.updateProfile);
router.get("/profile", mapController.getProfile);

module.exports = router;
