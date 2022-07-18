const express = require("express");
const mapController = require("../controllers/map");
const mapParam = require("../param/map");
const router = express.Router();

router.post("/", mapParam.index, mapController.saveMapData);

router.get("/id/:id", mapParam.id, (req, res) => {
    mapController.inquiryMap(req, res);
});
router;
module.exports = router;
