const express = require("express");
const map = require("../controllers/map");
const testParam = require("../param/testParam");
const router = express.Router();

router.post("/", map.saveMapData);

module.exports = router;
