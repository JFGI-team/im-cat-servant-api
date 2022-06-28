const express = require("express");
const router = express.Router();
const s3 = require("../controllers/upload");
const testParam = require("../param/testParam");

router.post("/", s3.upload);

module.exports = router;
