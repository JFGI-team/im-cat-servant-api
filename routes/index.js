var express = require("express");
const testController = require("../controllers/sample");
const testParam = require("../param/testParam");
const validationRequestSchema = require("../middleware/validateRequestSchema");
var router = express.Router();
const { body, validationResult } = require("express-validator");

router.post("/", body("testParam").isLength({ min: 5 }), async (res, req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    testController.getTestObject(res, req);
});

module.exports = router;
