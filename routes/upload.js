const express = require("express");
const router = express.Router();
const s3 = require("../controllers/upload");

router.post("/", s3.upload);

module.exports = router;
