const express = require("express");
const router = express.Router();
const mapPreview = require("../models/modelMapPreview");
const s3 = require("../controllers/upload");

router.post("/", s3.upload, async function (req, res, next) {
    await mapPreview.insetMapPreview(1, res.locals.url);
});

module.exports = router;
